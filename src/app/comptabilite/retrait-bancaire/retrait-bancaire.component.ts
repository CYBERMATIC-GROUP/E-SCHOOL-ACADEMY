import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompteBancaire } from '../models/compte-banque.model';
import { Observable, finalize, tap } from 'rxjs';
import { CompteBancaireService } from '../services/compte-bancaire.service';
import { constantes } from 'src/environnements/constantes';
import { MatTableDataSource } from '@angular/material/table';
import { retrait } from '../models/transfert-bancaire-caise.model';
import { Agent } from 'src/app/models/agent.model';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environnements/environnement.prod';

@Component({
  selector: 'app-retrait-bancaire',
  templateUrl: './retrait-bancaire.component.html',
  styleUrls: ['./retrait-bancaire.component.scss']
})
export class RetraitBancaireComponent implements OnInit {
  agent!: Agent;
  retraitForm!: FormGroup;
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
  totalSolde!: number;

  constructor(
    private formBuilder: FormBuilder,
    private banqueService: CompteBancaireService,
    public globalService: GlobalService
  ){}

  ngOnInit(): void {
    this.initForm();
    this.banqueList$ = this.banqueService.getCompteBanque();
    this.initBanque();
  }

  onTransfert(){
    this.isLoading = true;
    const retrait: retrait = this.retraitForm.value;

    console.log(retrait);

    this.banqueService.setRetrait(retrait).pipe(
      tap(res => {
        this.isLoading = false
        this.globalService.toastShow("Retrait validé", "Retrait bancaire");
        //reload component
        const routes = environment.routes.Comptabilite
        const uri = routes.Base + '/' + routes.links.transfertIntercaisseEtBancaire.base + '/' + routes.links.transfertIntercaisseEtBancaire.retraitsBancaire;
        this.globalService.reloadComponent(uri)
      }),
      finalize(() => {
        this.isLoading = false
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
    this.retraitForm = this.formBuilder.group({
      Montant: [null, Validators.required], 
      Libelle: [null, Validators.required], 
      CodeCompte: [{value: ''}, Validators.required],
      CompteDebit: [null, Validators.required],
      CompteCredit: [null, Validators.required],
      IDCAISSE:[null, Validators.required]
    });

    const objAgent = localStorage.getItem(constantes.auth.agent)

    if(objAgent){
      const agent: Agent = JSON.parse(objAgent);
      this.agent = agent;
      //this.retraitForm.get('CodeCompte')?.setValue(agent.Code);
      this.retraitForm.get('IDCAISSE')?.setValue(agent.CaisseAssociee);
    }
  }

  checkBanque(banque: CompteBancaire){
    this.retraitForm.get('CompteCredit')?.setValue(banque.CodeCompte);
    this.retraitForm.get('CodeCompte')?.setValue(banque.CodeCompte);
    console.log(this.retraitForm.value)
  }

  handleValue(event: string){
    //this.formTransfert.get('Date')?.setValue(event);
  }

}
