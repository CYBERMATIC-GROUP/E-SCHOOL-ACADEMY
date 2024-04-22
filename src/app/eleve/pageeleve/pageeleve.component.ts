import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pageeleve',
  templateUrl: './pageeleve.component.html',
  styleUrls: ['./pageeleve.component.scss']
})
export class PageeleveComponent implements OnInit {

  menus!: {
      desination: string,
      logo: string,
      description: string,
      backColor: string,
      link?: string 
  }[];

  ngOnInit(): void {
      this.initMenusForEleves();
  }

  initMenusForEleves(){
    this.menus = [
      {
        desination: "Réinscription",
        logo: "enseignant3.png",
        description: "Réinscrire un ancien élève",
        backColor: "#8d99ae",
        link: '/reinscription'
      },
      {
        desination: "Inscription",
        logo: "enseignant3.png",
        description: "Inscrire un nouvel élève",
        backColor: "#caf0f8",
        link: '/eleve/ajout'
      },
      {
        desination: "Portail",
        logo: "enseignant3.png",
        description: "Inscriptions éffectuées en ligne",
        backColor: "#e29578",
        link: '/eleve/menu'
      },
      {
        desination: "Accueil",
        logo: "enseignant3.png",
        description: "Tableau de bord principal",
        backColor: "#e29578",
        link: '/'
      }
    ]
  }

}
