import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EMPTY, Observable, finalize, map, of, tap } from 'rxjs';
import { Matiere } from 'src/app/models/matiere.model';
import { MatiereService } from 'src/app/services/matiere.service';
import {
  EleveNote,
  Note,
  NoteModelCreateOrUpdate,
  TabConfigNote,
  TabNote,
} from '../models/notes.model';
import { NotesService } from '../services/notes.service';
import { Enseigant } from 'src/app/models/enseigant.model';
import { Classe } from 'src/app/models/classe.model';
import { etatNote } from 'src/environnements/constantes';
import { Eleve } from 'src/app/models/eleve.model';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { MobileNoteSaisieComponent } from './mobile-note-saisie/mobile-note-saisie.component';
import { ReleveGlobalService } from 'src/app/releve-global-notes/releve-global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saisie-notes',
  templateUrl: './saisie-notes.component.html',
  styleUrls: ['./saisie-notes.component.scss'],
})
export class SaisieNotesComponent implements OnInit {
  matiereList$!: Observable<Matiere[]>;
  matiereChosed!: Matiere | null;
  classeChosed!: Classe;
  notes$!: Observable<Note>;
  notes!: Note;
  statiqueElevesList!: EleveNote[];
  numeroTrimestre!: number;
  etatNote = etatNote;
  matiereChoseddefaut!: any
  searchName!: boolean;
  searchText!: string;
  notesIsloading!: boolean;
  isloadnotebarclasse!: boolean
  showAbsencesBtn!: boolean;
  currentNoteSelected!: NoteModelCreateOrUpdate;
  inputSelectd!: HTMLInputElement;
  displayedColumns = [
    'name',
    'position',
    'weight',
    'symbol',
    'position',
    'weight',
    'symbol',
    'star',
  ];
  printIsLoad!: boolean;
  isdiablelinecolorefirtsmatiere: boolean = true

  constructor(
    private matiereService: MatiereService,
    private noteService: NotesService,
    public globalService: GlobalService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private releveService: ReleveGlobalService
  ) {}

  ngOnInit(): void {
    const numeroTrimestre = +this.router.snapshot.params['trimestre'];
    this.numeroTrimestre = numeroTrimestre;
    console.log(this.numeroTrimestre);
    this.matiereList$ = this.matiereService.getEnseignantClasseMatiere(0, 0);
    let emptyNote: Note = {
      tabConfigNote: [],
      Eleves: [],
      tbLesNotes: [],
    };
    this.notes = emptyNote;
  }

  onChoseClasse(classe: Classe) {
    this.classeChosed = classe;
    this.matiereChosed = null;
    this.matiereList$ = this.matiereService.getEnseignantClasseMatiere(Number(classe.IDCLASSES),0);
    this.matiereList$.subscribe(data => {
      console.log(data);
      const matiere = data[0]
      this.matiereChosed = matiere
      console.log(matiere);
      if (matiere) {
         this.isloadnotebarclasse = true
         this.isdiablelinecolorefirtsmatiere = true
         this.noteService.saisieNotesGetReleveNote(
           Number(this.classeChosed.IDCLASSES),
           matiere.IDMATIERE,
           this.numeroTrimestre,
           0
         )
         .pipe(
           tap((res) => {
             this.notes = res;
             this.isloadnotebarclasse = false
             this.statiqueElevesList = this.notes.Eleves;
             this.notesIsloading = false;
           })
         )
         .subscribe();
      }else {
        console.log('aucune matiere')
      }
   
      
    } )
  }

  onChoseMatiere(matiere: Matiere) {
    this.matiereChosed = matiere;
    this.isdiablelinecolorefirtsmatiere = false
    console.log(this.matiereChosed);
    if (this.classeChosed && this.numeroTrimestre) {
      this.notesIsloading = true;
      this.noteService.saisieNotesGetReleveNote(
          Number(this.classeChosed.IDCLASSES),
          matiere.IDMATIERE,
          this.numeroTrimestre,
          0
        )
        .pipe(
          tap((res) => {
            this.notes = res;
            this.statiqueElevesList = this.notes.Eleves;
            this.notesIsloading = false;
          })
        )
        .subscribe();
    }
  }

  // Avoir le tableau des notes apres la selection d'un trimestre et l'afficher dans le html
  onChangeTrimestre(event: any) {
    this.numeroTrimestre = event.target.value;
    console.log(
      this.classeChosed && this.matiereChosed && this.numeroTrimestre
    );
    if (this.classeChosed && this.matiereChosed && this.numeroTrimestre) {
      this.notesIsloading = true;
      this.notes$ = this.noteService.saisieNotesGetReleveNote(
        Number(this.classeChosed.IDCLASSES),
        this.matiereChosed.IDMATIERE,
        1,
        0
      );
      this.notes$.subscribe((data) => {
        console.log(data);
        this.notes = data;
        this.statiqueElevesList = this.notes.Eleves;
        this.notesIsloading = false;
      });
    }
  }

