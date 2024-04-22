import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ScatterController, PointElement } from 'chart.js';
import { Observable, map, startWith, tap } from 'rxjs';
import { Agent } from 'src/app/models/agent.model';
import { GlobalService } from 'src/app/services/global.service';
import { TabEleveParBranche, TabEleveParClasse } from 'src/app/statistiques/models/stat-branche-niveau-class.model';
import { StatNiveauBranchClassService } from 'src/app/statistiques/services/stat-niveau-branch-class.service';
import { storeData } from 'src/environnements/constantes';

Chart.register(ScatterController, PointElement )

@Component({
  selector: 'app-dossier-eleve',
  templateUrl: './dossier-eleve.component.html',
  styleUrls: ['./dossier-eleve.component.scss']
})
export class DossierEleveComponent implements OnInit {
  title!: string;
  chart!: any;
  eleveParBranche!: TabEleveParBranche[]
  eleveParClasse!: TabEleveParClasse[]
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
    private statClassNiveauBranchService: StatNiveauBranchClassService,
    private globalService: GlobalService
  ){}

  ngOnInit(): void {
    this.agent = this.globalService.initConnectedAgent()
    this.initMenusForEleves()
    const objStat = localStorage.getItem(storeData.statEleveByBrancheNiveauClasse)
    if(objStat){
      this.statClassNiveauBranchService.getStatNiveauBranchClass().pipe(
        startWith(JSON.parse(objStat)),
        tap(res => {
          this.eleveParBranche = res.tabEleveParBranche;
          this.eleveParClasse = res.tabEleveParClasse;
        })
      ).subscribe();
    }else{
      this.statClassNiveauBranchService.getStatNiveauBranchClass().pipe(
        tap(res => {
          this.eleveParBranche = res.tabEleveParBranche;
          this.eleveParClasse = res.tabEleveParClasse;
        })
      ).subscribe();
    }
  }

  initMenusForEleves(){
    this.title = "Dossier des élèves"
    this.menus = [
      {
        desination: "Dossiers",
        logo: "carte_scolaire_et_dossier.png",
        description: "Lister/filtrer/consultation unique élève",
        backColor: "#8d99ae",
        link: '/eleve/list',
        right: this.agent.bDroit_ConsultationEleves
      },
      {
        desination: "Absences",
        logo: "Absences.png",
        description: "",
        backColor: "#caf0f8",
        link: '/absence-eleve',
        right: true
      },
      {
        desination: "Inscriptions",
        logo: "",
        description: "Inscrire ou reinscrire un élève",
        backColor: "#e29578",
        link: '/eleve/menu',
        right: this.agent.bDroit_InscriptionEleves
      }
    ]
  }

}
