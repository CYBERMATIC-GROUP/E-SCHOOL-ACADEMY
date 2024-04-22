import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { AbsenceEleve } from 'src/app/eleve/models/absence.models';
import { FraisPayer, FraisScolaire } from 'src/app/models/fraispayer.model';
import { GlobalService } from 'src/app/services/global.service';
import { constantes } from 'src/environnements/constantes';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  constructor(
    private globalService: GlobalService,
    private cookieService: CookieService
  ) { }

  getFraisScolaire(nIDELEVE: number, refresh: boolean = false): Observable<FraisPayer>{
    const uri = `PORTAL_ELEVE_Get_Solde_Frais_Scolaires/${nIDELEVE}`;
    return this.globalService.setHttpRequest(uri, "GET")
  }

  ImprimerEmploiDuTempEleve(nIDEleve:number){
    const uri = `poRTAL_ELEVE_Imprimr_Emploi_Temps/${nIDEleve}`;
    return this.globalService.setHttpRequest(uri, "GET")
  }

  getAbsenceForEleve(IDELEVE: number, debut:string, fin: string, refresh: boolean = false): Observable<AbsenceEleve[]>{
    const uri = "ELEVE_Get_Absence/" + IDELEVE + '/' + debut + '/' + fin
    const nameCookie = "ELEVE_Get_Absence";
    
    if (!refresh){
      const cookie = this.cookieService.get(nameCookie);
      if(cookie){
        this.globalService.setHttpRequest(uri, "GET").pipe(
          tap(res => {
            this.cookieService.set(nameCookie, JSON.stringify(res), this.globalService.getMinForCookie())
          })
        ).subscribe();
        return of(JSON.parse(cookie))
      }
    }
    return this.globalService.setHttpRequest(uri, "GET").pipe(
      tap(res => {
        this.cookieService.set(nameCookie, JSON.stringify(res), this.globalService.getMinForCookie())
      })
    )
  }
}
