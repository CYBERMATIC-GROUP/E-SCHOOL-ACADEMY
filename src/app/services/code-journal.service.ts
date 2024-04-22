import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { tap } from 'rxjs';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class CodeJournalService {

  constructor(
    private globalService: GlobalService
  ) { }

  getAll(bRetrait: 1 | 0, refresh: boolean = false){
    const uri = `COMPTA_Liste_Journaux/${bRetrait}`;

    const objStore = this.globalService.tryRequestFromCache(constantes.requestCache.comptesJournaux);

    return this.globalService.setHttpRequest(uri, 'GET').pipe(
      tap(res => {
          localStorage.setItem(constantes.requestCache.comptesJournaux, JSON.stringify(res));
      })
    )
  }
}
