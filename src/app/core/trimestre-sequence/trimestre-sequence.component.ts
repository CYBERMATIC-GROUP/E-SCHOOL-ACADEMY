import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { PeriodeEleve } from 'src/app/models/eleve.model';
import { EleveService } from 'src/app/services/eleve.service';

@Component({
  selector: 'app-trimestre-sequence',
  templateUrl: './trimestre-sequence.component.html',
  styleUrls: ['./trimestre-sequence.component.scss']
})
export class TrimestreSequenceComponent implements OnInit {

  trimestres$!: Observable<PeriodeEleve[]>;
  sequences$: Observable<PeriodeEleve[]> = of([]);
  @Output() trimestreEmitted = new EventEmitter<number>();
  @Output() sequenceEmitted = new EventEmitter<number>();

  constructor(
    private eleveSevice: EleveService
  ){}

  ngOnInit(): void {

  }

  onChangeTrimestre(event: any){
    console.log(event.target.value);

    const trimestre = event.target.value;
    this.trimestreEmitted.emit(trimestre)
    this.sequences$ = this.eleveSevice.GetParametresPeriode(trimestre)
  }

  onChangeSequence(event: any){
    this.sequenceEmitted.emit(event.target.value)
  }

}
