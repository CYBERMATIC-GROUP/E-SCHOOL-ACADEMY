import { Classe } from 'src/app/models/classe.model';
import { Eleve, impressionDocEleveType } from 'src/app/models/eleve.model';
import { ClasseService } from 'src/app/services/classe.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertComponent } from 'src/app/core/alert/alert.component';

@Component({
  selector: 'app-imprime-emploi-temp-classe',
  templateUrl: './imprime-emploi-temp-classe.component.html',
  styleUrls: ['./imprime-emploi-temp-classe.component.scss'],
})
export class ImprimeEmploiTempClasseComponent {
  dataSource1!: any;
  displayedColumns1 = ['CodeClasse', 'cochers'];
  classList!: Classe[];
  isLoading!: boolean;
  IDCLASSE: any;
  IDCLASSES: any;

  constructor(private classeService: ClasseService,private dialog : MatDialog) {}

  ngOnInit(): void {
    this.classe();
    this.ClasseList();
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  classe() {
    this.isLoading =  true
    this.classeService.get().subscribe(
      (data) => {
        console.log(data);
        this.isLoading =  false
        this.dataSource1 = new MatTableDataSource(data);
        this.dataSource1.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ClasseList() {
    this.classeService.get().subscribe(
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
  }

  applyFilterclasse(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource1.filter = value.trim().toLowerCase();
  }

  imprimer() {
    if(this.IDCLASSES > 0){
      this.isLoading = true
      this.classeService
      .impressionEmploiDuTempByClasse(this.IDCLASSES)
      .subscribe((data) => {
        console.log(data);
        this.isLoading = false
        var anchor = document.createElement('a');
        anchor.href = data.Etat;
        anchor.download = 'Emploi du temps ';
        document.body.appendChild(anchor);
        //  anchor.click();
        let pdfWindow = window.open('', '_blank', 'Liste eleves');
        pdfWindow
          ? pdfWindow!.document.write(
              "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
                encodeURI(data.Etat) +
                "'></iframe></body>"
            )
          : null;
      });
    }else{
      const dialog = this.dialog.open(AlertComponent)
      dialog.componentInstance.content = "Veuillez selectionner une classe "
    }
  
  }

}
