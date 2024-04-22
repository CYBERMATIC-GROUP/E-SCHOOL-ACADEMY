import { Component, OnInit } from '@angular/core';
import { Observable, finalize, map, of, switchMap, tap } from 'rxjs';
import { Agent } from '../models/agent.model';
import { Eleve } from '../models/eleve.model';
import { Enseigant } from '../models/enseigant.model';
import { SMSEnvoie } from '../models/eleve.model';
import { EleveService } from '../services/eleve.service';
import { AgentService } from '../services/agent.service';
import { EnseignantService } from '../services/enseignant.service';
import { Classe } from '../models/classe.model';
import { ClasseService } from '../services/classe.service';
import { GlobalService } from '../services/global.service';
import { environment } from 'src/environnements/environnement.prod';

@Component({
  selector: 'app-envois-sms',
  templateUrl: './envois-sms.component.html',
  styleUrls: ['./envois-sms.component.scss'],
})
export class EnvoisSmsComponent implements OnInit {
  message!:  string;
  tmpTableAgent$!: Observable<Agent[]>;
  tableauSmsAgent: SMSEnvoie[] = []
  tmpTableEleve$!: Observable<Eleve[]>;
  tableauSmsElevet: SMSEnvoie[] = []
  tmpTableEnseignant$!: Observable<Enseigant[]>;
  tableauSmsEnseignant: SMSEnvoie[] = []
  finalTableSms!: Observable<SMSEnvoie[]>;
  alertParents!: {name: string, type: number};
  parentTypeSelected!: number
  classes$!:  Observable<Classe[]>;
  displayedColumnsAgent = [
    "Fr_Nom",
    "Fr_Prenom",
    "cocher"
  ]
  displayedColumnsEleve = [
    ...this.displayedColumnsAgent,
    "CodeClasse"
  ]
  displayedColumnsFinal = [
    "Mobile",
    "Message"
  ]
  isLoading!: boolean;
  characterCount!: number;
  currentTabs!: 'agent' | 'enseignant' | 'eleve';

  constructor(
    private eleveService: EleveService,
    private agentService: AgentService,
    private enseignantService: EnseignantService,
    private classeService: ClasseService,
    public globalService: GlobalService
  ){}

  ngOnInit(): void {
      this.tmpTableAgent$ = this.agentService.getListeSimplifie()
      this.tmpTableEleve$ = this.eleveService.ListeSimplifieEnvoisSms(0, '0')
      this.tmpTableEnseignant$ = this.enseignantService.getLIistSimplifieEnseignant()
      this.classes$ = this.classeService.get();
  }

  onClassehange(event: any){
    this.tmpTableEleve$ = this.eleveService.ListeSimplifieEnvoisSms(0, event.target.value)
  }
  applyFilter(event: any, type: "eleve" | "enseignant" | "agent"){

  }

  onCheckAgent(event: any, agent: Agent){
    const isChecked = event.target.checked
    if(isChecked){
      if(this.message){
        if(!agent.TelMobile){
          this.globalService.alert("Aucun numéro fourni pour cet agent !", "Attention", "info", "", "OK")
          event.target.checked = false
        }else{
          this.tableauSmsAgent.push({Mobile: agent.TelMobile, Message: this.message, TypeDestinateur: environment.TypeUserConst.CST_TYPE_USER_AGENT})
        }
      }
      else{
        this.alertEmptyMsg()
        event.target.checked = false
      }
    }
    else{
      const eltFound = this.tableauSmsAgent.find(elt => elt.Mobile == agent.TelMobile)
      console.log(eltFound)
      if (eltFound){
        const oldIndex = this.tableauSmsAgent.indexOf(eltFound);
        this.tableauSmsAgent.splice(oldIndex, 1)
        this.finalTableSms = of(this.tableauSmsAgent)
      }
    }

    console.log(this.tableauSmsAgent)
  }


