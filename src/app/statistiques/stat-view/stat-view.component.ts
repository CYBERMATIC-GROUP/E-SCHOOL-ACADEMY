import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { statByDay } from '../models/stat-by-day.model';
import { StatNiveauBranchClassService } from '../services/stat-niveau-branch-class.service';
import { map, tap } from 'rxjs';
import { TabEleveParBranche, TabEleveParNiveau, TabEleveParClasse } from '../models/stat-branche-niveau-class.model';
import { Chart } from 'chart.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stat-view',
  templateUrl: './stat-view.component.html',
  styleUrls: ['./stat-view.component.scss']
})
export class StatViewComponent implements OnInit, AfterViewInit {
  statByDay!: statByDay[];
  eleveParBranche!: TabEleveParBranche[];
  eleveParNiveaux!: TabEleveParNiveau[];
  eleveParClasse!: TabEleveParClasse[];
  @ViewChild('chartCanvasEleves') chartCanvasEleves!: ElementRef;

  constructor(
    private statService: StatNiveauBranchClassService,
    private statClassBranchNiveau: StatNiveauBranchClassService,
    private datePie: DatePipe
  ){}

  ngOnInit(): void {
    this.statClassBranchNiveau.getStatNiveauBranchClass().pipe(
      tap(res => {
        this.eleveParBranche = res.tabEleveParBranche
        this.eleveParNiveaux = res.tabEleveParNiveau
        this.eleveParClasse = res.tabEleveParClasse
      })
    ).subscribe()
  }

  ngAfterViewInit() {

    this.statService.getStatByDay().pipe(
      map(res => res.map(elt => {
        const formattedDate = this.datePie.transform(elt.Date, 'dd/MM/YY')
        if(formattedDate)
          elt.Date = formattedDate
        return elt
      })),
      tap(res => {  
        const stat = res;
        const data2 = {
          labels: stat.map((res:any) => res['Date']),
          datasets: [{
              label: "Nombre des élèves inscrits par jour",
              data: stat.map((res: any) => res['Total']),
              backgroundColor: [
                'rgba(0, 0, 255, 1)',
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


}
