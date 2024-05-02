import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/models/agent.model';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environnements/environnement.prod';
@Component({
  selector: 'app-options-operations',
  templateUrl: './options-operations.component.html',
  styleUrls: ['./options-operations.component.scss']
})
export class OptionsOperationsComponent {
  menus!: {
    desination: string,
    logo: string,
    description: string,
    backColor: string,
    link?: string,
    right?: boolean,
  }[];

  constructor(
    private globalService: GlobalService
  ){}
  ngOnInit(): void {
    this.initMenusForComptabilite();
  }

  initMenusForComptabilite(){

    this.menus = [
      {
        desination: "Saisie des opérations diverses",
        logo: "../../assets/logo/Paiement_droits_scolaires.png",
        description: "",
        backColor: "#219ebc",
        link: "/saisie/operations/divers",
      },
      {
        desination: "Journal d'opérations diverses",
        logo: "../../assets/logo/Paiement_droits_scolaires.png",
        description: "../",
        backColor: "#219ebc",
        link: "/journal/operations/divers",
      },
    ]
  }
}
