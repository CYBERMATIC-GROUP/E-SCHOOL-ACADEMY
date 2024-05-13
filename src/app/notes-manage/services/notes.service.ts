import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { trimetres } from 'src/environnements/constantes';
import { Note, NoteModelCreateOrUpdate } from '../models/notes.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private globalService: GlobalService
  ) { }

  saisieNotesGetReleveNote(nIDCLASSE: number, nIDMatiere: number, nNumeroTrimestre: trimetres, bAvecTotaux: 0 | 1): Observable<Note>{
    const uri = `SAISIE_NOTES_Get_Releve_Notes/${nIDCLASSE}/${nIDMatiere}/${nNumeroTrimestre}/${bAvecTotaux}`

    return this.globalService.setHttpRequest(uri, "GET")
  }

  addOrUpdateNote(note: NoteModelCreateOrUpdate){
    console.log(note);
    
    return this.globalService.setHttpRequest('SAISIE_NOTES_Ajoute_Note_Eleve', "POST", note)
  }

  getRelveNoteForOneStudent(nIDELEVE: number, nIDMatiere: number, nNumeroTrimestre: number){
    const uri = `SAISIE_NOTES_Get_Releve_Notes_Individuel/${nIDELEVE}/${nIDMatiere}/${nNumeroTrimestre}`;
    return this.globalService.setHttpRequest(uri, "POST", {}).pipe(
      map(res => res.body)
    )
  }
}
