import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap, finalize, map } from 'rxjs';
import { Classe } from 'src/app/models/classe.model';
import { Matiere } from 'src/app/models/matiere.model';
import { ReleveGlobalService } from 'src/app/releve-global-notes/releve-global.service';
import { GlobalService } from 'src/app/services/global.service';
import { MatiereService } from 'src/app/services/matiere.service';
import { etatNote } from 'src/environnements/constantes';
import { Note, EleveNote, NoteModelCreateOrUpdate, TabNote, TabConfigNote } from '../models/notes.model';
import { MobileNoteSaisieComponent } from '../saisie-notes/mobile-note-saisie/mobile-note-saisie.component';
import { NotesService } from '../services/notes.service';
import { Eleve } from 'src/app/models/eleve.model';

@Component({
  selector: 'app-new-saisie-notes',
  templateUrl: './new-saisie-notes.component.html',
  styleUrls: ['./new-saisie-notes.component.scss']
})
export class NewSaisieNotesComponent {
  matiereList$!: Observable<Matiere[]>;
  matiereChosed!: Matiere | null;
  classeChosed!: Classe
  notes$!: Observable<Note>;
  notes!: Note;
  statiqueElevesList!: EleveNote[]
  numeroTrimestre!: number;
  etatNote = etatNote;
  searchName!: boolean;
  searchText!: string;
  notesIsloading!: boolean;
  showAbsencesBtn!: boolean;
  currentNoteSelected!: NoteModelCreateOrUpdate;
  inputSelectd!: HTMLInputElement;
  displayedColumns = [
    'name',
  ];
  displayNote: string[] = []
  printIsLoad!: boolean;

  objNoteForTable$!: Observable<saisiNoteModel[]>

  constructor(
    private matiereService: MatiereService,
    private noteService: NotesService,
    public globalService: GlobalService,
    private dialog: MatDialog,
    private releveService: ReleveGlobalService
  ){}

  ngOnInit(): void {
      this.matiereList$ = this.matiereService.getEnseignantClasseMatiere(0, 0);
      let emptyNote: Note = {
        tabConfigNote: [],
        Eleves: [],
        tbLesNotes: []
      };
      this.notes = emptyNote;
  }


  onChoseClasse(classe: Classe){
    this.classeChosed = classe;
    this.matiereChosed = null;
    this.matiereList$ = this.matiereService.getEnseignantClasseMatiere(Number(classe.IDCLASSES), 0)
  }

  onChoseMatiere(matiere: Matiere){
    this.matiereChosed = matiere
    console.log(this.numeroTrimestre);

    if(this.classeChosed && this.numeroTrimestre){
      this.notesIsloading = true;
      /*this.noteService.saisieNotesGetReleveNote(Number(this.classeChosed.IDCLASSES), matiere.IDMATIERE, this.numeroTrimestre, 0).pipe(
        tap(res => {
          this.notes = res;
          this.statiqueElevesList = this.notes.Eleves
          this.notesIsloading = false;
        })
      ).subscribe()*/

      this.objNoteForTable$ = this.noteService.saisieNotesGetReleveNote(Number(this.classeChosed.IDCLASSES), matiere.IDMATIERE, this.numeroTrimestre, 0).pipe(
        map(res => {
          let obj: saisiNoteModel[] = []
          this.displayNote = res.tabConfigNote.map(res => res.Libelle)
          this.displayedColumns = [...this.displayedColumns, ...this.displayNote]

          this.displayedColumns = [...new Set(this.displayedColumns)]

          res.Eleves.forEach(eleve => {
            res.tabConfigNote.forEach(tabConfig => {
              obj.push({
                eleve: eleve,
                note: this.filterNote(res.tbLesNotes, eleve.IDELEVE, tabConfig.IDNOTES),
                noteConfig: tabConfig
              })
            });
          });
          console.log('obj is here')
          console.log(obj)
          return obj
        })
      )

      this.objNoteForTable$.subscribe(data => {
        console.log('heello');


        console.log(data)
      })
    }

  }

