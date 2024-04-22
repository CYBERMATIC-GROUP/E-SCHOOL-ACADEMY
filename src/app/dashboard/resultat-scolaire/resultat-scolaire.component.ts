import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultat-scolaire',
  templateUrl: './resultat-scolaire.component.html',
  styleUrls: ['./resultat-scolaire.component.scss']
})
export class ResultatScolaireComponent implements OnInit {

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
      this.initMenusForResulatScolaires()
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
      },
         {
         desination: "Bulletins d'adhésion",
         logo: "",
         description: "",
         backColor: "#219ebc",
       },
    
       {
         desination: "Résultat scolaires",
         logo: "",
         description: "",
         backColor: "#e29578",
       },
      {
         desination: "Bulletins des notes",
         logo: "Notes.png",
         description: "",
         backColor: "#caf0f8",
       },


    ]
  }
}
