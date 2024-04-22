import { Component,OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Observable, catchError, of, pipe, startWith, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../core/alert/alert.component';
import { Cycle } from '../models/cycle.model';
import { CycleService } from '../services/cycle.service';
import { CompteService } from '../services/compte.service';
import { Compte, consulTationCompte } from '../models/compte.model';
import { GlobalService } from '../services/global.service';
import { modePaiementInterface } from '../models/modePaiement.models';
import { ModePaiementService } from '../services/mode-paiement.service';
import { SelectionCompteComponent } from '../core/selection-compte/selection-compte.component';


@Component({
  selector: 'app-consultation-compte',
  templateUrl: './consultation-compte.component.html',
  styleUrls: ['./consultation-compte.component.scss']
})
export class ConsultationCompteComponent implements OnInit {

  dataSource!: any;
  displayedColumns = [
    'NumeroMouvement',
    'DateHeure',
    'CodeCompte',
    'LibelleEcriture',
    'MontantDebit',
    'MontantCredit',
    //'CompteCredit',
  ];
  isLoading!: boolean
  comptes$!: Observable<Compte[]>
  compteSelected!: Compte
  dateDebut!: string;
  dateFin!: string;
  consultations$: Observable<consulTationCompte[]> = of([])
  modePaiementList$!: Observable<modePaiementInterface[]>
  modePaiementSelected!: number;
  compteValue!: string;
  soldeCompteSelected!: string;
  totalsoldedebit!: number | boolean ;
  totalsolcredit!: number | boolean ;
  compteAssocie!: string
  CodeCompte!: string
  constructor(
    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private cycleService:CycleService,
    private compteService: CompteService,
    public globalService: GlobalService,
    private modePaiementService: ModePaiementService
  ) { }

  ngOnInit(): void {
    this.modePaiementList$ = this.modePaiementService.getAll(true).pipe(
      tap(res => {
        this.modePaiementSelected = res[1].ModePaiement
      })
    )
    this.loadCompte()
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  loadCompte(){
    const compteListe = "COMPTE_LISTE_STORAGE"
    const obj = localStorage.getItem(compteListe)
    if(obj){
      const comptes: Compte = JSON.parse(obj)
      this.comptes$ = this.compteService.getListCompteBanque(0, false).pipe(
        startWith(comptes),
        tap(res => {
          console.log(res);
          this.compteAssocie = res['0'].LibelleCompte
          if(!this.compteSelected)
            this.compteSelected = res[0]
          this.compteValue = this.compteSelected.CodeCompte
          localStorage.setItem(compteListe, JSON.stringify(res))
        })
      )
    }else{
      this.comptes$ = this.compteService.getListCompteBanque(0, false).pipe(
        tap(res => {
          this.compteSelected = res[0]
          this.compteValue = this.compteSelected.CodeCompte
          localStorage.setItem(compteListe, JSON.stringify(res))
        })
      )
    }
  }

  onEmitDate(dateEmit: string, isBegin: boolean = false){
    if (isBegin)
      this.dateDebut = dateEmit
    else
      this.dateFin = dateEmit

    this.loadConsultationComptes()
  }

  onChooseCompte(compte: Compte){
    this.CodeCompte = compte.CodeCompte
    this.compteAssocie = compte.LibelleCompte
    this.compteSelected = compte
  }
  
viewlist(){
  this.loadConsultationComptes()
}

compteSaisie(event: any): void {
  this.CodeCompte = event.target.value;
}

  loadConsultationComptes(){
    if(this.dateDebut && this.dateFin && this.compteSelected, this.modePaiementSelected){
      this.consultations$ = this.compteService.getConsultationCompte(this.CodeCompte, this.dateDebut, this.dateFin, this.modePaiementSelected).pipe(
        tap(res => {
          console.log(res);
          this.totalsoldedebit = this.globalService.totalCol(res,'MontantDebit')
          this.totalsolcredit = this.globalService.totalCol(res,'MontantCredit')
          this.dataSource = new MatTableDataSource(res)
        })
      )
    }
  }

  formatPrix(prix: number | boolean, separateur: string = ' ', device: string = 'XAF') {
    // Vérifier si prix est défini et non nul
    if (prix !== undefined && prix !== null) {
      let reverse: string[] = prix.toString().split('').reverse();
      let prixFormated: string = '';
  
      for (let i: number = 1; i <= reverse.length; i++) {
        prixFormated += reverse[i - 1];
  
        if (i % 3 === 0) {
          prixFormated += separateur;
        }
      }
  
      let formated = prixFormated.split('').reverse().join('');
      let decimal = ',00 ' + device;
  
      if (formated[0] == separateur) {
        formated = formated.substring(1);
      }
  
      return formated + decimal;
    } else {
      return ''; 
    }
  }
  

  openComptes(){
    const ref = this.dialog.open(SelectionCompteComponent, {width: '760px'})
    ref.id = 'SelectionCompteComponent'
    ref.afterClosed().subscribe(res => {
     if (res) {
      const compte: Compte = ref.componentInstance.compteSelected
      console.log(compte);
      
      if(compte){
        this.compteAssocie = compte.CodeCompte + " " + compte.LibelleCompte
        this.compteSelected = compte
        this.CodeCompte = compte.CodeCompte
        console.log(this.compteSelected);
        console.log(this.CodeCompte);
      }
     }
    })
  }

}