  filterNote(
    notes: TabNote[],
    IDELEVE: number,
    IDLES_NOTES: number
  ): TabNote | undefined {
    const note: TabNote | undefined = notes.find(
      (note) => note.IDELEVE == IDELEVE && note.IDNOTES == IDLES_NOTES
    );
    return note;
  }

  // Mettre a jour une note existente

  onInputExistNote(
    eleve: EleveNote,
    noteConfig: TabConfigNote,
    note: TabNote,
    event: any,
    send: boolean = true
  ) {
    let newNote = event.target.value;
    console.log(newNote);
    
    if (newNote == '') {
      note.EtatNote = 2
    }
    if (this.numeroTrimestre) {
      const noteObj: NoteModelCreateOrUpdate = {
        IDLES_NOTES: note.IDLES_NOTES,
        IDELEVE: eleve.IDELEVE,
        IDMATIERE: note.IDMATIERE,
        IDNOTES: note.IDNOTES,
        NumTrimestre: this.numeroTrimestre,
        EtatNote: note.EtatNote,
        Note: newNote,
      };
      console.log(noteObj);

      this.currentNoteSelected = noteObj;
      if (send && newNote != note.Note) {
        this.noteService.addOrUpdateNote(noteObj).subscribe((data) => {
          console.log('Note ajoutée avec success');
          console.log(data);

          const indexFound = this.notes.tbLesNotes.indexOf(note);
          console.log(indexFound);
          if (indexFound) {
            const newNoteObj: TabNote = {
              IDLES_NOTES: note.IDLES_NOTES,
              IDELEVE: note.IDELEVE,
              IDMATIERE: note.IDMATIERE,
              IDNOTES: note.IDNOTES,
              numTrimestre: this.numeroTrimestre,
              Note: newNote,
              EtatNote: note.EtatNote,
            };
            this.currentNoteSelected = newNote
            // mettre à jour le tableau des notes de la note specifique
            this.notes.tbLesNotes[indexFound] = newNoteObj;
            console.log(this.notes.tbLesNotes[indexFound]);
          }
        });
      }
    } else {
      this.globalService.toastShow(
        'Veuillez sélectionner un trimestre!',
        'Aucun trimestre'
      );
    }
  }

  // creer une note non existente
  onInputEmptyNote(eleve: EleveNote, noteConfig: TabConfigNote, event: any) {
    if (this.matiereChosed && this.numeroTrimestre) {
      const newNote = event.target.value;

      console.log(newNote);
      
      const noteObj: NoteModelCreateOrUpdate = {
        IDELEVE: eleve.IDELEVE,
        IDMATIERE: this.matiereChosed.IDMATIERE,
        IDNOTES: noteConfig.IDNOTES,
        NumTrimestre: this.numeroTrimestre,
        EtatNote: etatNote.CST_ETAT_NOTE_SAISIE,
        Note: newNote,
      };
      console.log(noteObj);
      this.currentNoteSelected = noteObj
      console.log(this.currentNoteSelected);
      

      if (newNote && newNote > -1) {
        this.noteService.addOrUpdateNote(noteObj).subscribe((data) => {
          console.log('Note ajouté avec success');
          console.log(data);

          // ajouté la note dans le tableau des notes tbLesNotes appres l'envoie de la note dans l'api
          const idmatiere = this.matiereChosed?.IDMATIERE;
          if (idmatiere) {
            const newNoteObj: TabNote = {
              IDLES_NOTES: data,
              IDELEVE: eleve.IDELEVE,
              IDMATIERE: idmatiere,
              IDNOTES: noteConfig.IDNOTES,
              numTrimestre: this.numeroTrimestre,
              Note: newNote,
              EtatNote: etatNote.CST_ETAT_NOTE_SAISIE,
            };
            // mettre à jour le tableau des notes de la matiere specifique
            this.notes.tbLesNotes.push(newNoteObj);
            console.log(this.notes.tbLesNotes);
          }
        });
      }
    } else {
      this.globalService.toastShow(
        'Veuillez sélectionner un trimestre et une matiere!',
        'Aucun trimestre ou matiere'
      );
    }
  }

  onFocusInput(event: any) {
    //remove all form-control
    const inputElts = document.getElementsByClassName('input-events');

    for (let i = 0; i < inputElts.length; i++) {
      const input = inputElts[i] as HTMLInputElement;
      input.classList.remove('form-control');
      input.classList.remove('selected');
    }
    const elt = event.target as HTMLInputElement;
    this.inputSelectd = elt;
    elt.style.border = '2px solid red';
    elt.classList.add('form-control');
    elt.classList.add('selected');
  }

