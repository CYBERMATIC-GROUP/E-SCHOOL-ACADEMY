import { Injectable } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Observable, of, tap } from 'rxjs';
import { ReleveGlobal } from './releve-global.model';

@Injectable({
  providedIn: 'root'
})
export class ReleveGlobalService {

  constructor(
    private globalService: GlobalService
  ) { }


  getReleveGlobalNotes(nIDCLASSE: number, nIDMatiere: number, nNumeroTrimestre: number): Observable<ReleveGlobal>{
    const uri = `SAISIE_NOTES_Get_Releve_Notes_Global/${nIDCLASSE}/${nIDMatiere}/${nNumeroTrimestre}`;
    return this.globalService.setHttpRequest(uri, "GET")
  }

  printReleveGlobalNotes(nIDCLASSE: number, nNumeroTrimestre: number, matieres: {IDMATIERE: number}[], bAvecNote: boolean=true){
    const url = `NOTES_Imprime_Releve_Note/${nIDCLASSE}/${nNumeroTrimestre}/${bAvecNote}`
    return this.globalService.setHttpRequest(url, "POST", matieres)
  }
}
