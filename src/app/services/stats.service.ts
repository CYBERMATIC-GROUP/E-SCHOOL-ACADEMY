import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { constantes } from 'src/environnements/constantes';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  baseUri = "Statistiques_Agents_Enseignants_Eleves";

  constructor(
    private globalService: GlobalService
  ) { }

  getStats(refresh: boolean = false){
    const objStor = localStorage.getItem(constantes.requestCache.statsEleve);

    if(!refresh && objStor){
      console.log('stat getted from cache');
      
      return of(JSON.parse(objStor));
    }
    console.log('stat getted from request');
    return this.globalService.setHttpRequest(this.baseUri, "GET").pipe(
      tap(res => {
        localStorage.setItem(constantes.requestCache.statsEleve, JSON.stringify(res));
      })
    );
  }
  
}