  onCheckEnseignant(event: any, enseignant: Enseigant){
    const isChecked = event.target.checked
    if(isChecked){
      if(this.message){
        if(!enseignant.TelMobile){
          this.globalService.alert("Aucun numéro fourni pour cet enseignant !", "Attention", "info", "", "OK")
          event.target.checked = false
        }else{
          this.tableauSmsEnseignant.push({Mobile: enseignant.TelMobile, Message: this.message, TypeDestinateur: environment.TypeUserConst.CST_TYPE_USER_ENSEIGNANT})
        }
      }
      else{
        this.alertEmptyMsg()
        event.target.checked = false
      }
    }
    else{
      const eltFound = this.tableauSmsEnseignant.find(elt => elt.Mobile == enseignant.TelMobile)
      if (eltFound){
        const oldIndex = this.tableauSmsEnseignant.indexOf(eltFound);
        this.tableauSmsEnseignant.splice(oldIndex, 1)
        this.finalTableSms = of(this.tableauSmsEnseignant)
      }
    }

    console.log(this.tableauSmsEnseignant)
  }

  onCheckEleve(event: any, eleve: Eleve){
    const isChecked = event.target.checked
    if(isChecked){
      if(this.message && this.parentTypeSelected){
        const telMobile = this.parentTypeSelected == 1 ? eleve.TelMobilePere : this.parentTypeSelected == 2 ? eleve.TelMobileMere : this.parentTypeSelected == 3 ? eleve.TelMobileTuteur : eleve.TelMobileEleve

        if(!telMobile){
          this.globalService.toastShow("Aucun numéro fourni pour cet enseignant !", "Attention", "error")
          event.target.checked = false
        }else{
          this.tableauSmsElevet.push({
            Mobile: telMobile,
            Message: this.message,
            TypeDestinateur: environment.TypeUserConst.CST_TYPE_USER_ENSEIGNANT
          })
          this.finalTableSms = of(this.tableauSmsElevet)
        }
      }
      else{
        this.alertEmptyMsg("Veuillez selectionner le type de destinataire et renseigner le message !")
        event.target.checked = false
      }
    }
    else{
      const telMobile = this.parentTypeSelected == 1 ? eleve.TelMobilePere : this.parentTypeSelected == 2 ? eleve.TelMobileMere : this.parentTypeSelected == 3 ? eleve.TelMobileTuteur : eleve.TelMobileEleve

      const eltFound = this.tableauSmsElevet.find(elt => elt.Mobile == telMobile)
      if (eltFound){
        const oldIndex = this.tableauSmsElevet.indexOf(eltFound);
        this.tableauSmsElevet.splice(oldIndex, 1)
        this.finalTableSms = of(this.tableauSmsElevet)
      }
    }

    console.log(this.tableauSmsElevet)
  }

  alertEmptyMsg(msg: string = ''){
    let m = msg.length > 0 ? msg : "Veuillez d'abord saisir le message !";
    this.globalService.toastShow(m, "Attention", "error")
  }

  addOnlist(type: 'agent' | 'enseignant' | 'eleve'){
    if(type == 'agent')
      this.finalTableSms = of(this.tableauSmsAgent)
    else if(type == 'eleve')
      this.finalTableSms = of(this.tableauSmsElevet)
    else if(type == 'enseignant')
      this.finalTableSms = of(this.tableauSmsEnseignant)
  }

  private addAllAgent() {
    let elts = document.getElementsByClassName('agent-check')
    this.finalTableSms = of([])
    this.finalTableSms = this.tmpTableAgent$.pipe(
      map(res => {
        let tableInit: SMSEnvoie[] = []
        res.forEach(agent => {
          if (agent.TelMobile)
            tableInit.push({Mobile: agent.TelMobile,  Message: this.message, TypeDestinateur: environment.TypeUserConst.CST_TYPE_USER_AGENT})
        });
        this.tableauSmsAgent = tableInit;

        //verif if agent has mobile
        for (let i = 0; i < elts.length; i++) {
          let element = elts[i] as HTMLInputElement
          if(res[i].TelMobile)
            element.checked = true
        }

        return tableInit
      })
    )
  }

  private addAllEnseignant(){
    let elts = document.getElementsByClassName('enseignant-check')
    this.finalTableSms = of([])
    this.finalTableSms = this.tmpTableEnseignant$.pipe(
      map(res => {
        let tableInit: SMSEnvoie[] = []
        res.forEach(enseignant => {
          if (enseignant.TelMobile)
            tableInit.push({Mobile: enseignant.TelMobile,  Message: this.message, TypeDestinateur: environment.TypeUserConst.CST_TYPE_USER_ENSEIGNANT})
        });
        this.tableauSmsEnseignant = tableInit;

        //verif if enseignnat has mobile
        for (let i = 0; i < elts.length; i++) {
          let element = elts[i] as HTMLInputElement
          if(res[i].TelMobile)
            element.checked = true
        }

        return tableInit
      })
    )
  }