  onChangeTrimestre(event: any){
    this.numeroTrimestre = event.target.value;
    console.log(this.classeChosed && this.matiereChosed && this.numeroTrimestre);

    if(this.classeChosed && this.matiereChosed && this.numeroTrimestre){
      this.notesIsloading = true;

      this.notes$ = this.noteService.saisieNotesGetReleveNote(Number(this.classeChosed.IDCLASSES), this.matiereChosed.IDMATIERE, 1, 0);

      this.notes$.subscribe(data => {
        console.log(data);
        this.notes = data;
        this.statiqueElevesList = this.notes.Eleves
        this.notesIsloading = false;
      })
    }

  }

  filterNote(notes: TabNote[], IDELEVE: number, IDLES_NOTES: number): TabNote | undefined {
    const note: TabNote | undefined = notes.find(note => note.IDELEVE == IDELEVE && note.IDNOTES == IDLES_NOTES)

    return note
  }

  onInputExistNote(eleve: EleveNote, noteConfig: TabConfigNote, note: TabNote, event: any, send: boolean = true){
    const newNote = event.target.value
    if(this.numeroTrimestre){
      const noteObj: NoteModelCreateOrUpdate = {
        IDLES_NOTES: note.IDLES_NOTES,
        IDELEVE: eleve.IDELEVE,
        IDMATIERE: note.IDMATIERE,
        IDNOTES: note.IDNOTES,
        NumTrimestre: this.numeroTrimestre,
        EtatNote: note.EtatNote,
        Note: newNote
      }
      this.currentNoteSelected = noteObj
      if(send && (newNote != note.Note)){
        this.noteService.addOrUpdateNote(noteObj).subscribe(data => {
          console.log("Note ajoutée avec success");
          console.log(data);
          const indexFound = this.notes.tbLesNotes.indexOf(note)
          if (indexFound){
            const newNoteObj: TabNote = {
              IDLES_NOTES: note.IDLES_NOTES,
              IDELEVE: note.IDELEVE,
              IDMATIERE: note.IDMATIERE,
              IDNOTES: note.IDNOTES,
              numTrimestre: this.numeroTrimestre,
              Note: newNote,
              EtatNote: note.EtatNote
            }
            this.notes.tbLesNotes[indexFound] = newNoteObj
          }
        })
      }
    }else{
      this.globalService.toastShow("Veuillez sélectionner un trimestre!", "Aucun trimestre")
    }
  }

  onInputEmptyNote(eleve: EleveNote, noteConfig: TabConfigNote, event: any){

    if(this.matiereChosed && this.numeroTrimestre){
      const newNote = event.target.value
      const noteObj: NoteModelCreateOrUpdate = {
        //IDLES_NOTES: note.IDLES_NOTES,
        IDELEVE: eleve.IDELEVE,
        IDMATIERE: this.matiereChosed.IDMATIERE,
        IDNOTES: noteConfig.IDNOTES,
        NumTrimestre: this.numeroTrimestre,
        EtatNote: etatNote.CST_ETAT_NOTE_SAISIE,
        Note: newNote
      }
      if (newNote && newNote > -1){
        this.noteService.addOrUpdateNote(noteObj).subscribe(data => {
          console.log("Note ajouté avec success");
          console.log(data);

          const idmatiere = this.matiereChosed?.IDMATIERE
          if (idmatiere){
            const newNoteObj: TabNote = {
              IDLES_NOTES: data,
              IDELEVE: eleve.IDELEVE,
              IDMATIERE: idmatiere,
              IDNOTES: noteConfig.IDNOTES,
              numTrimestre: this.numeroTrimestre,
              Note: newNote,
              EtatNote: etatNote.CST_ETAT_NOTE_SAISIE
            }
            this.notes.tbLesNotes.push(newNoteObj)
          }

        })
      }

    }else{

      this.globalService.toastShow("Veuillez sélectionner un trimestre et une matiere!", "Aucun trimestre ou matiere")

    }
  }

