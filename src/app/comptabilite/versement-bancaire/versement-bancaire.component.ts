import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, finalize, tap } from 'rxjs';
import { Agent } from 'src/app/models/agent.model';
import { GlobalService } from 'src/app/services/global.service';
import { constantes } from 'src/environnements/constantes';
import { environment } from 'src/environnements/environnement.prod';
import { CompteBancaire } from '../models/compte-banque.model';
import { CompteBancaireService } from '../services/compte-bancaire.service';
import { retrait } from '../models/transfert-bancaire-caise.model';
import { CaisseService } from 'src/app/services/caisse.service';

@Component({
  selector: 'app-versement-bancaire',
  templateUrl: './versement-bancaire.component.html',
  styleUrls: ['./versement-bancaire.component.scss']
})
export class VersementBancaireComponent implements OnInit {

  agent!: Agent;
  versementForm!: FormGroup;
  banqueList$!: Observable<CompteBancaire[]>;
  dataSource!: any;
  banqueIsLoading!: boolean;
  displayedColumns = [
    'CodeCompte',
    'Libelle',
    'Solde',
    'Action'
  ]
  isLoading!: boolean;
  SoldeOuverture!: string;
  TotalVersements!: string;
  TotalRetraits!: string;
  CaisseLibelle!: string;
  DateComptable!: string
  compteIsLoading!: boolean;
  totalSolde!: number

  constructor(
    private formBuilder: FormBuilder,
    private banqueService: CompteBancaireService,
    public globalService: GlobalService,
    private caisseService: CaisseService
  ){}

  ngOnInit(): void {
    this.DateComptable = this.globalService.getCurrentDateForInput()
    this.initForm();
    this.banqueList$ = this.banqueService.getCompteBanque();
    this.initBanque();
    this.intiFormatForCurentAgentLogged();
  }

  onTransfert(){
    this.isLoading = true;
    const versement: retrait = this.versementForm.value;

    console.log(versement);

    this.banqueService.setVersement(versement).pipe(
      tap(data => {
        this.isLoading = false
        this.globalService.toastShow("Versement effectué avec succès !", "Versement bancaire");
        //reload component
        const routes = environment.routes.Comptabilite
        const uri = routes.Base + '/' + routes.links.transfertIntercaisseEtBancaire.base + '/' + routes.links.transfertIntercaisseEtBancaire.versementBancaire;
        this.globalService.reloadComponent(uri)
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();
  }

  initBanque(){
    this.banqueIsLoading = true;
    this.banqueService.getCompteBanque().subscribe(data => {
      this.banqueIsLoading = false;
      this.dataSource = new MatTableDataSource(data)
      const totalSolde = this.globalService.totalCol(data, 'Solde');
      this.totalSolde = totalSolde ? totalSolde : 0;
    })
  }

  initForm(){
    this.versementForm = this.formBuilder.group({
      Montant: [null, Validators.required], 
      Libelle: [null, Validators.required], 
      CodeCompte: [null, Validators.required],
      CompteDebit: [null, Validators.required],
      CompteCredit: [null, Validators.required],
      IDCAISSE:[null, Validators.required]
    });

    const objAgent = localStorage.getItem(constantes.auth.agent)

    if(objAgent){
      const agent: Agent = JSON.parse(objAgent);
      this.agent = agent;
      //this.versementForm.get('CompteDebit')?.setValue(agent.CompteDebit);
      this.versementForm.get('IDCAISSE')?.setValue(agent.CaisseAssociee);
    }
  }

  checkBanque(banque: CompteBancaire){
    this.versementForm.get('CompteDebit')?.setValue(banque.CodeCompte);
    this.versementForm.get('CodeCompte')?.setValue(banque.CodeCompte);
  }

  intiFormatForCurentAgentLogged(){
    this.compteIsLoading = true
    const dateFormat = this.globalService.convertToValideDate(this.DateComptable)
    this.caisseService.getHistoriqueClotureCaisse(this.agent.CaisseAssociee, dateFormat, dateFormat).subscribe(data => {
      console.log(data)
      this.SoldeOuverture = this.globalService.formatPrix(Number(data['0'].SoldeOuverture));
      this.TotalVersements = this.globalService.formatPrix(Number(data['0'].TotalVersements));
      this.TotalRetraits = this.globalService.formatPrix(Number(data['0'].TotalRetraits));
      this.CaisseLibelle = data['0'].LibelleCaisse;

      this.compteIsLoading = false;
    })
  }

}
