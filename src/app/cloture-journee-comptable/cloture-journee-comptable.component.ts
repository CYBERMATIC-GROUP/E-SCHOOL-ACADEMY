import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../core/alert/alert.component';
import { Caisse } from '../models/caisse.model';
import { CaisseService } from '../services/caisse.service';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';
import { Agent } from '../models/agent.model';
import { header } from '../models/header.model';

@Component({
  selector: 'app-cloture-journee-comptable',
  templateUrl: './cloture-journee-comptable.component.html',
  styleUrls: ['./cloture-journee-comptable.component.scss'],
})
export class ClotureJourneeComptableComponent {
  IDCAISSES_JOURS!: number;
  IDCAISSE!: number;
  dateComptable!: string;
  SoldeOuverture!: string;
  SoldeFermeture!: string;
  TotalVersements!: string;
  TotalRetraits!: string;
  Cloture!: boolean;
  titre!: string;

  CaisseList!: Caisse[];
  isLoading!: boolean;
  showTotalVersements!: boolean;
  isSoldeConfirmed!: boolean;
  isJourneeCloturee!: boolean;
  ReimprimeRecuLoading!:boolean

  isConfirmerSoldeDisabled!: boolean;
  isCloturerJourneeDisabled!: boolean;
  isDecloturerJourneeDisabled!: boolean;
  isReimprimerRapportDisabled!: boolean;
  agent!: Agent
  CaisseLibelle!: string;
  IDcaisseJours: any;
  receiveIdcaisseJourFormInfoCompte!: number;
  receiveIsClosedDay!: boolean;
  isJourneeDECloturee!:boolean
  IDcaisse: any;
  isCloture!: boolean;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public _location: Location,
    private caisseService: CaisseService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    const headrObj = localStorage.getItem(constantes.auth.header)
    const userObj = localStorage.getItem(constantes.auth.agent);
    if(userObj){
      this.agent = JSON.parse(userObj);
    }

    if(headrObj){
      const headr: header = JSON.parse(headrObj)
      if (headr.DATE_COMPTABLE){
        const dateStr = headr.DATE_COMPTABLE
        const formattedDate = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`;
        this.dateComptable = formattedDate
      }else{
        this.dateComptable = this.globalService.getCurrentDateForInput()
      }

      this.loadCaisse();
      this.intiFormatForCurentAgentLogged()
    }
  }

  onDateSelectedDebut(event: any) {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();
      if (selectedDate.getTime() > currentDate.getTime()) {
      const dialog = this.dialog.open(AlertComponent)
      dialog.componentInstance.content = "La date sélectionnée est ultérieure à la date d'aujourd'hui."
      dialog.afterClosed().subscribe((result)=>{
        this.globalService.reloadComponent("cloturejourneecomptable")
      })
    } else {
      this.dateComptable = event.target.value;
      console.log(this.dateComptable);
      this.intiFormatForCurentAgentLogged();
    }
  }


  intiFormatForCurentAgentLogged(){
    this.isLoading = true
    this.caisseService.getJourneeComptable(this.agent.CaisseAssociee, this.convertToValideDates(this.dateComptable)).subscribe(data => {
      console.log(this.convertToValideDates(this.dateComptable))
      console.log(data)
      if(data.length > 0){
        this.IDcaisseJours = data["0"].IDCAISSES_JOURS
        this.IDcaisse = data["0"].IDCAISSE
        this.SoldeOuverture = this.formatPrix(data['0'].SoldeOuverture);
        this.TotalVersements = this.formatPrix(data['0'].TotalVersements);
        this.TotalRetraits = this.formatPrix(data['0'].TotalRetraits);
        this.SoldeFermeture = this.formatPrix(data['0'].SoldeFermeture);
        this.CaisseLibelle = data['0'].LibelleCaisse;

        if (data['0'].Cloture === true) {
          this.titre = 'Journée clôturée.';
          this.isConfirmerSoldeDisabled = true;
          this.isDecloturerJourneeDisabled = false;
          this.isCloturerJourneeDisabled = true;
          this.isReimprimerRapportDisabled = false;
          this.isCloture = true;
        } else {
          this.titre = "Journée non clôturée.";
          this.isCloture = false;
          this.isConfirmerSoldeDisabled = false;
          this.isCloturerJourneeDisabled = false;
          this.isDecloturerJourneeDisabled = true;
          this.isReimprimerRapportDisabled = true;
        }

      }else{
        this.SoldeOuverture = '';
        this.TotalVersements = '';
        this.TotalRetraits = '';
        this.CaisseLibelle = '';

        this.globalService.toastShow("Aucune opération disponible pour cette date!", "Information:", "info")
      }
      this.isLoading = false;
    })

  }


  ClotureJournee() {
    const ref = this.globalService.alert("Voulez-vous clôturer la journée ? ", "Confirmation", "info", "ANNULER", "OUI")
    ref.afterClosed().subscribe(result => {

      if(result){
        this.isJourneeCloturee = true
        this.caisseService
          .ClotureDeclotureCaisse(this.IDcaisseJours,1).pipe(
            tap(data => {
              console.log(this.IDcaisseJours)
              console.log(data);
              this.globalService.reloadComponent("cloturejourneecomptable")
              this.globalService.toastShow("La journée a été cloturé  avec succès", "Succès", "success");
              var anchor = document.createElement('a');
              anchor.href = data.Etat;
              anchor.download = 'Fiche Clôturer journée caisse ';
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
            }),
            finalize(() => {
              this.isLoading = false;
              this.isJourneeCloturee = false
            })
          ).subscribe()
      }

    })
  }

  DeClotureJournee() {

    const ref = this.globalService.alert("Voulez-vous déclôturer la journée ? ", "Confirmation", "info", "ANNULER", "OUI")
    ref.afterClosed().subscribe(result => {
      if(result){
        this.isJourneeDECloturee = true
        this.caisseService
          .ClotureDeclotureCaisse(this.IDcaisseJours,0).pipe(
            tap(data => {
              console.log(data);
              this.globalService.reloadComponent("cloturejourneecomptable")
              this.globalService.toastShow("La journée a été decloturé  avec succès", "Succès", "success");
            }),
            finalize(() => {
              this.isJourneeDECloturee = false
            })
          ).subscribe()
      }
    })
  }



  formatPrix(prix: string, separateur: string = ' ', device: string = 'XAF') {
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

  toggleTotalVersements() {
    this.showTotalVersements = !this.showTotalVersements;
  }

  loadCaisse() {
    this.caisseService.get().subscribe(
      (data) => {
        console.log(data);
        this.CaisseList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  convertToValideDate(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  convertToValideDates(Date: string) {
    const year = Date.split('-')[0];
    const month = Date.split('-')[1];
    const day = Date.split('-')[2];
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }

  imprimer(){
    this.ReimprimeRecuLoading = true;
    console.log(this.dateComptable)
    this.caisseService
      .ImprimeclotureCaisse(this.IDcaisse, this.convertToValideDates(this.dateComptable))
      .subscribe((data) => {
        console.log(this.convertToValideDates(this.dateComptable))
        console.log(data);
        var anchor = document.createElement('a');
        anchor.href = data.Etat;
        anchor.download = 'Rapport de cloture de caisse';
        document.body.appendChild(anchor);
        //  anchor.click();
        let pdfWindow = window.open('', '_blank', 'Liste eleves');
        pdfWindow
          ? pdfWindow!.document.write(
              "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
                encodeURI(data.Etat) +
                "'></iframe></body>"
            )
          : null;
        this.ReimprimeRecuLoading = false;
      });
  }
}
