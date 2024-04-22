import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Observable, map, tap } from 'rxjs';
import { AbsenceEleve, statAbsence } from 'src/app/eleve/models/absence.models';
import { AbsenceService } from 'src/app/eleve/services/absence.service';
import { Eleve } from 'src/app/models/eleve.model';
import { constantes } from 'src/environnements/constantes';

@Component({
  selector: 'app-abscences',
  templateUrl: './abscences.component.html',
  styleUrls: ['./abscences.component.scss']
})
export class AbscencesComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvasEleves') chartCanvasEleves!: ElementRef;
  @ViewChild('chartCanvasAbsenceEleves') chartCanvasAbsenceEleves!: ElementRef;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  panelOpenState = false;
  absences$!: Observable<AbsenceEleve[]>
  statAbsence!: statAbsence
  eleve!: Eleve
  isLoading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private absenceService: AbsenceService,
    private datePipe: DatePipe
  ){}

  ngAfterViewInit(): void {
    this.absenceService.getStatAbsenceForEleve(this.eleve.IDELEVE).pipe(
      tap(res => {
        console.log(res);
        const labels =  res.tabResumeAbsence.map(elt => this.datePipe.transform(elt.Date, 'dd/MM/yyyy'))
        const data = {
          labels: labels,
          datasets: [{
            label: 'Absences par jour',
            data: res.tabResumeAbsence.map(elt => elt.NbreAbsece),
            backgroundColor: '#ff9897',
            borderWidth: 1
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

        /////////////////////second diagram
        const labels2 =  res.tabResumeRetard.map(elt => this.datePipe.transform(elt.Date, 'dd/MM/yyyy'))
        const data2 = {
          labels: labels2,
          datasets: [{
            label: 'Retard par jour',
            data: res.tabResumeRetard.map(elt => elt.NbreRetard),
            backgroundColor: '#ffa600',
            borderWidth: 1
          }]
        };

        const stackedBar2 = new Chart(this.chartCanvasAbsenceEleves.nativeElement.getContext('2d'), {
          type: 'bar',
          data: data2,
          options: {
            scales: {
              y: {
                beginAtZero: true
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          },
        })
  
      })
    ).subscribe()
  }

  ngOnInit(): void {
    this.absences$ = this.route.data.pipe(
      map(res => res['absences'])
    )
    
    const objEleve = localStorage.getItem(constantes.auth.eleve)
    if(objEleve){
      this.eleve = JSON.parse(objEleve)
    }
  }

}
