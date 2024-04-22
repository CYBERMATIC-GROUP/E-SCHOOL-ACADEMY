import { Component } from '@angular/core';
import { Agent } from 'src/app/models/agent.model';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-sous-menu',
  templateUrl: './sous-menu.component.html',
  styleUrls: ['./sous-menu.component.scss']
})
export class SousMenuComponent {
  title!: string;
  agent!: Agent

  menus!: {
    desination: string,
    logo: string,
    description: string,
    backColor: string,
    link?: string,
    right?: boolean,
    notReady?: boolean
  }[];

  constructor(
    private globalService: GlobalService
  ){}

  ngOnInit(): void {
    this.agent = this.globalService.initConnectedAgent()
    this.initMenusForEleves()
  }

  initMenusForEleves(){
    this.title = "Elèves"
    this.menus = [
      {
        desination: "Pointage automatique",
        logo: "Absences.png",
        description: "pointage des heures",
        backColor: "#caf0f8",
        link: 'pointage-des-heures',
        right: true
      },
      {
        desination: "Liste de présence globale",
        logo: "",
        description: "Pointage en cours...",
        backColor: "#e29578",
        link: 'pointage-global',
        right: true
      },
      {
        desination: "Liste de présence agent",
        logo: "",
        description: "Archive.../",
        backColor: "#b8860b",
        link: 'pointage-agent',
        right: true
      },
      {
        desination: "Liste de présence enseignant",
        logo: "",
        description: "Archive.../",
        backColor: "#e29578",
        link: 'pointage-enseignant',
        right: true
      }
    ]
  }

}
