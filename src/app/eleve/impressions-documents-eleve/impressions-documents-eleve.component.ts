import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { elements } from 'chart.js';
import { catchError } from 'rxjs';
import { Agent } from 'src/app/models/agent.model';
import { Classe } from 'src/app/models/classe.model';
import { Eleve, impressionDocEleveType } from 'src/app/models/eleve.model';
import { ClasseService } from 'src/app/services/classe.service';
import { EleveService } from 'src/app/services/eleve.service';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environnements/environnement.prod';

@Component({
  selector: 'app-impressions-documents-eleve',
  templateUrl: './impressions-documents-eleve.component.html',
  styleUrls: ['./impressions-documents-eleve.component.scss']
})
export class ImpressionsDocumentsEleveComponent {
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

  typeImpression!: impressionDocEleveType;

  tableauImpression: { IDELEVE: number}[] = [];
  agent!: Agent;
  eleveListForImpression: Eleve[] = [];
  eleveCheckedOnList: Eleve[] = [];

  constructor(
    private classeService: ClasseService,
    private eleveService: EleveService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.agent = this.globalService.initConnectedAgent();
    this.classe();
    this.ClasseList();
    this.typeImpression = environment.TypeImpressionEleve;
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

  /*onChangeState(eleve: Eleve, event: any){
    const isChecked = event.target.checked;

    if(isChecked){
      this.tableauImpression.push(eleve);
    }else{
      const index = this.tableauImpression.findIndex((eleve) => eleve.IDELEVE == eleve.IDELEVE);
      if(index >= 0){
        this.tableauImpression.splice(index, 1);
        this.AfficherEleves();
      }
    }
  }*/

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
    this.eleveListForImpression = []
    this.eleveCheckedOnList = [];
    this.dataSourceEleves = []
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

  checkLine(element: any, event: any) {
    const isChecked = event.target.checked;

    if(isChecked)
      event.target.checked = true;
    else
      event.target.checked = false;
    
    const index = this.tableauImpression.findIndex((eleve) => eleve.IDELEVE === element.IDELEVE);
    if (index !== -1 && !isChecked) {
      this.tableauImpression.splice(index, 1);
      this.deleteRow(element);
    } else {
      this.tableauImpression.push({ IDELEVE: element.IDELEVE });
      console.log(this.tableauImpression)
    }
  }
  
  /*isChecked(element: any): boolean {
    return this.tableauImpression.some((eleve) => eleve.IDELEVE === element.IDELEVE);
  }*/
  

  /*onRowClicksTable2(row: any): void {
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
  }*/

  /*AfficherEleves() {
    // Récupérer les élèves cochés de dataSourceElevesByClass.data et les assigner à dataSourceEleves
    this.dataSourceEleves = new MatTableDataSource(
      this.dataSourceElevesByClass.data.filter((eleve: { IDELEVE: number }) => {
        const isEleveChecked = this.tableauImpression.some(
          (tableauImpression) => tableauImpression.IDELEVE === eleve.IDELEVE
        );
        return isEleveChecked;
      })
    );
  }*/
  

  //this funtion add all eleve from class selected
  ajouterEleves() {
    this.dataSourceEleves = this.dataSourceElevesByClass.data;
    /*this.tableauImpression = this.dataSourceElevesByClass.data.map(
      (eleve: { IDELEVE: number }) => ({ IDELEVE: eleve.IDELEVE })
    );*/
    //make show all eleves from class selected
    this.OnPrintEleve(this.dataSourceElevesByClass.data);
    
    //set all input checked
    const allChecked = document.getElementsByClassName('eleve-checkbox');
    for (let i = 0; i < allChecked.length; i++) {
      const check = allChecked[i];
      //check.attributes.setNamedItem(checked)
      console.log(check);
      
    }
  }
  
//supprimer les lignes ajoutées dans le deuxieme tableau si necessaire
deleteRow(element: any) {
  this.dataSourceEleves.data = this.dataSourceEleves.data.filter((el: any) => el !== element);
  this.eleveListForImpression = this.eleveListForImpression.filter((el) => el.IDELEVE !== element.IDELEVE);
}
  applyFilterclasse(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource1.filter = value.trim().toLowerCase();
  }

  applyFilterEleve(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSourceElevesByClass.filter = value.trim().toLowerCase();
  }

  imprimer(typeImpression: number) {
    this.isLoadingeleves = true;
    let tableauImpression: {IDELEVE: number}[] = this.eleveListForImpression.map(eleve => {
      return {IDELEVE: eleve.IDELEVE}
    });

    this.message =
      "Patientez un instant, l'impression de votre fichier Pdf est en cours";
    this.eleveService
      .impressionDocumentEleve(typeImpression, tableauImpression)
      .subscribe((data) => {
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

  onCheckEleve(element: Eleve, event: any){
    console.log(event)
    const isChecked = event.target.checked;

    //set checked value
    if(isChecked)
      event.target.checked = true;
    else
      event.target.checked = false;
    
    //add or remove eleve form list (if exist remove it than add it)
    const index = this.eleveCheckedOnList.findIndex((eleve) => eleve.IDELEVE === element.IDELEVE);
    if (index !== -1 && !isChecked) {
      this.eleveCheckedOnList.splice(index, 1);
    } else {
      this.eleveCheckedOnList.push(element);
    }
  }

  OnPrintEleve(elevesChecktedList: Eleve[]){
    //for each element in list initialized for eleve checked 
    //  we add it in emptylist to print
    for (let i = 0; i < elevesChecktedList.length; i++) {
      const element = elevesChecktedList[i];

      //we verify first that, eleve is not exist on eleve for iompression list
      const index = this.eleveListForImpression.findIndex((eleve) => eleve.IDELEVE === element.IDELEVE);
      if (index < 0) {
        this.eleveListForImpression.push(element);
      } 
    }
    //after loop, we can set as empty lis of initialized list for eleve
    //we load data for empty list
    this.makeShowStudentsForPrint(this.eleveListForImpression);
  }

  makeShowStudentsForPrint(dataStudent: Eleve[]){
    // Récupérer les élèves cochés de dataSourceElevesByClass.data et les assigner à dataSourceEleves
    this.dataSourceEleves = new MatTableDataSource(dataStudent);
  }

  OnCheckEleveOrSelect(){

  }
}
