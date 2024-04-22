import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Agent } from 'src/app/models/agent.model';
import { Router, NavigationEnd } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { constantes } from 'src/environnements/constantes';
import { Ecole,schoolLogin } from 'src/app/models/ecole.model';
import { MatDialog } from '@angular/material/dialog';
import { Eleve } from 'src/app/models/eleve.model';
import { InfoComptaAgentComponent } from 'src/app/comptabilite/info-compta-agent/info-compta-agent.component';
import { environment } from 'src/environnements/environnement.prod';

@Component({
  selector: 'app-gabarit-parent',
  templateUrl: './gabarit-parent.component.html',
  styleUrls: ['./gabarit-parent.component.scss']
})
export class GabaritParentComponent {
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
  routesEleve = environment.routes.Eleve.espaceEleve
  parent: any;

  constructor (
    public _location:Location,
    private router:Router,
    private globalService: GlobalService,
    private dialog: MatDialog
  ){this.currentRoute = this.router.url;}

  agent!: Agent
  ecoleInfo!:Ecole


  ngOnInit(): void {
    //  const agentObj = localStorage.getItem(constantes.auth.agent);
      // const school = localStorage.getItem(constantes.auth.school);
    //  const eleveObj = localStorage.getItem(constantes.auth.eleve)
    const parentObj = localStorage.getItem(constantes.auth.parent)

     if (parentObj) {
       this.parent = JSON.parse(parentObj)
       console.log(this.parent);
     }

    //  if(agentObj){
    //    this.agent = JSON.parse(agentObj);
    //  }
     
    //  else if(eleveObj){
    //    this.eleve = JSON.parse(eleveObj);
    //    console.log(this.eleve)
    //  }

      // if(school)
      //   this.school = JSON.parse(school)
      //  console.log(this.school);
       
      // this.onChangeRoute();


    //  const HeaderEcole = localStorage.getItem(constantes.auth.header);
    //  if(HeaderEcole){
    //    this.ecoleInfo = JSON.parse(HeaderEcole); 
    //    console.log(this.ecoleInfo)
    //  }
  }

  logout(){
    const ref = this.globalService.alert("Voulez-vous vous déconnecter ?", "Confirmation", "info", "Annuler", "OUI");
    ref.afterClosed().subscribe(result => {
      if(result)
        this.globalService.logoutParent();
    })
  }

  refreshData(){
    this.globalDataIsLoadin = true;
    this.dataText = 'Actualisation en cours'
    //call from global service to refresh all data
    this.globalService.intParamVersListForCache().subscribe(res => {
      this.globalService.toastShow("Données actualisées avec succès !", "Actualisation ");
      this.globalDataIsLoadin = false;
      this.dataText = 'Rafraichir les donnees';
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
