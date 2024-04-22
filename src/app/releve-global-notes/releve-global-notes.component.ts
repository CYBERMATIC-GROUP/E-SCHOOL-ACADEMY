import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, finalize, pipe, tap } from 'rxjs';
import { etatNote } from 'src/environnements/constantes';
import { Classe } from '../models/classe.model';
import { Matiere } from '../models/matiere.model';
import { Note, EleveNote, NoteModelCreateOrUpdate, TabNote, TabConfigNote } from '../notes-manage/models/notes.model';
import { MobileNoteSaisieComponent } from '../notes-manage/saisie-notes/mobile-note-saisie/mobile-note-saisie.component';
import { NotesService } from '../notes-manage/services/notes.service';
import { GlobalService } from '../services/global.service';
import { MatiereService } from '../services/matiere.service';
import { ReleveGlobal } from './releve-global.model';
import { ReleveGlobalService } from './releve-global.service';

@Component({
  selector: 'app-releve-global-notes',
  templateUrl: './releve-global-notes.component.html',
  styleUrls: ['./releve-global-notes.component.scss']
})
export class ReleveGlobalNotesComponent {
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
    'position',
    'weight',
    'symbol',
    'position',
    'weight',
    'symbol',
    'star',
  ];
  printIsLoad!: boolean;
  releveGlobalNote$!: Observable<ReleveGlobal>;
  releveIsLoading!: boolean;

  displayedColumns2: string[] = [];
  dataSource = ELEMENT_DATA;


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
      this.releveGlobalNote$ = this.releveService.getReleveGlobalNotes(0,0,0).pipe(
        tap(res => {
            res.tabTatbLibelleColonne.forEach(element => {
              this.displayedColumns2.push(element.LibelleColonne)
            })
        })
      )
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
      this.noteService.saisieNotesGetReleveNote(Number(this.classeChosed.IDCLASSES), matiere.IDMATIERE, this.numeroTrimestre, 0).pipe(
        tap(res => {
          this.notes = res;
          this.statiqueElevesList = this.notes.Eleves
          this.notesIsloading = false;
        })
      ).subscribe();

      this.releveGlobalNote$ = this.releveService.getReleveGlobalNotes(Number(this.classeChosed.IDCLASSES), this.matiereChosed.IDMATIERE, 1)
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

      this.releveGlobalNote$ = this.releveService.getReleveGlobalNotes(Number(this.classeChosed.IDCLASSES), this.matiereChosed.IDMATIERE, this.numeroTrimestre).pipe(
        tap(res => {
          console.log(res);
        }),
        finalize(() => {

        })
      )
    }

  }

  printReleve(bAvecNote: boolean = true){
    this.printIsLoad = true;
    if(this.matiereChosed){
      this.releveService.printReleveGlobalNotes(Number(this.classeChosed.IDCLASSES), this.numeroTrimestre, [{IDMATIERE: this.matiereChosed.IDMATIERE}], bAvecNote).pipe(
        tap(res => {
          this.globalService.printFile(res.body.Etat, "Relevé global de notes");
        }),
        finalize(() => {
          this.printIsLoad = false;
        })
      ).subscribe()
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
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
