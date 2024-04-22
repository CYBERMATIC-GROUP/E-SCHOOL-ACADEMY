import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { Compte } from 'src/app/models/compte.model';
import { CompteService } from 'src/app/services/compte.service';
import { LiasseService } from 'src/app/services/liasse.service';
import { Liasse } from 'src/app/models/liasse.model';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-compte-form',
  templateUrl: './compte-form.component.html',
  styleUrls: ['./compte-form.component.scss']
})
export class CompteFormComponent implements OnInit {

  action!: 'edit' | 'view';

  IDCOMPTE!: number
  CodeCompte!: string
  LibelleCompte!: string
  SoldeDebit!: number
  SoldeCredit!: number
  LiasseDebit!: string
  LiasseCredit!: string
  SensDC!: number
  CompteDeContrePartie!: string
  CompteDeCumul!: string
  CompteDeBanque!: boolean
  IDPersonneAssociee!: number
  TypePersonneAssociee!: number
  EstUnChapitre!: boolean
  nClasse!: number
  isLoading!: boolean;
  isLoadingsubmit!:boolean
  liasseList!:Liasse[]
  listcompte!:Compte[]
  listcompte2!:Compte[]
value: any;


  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private compteService:CompteService,
    private liasseService:LiasseService,
    private globalService:GlobalService

  ) {}

  isFormValid(): any {
    return this.CodeCompte && this.LibelleCompte;
  }

  ngOnInit(): void {

    this.loadliasse()
    this.loadcompte()

    const compteID = this.route.snapshot.params['compteID'];
    this.action = this.route.snapshot.params['action'];
    console.log(compteID);
    this.IDCOMPTE = compteID

    if(compteID){
      this.getOneCompte(compteID)
    }

  }


  loadliasse(){
    this.isLoading = true
    this.liasseService.get().subscribe((data)=>{
      console.log(data)
      this.isLoading = false

      this.liasseList = data
    })
  }


  loadcompte(){
    this.isLoading = true
    this.compteService.get().subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.listcompte = data.body
      this.listcompte2 = data.body

    })
  }

  getOneCompte(compteID:number){
    this.compteService.getOne(compteID).subscribe((data)=>{
      console.log(data)
      this.CodeCompte = data.CodeCompte
      this.LibelleCompte = data.LibelleCompte
      this.CompteDeBanque = data.CompteDeBanque
      this.CompteDeCumul = data.CompteDeCumul
      this.CompteDeContrePartie= data.CompteDeContrePartie
      this.EstUnChapitre = data.EstUnChapitre
      this.IDPersonneAssociee = data.IDPersonneAssociee
      this.LiasseCredit = data.LiasseCredit
      this.LiasseDebit = data.LiasseDebit
      this.SensDC = data.SensDC
      this.CompteDeBanque = data.CompteDeBanque
      this.SoldeCredit = data.SoldeCredit
      this.nClasse = data.nClasse
      this.SoldeDebit = data.SoldeDebit
    })
  }


  onSubmitForm(form: NgForm) {
    const compte: Compte = form.value;
    compte.IDCOMPTE = this.IDCOMPTE
    console.log(compte)

    if (this.action === 'edit') {
      this.isLoadingsubmit = true
      this.compteService.update(compte).pipe(
        tap(data => {
          console.log(data);
          this.isLoadingsubmit = false
          this.globalService.reloadComponent('/compte/list')
          this.globalService.toastShow("compte modifié.", "modification")
        }),
        finalize(() => {
          this.isLoadingsubmit = false
        })
      ).subscribe()
    } else {
    this.isLoadingsubmit = true
       this.compteService.create(compte).pipe(
        tap(data => {
          console.log(data);
          this.isLoadingsubmit = false
          this.globalService.reloadComponent('/compte/list')
          this.globalService.toastShow("compte ajouté.", "Ajout")
        }),
        finalize(() => {
          this.isLoadingsubmit = false
        })
      ).subscribe()
  }
}

clearLiasseCredit() {
  this.LiasseCredit = '';
}
clearLiasseDebit(){
  this.LiasseDebit = ''
}
clearCompteDeContrePartie(){
  this.CompteDeContrePartie = ''
}
clearCompteDeCumul(){
  this.CompteDeCumul = ''
}
}
