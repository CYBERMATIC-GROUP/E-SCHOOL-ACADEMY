import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/models/agent.model';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environnements/environnement.prod';

@Component({
  selector: 'app-comptabilite',
  templateUrl: './comptabilite.component.html',
  styleUrls: ['./comptabilite.component.scss']
})
export class ComptabiliteComponent implements OnInit {

  title!: string;
  typeMenuID!: number;
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
    this.initMenusForComptabilite();
    console.log( environment.routes.Comptabilite.links.historiqueVersementCaisse);
  }

  initMenusForComptabilite(){
    this.title = "Comptabilité";
    const comptabiliteRoute = environment.routes.Comptabilite;

    this.menus = [
      {
        desination: "Paiement droits scolaires",
        logo: "../../assets/logo/Paiement_droits_scolaires.png",
        description: "",
        backColor: "#219ebc",
        link: "/frais/list",
        right: this.agent.bDroit_EncaisserDroitsScolaires
      },
      {
        desination: "Paiement frais occasionel",
        logo: "../../assets/logo/Paiement_droits_scolaires.png",
        description: "../",
        backColor: "#219ebc",
        link: "/comptabilite/frais-occasionel",
        right: this.agent.bDroit_EncaisserDroitsScolaires
      },
      {
        desination: "Règlement des charges",
        logo: "../../assets/logo/Retrait_caiss_ especes.png",
        description: "",
        backColor: "#e29578",
        link: comptabiliteRoute.Base + '/' + comptabiliteRoute.links.retraitCaisseEspece,
        right: this.agent.bDroit_ReglerDesCharges
      },
      {
        desination: "Transfert intercaisse et bancaire ",
        logo: "../../assets/logo/Consultations_des_comptes.png",
        description: "",
        backColor: "#e29578",
        link: environment.routes.Comptabilite.Base + '/' + environment.routes.Comptabilite.links.transfertIntercaisseEtBancaire.base,
        right: this.agent.bDroit_SuperviseurCaisses
      },
      {
        desination: "Clôturer la caisse",
        logo: "../../assets/logo/Cloturej_ournée.png",
        description: "",
        backColor: "caf0f8",
        link: "/cloturejourneecomptable",
        right: true
      },
      {
        desination: "Consulter les clôtures de caisse",
        logo: "../../assets/logo/Consultations_de_caisse.png",
        description: "",
        backColor: "e29578",
        link: "/ClotureCaisseHistorique",
        right: this.agent.bDroit_SuperviseurCaisses
      },
      {
        desination: "Etats de paiement des droits scolaires",
        logo: "../../assets/logo/Etats_de_paiement_droits_scoalires.png",
        description: "",
        backColor: "#8d99ae",
        link: "/eleve/etat-paiement",
        right: true
      },
      {
        desination: "Historique des versements caisses",
        logo: "../../assets/logo/Consultations_des_comptes.png",
        description: "",
        backColor: "#e29578",
        link: "/" + environment.routes.Comptabilite.Base + '/' + environment.routes.Comptabilite.links.historiqueVersementCaisse,
        right: this.agent.bDroit_HistoriqueVersementsCaisses
      },
      {
        desination: "Historique des retraits de caisses",
        logo: "../../assets/logo/Consultations_des_comptes.png",
        description: "",
        backColor: "#e29578",
        link: "/" + environment.routes.Comptabilite.Base + '/' + environment.routes.Comptabilite.links.historiqueRetraitsCaisse,
        right: this.agent.bDroit_HistoriqueRetraitsCaisses
      },
      {
        desination: "Consultation des caisses",
        logo: "../../assets/logo/Consultations_de_caisse.png",
        description: "",
        backColor: "e29578",
        link: "/Consultation-des-Caisses",
        right: this.agent.bDroit_ConsultationCaisses
      },
      {
        desination: "Opérations diverses",
        logo: "../../assets/logo/Operations_diverses.png",
        description: "",
        backColor: "#8d99ae",
        notReady: true
      },
      {
        desination: "Consultation des comptes",
        logo: "../../assets/logo/Consultations_des_comptes.png",
        description: "",
        backColor: "#e29578",
        link: "/consultationCompte",
        right: this.agent.bDroit_ConsultationComptes,
      },
      {
        desination: "Annulation d'une opération ",
        logo: "../../assets/logo/Consultations_des_comptes.png",
        description: "Annuler un mouvement erroné",
        backColor: "#e29578",
        link: "/liste-mouvement",
        right: this.agent.bDroit_SuperviseurCaisses
      },
      {
        desination: "Date comptable",
        logo: "../../assets/logo/Heures_enseignées.png",
        description: "Modifier la date compte",
        backColor: "#e29578",
        link: 'configuration/date-comptable',
        right: this.agent.bDroit_SuperviseurCaisses
      }
    ]
  }

}
