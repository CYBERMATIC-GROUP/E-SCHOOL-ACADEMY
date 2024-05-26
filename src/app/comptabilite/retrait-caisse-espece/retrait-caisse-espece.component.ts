import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agent } from 'src/app/models/agent.model';
import { GlobalService } from 'src/app/services/global.service';
import { TypeCompte, constantes } from 'src/environnements/constantes';
import { Chart, ScatterController, PointElement } from 'chart.js';
import { compteModel, retraitCaisseEspece } from '../models/compte-banque.model';
import { Observable, finalize, tap } from 'rxjs';
import { CompteBancaireService } from '../services/compte-bancaire.service';
import { environment } from 'src/environnements/environnement.prod';

@Component({
  selector: 'app-retrait-caisse-espece',
  templateUrl: './retrait-caisse-espece.component.html',
  styleUrls: ['./retrait-caisse-espece.component.scss']
})
export class RetraitCaisseEspeceComponent implements OnInit {
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
    private compteBanquaireService: CompteBancaireService
  ){}

  ngOnInit(): void {
    const agentStore = localStorage.getItem(constantes.auth.agent)
    this.agent = agentStore ? JSON.parse(agentStore) : undefined;

    this.comptes$ = this.compteBanquaireService.getComptes(TypeCompte.comptesCharge);
    this.comptesFsseur$ = this.compteBanquaireService.getComptes(TypeCompte.comptesFournisseurs)
    this.comptes$.subscribe(data => {
      console.log(data)
    })

    this.comptesFsseur$.subscribe(data => {
      console.log(data)
    })
    this.initRetraitForm();
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
        DatailOperation: option(), 
        CompteFounisseur:  option(), 
        CompteCharge:  option(), 
        IDAGENT: option(this.agent.IDAGENT.toString()),
        Date: option(dateFormat),
        IDCAISSE:  option(this.agent.CaisseAssociee.toString()),
        compteChargeLibelle: option(),
        compteChargeLibelleFsseur: option(),
      })

      this.retraitForm.get('DatailOperation')?.valueChanges.subscribe(value => {
        this.retraitForm.get('Libelle')?.setValue(value);
      })
    }
  }

  askConfirm(){
    const ref = this.globalService.alert("Vous êtes sur le point d'effectuer un retrait de " + this.retraitForm.get('Montant')?.value + " XAF </br> Voulez-vous continuer ?", "Demande de confirmation !", "info", "Annuler", "OUI");

    ref.afterClosed().subscribe(resultat => {
      if(resultat){
        this.onValide();
      }
    })
  }

  onValide(){
    this.isLoading = true;
    console.log(this.retraitForm.value);
    const retrait: retraitCaisseEspece = this.retraitForm.value;
    this.compteBanquaireService.setRetraitCaisseEspece(retrait).pipe(
      tap(data => {
        console.log(data);
        this.impressionEtat(data)
        this.globalService.toastShow("Retrait effectué avec succes !", "Retrait caisse");
        const comptaRoutes = environment.routes.Comptabilite;
        this.globalService.reloadComponent(comptaRoutes.Base + '/' + comptaRoutes.links.retraitCaisseEspece);
      }),
      finalize(() => {
        this.isLoading = false
      })
    ).subscribe();
  }


  impressionEtat(resData: any) {
    const data = resData;
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
