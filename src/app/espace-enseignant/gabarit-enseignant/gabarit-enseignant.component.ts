import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { InfoComptaAgentComponent } from 'src/app/comptabilite/info-compta-agent/info-compta-agent.component';
import { Agent } from 'src/app/models/agent.model';
import { schoolLogin, Ecole } from 'src/app/models/ecole.model';
import { Eleve } from 'src/app/models/eleve.model';
import { Enseigant } from 'src/app/models/enseigant.model';
import { GlobalService } from 'src/app/services/global.service';
import { constantes } from 'src/environnements/constantes';
import { environment } from 'src/environnements/environnement.prod';

@Component({
  selector: 'app-gabarit-enseignant',
  templateUrl: './gabarit-enseignant.component.html',
  styleUrls: ['./gabarit-enseignant.component.scss']
})
export class GabaritEnseignantComponent {
  currentRoute!: string;
  @Input() pageTitle!: string;
  @Input() showBtnStateCaisse!: boolean;
  @Input() headButtonIsShowing: boolean = true
  globalDataIsLoadin!: boolean;
  dataText = 'Rafraichir les donnees';
  currentPath!: string;
  school!: schoolLogin
  menuIsShow!: boolean;
  enseignant!:Enseigant
  routesEnseignant = environment.routes.Enseignant

  constructor (
    public _location: Location,
    private router:Router,
    private globalService: GlobalService,
    private dialog: MatDialog
  ){this.currentRoute = this.router.url;}

  agent!: Agent
  ecoleInfo!:Ecole


  ngOnInit(): void {
    const enseignantObj = localStorage.getItem(constantes.auth.enseignant);
    const school = localStorage.getItem(constantes.auth.school);

    if(enseignantObj){
      this.enseignant = JSON.parse(enseignantObj);
    }

    if(school)
      this.school = JSON.parse(school)

    this.onChangeRoute();


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