  private getSMStableEleveByParentTypeChecked(eleves: Eleve[]): SMSEnvoie[]{
    let newTable: SMSEnvoie[] = []
    let mobileForCheckInput: string[] = []
    eleves.forEach(eleve => {
      const telMobile = this.parentTypeSelected == 1 ? eleve.TelMobilePere : this.parentTypeSelected == 2 ? eleve.TelMobileMere : this.parentTypeSelected == 3 ? eleve.TelMobileTuteur : eleve.TelMobileEleve
      mobileForCheckInput.push(telMobile)

      if (telMobile){
        newTable.push({
          Mobile: telMobile,
          Message: this.message,
          TypeDestinateur: environment.TypeUserConst.CST_TYPE_USER_ELEVE
        })
      }
    });

    //make checked typeParent with mobile
    let elts = document.getElementsByClassName('eleve-check')
    for (let i = 0; i < elts.length; i++) {
      let element = elts[i] as HTMLInputElement
      if(mobileForCheckInput[i])
          element.checked = true
    }


    return newTable;
  }

  private addAllEleve(){
    this.finalTableSms = of([])

    if(this.parentTypeSelected){
      this.finalTableSms = this.tmpTableEleve$.pipe(
        map(res => {
          let newTable: SMSEnvoie[] = this.getSMStableEleveByParentTypeChecked(res);

          this.tableauSmsElevet = [...this.tableauSmsElevet, ...newTable]

          return this.tableauSmsElevet
        })
      )
    }else{
      this.globalService.toastShow("Veuillez d'abord sélectionner le type de destinataire", "Information", "error")
    }
  }

  onAdAll(type: 'enseignant' | 'agent' | 'eleve'){
    if(this.message){
      if (type == 'agent'){
        this.addAllAgent()
      }
      else if (type == 'enseignant'){
        this.addAllEnseignant()
      }
      else if (type == 'eleve'){
        this.addAllEleve();
      }
    }else{
      this.alertEmptyMsg()
    }
  }

  uncheckAll(type: 'enseignant' | 'agent' | 'eleve'){
    if(type == 'agent'){
      let elts = document.getElementsByClassName('agent-check')
      for (let i = 0; i < elts.length; i++) {
        let element = elts[i] as HTMLInputElement
        element.checked = false
      }
      this.tableauSmsAgent = []
      this.finalTableSms = of([])
    }
    else if(type == 'enseignant'){
      let elts = document.getElementsByClassName('enseignant-check')
      for (let i = 0; i < elts.length; i++) {
        let element = elts[i] as HTMLInputElement
        element.checked = false
      }
      this.tableauSmsEnseignant = []
      this.finalTableSms = of([])
    }
    else if(type == 'eleve'){
      let elts = document.getElementsByClassName('eleve-check')
      for (let i = 0; i < elts.length; i++) {
        let element = elts[i] as HTMLInputElement
        element.checked = false
      }
      this.tableauSmsElevet = []
      this.finalTableSms = of([])
    }
  }

  onChange(event: any){
    this.parentTypeSelected = event.target.value
  }

  updateCharacterCount(event: any) {
    this.message = event.target.value;
    this.characterCount = this.message.length;
  }

  getMessageNumber(): number {
    return Math.ceil(this.characterCount / 160);
  }

  isMessageThresholdReached(): boolean {
    return this.characterCount > 0 && this.characterCount % 160 === 0;
  }
  getMessageThreshold(): number {
    const baseThreshold = Math.floor(this.characterCount / 160) * 160;
    return baseThreshold;
  }


  onSubmit(){
    this.isLoading = true;
    this.finalTableSms.pipe(
      switchMap(tableSMS => this.eleveService.sendsms(tableSMS)),
      finalize(() => {
        this.isLoading = false
      })
    ).subscribe()
  }
}
