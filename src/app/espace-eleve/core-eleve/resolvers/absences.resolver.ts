import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of, tap } from "rxjs";
import { Eleve } from "src/app/models/eleve.model";
import { constantes } from "src/environnements/constantes";
import { EmploiDuTempsService } from "src/app/core/services/emploi-du-temps.service";
import { EmploiDuTemps } from "src/app/core/models/emploi-du-temps.models";
import { AbsenceEleve } from "src/app/eleve/models/absence.models";
import { AbsenceService } from "src/app/eleve/services/absence.service";
import { EleveService } from "../../services/eleve.service";
import { GlobalService } from "src/app/services/global.service";

@Injectable()
export class AbsenceResolver implements Resolve<AbsenceEleve[]> {
  constructor(
    private eleveService: EleveService,
    private globalService: GlobalService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AbsenceEleve[]>  {
    const eleveObj = localStorage.getItem(constantes.auth.eleve);
    let eleveID = 0;
    let idClasse = 0
    if(eleveObj){
      let eleved: Eleve = JSON.parse(eleveObj);
      const today = new Date();
      const year = today.getFullYear();
      const month = ('0' + (today.getMonth() + 1)).slice(-2);
      const day = ('0' + today.getDate()).slice(-2);
      const DateFin = `${year}${month}${day}`;

      return this.eleveService.getAbsenceForEleve(eleved.IDELEVE, this.dateDebut(), DateFin).pipe(
        tap(res => {
          console.log(res);
        })
      )
    }
    else{
      return of([])
    }

  }

  dateDebut() {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const year = sevenDaysAgo.getFullYear();
    const month = ('0' + (sevenDaysAgo.getMonth() + 1)).slice(-2);
    const day = ('0' + sevenDaysAgo.getDate()).slice(-2);

    return `${year}${month}${day}`;
  }
}
