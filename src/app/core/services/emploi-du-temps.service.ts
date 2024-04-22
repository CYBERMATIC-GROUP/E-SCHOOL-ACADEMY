import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { EmploiDuTemps, GroupeEmploiDuTemps, responseEmploiDuTemps } from '../models/emploi-du-temps.models';

@Injectable({
  providedIn: 'root'
})
export class EmploiDuTempsService {

  constructor(
    private globalService: GlobalService
  ) { }

  getEmploisDutemps(nIDCLASSES: number, nIDMATIERE: number, nNumeroJour: number, nNumeroSeance: number, nIDENSEIGNANT: number, nIDSALLES: number, groupeEmploiID: number = 0): Observable<responseEmploiDuTemps>{
    let url = `Emploi_Du_Temps/${nIDCLASSES}/${nIDMATIERE}/${nNumeroJour}/${nNumeroSeance}/${nIDENSEIGNANT}/${nIDSALLES}/${groupeEmploiID}`;
    return this.globalService.setHttpRequest(url, "POST", {}).pipe(
      map(res => res.body)
    )
  }

  saveOrUpdateEmploiDuTemps(data: emploiCreateOrSave){
    return this.globalService.setHttpRequest('PLANNING_Ajoute_Ligne_Emploi_Du_Temps', "POST", data)
  }

  deleteEmploiDutemps(IDLIGNE_EMPLOI: number){
    return this.globalService.setHttpRequest('PLANNING_Supprime_Ligne_Emploi_Du_Temps/' + IDLIGNE_EMPLOI, "DELETE")
  }

  getGroupeEmploisDutemps(): Observable<GroupeEmploiDuTemps[]> {
    return this.globalService.setHttpRequest('EMPLOI_DU_TEMPS', "GET")
  }

}

export interface emploiCreateOrSave {
  IDLIG_EMPLOI?: number,
  IDCLASSES: number,
  IndJour: number,
  IndSeance: number,
  IDMATIERE: number,
  IDEMPLOIDUTEMPS: number
}
