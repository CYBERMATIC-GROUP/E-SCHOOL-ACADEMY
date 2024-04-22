import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, LinearScale, BarController, CategoryScale, BarElement, PieController, ArcElement, ChartOptions } from 'chart.js';
import { Stats } from '../models/stats.models';
import { StatsService } from '../services/stats.service';
import { constantes, storeData } from 'src/environnements/constantes';
import { GlobalService } from '../services/global.service';
import { EleveService } from '../services/eleve.service';
import { AgentService } from '../services/agent.service';
import { EnseignantService } from '../services/enseignant.service';
import { Observable, map, of, startWith, tap } from 'rxjs';
import { notification } from '../models/notification.model';
import { NotifiactionService } from '../services/notifiaction.service';
import { ClasseService } from '../services/classe.service';
import { TabEleveParBranche, TabEleveParClasse, TabEleveParNiveau, globalStatClassNiveauBranch } from '../statistiques/models/stat-branche-niveau-class.model';
import { StatNiveauBranchClassService } from '../statistiques/services/stat-niveau-branch-class.service';
import { Agent } from '../models/agent.model';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, PieController, ArcElement);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('chartCanvasEleves') chartCanvasEleves!: ElementRef;
  @ViewChild('chartCanvasAgents') chartCanvasAgents!: ElementRef;
  @ViewChild('chartCanvasEnseignant') chartCanvasEnseignant!: ElementRef;
  chart: any;
  baseLink = "/tableau-de-bord/parametres/";
  notifications$!: Observable<notification[]>
  eleveParBranche!: TabEleveParBranche[];
  eleveParNiveaux!: TabEleveParNiveau[];
  eleveParClasse!: TabEleveParClasse[];
  stats!: Stats;
  agent!: Agent
  
  constructor(
    private router: Router,
    private statsService: StatsService,
    private elementRef: ElementRef,
    private globalService: GlobalService,
    private eleveService: EleveService,
    private agentService: AgentService,
    private enseignantService: EnseignantService,
    private notificationService: NotifiactionService,
    private classService: ClasseService,
    private statClassBranchNiveau: StatNiveauBranchClassService
  ){}

  ngOnInit(): void {
    this.initStats();
    if(this.globalService.initConnectedAgent()){
      this.agent = this.globalService.initConnectedAgent()
    }else{
      this.router.navigate(['/']);
    }

    const objStat = localStorage.getItem(storeData.statEleveByBrancheNiveauClasse)
    if(objStat){
      this.statClassBranchNiveau.getStatNiveauBranchClass().pipe(
        startWith(JSON.parse(objStat)),
        tap(res => {
          this.eleveParBranche = res.tabEleveParBranche
          this.eleveParNiveaux = res.tabEleveParNiveau
          this.eleveParClasse = res.tabEleveParClasse
        })
      ).subscribe()
    }else{
      this.statClassBranchNiveau.getStatNiveauBranchClass().pipe(
        tap(res => {
          this.eleveParBranche = res.tabEleveParBranche
          this.eleveParNiveaux = res.tabEleveParNiveau
          this.eleveParClasse = res.tabEleveParClasse
        })
      ).subscribe()
  
    }

    //this.setSizeAside()

    //init param list data for cache
    if(!localStorage.getItem(constantes.requestCache.isAllParamsListIsSet)){
      this.globalService.intParamVersListForCache().subscribe();
    }

    //try to init eleve in cache
    this.initElevesForCache();
    const objNotif = localStorage.getItem(storeData.notifications)
    if(objNotif){
      this.notifications$ = this.notificationService.getNotifs().pipe(
        startWith(JSON.parse(objNotif))
      )
    }else{
      this.notifications$ = this.notificationService.getNotifs()
    }
  }

  initElevesForCache(){
    if(!localStorage.getItem(constantes.requestCache.elevesList)){
      this.eleveService.get(0).subscribe(data => {
        localStorage.setItem(constantes.requestCache.elevesList, JSON.stringify(data));
      });
    }
  }

  initAgentForCache(){
    if(!localStorage.getItem(constantes.requestCache.agentList)){
      this.agentService.getList(0).subscribe(data => {
        localStorage.setItem(constantes.requestCache.agentList, JSON.stringify(data));
      })
    }
  }

  initEnseignantForCache(){
    if(!localStorage.getItem(constantes.requestCache.enseignantList)){
      this.enseignantService.getList().subscribe(data => {
        localStorage.setItem(constantes.requestCache.enseignantList, JSON.stringify(data));
      })
    }
  }

  initStats(){
    console.log('res');
    this.statsService.getStats().subscribe(res => {
      console.log(res);
      this.stats = res;
    })
  }

  ngAfterViewInit() {
    this.classService.getClassState().subscribe(stat => {
      //const stats: Stats = stat;
      console.log(stat)

      //this.setSizeAside();
  
    });


    //this.setSizeAside();

    document.getElementById('principal')?.addEventListener('resize', () => {
      //this.setSizeAside()
    })
  }

  private setSizeAside(){
    //get height left notif panel
    const principal = document.getElementById('principal')
    const aside = document.getElementById('left-panel')
    const graphic = document.getElementById('graphics')
    const graphic2 = document.getElementById('graphics-2')
    const menus = document.getElementById('menus')

    if(aside && graphic && graphic2 && principal && menus){
      const total = aside.clientHeight + graphic.clientHeight + graphic2.clientHeight + menus.clientHeight + 12;

      aside.style.height = (total) + "px";
    }
  }
}
