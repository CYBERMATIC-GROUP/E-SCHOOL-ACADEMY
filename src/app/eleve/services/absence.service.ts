import { Injectable, inject } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { AbsenceEleve, statAbsence } from '../models/absence.models';
import { Observable, map, of, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  cookieService = inject(CookieService);
  cookieForStatEleve = "ABSENCE_STAT";
  cookieAbsenceForEleve = "ABSENCE_FOR_ELEVE"

  constructor(
    private globalService: GlobalService
  ) { }

  getAbsence(IDELEVE: number, dateSelcted: string, refresh: boolean = false){
    const nameCookie = this.cookieAbsenceForEleve;
    const url = 'ABSENCE_Get_Absences/' + IDELEVE + '/' + dateSelcted;
    
    return this.globalService.setHttpRequest(url, "GET").pipe(
      tap(res => {
        this.cookieService.set(nameCookie, JSON.stringify(res), this.globalService.getMinForCookie())
      })
    )
  }

  createAbsenceEleve(absence: AbsenceEleve): Observable<AbsenceEleve>{
    return this.globalService.setHttpRequest('ABSENCE', "POST", absence)
  }

  updateAbsenceEleve(absence: AbsenceEleve): Observable<AbsenceEleve>{
    return this.globalService.setHttpRequest('ABSENCE/' + absence.IDABSENCE, "PUT", absence)
  }

  deleteAbsenceEleve(IDABSENCE: number){
    return this.globalService.setHttpRequest('ABSENCE/' + IDABSENCE, "DELETE")
  }

  getAbsenceByEnseignant(nIDEnseignant: number, nIDEleve: number, nIDMatiere: number, sDate: string){
    const url = `abSENCE_Get_Absence_Eleve_Selon_Enseignant_Matiere/${nIDEnseignant}/${nIDEleve}/${nIDMatiere}/${sDate}`;
    return this.globalService.setHttpRequest(url, "GET")
  }

  getStatAbsenceForEleve(nIDELEVE: number, refresh: boolean = false): Observable<statAbsence>{
    const url = `ABSENCE_Get_State_ABS_Eleve/${nIDELEVE}`;
    const nameCookie = this.cookieForStatEleve;

    return this.globalService.setHttpRequest(url, "GET").pipe(
      tap(res => {
        this.cookieService.set(nameCookie, JSON.stringify(res), this.globalService.getMinForCookie())
      })
    )
  }
}
