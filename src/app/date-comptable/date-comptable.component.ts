import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { constantes } from 'src/environnements/constantes';
import { AlertComponent } from '../core/alert/alert.component';
import { Agent } from '../models/agent.model';
import { Caisse } from '../models/caisse.model';
import { CaisseService } from '../services/caisse.service';
import { GlobalService } from '../services/global.service';
import { header } from '../models/header.model';

@Component({
  selector: 'app-date-comptable',
  templateUrl: './date-comptable.component.html',
  styleUrls: ['./date-comptable.component.scss']
})
export class DateComptableComponent {
  IDCAISSES_JOURS!: number;
  IDCAISSE!: number;
  Date!: string;
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
  isDisable: boolean = true;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private caisseService: CaisseService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    const headrObj = localStorage.getItem(constantes.auth.header)
    if(headrObj){
      const headr: header = JSON.parse(headrObj)
      if (headr.DATE_COMPTABLE){
        const dateStr = headr.DATE_COMPTABLE;
        const formattedDate = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`;
        this.Date = dateStr
      }else{
        this.Date = this.globalService.getCurrentDateForInput()
      }
    }
    const userObj = localStorage.getItem(constantes.auth.agent);
    if(userObj){
      this.agent = JSON.parse(userObj);
    }


    if(this.Date)
      this.intiFormatForCurentAgentLogged(this.Date)
    else
      console.error("No date comptable found to get info-comptable");
  }

  onDateSelectedDebut(event: any) {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();
      if (selectedDate.getTime() > currentDate.getTime()) {
      const msg = "La date sélectionnée est ultérieure à la date d'aujourd'hui.";
      this.globalService.toastShow(msg, "Erreur", "error")
      this.isDisable = true
    } else {
      this.isDisable = false
      this.Date = event.target.value;
      //this.intiFormatForCurentAgentLogged();
    }
  }

  convertToValideDates(Date: string) {
    const year = Date.split('-')[0];
    const month = Date.split('-')[1];
    const day = Date.split('-')[2];
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }

  onValideDate(){
    const ref = this.globalService.alert("Toutes les prochaines opérations comptables seront ajoutées à la date sélectionnée. </br> Voulez-vous continuer ❓", "Attention❗ modification de la date comptable:", "info", "ANNULER", "OUI")

    ref.afterClosed().subscribe(result => {
      if(result){
        const objHead = localStorage.getItem(constantes.auth.header)
        if (objHead){
          const headr: header = JSON.parse(objHead)
          headr.DATE_COMPTABLE = this.Date
          console.log(headr.DATE_COMPTABLE);
          localStorage.setItem(constantes.auth.header, JSON.stringify(headr))
          this.globalService.reloadComponent('/configuration/date-comptable')
          this.globalService.toastShow("Date comptable modifiée avec succès!", "Modification éffective")
        }
      }
    })
  }


  intiFormatForCurentAgentLogged(dateComptable: string){
    this.isLoading = true
    const dateFormatted = this.convertToValideDates(dateComptable)
    this.caisseService.getJourneeComptable(this.agent.CaisseAssociee, dateFormatted).subscribe(data => {
      console.log(this.convertToValideDates(this.Date))
      console.log(data)

      if(data.length > 0){
        this.IDcaisseJours = data["0"].IDCAISSES_JOURS
        this.IDcaisse = data["0"].IDCAISSE
        this.SoldeOuverture = this.globalService.formatPrix(data['0'].SoldeOuverture);
        this.TotalVersements = this.globalService.formatPrix(data['0'].TotalVersements);
        this.TotalRetraits = this.globalService.formatPrix(data['0'].TotalRetraits);
        this.SoldeFermeture = this.globalService.formatPrix(data['0'].SoldeFermeture);
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
}
