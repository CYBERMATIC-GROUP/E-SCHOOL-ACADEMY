import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { EmploiDuTemps, responseEmploiDuTemps } from 'src/app/core/models/emploi-du-temps.models';
import { Seance } from 'src/app/dashboard/planning/config-emploi-du-temps/config-emploi.model';
import { SeanceWithoutEnseigneBool } from '../../dashboard/planning/config-emploi-du-temps/config-emploi.model';

@Component({
  selector: 'app-emplois-du-temps-eleve',
  templateUrl: './emplois-du-temps-eleve.component.html',
  styleUrls: ['./emplois-du-temps-eleve.component.scss']
})
export class EmploisDuTempsEleveComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  panelOpenState = false;
  dataSource: EmploiDuTemps[] = [];
  seances: SeanceWithoutEnseigneBool[] = [];
  indiceJours = [
    {name: 'Lundi', id: 1},
    {name: 'Mardi', id: 2},
    {name: 'Mercredi', id: 3},
    {name: 'Jeudi', id: 4},
    {name: 'Vendredi', id: 5},
    {name: 'Samedi', id: 6},
    {name: 'Dimanche', id: 7},
  ]

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.data.pipe(
      map(res => res['emploiDuTemps']),
      tap((emploisDuTemps: responseEmploiDuTemps) => {
        this.seances = emploisDuTemps.Seance
        this.dataSource = emploisDuTemps.tabEmploiDuTemps
      })
    ).subscribe()
  }

  filterByIndiceJour(ind: number): EmploiDuTemps[]{
    return this.dataSource.filter(elt => elt.IndJour == ind)
  }

}
