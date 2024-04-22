import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EleveNote, NoteModelCreateOrUpdate, TabConfigNote, TabNote } from '../../models/notes.model';
import { NotesService } from '../../services/notes.service';
import { GlobalService } from 'src/app/services/global.service';
import { Matiere } from 'src/app/models/matiere.model';
import { etatNote } from 'src/environnements/constantes';
import { MatDialog } from '@angular/material/dialog';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-mobile-note-saisie',
  templateUrl: './mobile-note-saisie.component.html',
  styleUrls: ['./mobile-note-saisie.component.scss']
})
export class MobileNoteSaisieComponent implements OnInit {
    noteForm!: FormGroup
    noteEleve!: NoteModelCreateOrUpdate;
    showAbsencesBtn!: boolean;
    @Input() eleve!: EleveNote;
    @Input() tabNote: TabNote[] = [];
    @Input() tabConfig!: TabConfigNote[];
    @Input() trimestre!: number
    @Input() matiereChosed!: Matiere
    etatNote = etatNote
    inputSelectd!: HTMLInputElement;
    currentNoteSelected!: NoteModelCreateOrUpdate;
    noteIsLoading!: boolean

    currentNoteEdited!: number;

    constructor(
      private formBuilder: FormBuilder,
      private noteService: NotesService,
      public globalService: GlobalService,
      public dialog: MatDialog
    ){}

    ngOnInit(): void {
      this.noteIsLoading = true
      this.noteService.getRelveNoteForOneStudent(this.eleve.IDELEVE, this.matiereChosed.IDMATIERE, this.trimestre).pipe(
        tap(res => {
          console.log(res);
          this.tabNote = res.tbLesNotes
          this.tabConfig = res.tabConfigNote
        }),
        finalize(() => {
          this.noteIsLoading = false
        })
      ).subscribe()
    }

    filterNote(IDLES_NOTES: number, IDELEVE: number): TabNote | undefined {
      const note: TabNote | undefined = this.tabNote.find(note => note.IDELEVE == IDELEVE && note.IDNOTES == IDLES_NOTES)
      return note
    }

    onInputExistNote(note: TabNote, event: any, send: boolean = true){
      if(this.trimestre){
        const newNote = event.target.value
        const noteObj: NoteModelCreateOrUpdate = {
          IDLES_NOTES: note.IDLES_NOTES,
          IDELEVE: this.eleve.IDELEVE,
          IDMATIERE: note.IDMATIERE,
          IDNOTES: note.IDNOTES,
          NumTrimestre: this.trimestre,
          EtatNote: note.EtatNote,
          Note: newNote
        }
        this.currentNoteSelected = noteObj
        if(this.currentNoteSelected  && (newNote != note.Note)){
          console.log(noteObj);
          this.noteService.addOrUpdateNote(noteObj).subscribe(data => {
            console.log("Note ajouté avec success");

            const indexFound = this.tabNote.indexOf(note)
            if (indexFound){
              const newNoteObj: TabNote = {
                IDLES_NOTES: note.IDLES_NOTES,
                IDELEVE: note.IDELEVE,
                IDMATIERE: note.IDMATIERE,
                IDNOTES: note.IDNOTES,
                numTrimestre: this.trimestre,
                Note: newNote,
                EtatNote: note.EtatNote
              }
              this.tabNote[indexFound] = newNoteObj
            }

          })
        }
      }else{
        this.globalService.toastShow("Veuillez sélectionner un trimestre!", "Aucun trimestre")
      }
    }

    onInputEmptyNote(noteConfig: TabConfigNote, event: any){
      const newNote = event.target.value
      if(this.matiereChosed && this.trimestre && (newNote && newNote >= 0)){

        const noteObj: NoteModelCreateOrUpdate = {
          //IDLES_NOTES: note.IDLES_NOTES,
          IDELEVE: this.eleve.IDELEVE,
          IDMATIERE: this.matiereChosed.IDMATIERE,
          IDNOTES: noteConfig.IDNOTES,
          NumTrimestre: this.trimestre,
          //EtatNote: note.EtatNote,
          Note: newNote
        }
        this.noteService.addOrUpdateNote(noteObj).subscribe(data => {
          console.log("Note ajouté avec success");
          console.log(data);
          const newNoteObj: TabNote = {
            IDLES_NOTES: data,
            IDELEVE: this.eleve.IDELEVE,
            IDMATIERE: noteObj.IDMATIERE,
            IDNOTES: noteObj.IDNOTES,
            numTrimestre: noteObj.NumTrimestre,
            Note: newNote,
            EtatNote: etatNote.CST_ETAT_NOTE_NON_SAISIE
          }
          this.tabNote.push(newNoteObj)
        })

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
      console.log(elt)
      if (elt < 0){
        event.target.value = null
      }
      else if (elt > bornMax){
        this.globalService.toastShow(`La note saisie est supérieur à la borne maximale '${bornMax}'`, "Attention:", "error")
        event.target.value = null
      }
    }

    onAbsenceJustifiee(){
      this.inputSelectd.classList.remove('bg-success')
      this.inputSelectd.classList.remove('bg-danger')
      this.inputSelectd.classList.add('bg-success')
      this.inputSelectd.value = ''
      console.log(this.currentNoteSelected);

      this.currentNoteSelected.EtatNote = etatNote.CST_ETAT_NOTE_ABSENCE_JUSTIFIEE
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
      this.currentNoteSelected.EtatNote = etatNote.CST_ETAT_NOTE_ABSENCE_NON_JUSTIFIEE
      this.noteService.addOrUpdateNote(this.currentNoteSelected).subscribe(data => {
        console.log("Note modifié avec success");
        console.log(data);
      })
    }
    delte(){
      this.inputSelectd.classList.remove('bg-success')
      this.inputSelectd.classList.remove('bg-danger')
      this.inputSelectd.classList.add('bg-light')
      this.inputSelectd.style.backgroundColor = 'white'
      this.inputSelectd.style.color = 'black'
      this.inputSelectd.value = ''
      this.currentNoteSelected.EtatNote = etatNote.CST_ETAT_NOTE_NON_SAISIE
      this.noteService.addOrUpdateNote(this.currentNoteSelected).subscribe(data => {
        console.log("Note modifié avec success");
        console.log(data);
      })
    }
}
