import { Component } from '@angular/core';
import { Classe } from '../models/classe.model';
import { Eleve, impressionDocEleveType } from '../models/eleve.model';
import { Agent } from '../models/agent.model';
import { ClasseService } from '../services/classe.service';
import { EleveService } from '../services/eleve.service';
import { GlobalService } from '../services/global.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, tap } from 'rxjs';
import { ClassementService } from '../eleve/classement-releve-note-eleve/services/classement.service';
import { impressionMatrice } from '../models/impressionmatrise.model';

@Component({
  selector: 'app-impression-bulletin',
  templateUrl: './impression-bulletin.component.html',
  styleUrls: ['./impression-bulletin.component.scss']
})
export class ImpressionBulletinComponent {
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
  bulletinAnnuel!: boolean;
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
  sequence!: number;

  typeImpression!: impressionDocEleveType;

  tableauImpression: { IDELEVE: number}[] = [];
  agent!: Agent;
  eleveListForImpression: Eleve[] = [];
  eleveCheckedOnList: Eleve[] = [];
  trimestreSelected!: number;
  isRecalcul!: boolean;
  printIsLoadingM!: boolean

  constructor(
    private classeService: ClasseService,
    private eleveService: EleveService,
    private globalService: GlobalService,
    private classementService: ClassementService
  ) {}

  ngOnInit(): void {
    this.agent = this.globalService.initConnectedAgent();
    this.classe();
    this.ClasseList();
  }

  classe() {
    this.classeService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.dataSource1 = new MatTableDataSource(data);
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

  ajouterEleves() {
 if(this.IDCLASSES > 0){
  this.eleveListForImpression = []
  this.dataSourceEleves = []
  this.dataSourceEleves = this.dataSourceElevesByClass.data;
  this.OnPrintEleve(this.dataSourceElevesByClass.data);
  const allChecked = document.getElementsByClassName('eleve-checkbox');
  for (let i = 0; i < allChecked.length; i++) {
    const check = allChecked[i];
    console.log(check);

  }
 }else{
  this.globalService.alert("Vous devez selectionner la classe","Attention","danger","OK","")
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

  onChangeTrimestre(trimestre: number){
    this.trimestreSelected = trimestre;
  }

  onChangeSequence(sequence: number){
    this.sequence = sequence;
  }

  imprimer() {
    let tableauImpression: {IDELEVE: number}[] = this.eleveListForImpression.map(eleve => {
      return {IDELEVE: eleve.IDELEVE}
    });

    if ((this.trimestreSelected && this.sequence) || this.bulletinAnnuel){
      this.isLoadingeleves = true;
      let trimestre = this.trimestreSelected;
      let sequence = this.sequence
      if(this.bulletinAnnuel){
        trimestre = 0;
        sequence = 0
      }

      this.eleveService.printBulletinV2(tableauImpression, this.IDCLASSES, trimestre, sequence, this.bulletinAnnuel).pipe(
        tap(data => {
          console.log(data);
          this.globalService.printFile(data.body.Etat, "Bulletin")
          this.isLoadingeleves = false;
          this.globalService.toastShow("Impression effectuée avec succès.", "Impression")
        }),
        finalize(() => {
          this.isLoadingeleves = false
        })
      ).subscribe()
    }else{
      this.globalService.toastShow("Veuillez sélectionner un trimestre et une séquence ou cocher si bulletin annuel", "Trimestre ou séquence vide", "error")
    }
  }

  printMatrise(){
    if (this.IDCLASSES && this.trimestreSelected && this.sequence) {
      this.printIsLoadingM = true;
      const param : impressionMatrice = {
        IDNIVEAU: 0,
        IDBRANCHE: 0,
        IDCLASSES: this.IDCLASSES,
        NumeroTrimestre: this.trimestreSelected,
        NumeroSequence: this.sequence
      }
      this.classementService.imprimeMatrise(param).pipe(
        tap(res => {
          console.log(res);
          this.globalService.printFile(res.Etat, "Impression classement")
        }),
        finalize(() => {
          this.printIsLoadingM = false;
        })
      ).subscribe()
    }else{
      this.globalService.alert('Veuillez selectionner une classe , le trimestre et la sequence', "Information","info","OK","")
    }
 
  }

  onCheckEleve(element: Eleve, event: any){
    console.log(event)
    const isChecked = event.target.checked;

    //set checked value
    if(isChecked){
      event.target.checked = true;
    }else{
      event.target.checked = false;
      this.deleteRow(element)
    }
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

  onBulletisAnnuel(event: any){
    const isAnnuel = event.target.checked
    this.bulletinAnnuel = isAnnuel
  }

  onRecalculMoyene(){
    if (this.IDCLASSES && this.trimestreSelected){
      this.isRecalcul = true;
      this.classeService.recalculerMoyennes(this.IDCLASSES, this.trimestreSelected).pipe(
        tap(res => {
          this.globalService.toastShow("Recalcul des moyennes éffectué avec succès !", "", "success")
        }),
        finalize(() => {
          this.isRecalcul = false;
        })
      ).subscribe()
    }else{
      this.globalService.toastShow("Veuillez sélectionner une classe et un trimestre", "", "info")
    }
  }
}
