import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { classementEleve, paramClassement } from '../models/classement.model';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassementService {
 uri = "SAISIE_NOTES_Imprime_Matrix"
  constructor(
    private globalService: GlobalService
  ) { }

  getClassement(param: paramClassement, bAvecDetail: number): Observable<classementEleve> {
    console.log(param);
    return this.globalService.setHttpRequest(`RESULTATS_SCOLAIRES_Classement/${bAvecDetail}`, "POST", param).pipe(
      map(res => res.body)
    )
  }


  imprimeMatrise(object:any) {
    return this.globalService.setHttpRequest('SAISIE_NOTES_Imprime_Matrix', "POST", object).pipe(
      map(res => res.body)
    )
  }

  getResultatScolaireStatistiqueDisciplineOrdreMerite(object: paramClassement){
    return this.globalService.setHttpRequest('RESULTATS_SCOLAIRES_Statistique-Discipline_Ordre_Merite', "POST", object).pipe(
      tap(res => {
        console.log(res.body);
        
      })
    )
  }

  getRESULTATS_SCOLAIRES_Get_Statistiques(object: paramClassement){
    return this.globalService.setHttpRequest('RESULTATS_SCOLAIRES_Get_Statistiques', "POST", object).pipe(
      tap(res => {
        console.log(res.body);
        
      })
    )
  }
}
