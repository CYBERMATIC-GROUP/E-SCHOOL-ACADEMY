import { DatePipe, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Agent } from 'src/app/models/agent.model';
import { header } from 'src/app/models/header.model';
import { CaisseService } from 'src/app/services/caisse.service';
import { GlobalService } from 'src/app/services/global.service';
import { constantes } from 'src/environnements/constantes';

@Component({
  selector: 'app-info-compta-agent',
  templateUrl: './info-compta-agent.component.html',
  styleUrls: ['./info-compta-agent.component.scss']
})
export class InfoComptaAgentComponent implements OnInit {
  dateComptable!: string;
  SoldeOuverture!: string;
  TotalVersements!: string;
  TotalRetraits!: string;
  CaisseLibelle!: string;
  SoldeCompte!: string;
  SoldeFermeture!: string;
  agent!: Agent;
  isLoading!: boolean;
  @Output() dateComptableEmitted = new EventEmitter<string>();
  @Output() IDCaisseJourEmitted = new EventEmitter<number>();
  @Output() isClosedDayEmitted = new EventEmitter<boolean>();
  dateComptableForHuman!: string | null;
  @Input() isDialog!: boolean;

  constructor(
    private caisseService: CaisseService,
    private globalService: GlobalService,
    private datePipe: DatePipe,
    private router: Router,
    private _location: Location
  ){}

  ngOnInit(): void {
      const headrObj = localStorage.getItem(constantes.auth.header)
      if(headrObj){
        const headr: header = JSON.parse(headrObj)
        if (headr.DATE_COMPTABLE){
          const dateStr = headr.DATE_COMPTABLE
          const formattedDate = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`;
          console.log(dateStr);
          
          this.dateComptable = dateStr
        }
        else{
          this.dateComptable = this.globalService.getCurrentDateForInput()
        }
        this.dateComptableForHuman = this.datePipe.transform(this.dateComptable, 'dd MMMM yyyy')
        this.initInfoCompte();
      }
  }

  emitCaisseDay(newIdCaisse: number){
    this.IDCaisseJourEmitted.emit(newIdCaisse)
  }

  emitIsClosed(isClosed: boolean){
    this.isClosedDayEmitted.emit(isClosed)
  }

  emitValue(newDate: string) {
    this.dateComptableEmitted.emit(newDate);
  }

  initInfoCompte(){
    this.isLoading = true;
    const agentObj = localStorage.getItem(constantes.auth.agent)
    if(agentObj){
      this.agent = JSON.parse(agentObj);
      const dateFormat = this.globalService.convertToValideDates(this.dateComptable)
      this.emitValue(dateFormat)
      if(this.agent.CaisseAssociee > 0){
        this.caisseService.getJourneeComptable(this.agent.CaisseAssociee, dateFormat).subscribe(data => {
          if(data.length > 0){
            console.log(data);

            this.SoldeOuverture = this.globalService.formatPrix(data['0'].SoldeOuverture);
            this.SoldeFermeture = this.globalService.formatPrix(data['0'].SoldeFermeture);
            this.TotalVersements = this.globalService.formatPrix(data['0'].TotalVersements);
            this.TotalRetraits = this.globalService.formatPrix(data['0'].TotalRetraits);
            this.CaisseLibelle = data['0'].LibelleCaisse;
            this.emitCaisseDay(data['0'].IDCAISSES_JOURS)
            this.emitIsClosed(data['0'].Cloture)
          }else{
            this.SoldeOuverture = '';
            this.TotalVersements = '';
            this.TotalRetraits = '';
            this.CaisseLibelle = '';
            this.SoldeFermeture = '';

            this.globalService.toastShow('Aucune operation comptable disponible pour cette date', "Journée comptable du " + this.dateComptable + ":", "info");
          }

          this.isLoading = false
        })
      }else{
        this.globalService.alert("Ce compte n'a aucune caisse associée !", "Attention", "danger", "", "OK");
        this._location.back();
      }
    }
  }

  onChangeDateDebut(event: any) {
    this.dateComptable = event.target.value;
    this.initInfoCompte()
  }

}
