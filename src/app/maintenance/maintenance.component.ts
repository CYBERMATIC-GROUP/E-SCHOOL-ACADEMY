import { Component } from '@angular/core';
import { MaintenanceService } from '../services/maintenance.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent {

  title!: string;
  typeMenuID!: number;
  isloading!: boolean


  constructor(
    private maintenaceService : MaintenanceService,
    private globalService : GlobalService
  ){}

  menus!: {
    desination: string,
    logo: string,
    description: string,
    backColor: string,
    link?: string,
    isloading: boolean 
  }[];

  ngOnInit(): void {
      this.initMenusForImpression()
  }

  initMenusForImpression(){
    this.menus = [
      {
        desination: "Frais Scolaire",
        logo: "Certificat.png",
        description: "Maintenance des frais scolaire",
        backColor: "#e29578",
        link:"maintenanceFraisScolaire",
        isloading: false 
      },
      {
        desination: "Dossiers des élèves",
        logo: "Dossiers.png",
        description: "Mis à jours des réductions",
        backColor: "#7b4bce",
        isloading: false 
      },
      {
        desination: "Frais scolaires",
        logo: "Dossiers.png",
        description: "Mis à jours des réductions",
        backColor: "#7b4bce",
        isloading: false 
      },
      {
        desination: "Classes",
        logo: "Notes.png",
        description: "",
        backColor: "#caf0f8",
        isloading: false 
      },
      {
        desination: "Classes",
        logo: "Notes.png",
        description: "",
        backColor: "#caf0f8",
        isloading: false 
      },
      {
        desination: "Classes",
        logo: "Notes.png",
        description: "",
        backColor: "#caf0f8",
        isloading: false 
      }
    ]
  }


  onMenuClick(menu: any) {
    console.log(menu);
    menu.isloading = true;
    if (menu.desination === "Dossiers des élèves") {
      console.log('Menu cliqué:', menu);
      this.maintenaceService.getMaintenanceExonerationDossierFraisScolaire().subscribe((data) => {
        console.log(data);
        this.globalService.toastShow("Maintenance effectuée avec succes","")
        menu.isloading = false;
      })
    }else if(menu.desination === "Frais scolaires"){
      console.log('Menu cliqué:', menu);
      this.maintenaceService.getMaintenanceExonerationDFraisScolaireDossier().subscribe((data) => {
        console.log(data);
        this.globalService.toastShow("Maintenance effectuée avec succès","")
        menu.isloading = false;
      })
    }else{
      console.log("redirection")
    }
    
  }
}