  onInputNote(event: any, bornMax: number) {
    const elt = event.target.value;
    if (elt < 0) {
      event.target.value = null;
    } else if (elt > bornMax) {
      this.globalService.toastShow(
        `La note saisie est supérieur à la borne maximale '${bornMax}'`,
        'Attention:',
        'error'
      );
      event.target.value = null;
    }

    //remove backcolor
    this.inputSelectd.classList.remove('bg-success');
    this.inputSelectd.classList.remove('bg-danger');
  }

  onSearch() {
    const regexPattern = new RegExp(this.searchText, 'i');
    this.notes.Eleves = this.notes.Eleves.filter((eleve) =>
      regexPattern.test(eleve.Fr_Nom + ' ' + eleve.Fr_Prenom)
    );
    if (this.searchText == '') {
      this.notes.Eleves = this.statiqueElevesList;
    }
  }

  onAbsenceJustifiee() {
    this.inputSelectd.classList.remove('bg-success');
    this.inputSelectd.classList.remove('bg-danger');
    this.inputSelectd.classList.add('bg-success');
    this.inputSelectd.value = '';
    // this.currentNoteSelected.EtatNote = etatNote.CST_ETAT_NOTE_ABSENCE_JUSTIFIEE;
    // console.log(this.currentNoteSelected);
    // this.currentNoteSelected.Note = NaN;
    // console.log(this.currentNoteSelected);
    this.currentNoteSelected.EtatNote = etatNote.CST_ETAT_NOTE_ABSENCE_JUSTIFIEE
    console.log( this.currentNoteSelected);
    this.noteService.addOrUpdateNote(this.currentNoteSelected).subscribe((data) => {
        console.log('Note modifié avec success');
        console.log(data);
      });
  }


  onAbsenceNonJustifiee() {
    this.inputSelectd.classList.remove('bg-success');
    this.inputSelectd.classList.remove('bg-danger');
    this.inputSelectd.classList.add('bg-danger');
    this.inputSelectd.value = '';
    console.log(etatNote.CST_ETAT_NOTE_ABSENCE_NON_JUSTIFIEE);
    // this.currentNoteSelected.Note = NaN;
    // this.currentNoteSelected.EtatNote =  etatNote.CST_ETAT_NOTE_ABSENCE_NON_JUSTIFIEE;
    this.currentNoteSelected.EtatNote = etatNote.CST_ETAT_NOTE_ABSENCE_NON_JUSTIFIEE
    this.noteService.addOrUpdateNote(this.currentNoteSelected).subscribe((data) => {
        console.log('Note modifié avec success');
        console.log(data);
      });
  }


  delte() {
    this.removeColor();
    this.inputSelectd.value = '';
    this.currentNoteSelected.EtatNote = etatNote.CST_ETAT_NOTE_NON_SAISIE;
    this.noteService
      .addOrUpdateNote(this.currentNoteSelected)
      .subscribe((data) => {
        console.log('Note modifié avec success');
        console.log(data);
      });
  }

  private removeColor() {
    this.inputSelectd.classList.remove('bg-success');
    this.inputSelectd.classList.remove('bg-danger');
    //this.inputSelectd.classList.add('bg-light')
    //this.inputSelectd.style.backgroundColor = 'white'
    this.inputSelectd.style.color = 'black';
  }
  // onMouseEnter(event: MouseEvent, eleve: EleveNote) {

  // }

  onClickLine(
    tabConfig: TabConfigNote[],
    eleve: EleveNote,
    tabNote: TabNote[]
  ) {
    console.log(tabConfig);

    const ref = this.dialog.open(MobileNoteSaisieComponent);
    if (this.matiereChosed) {
      ref.componentInstance.matiereChosed = this.matiereChosed;
      ref.componentInstance.trimestre = this.numeroTrimestre;
      ref.componentInstance.eleve = eleve;
    }
  }

  printReleve(bAvecNotes: boolean = true) {
    this.printIsLoad = true;
    if (this.matiereChosed) {
      this.releveService
        .printReleveGlobalNotes(
          Number(this.classeChosed.IDCLASSES),
          this.numeroTrimestre,
          [{ IDMATIERE: this.matiereChosed.IDMATIERE }],
          bAvecNotes
        )
        .pipe(
          tap((res) => {
            this.globalService.printFile(
              res.body.Etat,
              'Relevé global de notes'
            );
          }),
          finalize(() => {
            this.printIsLoad = false;
          })
        )
        .subscribe();
    }
  }
}
