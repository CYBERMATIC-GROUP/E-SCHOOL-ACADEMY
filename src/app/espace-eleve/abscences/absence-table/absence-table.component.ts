import { Component, Input, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { EmploiDuTemps } from 'src/app/core/models/emploi-du-temps.models';
import { Seance, SeanceWithoutEnseigneBool } from 'src/app/dashboard/planning/config-emploi-du-temps/config-emploi.model';
import { AbsenceEleve } from 'src/app/eleve/models/absence.models';
import { typeAbsence } from '../../../../environnements/constantes';

@Component({
  selector: 'app-absence-table',
  templateUrl: './absence-table.component.html',
  styleUrls: ['./absence-table.component.scss']
})
export class AbsenceTableComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  panelOpenState = false;
  @Input() dataSource: EmploiDuTemps[] = [];
  @Input() seances: SeanceWithoutEnseigneBool[] = []
  @Input() visitor!: 'enseignant' | 'eleve' | 'agent';
  @Input() absences!: AbsenceEleve[];

  indiceJours = [
    {name: 'Lundi', id: 1},
    {name: 'Mardi', id: 2},
    {name: 'Mercredi', id: 3},
    {name: 'Jeudi', id: 4},
    {name: 'Vendredi', id: 5},
    {name: 'Samedi', id: 6},
    {name: 'Dimanche', id: 7},
  ]
  months = [
    {name: 'Décembre', indice: '12'},
    {name: 'Novembre', indice: '11'},
    {name: 'Octobre', indice: '10'},
    {name: 'Septembre', indice: '09'},
    {name: 'Aout', indice: '08'},
    {name: 'Juillet', indice: '07'},
    {name: 'Juin', indice: '06'},
    {name: 'Mai', indice: '05'},
    {name: 'Avril', indice: '04'},
    {name: 'Mars', indice: '03'},
    {name: 'Février', indice: '02'},
    {name: 'Janvier', indice: '01'},
  ]
  typeAbsence = typeAbsence
  monthWithObject: {
    month: {name: string, indice: string},
    absences?: AbsenceEleve[]
  }[] = []

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.months.forEach(month => {
      let absences = this.filterByMonthIndice(month.indice)

      if (absences && absences.length > 0){
        this.monthWithObject.push({
          month: month,
          absences: absences
        })
      }

    });

    console.log(this.monthWithObject);

  }

  filterByMonthIndice(indice: string): AbsenceEleve[] | undefined{

    return this.absences.filter(absence => {
      if(absence.Date){
        const monthIdice = absence.Date.split('-')[1];
        return monthIdice == indice
      }
      return false
    })
  }

  filterByIndiceJour(ind: number): EmploiDuTemps[]{
    return this.dataSource.filter(elt => elt.IndJour == ind)
  }

  findSeance(numSeance: number): SeanceWithoutEnseigneBool | undefined{
    return this.seances.find(elt => elt.NumeroSeance == numSeance)
  }
}
