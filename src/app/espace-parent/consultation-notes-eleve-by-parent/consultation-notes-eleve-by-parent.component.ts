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
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-consultation-notes-eleve-by-parent',
  templateUrl: './consultation-notes-eleve-by-parent.component.html',
  styleUrls: ['./consultation-notes-eleve-by-parent.component.scss'],
})
export class ConsultationNotesEleveByParentComponent implements OnInit {
  matiereList$!: Observable<Matiere[]>;
  eleve!: any;
  dataSource!: any;
  matiereSelected!: Matiere;
  trimestre: number = 1;
  noteEleve$: Observable<NoteForEleve> = of();
  etatNote = etatNote;
  displayedColumns = [];
  parent: any;
  isloadnoteByEleve!: boolean
  matiereRequestCount: number = 0; // Ajout du compteur

  displayedColumns2 = [
    "Fr_CodeMatiere",
    "Fr_NomMatiere",
    "enseignant"
  ]

  constructor(
    private matiereService: MatiereService,
    private noteService: NotesService,
    private globalService : GlobalService,
  ) {}

  ngOnInit(): void {
    const elevestorage = localStorage.getItem('clickedElement');
    if (elevestorage !== null) {
      this.eleve = JSON.parse(elevestorage);
      console.log(this.eleve.IDELEVE, this.eleve.Nom);
      this.loadMatiereList();
    }
  }

  loadMatiereList(): void {
    this.matiereRequestCount++; // Incrémentation du compteur à chaque fois que la requête est effectuée
    console.log(this.matiereRequestCount++);
    this.matiereList$ = this.matiereService.gerMatiereForEleve(this.eleve.IDELEVE).pipe(
      tap((res) => {
        console.log(res);
        if (res.length > 0) {
          this.matiereSelected = res[0];
          this.loadReleveNote();
        } else {
          this.globalService.toastShow('Aucune matière trouvée.','Informations');
          console.log("Aucune matière n'a été trouvée.");
        }
      })
    );
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
    if (this.matiereSelected && this.trimestre) {
      this.noteEleve$ = this.noteService
        .getRelveNoteForOneStudent(
          this.eleve.IDELEVE,
          this.matiereSelected.IDMATIERE,
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
