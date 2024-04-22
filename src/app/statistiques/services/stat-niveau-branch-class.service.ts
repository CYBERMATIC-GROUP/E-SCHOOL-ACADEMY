import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { globalStatClassNiveauBranch } from '../models/stat-branche-niveau-class.model';
import { statByDay } from '../models/stat-by-day.model';
import { storeData } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class StatNiveauBranchClassService {

  constructor(
    private globalService: GlobalService
  ) { }

  getStatNiveauBranchClass(): Observable<globalStatClassNiveauBranch>{
    return this.globalService.setHttpRequest('Statistiques_Eleves_Par_Classe_Niveau_Branche', "GET").pipe(
      tap(res => {
        localStorage.setItem(storeData.statEleveByBrancheNiveauClasse, JSON.stringify(res))
      })
    )
  }

  getStatByDay(): Observable<statByDay[]>{
    return this.globalService.setHttpRequest('Statistiques_Eleves_Inscrits_Par_Jour', "GET")
  }
}
