import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Classe } from 'src/app/models/classe.model';
import { ClasseService } from 'src/app/services/classe.service';
import { EleveService } from 'src/app/services/eleve.service';

@Component({
  selector: 'app-impression-carte-badge-eleve',
  templateUrl: './impression-carte-badge-eleve.component.html',
  styleUrls: ['./impression-carte-badge-eleve.component.scss'],
})
export class ImpressionCarteBadgeEleveComponent{

  dataSource1!: any;
  dataSourceElevesByClass!: any;
  dataSourceEleves!: any;

  displayedColumns1 = ['CodeClasse','cochers'];
  displayedColumns2 = ['CodeEleve', 'Fr_Nom', 'Fr_Prenom','IDCLASSES','cocher'];
  displayedColumns3 = ['CodeClasse', 'CodeEleve', 'Fr_Nom', 'Fr_Prenom','Action'];

  selectedRow: any;

  isLoading!: boolean;
  isLoadingeleveByclass!: boolean;
  isLoadingeleves!: boolean;

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

  classList!:Classe[]


  tableauImpression: { IDELEVE: number}[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public _location: Location,
    private classeService: ClasseService,
    private eleveService: EleveService
  ) {}

  ngOnInit(): void {
    this.classe();
    this.ClasseList()
  }


  

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  classe() {
    this.classeService
      .get().subscribe(
        (data) => {
          console.log(data);
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
    const classe = this.classList.find(
      (item) => item.IDCLASSES === classeID
    );
    return classe ? classe.CodeClasse : '';
  }


  checkLineClass(element: any) {
    const classID = element.IDCLASSES;
    this.IDCLASSES = classID
    console.log(this.IDCLASSES)
    this.eleve()
  }
  eleve() {
    this.isLoadingeleveByclass = true
    this.eleveService
      .getelevesByClasse(1,this.IDCLASSES).subscribe(
        (data) => {
          console.log(this.IDCLASSES)
          this.isLoadingeleveByclass = false
          console.log(data);
          this.dataSourceElevesByClass = new MatTableDataSource(data.body);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  checkLine(element: any) {
    const index = this.tableauImpression.findIndex((eleve) => eleve.IDELEVE === element.IDELEVE);
    if (index !== -1) {
      this.tableauImpression.splice(index, 1);
      this.deleteRow(element)
    } else {
      this.tableauImpression.push({ IDELEVE: element.IDELEVE });
      console.log(this.tableauImpression)
    }
  }
  
  isChecked(element: any): boolean {
    return this.tableauImpression.some((eleve) => eleve.IDELEVE === element.IDELEVE);
  }
  

  onRowClicksTable2(row: any): void {
    const index = this.selectedRowsTable2.indexOf(row);
    if (index >= 0) {
      this.selectedRowsTable2.splice(index, 1);
    } else {
      this.selectedRowsTable2.push(row);
    }
    this.selectedElementTable2 = null;
  
    this.selectedEleveId = row.IDELEVE;
    this.tableauImpression.push({ IDELEVE: this.selectedEleveId });
    console.log(this.selectedEleveId);
  }

  AfficherEleves() {
    // Récupérer les élèves cochés de dataSourceElevesByClass.data et les assigner à dataSourceEleves
    this.dataSourceEleves = new MatTableDataSource(
      this.dataSourceElevesByClass.data.filter((eleve: { IDELEVE: number }) => {
        const isEleveChecked = this.tableauImpression.some(
          (tableauImpression) => tableauImpression.IDELEVE === eleve.IDELEVE
        );
        return isEleveChecked;
      })
    );
  }
  
  ajouterEleves() {
    this.dataSourceEleves = this.dataSourceElevesByClass.data;
    this.tableauImpression = this.dataSourceElevesByClass.data.map(
      (eleve: { IDELEVE: number }) => ({ IDELEVE: eleve.IDELEVE })
    );
  }
  
//supprimer les lignes ajoutées dans le deuxieme tableau si necessaire
deleteRow(element: any) {
  this.dataSourceEleves.data = this.dataSourceEleves.data.filter((el: any) => el !== element);
  this.tableauImpression = this.tableauImpression.filter((el) => el.IDELEVE !== element.IDELEVE);
}

  

  applyFilterclasse(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource1.filter = value.trim().toLowerCase();
  }

  applyFilterEleve(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSourceElevesByClass.filter = value.trim().toLowerCase();
  }

  imprimer() {
    this.isLoadingeleves = true;
    this.message =
      "Patientez un instant, l'impression de votre fichier Pdf est en cours";
    this.eleveService
      .imprimerelevecarte(this.tableauImpression)
      .subscribe((data) => {
        console.log(this.tableauImpression);
        console.log(data);
        var anchor = document.createElement('a');
        anchor.href = data.body.Etat;
        anchor.download = 'Liste Des eleves ';
        document.body.appendChild(anchor);
        //  anchor.click();
        let pdfWindow = window.open('', '_blank', 'Liste eleves');
        pdfWindow
          ? pdfWindow!.document.write(
              "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
                encodeURI(data.body.Etat) +
                "'></iframe></body>"
            )
          : null;
        this.isLoadingeleves = false;
        this.message = 'chargement de la liste';
      });
  }
  
}
