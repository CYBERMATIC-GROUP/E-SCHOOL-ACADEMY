import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClasseService } from '../services/classe.service';
import { GlobalService } from '../services/global.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { classeEffectif } from '../models/eleve.model';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PyramideService } from './services/pyramide.service';
import { LesAnnee, TousLesElfe } from './models/pyaramide.model';
import { Observable, finalize, map, of, tap } from 'rxjs';
import { ClassSelected } from '../models/class.selected.model';

@Component({
  selector: 'app-elevepyramide',
  templateUrl: './elevepyramide.component.html',
  styleUrls: ['./elevepyramide.component.scss']
})
export class ElevepyramideComponent {
  dataSource!: any;
  dataSourceEnsembleEleve!: any;
  dataSourceEleveRedoublant!: any;
  dataSourceEleveEtranger!: any;
  displayedColumns = ['CodeClasse', 'nNbreEleve', 'cochers'];
  displayedColumns1 = ['Homme', 'Femme', 'Total'];
  displayedColumns2 = ['garcons', 'fille', 'total'];
  tableauClasseAffiche: { IDCLASSES: number }[] = [];
  isLoadingclasseList!: boolean;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  dataAllEleve!: pyramideMatTableData;
  dataEleveRedoublant!: pyramideMatTableData;
  dataELeveEtranger!: pyramideMatTableData;
  tableLoading!: boolean;
  typeShowing!: string;
  printIsLoading!: boolean;
  @ViewChild('chartCanvasEleves') chartCanvasEleves!: ElementRef;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private classeService: ClasseService,
    private globalService: GlobalService,
    private pyramideService: PyramideService
  ) {}

  ngOnInit(): void {
    this.getClass();
    //this.getPryramideage;
    this.typeShowing = '1';
  }

  ngAfterViewInit(): void {
    this.setStat([])
    this.SelectedClasseAll()
  }

  setStat(data: TousLesElfe[]) {
    this.pyramideService.getPyramideage(this.tableauClasseAffiche).pipe(
      tap(res => {
        const data = res.TousLesEleves;
        const data2 = {
          labels: res.LesAnnees.map(elt => elt.nAnnee),
          datasets: [{
              label: "Effectif Garçons",
              data: data.map(elt => elt.Homme),
              backgroundColor: [
                'rgba(0, 0, 255, 1)',
              ],
              borderWidth: 0
            },
            {
              label: "Effectif filles",
              data: data.map(elt => elt.Femme),
              backgroundColor: [
                'rgba(0, 255, 0, 1)',
              ],
              borderWidth: 0
            }
          ]
        };
    
        const stackedBar = new Chart(this.chartCanvasEleves.nativeElement.getContext('2d'), {
          type: 'bar',
          data: data2,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      })
    ).subscribe()
  }

  getClass() {
    this.classeService.getClassState().subscribe((res) => {
      let data: ClassSelected[] = []

      res.forEach(element => {
        if(element.nNbreEleve > 0)
          data.push(element)
      });

      this.dataSource = new MatTableDataSource(data);
      const idclasses = [...data.map(elt => elt.IDCLASSES)]
      for (let index = 0; index < idclasses.length; index++) {
        this.tableauClasseAffiche.push({IDCLASSES: idclasses[index]});
      }
      this.getPryramideage()
    });
  }

  SelectedClasse(element: classeEffectif, event: any) {
    if (event.target.checked) {
      this.tableauClasseAffiche.push({ IDCLASSES: element.IDCLASSES });
      console.log(this.tableauClasseAffiche);
    } else {
      const FindElement = this.tableauClasseAffiche.findIndex(
        (element) => element.IDCLASSES == element.IDCLASSES
      );
      if (FindElement !== -1) {
        this.tableauClasseAffiche.splice(FindElement, 1);
        console.log(this.tableauClasseAffiche);
      }
    }
  }

  SelectedClasseAll() {
    this.tableauClasseAffiche = [];
    let elements = document.getElementsByClassName('classeInput');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLInputElement;
      element.checked = true;
      const event = new Event('change', { bubbles: true });
      Object.defineProperty(event, 'target', {
        value: element,
        writable: false,
      });
      element.dispatchEvent(event);
    }
  }

  noSelectedClass() {
    let elements = document.getElementsByClassName('classeInput');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLInputElement;
      element.checked = false;
      this.tableauClasseAffiche = [];
    }
  }

  //get pyramide age
  getPryramideage(){
    this.tableLoading = true;
    this.pyramideService.getPyramideage(this.tableauClasseAffiche).pipe(
      tap(data => {
        this.dataAllEleve = {
          annees: ["Années", ...data.LesAnnees.map(elt => elt.nAnnee), "Total"],
          ages: ["Ages", ...data.LesAnnees.map(elt => elt.nAge), "-"],
          mans: ["Homme", ...data.TousLesEleves.map(elt => elt.Homme), data.Total.TotalEleveHomme],
          girls: ["Femme", ...data.TousLesEleves.map(elt => elt.Femme), data.Total.TotalEleveFemme],
          total: ["Total", ...data.TousLesEleves.map(elt => elt.Total), data.Total.TotalEleve]
        }
        this.setStat(data.TousLesEleves);
        this.dataELeveEtranger = {
          annees: ["Années", ...data.LesAnnees.map(elt => elt.nAnnee), "Total"],
          ages: ["Ages", ...data.LesAnnees.map(elt => elt.nAge), "-"],
          mans: ["Homme", ...data.ElevesEtrangers.map(elt => elt.Homme), data.Total.TotalEleveEtrangersHomme],
          girls: ["Femme", ...data.ElevesEtrangers.map(elt => elt.Femme), data.Total.TotalEleveEtrangersFemme],
          total: ["Total", ...data.ElevesEtrangers.map(elt => elt.Total), data.Total.TotalEleveEtrangers]
        }
  
        this.dataEleveRedoublant = {
          annees: ["Années", ...data.LesAnnees.map(elt => elt.nAnnee), "Total"],
          ages: ["Ages", ...data.LesAnnees.map(elt => elt.nAge), "-"],
          mans: ["Homme", ...data.ElevesRedoulants.map(elt => elt.Homme), data.Total.TotalEleveRedoulantsHomme],
          girls: ["Femme", ...data.ElevesRedoulants.map(elt => elt.Femme), data.Total.TotalEleveRedoulantsFemme],
          total: ["Total", ...data.ElevesRedoulants.map(elt => elt.Total), data.Total.TotalEleveRedoulants]
        }
      }),
      finalize(() => {
        this.tableLoading = false;
      })
    ).subscribe()
  }


  onShowing(event: any){
      console.log(event.target.value)
      this.typeShowing = event.target.value;
  }
}

export interface pyramideMatTableData {
  annees: any[],
  ages: any[],
  mans: any[],
  girls: any[],
  total: any[]
}
