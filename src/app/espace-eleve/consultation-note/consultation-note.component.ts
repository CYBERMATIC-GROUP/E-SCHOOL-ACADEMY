import { Component, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Eleve } from 'src/app/models/eleve.model';
import { Matiere } from 'src/app/models/matiere.model';
import { NotesService } from 'src/app/notes-manage/services/notes.service';
import { MatiereService } from 'src/app/services/matiere.service';
import { constantes, etatNote } from 'src/environnements/constantes';
import { NoteForEleve, TabConfigNote, TbLesNote } from '../models/note-eleve.model';

@Component({
  selector: 'app-consultation-note',
  templateUrl: './consultation-note.component.html',
  styleUrls: ['./consultation-note.component.scss']
})
export class ConsultationNoteComponent implements OnInit {
  matiereList$!: Observable<Matiere[]>;
  eleve!: Eleve;
  dataSource!: any;
  matiereSelected!: Matiere;
  trimestre: number = 1
  noteEleve$: Observable<NoteForEleve> = of();
  etatNote = etatNote
  displayedColumns = [

  ]

  constructor(
    private matiereService: MatiereService,
    private noteService: NotesService
  ){}

  ngOnInit(): void {
    const eleveObj = localStorage.getItem(constantes.auth.eleve)
    if(eleveObj){
      this.eleve = JSON.parse(eleveObj)
      this.matiereList$ = this.matiereService.gerMatiereForEleve(this.eleve.IDCLASSES).pipe(
        tap(res => {
          this.matiereSelected = res[0]
          this.loadReleveNote()
        })
      )
    }
  }

  onChangeTrimestre(event: any){
    this.trimestre = event.target.value
    this.loadReleveNote()
  }

  onChoseMatiere(matiere: Matiere){
    this.matiereSelected = matiere;
    this.loadReleveNote()
  }

  loadReleveNote(){
    if(this.matiereSelected && this.trimestre){
      this.noteEleve$ = this.noteService.getRelveNoteForOneStudent(this.eleve.IDELEVE, this.matiereSelected.IDMATIERE, this.trimestre).pipe(
        tap(res => {
          console.log(res);
        })
      )
    }
  }

  public findNote(notes: TbLesNote[], config: TabConfigNote): TbLesNote | undefined{
    return notes.find(elt => elt.IDNOTES == config.IDNOTES)
  }
  
}

