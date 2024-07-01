import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agent } from 'src/app/models/agent.model';
import { GlobalService } from 'src/app/services/global.service';
import { TypeCompte, constantes } from 'src/environnements/constantes';
import { Chart, ScatterController, PointElement } from 'chart.js';
import {
  compteModel,
  retraitCaisseEspece,
} from '../models/compte-banque.model';
import { Observable, finalize, tap } from 'rxjs';
import { CompteBancaireService } from '../services/compte-bancaire.service';
import { environment } from 'src/environnements/environnement.prod';
import { modelRetraitAvanceSalaire } from 'src/app/models/retraitAvanceSalaire.model';
import { AgentService } from 'src/app/services/agent.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { RouteConfigLoadStart, RouteReuseStrategy, Router } from '@angular/router';

@Component({
  selector: 'app-retrait-caisse-espece-avance-salaire',
  templateUrl: './retrait-caisse-espece-avance-salaire.component.html',
  styleUrls: ['./retrait-caisse-espece-avance-salaire.component.scss'],
})
export class RetraitCaisseEspeceAvanceSalaireComponent {
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
  compteSlected!: any;
  MontantRestant!: number;
  MontantSaisie!: number;
  constructor(
    private formBuilder: FormBuilder,
    private agentService: AgentService,
    private dialog: MatDialog,
    private router : Router,
    public globalService: GlobalService,
    private compteBanquaireService: CompteBancaireService
  ) {}

  @ViewChild('montantInput', { static: false }) montantInput!: ElementRef;

  ngOnInit(): void {
    this.ElementsStorage();
  }

  ElementsStorage() {
    const elementSelectedStr = localStorage.getItem('elementSelected');
    if (elementSelectedStr) {
      const elementSelected = JSON.parse(elementSelectedStr);
      this.compteSlected = elementSelected;
      console.log(this.compteSlected);
    }
    const MontantRestantStr = localStorage.getItem('MontantRestant');
    if (MontantRestantStr) {
      const elementSelected = JSON.parse(MontantRestantStr);
      console.log(MontantRestantStr);
      this.MontantRestant = elementSelected;
      console.log(this.MontantRestant);
    }
  }

  AvanceSalaire() {
    this.isLoading = true
    const model: modelRetraitAvanceSalaire = {
      IDAVENCE: this.compteSlected.IDAVANCE,
      CodeCompte: this.compteSlected.CodeCompte,
      MontantAvance: this.MontantSaisie,
    };
    console.log(model);
    this.agentService.retraitCaisseAvanceSalaire(model).subscribe((data) => {
      console.log(data.body.Etat);
      this.MontantRestant = this.MontantRestant-this.MontantSaisie
      console.log(this.MontantRestant);
      this.isLoading = false
      this.router.navigateByUrl('/avance-salaire')
      this.globalService.toastShow('Retrait effectué avec succès', 'succès');
      this.imprimer(data);
    });
  }

  imprimer(data: any) {
    this.isLoading = true;
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
    this.isLoading = false;
  }

  MantantAretirer(event: any) {
    const value = Number(event.target.value);
    console.log(value);
    if (value > this.MontantRestant) {
      const dialog = this.dialog.open(AlertComponent);
      dialog.componentInstance.content =
        "Attention le montant saisie ne doit être supérieur à l'avance maximale à retiré";
      // Réinitialiser le champ de saisie
      this.montantInput.nativeElement.value = '';
    } else {
      this.MontantSaisie = value;
    
      
    }
  }
  ngAfterViewInit() {
    if (this.montantInput) {
      // Votre code pour interagir avec l'élément
      console.log(this.montantInput.nativeElement);
    } else {
      console.error('montantInput is not defined');
    }
  }
  // ngAfterViewInit(): void {
  //   const data = [
  //     { mois: 'Octobre', count: 10 },
  //     { mois: 'Novembre', count: 20 },
  //     { mois: 'Decembre', count: 15 },
  //     { mois: 'Janvier', count: 25 },
  //     { mois: 'Fevrier', count: 22 },
  //     { mois: 'Mars', count: 30 },
  //     { mois: 'Avril', count: 28 },
  //   ];

  //   this.chart = new Chart(this.chartCanvas1.nativeElement, {
  //     type: 'bar',
  //     data: {
  //       labels: data.map((row) => row.mois),
  //       datasets: [
  //         {
  //           label: 'Retrait effectué par mois',
  //           data: data.map((row) => row.count),
  //           backgroundColor: 'rgba(123, 75, 206, 0.7)',
  //         },
  //       ],
  //     },
  //   });

  //   const chart = new Chart(this.chartCanvas2.nativeElement, {
  //     type: 'scatter',
  //     data: {
  //       datasets: [
  //         {
  //           data: [
  //             { x: 0, y: 0, r: 10 }, // Coordonnées du bulbe
  //             { x: 0, y: 10, r: 200 }, // Premier point
  //             { x: 5, y: 5, r: 15 }, // Deuxième point
  //             { x: -5, y: -5, r: 20 },
  //           ],
  //           pointBackgroundColor: 'rgba(255, 0, 0, 0.5)', // Couleur de remplissage du bulbe
  //           pointBorderWidth: 1, // Largeur de la bordure du bulbe
  //           pointBorderColor: 'rgba(255, 0, 0, 1)', // Couleur de la bordure du bulbe
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         x: {
  //           type: 'linear',
  //           min: -20,
  //           max: 20,
  //         },
  //         y: {
  //           type: 'linear',
  //           min: -20,
  //           max: 20,
  //         },
  //       },
  //     },
  //   });
  // }
}
