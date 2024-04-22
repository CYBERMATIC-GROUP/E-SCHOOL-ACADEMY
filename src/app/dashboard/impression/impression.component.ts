import { Component } from '@angular/core';
import { Agent } from 'src/app/models/agent.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-impression',
  templateUrl: './impression.component.html',
  styleUrls: ['./impression.component.scss']
})
export class ImpressionComponent {

  agent!: Agent;
  title!: string;
  typeMenuID!: number;

  menus!: {
    desination: string,
    logo: string,
    description: string,
    backColor: string,
    link?: string,
    text?:string,
    right?: boolean,
    notReady?: boolean
  }[];

  constructor(
    private globalService: GlobalService
  ){}

  ngOnInit(): void {
      this.agent = this.globalService.initConnectedAgent()
      this.initMenusForImpression()
  }

  initMenusForImpression(){
    this.menus = [
      {
        desination: "Documents élèves",
        logo: "Certificat.png",
        description: "Certificats/Cartes/Fiches...",
        backColor: "#e29578",
        link: "/impressions/documents-eleves",
        text:"#e29578",
        right: true
      },
      {
        desination: "Documents enseignants",
        logo: "1FACE.png",
        description: "Cartes/Fiches",
        backColor: "#2b2a29",
        link: "/impression-carte-enseignant",
        text:"#2b2a29",
        right: true
      },
      {
        desination: "Documents agents",
        logo: "2FACE.png",
        description: "Cartes/Fiches",
        backColor: "#008dd2",
        link: "/impression-carte-agent",
        text:"#008dd2",
        right: true
      },
      {
        desination: "Impression relevée de notes",
        logo: "",
        description: "",
        backColor: "#02aef0",
        link: "/impression-releve-note",
        text:"#2b2a29",
        right: true
      },
      {
        desination: "Bullettin de notes",
        logo: "",
        description: "",
        backColor: "#e29578",
        text:"#e29578",
        link: '/impression/bulletin',
        right: true
      },
      {
        desination: "Archivage",
        logo: "Operations_diverses.png",
        description: "",
        backColor: "#219ebc",
        text:"#caf0f8",
        notReady: true
      },
      {
        desination: "Gestion du patrimoine",
        logo: "Consultations_des_comptes.png",
        description: "",
        backColor: "#caf0f8",
        text:"#caf0f8",
        notReady: true
      },
      {
        desination: "Rapport journalier ",
        logo: "Rapport Journalier.png",
        description: "",
        backColor: "#e29578",
        text:"#e29578",
        notReady: true
      },

      {
        desination: "Assiduité",
        logo: "",
        description: "",
        backColor: "#8d99ae",
        notReady: true
      },
      {
        desination: "Suivi résultat scolaires",
        logo: "resultat_scolaire.png",
        description: "",
        backColor: "#e29578",
        text:"#e29578",
        notReady: true
      },
      {
        desination: "Heures enregistrées ",
        logo: "Heures_enseignées.png",
        description: "",
        backColor: "#caf0f8",
        notReady: true
      },

      {
        desination: "Envoi de mails ",
        logo: "Envoi_des_mails.png",
        description: "",
        backColor: "#8d99ae",
        text:"#8d99ae",
        link: '/envoie-mail',
        notReady: true
      },
      {
        desination: "Bureautique ",
        logo: "",
        description: "",
        backColor: "#219ebc",
        text:"#219ebc",
        notReady: true
      },

    ]
  }


}
