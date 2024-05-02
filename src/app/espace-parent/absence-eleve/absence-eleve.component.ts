import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Observable, map, tap } from 'rxjs';
import { AbsenceEleve, statAbsence } from 'src/app/eleve/models/absence.models';
import { AbsenceService } from 'src/app/eleve/services/absence.service';
import { Eleve } from 'src/app/models/eleve.model';
import { constantes } from 'src/environnements/constantes';
import { EleveService } from 'src/app/espace-eleve/services/eleve.service';
@Component({
  selector: 'app-absence-eleve',
  templateUrl: './absence-eleve.component.html',
  styleUrls: ['./absence-eleve.component.scss'],
})
export class AbsenceEleveComponent {
  @ViewChild('chartCanvasEleves') chartCanvasEleves!: ElementRef;
  @ViewChild('chartCanvasAbsenceEleves') chartCanvasAbsenceEleves!: ElementRef;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  panelOpenState = false;
  absences$!: Observable<AbsenceEleve[]>;
  statAbsence!: statAbsence;
  eleve!: any;
  isLoading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private absenceService: AbsenceService,
    private datePipe: DatePipe,
    private eleveService: EleveService
  ) {}

  ngAfterViewInit(): void {
    const eleveSelectedString = localStorage.getItem('clickedElement');
    if (eleveSelectedString !== null) {
      console.log(eleveSelectedString);
      this.eleve = JSON.parse(eleveSelectedString);
      this.absenceService
        .getStatAbsenceForEleve(this.eleve.IDELEVE)
        .pipe(
          tap((res) => {
            console.log(res);

            const labels = res.tabResumeAbsence.map((elt) =>
              this.datePipe.transform(elt.Date, 'dd/MM/yyyy')
            );
            const data = {
              labels: labels,
              datasets: [
                {
                  label: 'Absences par jour',
                  data: res.tabResumeAbsence.map((elt) => elt.NbreAbsece),
                  backgroundColor: '#ff9897',
                  borderWidth: 1,
                },
              ],
            };

            const stackedBar = new Chart(
              this.chartCanvasEleves.nativeElement.getContext('2d'),
              {
                type: 'bar',
                data: data,
                options: {
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                },
              }
            );

            /////////////////////second diagram
            const labels2 = res.tabResumeRetard.map((elt) =>
              this.datePipe.transform(elt.Date, 'dd/MM/yyyy')
            );
            const data2 = {
              labels: labels2,
              datasets: [
                {
                  label: 'Retard par jour',
                  data: res.tabResumeRetard.map((elt) => elt.NbreRetard),
                  backgroundColor: '#ffa600',
                  borderWidth: 1,
                },
              ],
            };

            const stackedBar2 = new Chart(
              this.chartCanvasAbsenceEleves.nativeElement.getContext('2d'),
              {
                type: 'bar',
                data: data2,
                options: {
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                },
              }
            );
          })
        )
        .subscribe();
    } else {
      console.log(
        "Aucune valeur n'a été trouvée dans le stockage local pour la clé 'eleveSelected'."
      );
    }
  }

  ngOnInit(): void {
    const eleveSelectedString = localStorage.getItem('eleveSelected');
    if (eleveSelectedString !== null) {
      this.eleve = JSON.parse(eleveSelectedString);
      console.log(this.eleve);

      const today = new Date();
      const year = today.getFullYear();
      const month = ('0' + (today.getMonth() + 1)).slice(-2);
      const day = ('0' + today.getDate()).slice(-2);
      const DateFin = `${year}${month}${day}`;

      this.absences$ = this.eleveService.getAbsenceForEleve(this.eleve.IDELEVE, this.dateDebut(), DateFin)
        .pipe(
          tap((res) => {
            console.log(res);
          })
        );

      const objEleve = localStorage.getItem(constantes.auth.eleve);
      if (objEleve) {
        this.eleve = JSON.parse(objEleve);
      }
    }
  }

  dateDebut() {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const year = sevenDaysAgo.getFullYear();
    const month = ('0' + (sevenDaysAgo.getMonth() + 1)).slice(-2);
    const day = ('0' + sevenDaysAgo.getDate()).slice(-2);

    return `${year}${month}${day}`;
  }
}
