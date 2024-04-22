import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmploiDuTemps, Seance } from 'src/app/core/models/emploi-du-temps.models';
import { SeanceWithoutEnseigneBool } from 'src/app/dashboard/planning/config-emploi-du-temps/config-emploi.model';
import { AbsenceEleve } from 'src/app/eleve/models/absence.models';
import { AbenceFormComponent } from 'src/app/eleve/saisie-absence-eleve/abence-form/abence-form.component';
import { absenceState } from 'src/app/eleve/saisie-absence-eleve/table-emploi-du-temps/table-emploi-du-temps.component';
import { typeAbsence } from 'src/environnements/constantes';

@Component({
  selector: 'app-table-absence',
  templateUrl: './table-absence.component.html',
  styleUrls: ['./table-absence.component.scss']
})
export class TableAbsenceComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  panelOpenState = false;
  @Input() dataSource: EmploiDuTemps[] = [];
  @Input() seances: SeanceWithoutEnseigneBool[] = []
  @Input() visitor!: 'enseignant' | 'eleve' | 'agent';
  @Input() absences$!: Observable<AbsenceEleve[]>
  @Output() absenceEmit = new EventEmitter<{absence: AbsenceEleve, emplois: EmploiDuTemps}>();
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
    private route: ActivatedRoute,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    console.log(this.dataSource);
    
  }

  filterByIndiceJour(ind: number): EmploiDuTemps[]{
    const emplois = this.dataSource.filter(elt => elt.IndJour == ind)
    console.log(emplois);
    return emplois
  }

  getSeanceByIndice(numSeance: number): Seance | undefined{
    return this.seances.find(elt => elt.NumeroSeance == numSeance)
  }

  public getAbsence(indiceJour: number, numSeance: number, absences: AbsenceEleve[]): AbsenceEleve | undefined{
    return absences.find(elt => elt.NumSeance == numSeance && elt.NumeroJour == indiceJour);
  }

  public getAbsenceState(indiceJour: number, numSeance: number, absences: AbsenceEleve[]): absenceState | undefined {
    let absence = absences.find(elt => elt.NumSeance == numSeance && elt.NumeroJour == indiceJour);
    console.log(absence);
    
    if (absence){
      let state: absenceState = absenceState.ABSENCE;
      switch (absence.nTypeAbsence) {
        case typeAbsence.ABSENCE:
          if (absence.bAbsenceJustifiee)
            state = absenceState.ABSENCE_JUST
          else
            state = absenceState.ABSENCE
          break;

        case typeAbsence.RETARD:
          if (absence.bAbsenceJustifiee)
            state = absenceState.RETARD_JUST
          else
            state = absenceState.RETARD
          break;
      }

      return state
    }

    return undefined
  }

  getEmploiDutempsByJour(indJour: number): EmploiDuTemps | undefined{
    const emploi = this.dataSource.find(elt => elt.IndJour == indJour)
    console.log(emploi);
    
    return emploi
  }

  getStateAbsenceColor(numJour: number, element: EmploiDuTemps, absences: AbsenceEleve[]){
    const styleColor =  {
      'bg-absence-justifiee': this.getAbsenceState(numJour, element?.IndSeance, absences) == absenceState.ABSENCE_JUST,

      'bg-absence-non-justifiee': this.getAbsenceState(numJour, element?.IndSeance, absences) == absenceState.ABSENCE,

      'bg-retard-justifiee': this.getAbsenceState(numJour, element?.IndSeance, absences) == absenceState.RETARD_JUST,

      'bg-retard-non-justifiee': this.getAbsenceState(numJour, element?.IndSeance, absences) == absenceState.RETARD,

      'bg-secondary': !element
    }
    console.log(styleColor);
    
    return styleColor
  }

  onClick(indiceJour: number, numSeance: number, absences: AbsenceEleve[], emplois: EmploiDuTemps[]){
    //this.absenceEmit.emit(absence);
    //console.log(absence);
    const absenceFounded = this.getAbsence(indiceJour, numSeance, absences)

    const absence: AbsenceEleve = {
      IDABSENCE: absenceFounded?.IDABSENCE ?? 0,
      IDELEVE: 0,
      IDCLASSES: 0,
      Date: "",
      NumSeance: numSeance,
      bAbsenceJustifiee: false,
      MotifAbsence: "",
      Observation: "",
      nTypeAbsence: 0,
      DureeAbsence: "",
      Discipline: "",
      TypeAbsence: "",
      CodeCalasse: "",
      NumeroJour: 0,
      Couleur: "",
      MATIERES: ""
    }
    const emploi = emplois.find(elt => elt.IndJour == indiceJour)
    if (emploi)
      this.absenceEmit.emit({absence: absence, emplois: emploi})
    else
      alert("No emploi found !")
  }

  openAbsence(absence: AbsenceEleve | undefined){
    const ref = this.dialog.open(AbenceFormComponent)
    if (absence){
      ref.componentInstance.absence = absence;
    }
    ref.afterClosed().subscribe(res => {
      
    })
  }
}
