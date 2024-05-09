import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, startWith, tap } from 'rxjs';
import { AbsenceService } from 'src/app/eleve/services/absence.service';
import { Eleve } from 'src/app/models/eleve.model';
import { constantes } from 'src/environnements/constantes';
import { Chart } from 'chart.js';
import { DatePipe } from '@angular/common';
import { statAbsence } from 'src/app/eleve/models/absence.models';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent {
  eleve!: Eleve;
  @ViewChild('chartCanvasEleves') chartCanvasEleves!: ElementRef;
  isLoading!: OnBeforeUnloadEventHandler;
  @Input() height = 'auto';
  stat$!: Observable<statAbsence>;

  constructor(
    private absenceService: AbsenceService,
    private datePipe: DatePipe,
    private cookieService: CookieService
  ){}

  ngOnInit(): void {
    const obj = localStorage.getItem('clickedElement')
    console.log(obj);
    
    if(obj)
      this.eleve = JSON.parse(obj)
  }


  ngAfterViewInit(): void {
    this.stat$ = this.absenceService.getStatAbsenceForEleve(this.eleve.IDELEVE)
    this.stat$.pipe(
      tap(res => {
        console.log(res);
        
        const labels =  res.Les_Notes.map(elt => elt.Matiere)
        const data = {
          labels: labels,
          datasets: [{
            label: 'Dernières notes de classe',
            data: res.Les_Notes.map(elt => elt.sNote),
            backgroundColor: res.Les_Notes.map(elt => elt.Couleur),
          }]
        };

        const stackedBar = new Chart(this.chartCanvasEleves.nativeElement.getContext('2d'), {
          type: 'bar',
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            responsive: true,
            maintainAspectRatio: false,
          },
        })
  
      })
    ).subscribe()
  }
}
