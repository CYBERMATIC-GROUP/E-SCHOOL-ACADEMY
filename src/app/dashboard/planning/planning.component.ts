import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  title!: string;
  typeMenuID!: number;
  configEmploiIsLoad: boolean = false

  menus!: {
    desination: string,
    logo: string,
    description: string,
    backColor: string,
    link?: string,
    right?: boolean,
    notReady?: boolean,
    id?: number
  }[];

ngOnInit(): void {
    this.initMenusForPlanning()
}

  initMenusForPlanning(){
    this.menus = [

      {
        desination: "Matières par enseignant",
        logo: "",
        description: "",
        backColor: "#8d99ae",
        link: "/matiere-enseignee-par-enseignant",
        right: true
      },
      {
        desination: "Répartition enseignants",
        logo: "",
        description: "",
        backColor: "#e29578",
        right: true,
        link: '/repartition-enseignant'
      },
      {
        desination: "Gestion emploi du temps",
        logo: "Planning.png",
        description: "Gerer l'emploi du temps",
        backColor: "#219ebc",
        link: "emploi-du-temps",
        right: true
      },
      {
        desination: "Séances enseignées",
        logo: "",
        description: "",
        backColor: "#8d99ae",
        notReady: true
      },

      {
        desination: "Visites",
        logo: "",
        description: "",
        backColor: "#8d99ae",
        link: "/visites",
        right: true
      },

      {
        desination: "Consulter emploi du temps",
        logo: "",
        description: "Imprimer/consultation./",
        backColor: "#8d99ae",
        link: "/emploi-du-temp-classe",
        right: true,
      },
      {
        desination: "Configuration emploi du temps",
        logo: "",
        description: "../",
        backColor: "#8d99ae",
        link: "configuration-emploi",
        notReady: true,
        id: 7
      }
    ]
  }

  onclick(event: any){
    const box = document.getElementsByClassName('info-box');
  }

}
