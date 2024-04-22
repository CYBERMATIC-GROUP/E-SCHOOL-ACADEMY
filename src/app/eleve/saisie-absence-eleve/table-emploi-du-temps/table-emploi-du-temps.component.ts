import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EmploiDuTemps } from 'src/app/core/models/emploi-du-temps.models';
import { indiceDays, typeAbsence } from 'src/environnements/constantes';
import { AbsenceEleve } from '../../models/absence.models';

@Component({
  selector: 'app-table-emploi-du-temps',
  templateUrl: './table-emploi-du-temps.component.html',
  styleUrls: ['./table-emploi-du-temps.component.scss']
})
export class TableEmploiDuTempsComponent {
  displayedColumns = [
    'heure',
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
    'dimanche',
  ];
  @Input() dataEmploiDuTemps$!: Observable<objEmploisDuTemps[]>
  currentEmploisSelected!: EmploiDuTemps;
  @Output() emploisEmit = new EventEmitter<EmploiDuTemps>()
  indiceDays = indiceDays
  @Output() dblClickEmit = new EventEmitter<any>();
  @Input() absences$!: Observable<AbsenceEleve[]>;
  absenceState = absenceState
  @Output() absenceEmitted = new EventEmitter<AbsenceEleve>();
  currentLineObjEmploi!: objEmploisDuTemps;
  private cliks = 0;
  private timeout: any;

  updateEmplois(indiceJour: number, newMatier: string, IDLIGNE?: number){
    let index;
    this.currentEmploisSelected = {
      ...this.currentEmploisSelected,
      NomMatiere: newMatier,
      IDLIG_EMPLOI: IDLIGNE ?? 0
    }
    switch (indiceJour) {
      case indiceDays.LUNDI:
        this.currentLineObjEmploi.lundi = this.currentEmploisSelected
        break;
      case indiceDays.MARDI:
        this.currentLineObjEmploi.mardi = this.currentEmploisSelected
        break;
      case indiceDays.MERCREDI:
        this.currentLineObjEmploi.mercredi = this.currentEmploisSelected
        break;
      case indiceDays.JEUDI:
        this.currentLineObjEmploi.jeudi = this.currentEmploisSelected
        break
      case indiceDays.VENDREDI:
        this.currentLineObjEmploi.vendredi = this.currentEmploisSelected
        break;
      case indiceDays.SAMEDI:
        this.currentLineObjEmploi.samedi = this.currentEmploisSelected
        break;
      case indiceDays.DIMANCHE:
        this.currentLineObjEmploi.dimanche = this.currentEmploisSelected
        break;
    }
  }

  onClick(emploi: objEmploisDuTemps, event: any, indiceJour: indiceDays, indiceSeance: number, emploiSelected: EmploiDuTemps, absence?: AbsenceEleve){
    console.log(this.currentEmploisSelected);
    this.currentEmploisSelected = {
      ...this.currentEmploisSelected,
      IndJour: indiceJour,
      IndSeance: indiceSeance,
      IDLIG_EMPLOI: emploiSelected?.IDLIG_EMPLOI ?? 0
    }
    this.currentLineObjEmploi = emploi;

    console.log(this.currentEmploisSelected)

    this.emploisEmit.emit(this.currentEmploisSelected)
    this.absenceEmitted.emit(absence)

    const tdElt = document.getElementsByClassName('editable-emploi')
    for (let i = 0; i < tdElt.length; i++) {
      const element = tdElt[i] as HTMLElement;
      element.classList.remove('bg-selcted')
    }

    const taget = event.target as HTMLElement;
    taget.classList.add('bg-selcted')
  }

  onDblClick(event: any){
    console.log(event);

  }

  onMouseDown(){
    this.cliks = 0

    this.timeout = setTimeout(() => {
      this.cliks = 0;
    }, 300);
  }

  findAbsence(indiceJour: number, emploi: EmploiDuTemps, absences: AbsenceEleve[]): AbsenceEleve | undefined {
    console.log(indiceJour, emploi)
    let absence = absences.find(elt => elt.NumSeance == emploi.IndSeance && elt.NumeroJour == indiceJour);
    console.log(absence);

    return absence
  }

  public getAbsence(indiceJour: number, numSeance: number, absences: AbsenceEleve[]): absenceState | undefined {
    let absence = absences.find(elt => elt.NumSeance == numSeance && elt.NumeroJour == indiceJour);

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


  getStateAbsenceColor(numJour: number, element: EmploiDuTemps, absences: AbsenceEleve[]){
    return {
      'bg-absence-justifiee': this.getAbsence(numJour, element?.IndSeance, absences) == absenceState.ABSENCE_JUST,

      'bg-absence-non-justifiee': this.getAbsence(numJour, element?.IndSeance, absences) == absenceState.ABSENCE,

      'bg-retard-justifiee': this.getAbsence(numJour, element?.IndSeance, absences) == absenceState.RETARD_JUST,

      'bg-retard-non-justifiee': this.getAbsence(numJour, element?.IndSeance, absences) == absenceState.RETARD,

      'bg-secondary': !element
    }
  }

}

export interface jourDetails {
  name: string | undefined,
  idLigneEmploi?: number
}

export interface objEmploisDuTemps {
  heure?: string,
  indiceSeance: number,
  lundi?: EmploiDuTemps,
  mardi?: EmploiDuTemps,
  mercredi?: EmploiDuTemps,
  jeudi?: EmploiDuTemps,
  vendredi?: EmploiDuTemps,
  samedi?: EmploiDuTemps,
  dimanche?: EmploiDuTemps,
}

export enum absenceState {
  RETARD=1,
  RETARD_JUST=2,
  ABSENCE=3,
  ABSENCE_JUST=4
}
