import { Injectable } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Pointage, Presence } from './pointage.model';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointageService {

  constructor(
    private globalService: GlobalService
  ) { }

  savePointage(pointage: Pointage): Observable<Pointage>{
    return this.globalService.setHttpRequest('PRESENCE_Ajoute_Presence', "POST", pointage).pipe(
      map(res => res.body)
    )
  }

  getLastPointage(): Observable<Presence[]>{
    return this.globalService.setHttpRequest('PRESENCE_Get_Presents_En_Cours', "GET")
  }

  getPresenceFilter(dateBegin: string, dateEnd: string, nTypeAgent: number, IDAGENT: number = 0): Observable<Presence[]>{
    return this.globalService.setHttpRequest(`presence_Get_Presence_Agents/${dateBegin}/${dateEnd}/${nTypeAgent}/${IDAGENT}`, "POST", {}).pipe(
      map(res => res.body)
    )
  }

  printListePresence(dateBegin: string, dateEnd: string, nTypeAgent: number, IDAGENT: number = 0){
    return this.globalService.setHttpRequest(`PRESENCE_Imprime_Presences_Enseignants/${dateBegin}/${dateEnd}/${nTypeAgent}/${IDAGENT}`, "POST", {}).pipe(
      map(res => res.body.Etat)
    )
  }

}
