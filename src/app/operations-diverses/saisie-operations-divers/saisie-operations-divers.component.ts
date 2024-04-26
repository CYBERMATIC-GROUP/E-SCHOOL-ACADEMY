import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agent } from 'src/app/models/agent.model';
import { GlobalService } from 'src/app/services/global.service';
import { TypeCompte, constantes } from 'src/environnements/constantes';
import { Chart, ScatterController, PointElement } from 'chart.js';
import { compteModel,retraitCaisseEspece } from 'src/app/comptabilite/models/compte-banque.model';
import { Observable, finalize, tap } from 'rxjs';
import { CompteBancaireService } from 'src/app/comptabilite/services/compte-bancaire.service';
import { environment } from 'src/environnements/environnement.prod';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OperationsDiversesService } from 'src/app/services/operations-diverses.service';
import { CreateOperationDiversModel } from 'src/app/models/modelcreateOperationDivers.model';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-saisie-operations-divers',
  templateUrl: './saisie-operations-divers.component.html',
  styleUrls: ['./saisie-operations-divers.component.scss']
})
export class SaisieOperationsDiversComponent {
  
  @Input() action!: 'create' | 'edit' | 'view';
  @Input() IDMOUVEMENT!: number

  retraitForm!: FormGroup;
  agent!: Agent | undefined;
  currentDateFormat!: string;
  @ViewChild('chartCanvas1') chartCanvas1!: ElementRef;
  @ViewChild('chartCanvas2') chartCanvas2!: ElementRef;
  title!: string;
  chart!: any;
  comptes$!: Observable<compteModel[]>;
  comptesFsseur$!: Observable<compteModel[]>;
  isLoading!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private operationsDservice: OperationsDiversesService,
    private compteBanquaireService: CompteBancaireService
  ){}


  ngOnInit(): void {

    const MOUVEMENTID = this.route.snapshot.params['IDMOUVEMENT'];
    this.action = this.route.snapshot.params['action'];
    

    const agentStore = localStorage.getItem(constantes.auth.agent)
    console.log(agentStore);
    if (agentStore) {
      this.agent = JSON.parse(agentStore);
  }
    this.comptes$ = this.compteBanquaireService.getComptes(TypeCompte.comptesCharge);
    this.comptesFsseur$ = this.compteBanquaireService.getComptes(TypeCompte.comptesFournisseurs)

    this.comptes$.subscribe(data => {console.log(data)})
    this.comptesFsseur$.subscribe(data => {console.log(data)})

    this.initRetraitForm();
    if (MOUVEMENTID) {
      this.IDMOUVEMENT = MOUVEMENTID
      this.initFormUpdate(MOUVEMENTID)
    }
  }

  initFormUpdate(IDMOUVEMENT: number){
    this.operationsDservice.getOneOperationDivers(IDMOUVEMENT).subscribe(data => {
      console.log(data);
      this.retraitForm.patchValue(data);
    })
  }

  isFormValid(): boolean {
    if (!this.retraitForm) {
      return false; // Le formulaire n'est pas initialisé
    }
  
    const Libelle = this.retraitForm.get('Libelle');
    const CompteFounisseur = this.retraitForm.get('CompteFounisseur');
    const CompteCharge = this.retraitForm.get('CompteCharge');
    const Montant = this.retraitForm.get('Montant');

    // Vérifier si les champs sont remplis
    return (
      Libelle && Libelle.value &&
      CompteFounisseur && CompteFounisseur.value &&
      CompteCharge && CompteCharge.value && Montant && Montant.value
    );
  }
  

  initRetraitForm(){
    if(this.agent){
      this.currentDateFormat = this.globalService.getCurrentDateForInput()
      const dateFormat = this.globalService.convertToValideDates(this.currentDateFormat, "");
      const option = (defaultVal: string | null = null) => {
        return [defaultVal, [Validators.required]]
      }
      this.retraitForm = this.formBuilder.group({
        Montant: [null, [Validators.required, Validators.pattern('^[0-9]{3,}')]],
        Libelle:  option(),
        CompteFounisseur:  option(), 
        CompteCharge:  option(), 
        compteChargeLibelleFsseur: option(),
        compteChargeLibelle: option(),
        NuMeroPiece: option(),
      })
    }
  }

  OnSubmit(){
    const model: CreateOperationDiversModel = this.retraitForm.value;
    console.log(model);
    if (this.action == 'edit') {
      const ref = this.dialog.open(AlertComponent);
      ref.componentInstance.type = 'danger';
      ref.componentInstance.content = 'Voulez vous modifié cette opération ' + model.Libelle + '?';
      ref.afterClosed().subscribe((result) => {
        if (result) {
          this.isLoading = true
          this.operationsDservice.UpdateOperationDivers(this.IDMOUVEMENT, model).pipe(
            tap(data => {
              console.log(data);
              this.globalService.reloadComponent('/journal/operations/divers');
              this.globalService.toastShow('Modification effectuée avec succès','succès')
            }),
            finalize(() => {
              this.isLoading = false;
            })
          ).subscribe()}
      });  
    }else{
      this.isLoading = true
      this.operationsDservice.CreateOperationsDivers(model).pipe(
        tap(data => {
          console.log(data);
          this.globalService.reloadComponent('/journal/operations/divers');
          this.globalService.toastShow('Votre opération a été crée avec succès','succès')
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe()
    }
  }

  ngAfterViewInit(): void {
    const data = [
      { mois: 'Octobre', count: 10 },
      { mois: 'Novembre', count: 20 },
      { mois: 'Decembre', count: 15 },
      { mois: 'Janvier', count: 25 },
      { mois: 'Fevrier', count: 22 },
      { mois: 'Mars', count: 30 },
      { mois: 'Avril', count: 28 },
    ];
  
    this.chart = new Chart(
      this.chartCanvas1.nativeElement,
      {
        type: 'bar',
        data: {
          labels: data.map(row => row.mois),
          datasets: [
            {
              label: 'Retrait effectué par mois',
              data: data.map(row => row.count),
              backgroundColor: 'rgba(123, 75, 206, 0.7)',
            }
          ]
        }
      }
    );
  
    const chart = new Chart(this.chartCanvas2.nativeElement, {
      type: 'scatter',
      data: {
        datasets: [
          {
            data: [
              { x: 0, y: 0, r: 10 }, // Coordonnées du bulbe
              { x: 0, y: 10, r: 200 }, // Premier point
              { x: 5, y: 5, r: 15 }, // Deuxième point
              { x: -5, y: -5, r: 20 },
            ],
            pointBackgroundColor: 'rgba(255, 0, 0, 0.5)', // Couleur de remplissage du bulbe
            pointBorderWidth: 1, // Largeur de la bordure du bulbe
            pointBorderColor: 'rgba(255, 0, 0, 1)', // Couleur de la bordure du bulbe
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            min: -20,
            max: 20,
          },
          y: {
            type: 'linear',
            min: -20,
            max: 20,
          },
        },
      },
    });
  }

}
