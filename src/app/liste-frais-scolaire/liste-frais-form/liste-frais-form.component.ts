import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ListeFraisScolaireService } from 'src/app/services/liste-frais-scolaire.service';
import { ProduitListeFraisScolaire } from 'src/app/models/liste.model.frais.scolaire';
import { NiveauService } from 'src/app/services/niveau.service';
import { Niveau } from 'src/app/models/niveau.model';
import { BrancheService } from 'src/app/services/branche.service';
import { Branche } from 'src/app/models/branche.model';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-liste-frais-form',
  templateUrl: './liste-frais-form.component.html',
  styleUrls: ['./liste-frais-form.component.scss']
})
export class ListeFraisFormComponent {

  action!: 'edit' | 'view';

  IDPRODUIT!: number
  CodeProduit!: string
  LibelleProduit_Fr!: string
  Occasionnel!: boolean
  IDNIVEAU!: string
  IDBRANCHE!: string
  NumOrdre!: number
  Montant!: number
  ObligatoireInscription!: boolean
  DateEcheance!: string
  CompteAssocie!: string
  PrefixeCompteEleve!: string
  NouveauxEleves!: boolean
  ElevesInternes!: boolean
  AnciensEleves!: boolean
  AccepteReduction!: boolean
  AccepteMajoration!: boolean
  LiasseDebit!: string
  LiasseCredit!: string
  ReductionsFratrie!: string
  TauxTVA!: number
  ObligatoirePourDocuments!: boolean
  ElevesDemiPensionnaires!: boolean
  isLoading!: boolean;
  produitGetted!: any;
  niveauList!: Niveau[]
  brancheList!:Branche[]

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private ListefraisScolaireService:ListeFraisScolaireService,
    private niveauService:NiveauService,
    private brancheService:BrancheService,
    private globalService: GlobalService
  ) {}


  ngOnInit(): void {

    console.log(this.IDPRODUIT)

    if(this.IDPRODUIT){
      this.initForUpdate(this.IDPRODUIT)
    }
    this.loadniveau()
    this.loadbranche()
  }

  loadniveau(){
    this.niveauService.get().subscribe((data)=>{
      console.log(data)
      this.niveauList = data
    })
  }


  loadbranche(){
    this.brancheService.get().subscribe((data)=>{
      console.log(data)
      this.brancheList = data
    })
  }


  getniveauList(niveauID: string) {
    const niveau = this.niveauList.find((item) => item.IDNIVEAU === niveauID);
    return niveau ? niveau.NomNiveau : '';
  }


  getbrancheList(brancheID: string) {
    const branche = this.brancheList.find((item) => item.IDBRANCHE === brancheID);
    return branche ? branche.NomBranche : '';
  }

  convertToValideDate(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  initForUpdate(PRODUITID: number) {
    this.isLoading = true
    this.ListefraisScolaireService.getOne(PRODUITID).subscribe((data) => {
      console.log(data);
      this.isLoading = false;
      this.produitGetted = data;
      this.IDPRODUIT = data.IDPRODUIT
      this.CodeProduit = data.CodeProduit
      this.LibelleProduit_Fr = data.LibelleProduit_Fr
      this.Occasionnel = data.Occasionnel
      this.IDNIVEAU = this.getniveauList(data.IDNIVEAU)
      this.IDBRANCHE = this.getbrancheList(data.IDBRANCHE)
      this.NumOrdre = data.NumOrdre
      this.Montant = data.Montant
      this.ObligatoireInscription = data.ObligatoireInscription
      this.DateEcheance = this.convertToValideDate(data.DateEcheance)
      this.CompteAssocie = data.CompteAssocie
      this.PrefixeCompteEleve = data.PrefixeCompteEleve
      this.NouveauxEleves = data.NouveauxEleves
      this.ElevesInternes = data.ElevesInternes
      this.AnciensEleves = data.AnciensEleves
      this.AccepteReduction = data.AccepteReduction
      this.AccepteMajoration = data.AccepteMajoration
      this.LiasseDebit = data.LiasseDebit
      this.LiasseCredit = data.LiasseCredit
      this.ReductionsFratrie = data.ReductionsFratrie
      this.TauxTVA = data.TauxTVA
      this.ObligatoirePourDocuments = data.ObligatoirePourDocuments
      this.ElevesDemiPensionnaires = data.ElevesDemiPensionnaires
    });
  }


  onSubmitForm(form: NgForm) {
    const produit: ProduitListeFraisScolaire = form.value;
    produit.IDPRODUIT = this.IDPRODUIT
    produit.IDNIVEAU = this.produitGetted.IDNIVEAU
    produit.IDBRANCHE = this.produitGetted.IDBRANCHE
    this.isLoading = true;
    if (this.action === 'edit') {
      this.ListefraisScolaireService.update(produit).pipe(
        finalize(() => {
          this.isLoading = false
          this.dialog.closeAll()
          this.globalService.toastShow("Frais modifié avec succès !", "Modification")
          this.globalService.reloadComponent('/liste-frais-scolaire/list')
        })
      ).subscribe()
    }
}
}
