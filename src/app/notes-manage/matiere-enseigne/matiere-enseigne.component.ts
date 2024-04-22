import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Matiere } from 'src/app/models/matiere.model';
import { MatiereService } from 'src/app/services/matiere.service';

@Component({
  selector: 'app-matiere-enseigne',
  templateUrl: './matiere-enseigne.component.html',
  styleUrls: ['./matiere-enseigne.component.scss']
})
export class MatiereEnseigneComponent implements OnInit {
  matiereSelected!: Matiere
  @Input() matiereList$!: Observable<Matiere[]>
  @Output() matiereEmitted = new EventEmitter<Matiere>();
  @Input() maxHeight: string = "15em";
  @Input() forceCombo: boolean = false;
  displayedColumns = [
    "Fr_CodeMatiere",
    "Fr_NomMatiere",
    "enseignant"
  ]

  constructor(
    private matiereService: MatiereService
  ){}

  ngOnInit(): void {
    if(!this.matiereList$)
      this.matiereList$ = of([])

  }

  emitMatiere(matiere: Matiere){
    this.matiereSelected = matiere;
    this.matiereEmitted.emit(matiere);
  }

  emitMatiereFromSelect(event: any, matieres: Matiere[]){
    const matiereFound = matieres.find(elt => elt.IDMATIERE == event.target.value)
    if(matiereFound)
      this.emitMatiere(matiereFound)
  }
}
