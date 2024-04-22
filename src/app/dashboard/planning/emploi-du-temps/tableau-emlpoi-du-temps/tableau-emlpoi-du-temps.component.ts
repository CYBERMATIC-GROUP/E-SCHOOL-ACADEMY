import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { EmploiDuTemps, responseEmploiDuTemps } from 'src/app/core/models/emploi-du-temps.models';
import { EmploiDuTempsService } from 'src/app/core/services/emploi-du-temps.service';
import { indiceDays } from 'src/environnements/constantes';

@Component({
  selector: 'app-tableau-emlpoi-du-temps',
  templateUrl: './tableau-emlpoi-du-temps.component.html',
  styleUrls: ['./tableau-emlpoi-du-temps.component.scss']
})
export class TableauEmlpoiDuTempsComponent {
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

  onClick(emploi: objEmploisDuTemps, event: any, indiceJour: indiceDays, indiceSeance: number, emploiSelected: EmploiDuTemps){
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
