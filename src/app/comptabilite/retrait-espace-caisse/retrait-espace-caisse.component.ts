import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agent } from 'src/app/models/agent.model';
import { GlobalService } from 'src/app/services/global.service';
import { TypeCompte, constantes } from 'src/environnements/constantes';
import { Chart, ScatterController, PointElement } from 'chart.js';
import {
  compteModel,
  retraitCaisseEspece,
} from 'src/app/comptabilite/models/compte-banque.model';
import { Observable, finalize, tap } from 'rxjs';
import { CompteBancaireService } from 'src/app/comptabilite/services/compte-bancaire.service';
import { environment } from 'src/environnements/environnement.prod';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OperationsDiversesService } from 'src/app/services/operations-diverses.service';
import { CreateOperationDiversModel } from 'src/app/models/modelcreateOperationDivers.model';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { RetraitEspeceCaisse } from '../models/retraitespececaisse.model';
@Component({
  selector: 'app-retrait-espace-caisse',
  templateUrl: './retrait-espace-caisse.component.html',
  styleUrls: ['./retrait-espace-caisse.component.scss'],
})
export class RetraitEspaceCaisseComponent {
  @Input() action!: 'create' | 'edit' | 'view';
  @Input() IDMOUVEMENT!: number;

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
  soldeCompteSelcted!: String;
  Couleur!: string;
  compare: number = 0;
  titresoldecompteselected!: string;

  constructor(
    private formBuilder: FormBuilder,
    public globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private operationsDservice: OperationsDiversesService,
    private compteBanquaireService: CompteBancaireService
  ) {}

  ngOnInit(): void {
    const MOUVEMENTID = this.route.snapshot.params['IDMOUVEMENT'];
    this.action = this.route.snapshot.params['action'];

    const agentStore = localStorage.getItem(constantes.auth.agent);
    console.log(agentStore);
    if (agentStore) {
      this.agent = JSON.parse(agentStore);
    }
    this.comptes$ = this.compteBanquaireService.getComptes(
      TypeCompte.comptesCharge
    );
    this.comptesFsseur$ = this.compteBanquaireService.getComptes(
      TypeCompte.comptesFournisseurs
    );

    this.comptes$.subscribe((data) => {
      console.log(data);
    });
    this.comptesFsseur$.subscribe((data) => {
      console.log(data);
    });

    this.initRetraitForm();
    if (MOUVEMENTID) {
      this.IDMOUVEMENT = MOUVEMENTID;
      this.initFormUpdate(MOUVEMENTID);
    }
  }

  initFormUpdate(IDMOUVEMENT: number) {
    this.operationsDservice
      .getOneOperationDivers(IDMOUVEMENT)
      .subscribe((data) => {
        console.log(data);
        this.retraitForm.patchValue(data);
      });
  }

  isFormValid(): boolean {
    if (!this.retraitForm) {
      return false; // Le formulaire n'est pas initialisé
    }

    const Libelle = this.retraitForm.get('Libelle');
    const CompteFounisseur = this.retraitForm.get('CompteFounisseur');
    const Montant = this.retraitForm.get('Montant');

    // Vérifier si les champs sont remplis
    return (
      Libelle &&
      Libelle.value &&
      CompteFounisseur &&
      CompteFounisseur.value &&
      Montant &&
      Montant.value
    );
  }

  initRetraitForm() {
    if (this.agent) {
      this.currentDateFormat = this.globalService.getCurrentDateForInput();
      const dateFormat = this.globalService.convertToValideDates(
        this.currentDateFormat,
        ''
      );
      const option = (defaultVal: string | null = null) => {
        return [defaultVal, [Validators.required]];
      };
      this.retraitForm = this.formBuilder.group({
        Montant: [
          null,
          [Validators.required, Validators.pattern('^[0-9]{3,}')],
        ],
        Libelle: option(),
        CompteFounisseur: option(),
        compteChargeLibelleFsseur: option(),
      });
    }
  }

  OnSubmit() {
    const model: CreateOperationDiversModel = this.retraitForm.value;
    const modelSend: RetraitEspeceCaisse = {
      Montant: model.Montant,
      Libelle: model.Libelle,
      CodeCompte: model.CompteFounisseur,
    };
    console.log(modelSend);
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'info';
    ref.componentInstance.content =
      'Voulez vous validé cette opération ' + modelSend.Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      this.isLoading = true;
      if (result) {
        this.operationsDservice
          .RetraitEspeceCAISE(modelSend)
          .pipe(
            tap((data) => {
              console.log(data);
              this.impressionEtatRetraitEspeceCaisse(data)
              this.retraitForm.reset();
              this.soldeCompteSelcted = this.formatPrix('0');
              this.globalService.toastShow(
                'Votre opération a été crée avec succès',
                'succès'
              );
            }),
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe();
      }
    });
  }

  impressionEtatRetraitEspeceCaisse(resData: any) {
    const data = resData;
    console.log(data);
    
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
  }

  selectCompte(selectedCompte: any) {
    console.log(selectedCompte);
    this.titresoldecompteselected =
      'Solde de compte : ' + selectedCompte.LibelleCompte;
    if (selectedCompte.SoldeCompte <= 0) {
      this.compare = selectedCompte.SoldeCompte;
      this.Couleur = selectedCompte.Couleur;
      console.log(this.Couleur);
      this.soldeCompteSelcted = this.formatPrix('0');
    } else {
      this.Couleur = selectedCompte.Couleur;
      console.log(this.Couleur);
      this.soldeCompteSelcted = this.formatPrix(selectedCompte.SoldeCompte);
      console.log(this.soldeCompteSelcted);
    }
  }

  formatPrix(prix: String, separateur: string = ' ', device: string = 'XAF') {
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

    this.chart = new Chart(this.chartCanvas1.nativeElement, {
      type: 'bar',
      data: {
        labels: data.map((row) => row.mois),
        datasets: [
          {
            label: 'Retrait effectué par mois',
            data: data.map((row) => row.count),
            backgroundColor: 'rgba(123, 75, 206, 0.7)',
          },
        ],
      },
    });

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
