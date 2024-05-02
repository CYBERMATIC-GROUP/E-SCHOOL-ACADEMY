import { Component, OnInit } from '@angular/core';
import { Observable, from, of, tap } from 'rxjs';
import { Eleve } from 'src/app/models/eleve.model';
import { Matiere } from 'src/app/models/matiere.model';
import { NotesService } from 'src/app/notes-manage/services/notes.service';
import { MatiereService } from 'src/app/services/matiere.service';
import { constantes, etatNote } from 'src/environnements/constantes';
import { PartageDesDonneesService } from '../Services/partage-des-donnees.service';
import {
  NoteForEleve,
  TabConfigNote,
  TbLesNote,
} from 'src/app/espace-eleve/models/note-eleve.model';

@Component({
  selector: 'app-consultation-notes-eleve-by-parent',
  templateUrl: './consultation-notes-eleve-by-parent.component.html',
  styleUrls: ['./consultation-notes-eleve-by-parent.component.scss'],
})
export class ConsultationNotesEleveByParentComponent {
  matiereList$!: Observable<Matiere[]>;
  eleve!: any;
  dataSource!: any;
  matiereSelected!: Matiere;
  trimestre: number = 1;
  noteEleve$: Observable<NoteForEleve> = of();
  etatNote = etatNote;
  displayedColumns = [];
  parent: any;

  constructor(
    private matiereService: MatiereService,
    private noteService: NotesService,
    private partagedesDonneesServices: PartageDesDonneesService
  ) {}

  ngOnInit(): void {
    const eleveSelectedString = localStorage.getItem('clickedElement');
    if (eleveSelectedString !== null) {
      console.log(eleveSelectedString);
      this.eleve = JSON.parse(eleveSelectedString);
      this.matiereList$ = this.matiereService.gerMatiereForEleve(this.eleve.IDELEVE)
        .pipe(
          tap((res) => {
            console.log(res);
            this.matiereSelected = res[0];
            this.loadReleveNote();
          })
        );
    } else {
      console.log("Aucune valeur n'a été trouvée dans le stockage local pour la clé 'eleveSelected'.");
    }
  }

  onChangeTrimestre(event: any) {
    this.trimestre = event.target.value;
    console.log(this.trimestre);
    this.loadReleveNote();
  }

  onChoseMatiere(matiere: Matiere) {
    this.matiereSelected = matiere;
    this.loadReleveNote();
  }

  loadReleveNote() {
    console.log(this.eleve.IDELEVE, this.trimestre);
    
    if (this.matiereSelected && this.trimestre, this.trimestre) {
      this.noteEleve$ = this.noteService
        .getRelveNoteForOneStudent(
          this.eleve.IDELEVE,0,
          this.trimestre
        )
        .pipe(
          tap((res) => {            
            console.log(res);
          })
        );
    }
  }
  public findNote(
    notes: TbLesNote[],
    config: TabConfigNote
  ): TbLesNote | undefined {
    return notes.find((elt) => elt.IDNOTES == config.IDNOTES);
  }
}
