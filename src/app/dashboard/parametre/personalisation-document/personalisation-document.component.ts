import { Component } from '@angular/core';

@Component({
  selector: 'app-personalisation-document',
  templateUrl: './personalisation-document.component.html',
  styleUrls: ['./personalisation-document.component.scss']
})
export class PersonalisationDocumentComponent {

  title!: string;
  typeMenuID!: number;

  menus!: {
    desination: string,
    logo: string,
    description: string,
    backColor: string,
    link?: string,
    text?:string,
  }[];

  constructor(
  ){}

  ngOnInit(): void {
      this.initMenusForImpression()
  }

  initMenusForImpression(){
    this.menus = [
      {
        desination: "Certificats",
        logo: "Certificat.png",
        description: "Scolarité/Fréquentation/Inscription",
        backColor: "#e29578",
        link: "/certificat",
        text:"#e29578",
      },
      {
        desination: "Entêtes",
        logo: "student3.png",
        description: "Bulletins/Rapports/Comptabilité...",
        backColor: "#2b2a29",
        link: "/entetes",
        text:"#2b2a29",
      },
      {
        desination: "Image  de fond",
        logo: "Consultations_des_comptes.png",
        description: "Bulletins/Certificats...",
        backColor: "",
        // link: "/",
        text:"#008dd2",
      },
      {
        desination: "Bulletin",
        logo: "student3.png",
        description: "Bulletins/Certificats...",
        backColor: "#008dd2",
        link: "/bulletin",
        text:"#008dd2",
      },
      {
      desination: "Cartes et Badges",
      logo: "logo de lancement e school.png",
      description: "Cartes/Badges...",
      backColor: "#7955CA",
      link: "/image-de-fond",
      text:"#008dd2",
    },

    ]
  }


}
