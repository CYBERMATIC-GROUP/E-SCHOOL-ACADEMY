import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { constantes } from 'src/environnements/constantes';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModePaiementService {

  constructor(
    private globalService: GlobalService
  ) { }

  getAll(refresh: boolean = false){
    const objStore = this.globalService.tryRequestFromCache(constantes.requestCache.modePaiementList);
    if(objStore && !refresh){
      console.log(constantes.requestCache.modePaiementList + " getted from cache !");
      return objStore
    }
    return this.globalService.setHttpRequest('COMPTA_MODE_PAIEMENT', 'GET').pipe(
      tap(res => {
        localStorage.setItem(constantes.requestCache.modePaiementList, JSON.stringify(res));
      })
    )
  }
}