  onFocusInput(event: any){
    //remove all form-control
    const inputElts = document.getElementsByClassName('input-events')

    for (let i = 0; i < inputElts.length; i++) {
      const input = inputElts[i] as HTMLInputElement;
      input.classList.remove('form-control')
      input.classList.remove('selected')
    }
    const elt = event.target as HTMLInputElement;
    this.inputSelectd = elt
    elt.style.border = '2px solid red'
    elt.classList.add('form-control')
    elt.classList.add('selected')
    console.log(elt);

  }

  onInputNote(event: any, bornMax: number){
    const elt = event.target.value
    if (elt < 0){
      event.target.value = null
    }
    else if (elt > bornMax){
      this.globalService.toastShow(`La note saisie est supérieur à la borne maximale '${bornMax}'`, "Attention:", "error")
      event.target.value = null
    }
  }

  onSearch(){
    const regexPattern = new RegExp(this.searchText, 'i');
    this.notes.Eleves = this.notes.Eleves.filter(eleve => regexPattern.test(eleve.Fr_Nom + ' ' + eleve.Fr_Prenom))
    if(this.searchText == ""){
      this.notes.Eleves = this.statiqueElevesList
    }
  }

  onAbsenceJustifiee(){
    this.inputSelectd.classList.remove('bg-success')
    this.inputSelectd.classList.remove('bg-danger')
    this.inputSelectd.classList.add('bg-success')
    this.inputSelectd.value = ''
    this.currentNoteSelected.EtatNote = etatNote.CST_ETAT_NOTE_ABSENCE_JUSTIFIEE
    this.currentNoteSelected.Note = NaN
    console.log(this.currentNoteSelected);

    this.noteService.addOrUpdateNote(this.currentNoteSelected).subscribe(data => {
      console.log("Note modifié avec success");
      console.log(data);
    })
  }
  onAbsenceNonJustifiee(){
    this.inputSelectd.classList.remove('bg-success')
    this.inputSelectd.classList.remove('bg-danger')
    this.inputSelectd.classList.add('bg-danger')
    this.inputSelectd.value = ''
    this.currentNoteSelected.Note = NaN
    this.currentNoteSelected.EtatNote = etatNote.CST_ETAT_NOTE_ABSENCE_NON_JUSTIFIEE
    this.noteService.addOrUpdateNote(this.currentNoteSelected).subscribe(data => {
      console.log("Note modifié avec success");
      console.log(data);
    })
  }
  delte(){
    this.removeColor()
    this.inputSelectd.value = ''
    this.currentNoteSelected.EtatNote = etatNote.CST_ETAT_NOTE_NON_SAISIE
    this.noteService.addOrUpdateNote(this.currentNoteSelected).subscribe(data => {
      console.log("Note modifié avec success");
      console.log(data);
    })
  }

  private removeColor(){
    this.inputSelectd.classList.remove('bg-success')
    this.inputSelectd.classList.remove('bg-danger')
    this.inputSelectd.classList.add('bg-light')
    this.inputSelectd.style.backgroundColor = 'white'
    this.inputSelectd.style.color = 'black'
  }
  onMouseEnter(event: MouseEvent, eleve: EleveNote) {

  }

  onClickLine(tabConfig: TabConfigNote[], eleve: EleveNote, tabNote: TabNote[]){
    console.log(tabConfig);

    const ref = this.dialog.open(MobileNoteSaisieComponent);
    if(this.matiereChosed){
      ref.componentInstance.matiereChosed = this.matiereChosed
      ref.componentInstance.trimestre = this.numeroTrimestre
      ref.componentInstance.eleve = eleve
    }
  }

  printReleve(bAvecNotes: boolean = true){
    this.printIsLoad = true;
    if(this.matiereChosed){
      this.releveService.printReleveGlobalNotes(Number(this.classeChosed.IDCLASSES), this.numeroTrimestre, [{IDMATIERE: this.matiereChosed.IDMATIERE}], bAvecNotes).pipe(
        tap(res => {
          this.globalService.printFile(res.body.Etat, "Relevé global de notes");
        }),
        finalize(() => {
          this.printIsLoad = false;
        })
      ).subscribe()
    }
  }
}


export interface saisiNoteModel {
  eleve: EleveNote,
  note?: TabNote,
  noteConfig: TabConfigNote
}
