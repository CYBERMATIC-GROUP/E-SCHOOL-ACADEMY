import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { EmploiDuTemps, Seance } from '../models/emploi-du-temps.models';
import { MatAccordion } from '@angular/material/expansion';
import { SeanceWithoutEnseigneBool } from 'src/app/dashboard/planning/config-emploi-du-temps/config-emploi.model';

@Component({
  selector: 'app-emplois-du-temps',
  templateUrl: './emplois-du-temps.component.html',
  styleUrls: ['./emplois-du-temps.component.scss']
})
export class EmploisDuTempsComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  panelOpenState = false;
  @Input() dataSource: EmploiDuTemps[] = [];
  @Input() seances: SeanceWithoutEnseigneBool[] = []

  @Input() visitor!: 'enseignant' | 'eleve' | 'agent' | 'parent';

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
  }

  filterByIndiceJour(ind: number): EmploiDuTemps[]{
    return this.dataSource.filter(elt => elt.IndJour == ind)
  }


  getSeanceByIndice(numSeance: number): Seance | undefined{
    return this.seances.find(elt => elt.NumeroSeance == numSeance)
  }
}
