import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sous-menu',
  templateUrl: './sous-menu.component.html',
  styleUrls: ['./sous-menu.component.scss']
})
export class SousMenuComponent implements OnInit {

  title!: string;
  typeMenuID!: number;

  menus!: {
    desination: string,
    logo: string,
    description: string,
    backColor: string,
    link?: string 
  }[];

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {

    let typeMenuID = this.route.snapshot.params['idMenu'];
    console.log(typeMenuID);
    if(typeMenuID == 1){
      this.initMenusForEnseignant();
    }else if(typeMenuID == 2){
      this.initMenusForEleves();
    }else if(typeMenuID == 3){
      this.initMenusForComptabilite();
    }else if(typeMenuID == 4){
      this.initMenusForResulatScolaires();
    }else if(typeMenuID == 5){
      this.initMenusForPlanning();
    }
  }

  initMenusForEnseignant(){
    this.title = "Enseignant"
    this.menus = [
      {
        desination: "Dossiers",
        logo: "carte_scolaire_et_dossier.png",
        description: "",
        backColor: "#219ebc",
        link: "enseignant/list",
      },
      {
        desination: "Absences",
        logo: "Absences.png",
        description: "",
        backColor: "#606c38"
      },
      {
        desination: "Projets pédagogiques",
        logo: "",
        description: "",
        backColor: "#d6ccc2"
      }
    ]
  }

  initMenusForEleves(){
    this.title = "Elèves"
    this.menus = [
      {
        desination: "Dossiers",
        logo: "carte_scolaire_et_dossier.png",
        description: "",
        backColor: "#8d99ae",
        link: 'eleve/list'
      },
      {
        desination: "Absences",
        logo: "Absences.png",
        description: "",
        backColor: "#caf0f8"
      },
      {
        desination: "Inscriptions",
        logo: "",
        description: "",
        backColor: "#e29578"
      }
    ]
  }

  initMenusForComptabilite(){
    this.title = "Comptabilité";
    this.menus = [
      {
        desination: "Paiement droits scolaires",
        logo: "Paiement_droits_scolaires.png",
        description: "",
        backColor: "#219ebc"
      },
      {
        desination: "Retraits caisses espèce",
        logo: "Retrait_caiss_ especes.png",
        description: "",
        backColor: "#e29578"
      },
      {
        desination: "Opérations divèrces",
        logo: "Operations_diverses.png",
        description: "",
        backColor: "#8d99ae"
      },
      {
        desination: "Clôtures journées",
        logo: "Cloture_ournee.png.png",
        description: "",
        backColor: "caf0f8"
      },
      {
        desination: "Etats de paiement des droits scolaires",
        logo: "Etats_de_paiement_droits_scoalires.png",
        description: "",
        backColor: "#8d99ae"
      },
      {
        desination: "Consultation des comptes",
        logo: "Consultations_des_comptes.png",
        description: "",
        backColor: "#e29578"
      },
      {
        desination: "Consultation des caisses",
        logo: "Consultations_de_caisse.png",
        description: "",
        backColor: "e29578"
      }
    ]
  }

  initMenusForResulatScolaires(){
    this.title = "Résultats scolaires";
    this.menus = [
      {
        desination: "Notes",
        logo: "",
        description: "",
        backColor: "#e29578" 
      },
      {
        desination: "Configuration des matières",
        logo: "ConfigurationsMatieres.png",
        description: "",
        backColor: "#8d99ae"
      },
      {
        desination: "Configuration des moyennes",
        logo: "Configurations_Moyennes.png",
        description: "",
        backColor: "#caf0f8"
      }
    ]
  }

  initMenusForPlanning(){
    this.menus = [
      {
        desination: "Planning",
        logo: "Planning.png",
        description: "",
        backColor: "#219ebc"
      },
      {
        desination: "Répartition enseignants",
        logo: "",
        description: "",
        backColor: "#e29578"
      },
      {
        desination: "Séances enseignées",
        logo: "",
        description: "",
        backColor: "#8d99ae"
      }
    ]
  }


}
