import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/models/agent.model';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environnements/environnement.prod';
import { SelectTrimestreComponent } from '../select-trimestre/select-trimestre.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  NumTrimestre!: number
  menus!: {
    desination: string,
    logo: string,
    description: string,
    backColor: string,
    link?: string,
    image?: string
    right?: boolean,
    notReady?: boolean
  }[];
  agent!: Agent;

  constructor(
    private globalService: GlobalService,
    private dialog : MatDialog,
    private router: Router,
  ){}

  ngOnInit(): void {
    if(this.globalService.initConnectedAgent())
      this.agent = this.globalService.initConnectedAgent()
    this.initMenus();
  }

  initMenus(){
    const routeNotesBase = environment.routes.notes
    this.menus = [
      {
        desination: "Pointage automatique",
        logo: "pointeuse.jpeg",
        description: "pointage des heures../",
        backColor: "#484848",
        link: "/espace-pointage",
        right: true
      },
      {
        desination: "Saisie des notes",
        logo: "carte_scolaire_et_dossier.png",
        description: "gestion des notes, abscences../",
        backColor: "#8d99ae",
        // link: '/' + routeNotesBase.base + '/' + routeNotesBase.saisie,
        right: this.agent.bDroit_SaisieNotes
      },
      {
        desination: "Relevé des notes vides",
        logo: "resultat_scolaire.png",
        description: "...",
        backColor: "#7b4bce ",
        right: true,
        link: '/impression-releve-note'
      },
      {
        desination: "Relevé global de notes",
        logo: "Certificat.png",
        description: ".../",
        backColor: "#e29578",
        link: "/releve-global-des-notes",
        right: this.agent.bDroit_ImpressionClassementEleve
      },
      {
        desination: "Bulletin",
        logo: "resultat_scolaire.png",
        description: "Bulletin de notes",
        backColor: "#7b4bce ",
        right: true,
        link: '/impression/bulletin'
      },
      {
        desination: "Absence élève",
        logo: "resultat_scolaire.png",
        description: "Saisie des absences élèves",
        backColor: "#00d0ef",
        right: true,
        link: '/absence-eleve'
      },
      {
        desination: "Envoyer des sms",
        logo: "Planning.png",
        description: "Envois aux parents, .../",
        backColor: "#186F65",
        link: '/envois-sms',
        right: true
      },
      {
        desination: "Imprimer les documents des élèves",
        logo: "Certificat.png",
        description: "Certificats/Cartes/Fiches...",
        backColor: "#e29578",
        link: "/impressions/documents-eleves",
        right: true
      },
      {
        desination: "Absence Agent",
        logo: "resultat_scolaire.png",
        description: "Saisie des absences des agents",
        backColor: "#00d0ef",
        right: true,
        link: '/absence-agent'
      },
      {
        desination: "Résultats Scolaires",
        logo: "releves_notes.png",
        description: "Classement/tableau d'honneur ...",
        backColor: "#7b4bce ",
        image: "../assets/icons8-star.gif",
        right: true,
        link: '/classement-releve-notes-eleve'
      }
      // {
      //   desination: "Tableau de discipline",
      //   logo: "Planning.png.png",
      //   description: "Tableau de discipline par mérite",
      //   backColor: "#186F65",
      //   notReady: true
      // },
      // {
      //   desination: "Tableau d'honneur global",
      //   logo: "Planning.png.png",
      //   description: ".../",
      //   backColor: "#186F65",
      //   notReady: true
      // },
      // {
      //   desination: "Taux de réussite",
      //   logo: "Planning.png.png",
      //   description: "Taux de réussite par discipline",
      //   backColor: "#186F65",
      //   notReady: true
      // },

    ]
  }

  openModal() {
    const dialog = this.dialog.open(SelectTrimestreComponent)
    dialog.id = 'SelectTrimestreComponent'
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.NumTrimestre = dialog.componentInstance.Trimestre
        console.log(this.NumTrimestre);
        if (this.NumTrimestre) {
          this.router.navigateByUrl('saisie-note/' + this.NumTrimestre);
        }
      }
    } )

  }
}
