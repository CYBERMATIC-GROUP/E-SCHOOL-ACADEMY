import { Component, Input, OnInit } from '@angular/core';
import { Agent } from '../models/agent.model';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';
import { Ecole, schoolLogin } from '../models/ecole.model';
import { MatDialog } from '@angular/material/dialog';
import { InfoComptaAgentComponent } from '../comptabilite/info-compta-agent/info-compta-agent.component';
import { Eleve } from '../models/eleve.model';
import { environment } from 'src/environnements/environnement.prod';
import { Ecoleervice } from '../services/ecole.service';
import { Observable, tap } from 'rxjs';
import { AgentService } from '../services/agent.service';


@Component({
  selector: 'app-gabarit',
  templateUrl: './gabarit.component.html',
  styleUrls: ['./gabarit.component.scss']
})
export class GabaritComponent implements OnInit {

  currentRoute!: string;
  @Input() pageTitle!: string;
  @Input() showBtnStateCaisse!: boolean;
  @Input() headButtonIsShowing: boolean = true
  globalDataIsLoadin!: boolean;
  dataText = 'Rafraichir les donnees';
  currentPath!: string;
  school!: schoolLogin
  menuIsShow!: boolean;
  eleve!: Eleve
  routesEleve = environment.routes.Eleve.espaceEleve;
  logoEcole!: string | null;

  constructor (
    public _location:Location,
    private router:Router,
    private globalService: GlobalService,
    private dialog: MatDialog,
    private schoolService: Ecoleervice,
    private agentService: AgentService,
  ){this.currentRoute = this.router.url;}

  agent!: Agent
  ecoleInfo!:Ecole

  ngOnInit(): void {
    const agentObj = localStorage.getItem(constantes.auth.agent);
    const school = localStorage.getItem(constantes.auth.school);
    const eleveObj = localStorage.getItem(constantes.auth.eleve)

    if(agentObj){
      this.agent = JSON.parse(agentObj);
    }else if(eleveObj){
      this.eleve = JSON.parse(eleveObj);
    }

    if(school){
      this.logoEcole = localStorage.getItem('logostore')
      this.school = JSON.parse(school);

      if (!this.logoEcole){
        this.schoolService.getLogo().pipe(
          tap(res => {
            this.logoEcole = res.Photo
            localStorage.setItem('logostore', res.Photo)
          })
        ).subscribe()
      }
    }

    this.onChangeRoute();

    const agentAuth = localStorage.getItem(constantes.auth.agent);
    if(agentAuth){
      this.agent = JSON.parse(agentAuth);
      console.log(this.agent)
    }

    const HeaderEcole = localStorage.getItem(constantes.auth.header);
    if(HeaderEcole){
      this.ecoleInfo = JSON.parse(HeaderEcole);
      console.log(this.ecoleInfo)
    }
  }

  logout(){
    const ref = this.globalService.alert("Voulez-vous vous déconnecter ?", "Confirmation", "info", "Annuler", "OUI");
    ref.afterClosed().subscribe(result => {
      if(result)
        this.globalService.logout();
    })
  }

  refreshData(){
    this.globalDataIsLoadin = true;
    this.dataText = 'Actualisation en cours'
    //call from global service to refresh all data
    this.globalService.intParamVersListForCache().subscribe(res => {
      this.dataText = 'Rafraichir les donnees';
          //replace storage
      if(this.agent){
        this.agentService.getOne(this.agent.IDAGENT).subscribe(data => {
          localStorage.setItem(constantes.auth.agent, JSON.stringify(data));
          //reload component
          console.log(data);

          this.globalService.reloadComponent(this.router.url);
          this.globalDataIsLoadin = false;
          this.globalService.toastShow("Données actualisées avec succès !", "Actualisation ");
        })
      }
    })
  }

  onChangeRoute(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.urlAfterRedirects;
      }
      this.globalService.checkOverflow();
    });
  }

  showCaisse(){
    const ref = this.dialog.open(InfoComptaAgentComponent)
    ref.componentInstance.isDialog = true;
  }

}
