import { Component } from '@angular/core';
import { environment } from 'src/environnements/environnement.prod';

@Component({
  selector: 'app-menu-transfert',
  templateUrl: './menu-transfert.component.html',
  styleUrls: ['./menu-transfert.component.scss']
})
export class MenuTransfertComponent {
  title!: string;
  typeMenuID!: number;

  menus!: {
    desination: string,
    logo: string,
    description: string,
    backColor: string,
    link?: string
  }[];

  ngOnInit(): void {
    this.initMenusForComptabilite();
    console.log( environment.routes.Comptabilite.links.historiqueVersementCaisse);
  }

  initMenusForComptabilite(){

    const comptaRoute = environment.routes.Comptabilite.Base
    const transfertRoute = environment.routes.Comptabilite.links.transfertIntercaisseEtBancaire;

    this.title = "Transfert intercaisse et bancaire";
    this.menus = [
      {
        desination: "Transfert intercaisse",
        logo: "../../assets/logo/Paiement_droits_scolaires.png",
        description: "",
        backColor: "#219ebc",
        link: comptaRoute + '/' + transfertRoute.base + '/' + transfertRoute.intercaisse
      },
      {
        desination: "Versement bancaire",
        logo: "../../assets/logo/Retrait_caiss_ especes.png",
        description: "",
        backColor: "#e29578",
        link: comptaRoute + '/' + transfertRoute.base + '/' + transfertRoute.versementBancaire
      },
      {
        desination: "Retrait bancaire",
        logo: "../../assets/logo/Consultations_de_caisse.png",
        description: "",
        backColor: "e29578",
        link: comptaRoute + '/' + transfertRoute.base + '/' + transfertRoute.retraitsBancaire
      },
    ]
  }
}
