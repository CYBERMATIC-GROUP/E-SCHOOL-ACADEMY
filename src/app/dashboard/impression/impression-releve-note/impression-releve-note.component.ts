import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { elements } from 'chart.js';
import { catchError } from 'rxjs';
import { Classe } from 'src/app/models/classe.model';
import { Eleve, impressionDocEleveType } from 'src/app/models/eleve.model';
import { ClasseService } from 'src/app/services/classe.service';
import { EleveService } from 'src/app/services/eleve.service';
import { environment } from 'src/environnements/environnement.prod';
import { MatiereService } from 'src/app/services/matiere.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';

@Component({
  selector: 'app-impression-releve-note',
  templateUrl: './impression-releve-note.component.html',
  styleUrls: ['./impression-releve-note.component.scss'],
})
export class ImpressionReleveNoteComponent {
  dataSource1!: any;
  dataSourceMatiereByClass!: any;

  displayedColumns1 = ['CodeClasse', 'cochers'];
  displayedColumns2 = ['Matiere', 'NoteMax', 'Coefficient', 'cocher'];

  selectedRow: any;

  isLoading!: boolean;
  isLoadingeleveByclass!: boolean;
  isloadingImpression!: boolean;

  selectedIDELEVE!: number;

  IDCLASSES!: number;
  selectedRowsTable1: any[] = [];
  selectedRowsTable2: any[] = [];

  selectedElementTable1: any;
  selectedElementTable2: any;

  selectedElement: any;
  selectedEleveId!: number;

  message!: string;
  IDELEVE!: number;

  classList!: Classe[];
  trimsestreSelected!: any;
  tableauImpression: { IDMATIERE: number }[] = [];

  constructor(
    private classeService: ClasseService,
    private matiereService: MatiereService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.classe();
    this.ClasseList();
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  classe() {
    this.isLoading = true
    this.classeService.get().subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false
        this.dataSource1 = new MatTableDataSource(data);
        this.dataSource1.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ClasseList() {
    this.classeService
      .get()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.classList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getClasse(classeID: string): string {
    const classe = this.classList.find((item) => item.IDCLASSES === classeID);
    return classe ? classe.CodeClasse : '';
  }

  checkLineClass(element: any) {
    const classID = element.IDCLASSES;
    this.IDCLASSES = classID;
    console.log(this.IDCLASSES);
    this.matiere();
  }

  matiere() {
    this.isLoadingeleveByclass = true;
    this.matiereService.getMatiereByClasse(this.IDCLASSES).subscribe(
      (data) => {
        console.log(this.IDCLASSES);
        this.isLoadingeleveByclass = false;
        console.log(data);
        this.dataSourceMatiereByClass = new MatTableDataSource(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkLine(element: any, event: any) {
    const isChecked = event.target.checked;

    // Mettre à jour l'état de la case à cocher
    event.target.checked = isChecked;

    const index = this.tableauImpression.findIndex(
      (matiere) => matiere.IDMATIERE === element.IDMATIERE
    );
    if (index !== -1 && !isChecked) {
      // Retirer l'élément du tableau s'il était précédemment coché et maintenant décoché
      this.tableauImpression.splice(index, 1);
    } else if (index === -1 && isChecked) {
      // Ajouter l'élément au tableau s'il n'était pas coché et maintenant il est coché
      this.tableauImpression.push({ IDMATIERE: element.IDMATIERE });
    }

    console.log(this.tableauImpression);
  }

  applyFilterclasse(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource1.filter = value.trim().toLowerCase();
  }

  applyFilterEleve(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSourceMatiereByClass.filter = value.trim().toLowerCase();
  }

  selectedTrimestre(event: any) {
    const trimsestreSelected = event.target.value;
    this.trimsestreSelected = trimsestreSelected;
    console.log(trimsestreSelected);
  }

  ImprimerReleverSanscNotes() {
    console.log(this.trimsestreSelected);
    if (this.trimsestreSelected) {
      this.isloadingImpression = true;
      this.matiereService
        .impressionrelevenote(
          this.IDCLASSES,
          this.trimsestreSelected,
          1,
          this.tableauImpression
        )
        .subscribe((data) => {
          console.log(this.tableauImpression);
          console.log(this.IDCLASSES);
          console.log(this.trimsestreSelected);
          console.log(data);
          var anchor = document.createElement('a');
          anchor.href = data.body.Etat;
          anchor.download = 'Relever des notes';
          document.body.appendChild(anchor);
          anchor.click();
          let pdfWindow = window.open('', '_blank', 'Relever des notes');
          pdfWindow
            ? pdfWindow!.document.write(
                "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
                  encodeURI(data.body.Etat) +
                  "'></iframe></body>"
              )
            : null;
          this.isloadingImpression = false;
          this.message = 'chargement de la liste';
        });
    } else {
      const alert = this.dialog.open(AlertComponent);
      alert.componentInstance.content = 'veuillez selectioner un trimestre';
    }
  }

  ImprimerReleverAvecNotes() {
    if (this.trimsestreSelected) {
      this.isloadingImpression = true;
      this.matiereService
        .impressionrelevenote(
          this.IDCLASSES,
          this.trimsestreSelected,
          0,
          this.tableauImpression
        )
        .subscribe((data) => {
          console.log(this.tableauImpression);
          console.log(this.IDCLASSES);
          console.log(this.trimsestreSelected);
          console.log(data);
          var anchor = document.createElement('a');
          anchor.href = data.body.Etat;
          anchor.download = 'Relever des notes ';
          document.body.appendChild(anchor);
          anchor.click();
          let pdfWindow = window.open('', '_blank', 'Relever des notes');
          pdfWindow
            ? pdfWindow!.document.write(
                "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
                  encodeURI(data.body.Etat) +
                  "'></iframe></body>"
              )
            : null;
          this.isloadingImpression = false;
          this.message = 'chargement en';
        });
    } else {
      const alert = this.dialog.open(AlertComponent);
      alert.componentInstance.content = 'veuillez selectioner un trimestre';
    }
  }
}
