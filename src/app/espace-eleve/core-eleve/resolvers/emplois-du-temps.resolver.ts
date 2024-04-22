import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from "rxjs";
import { Eleve } from "src/app/models/eleve.model";
import { constantes } from "src/environnements/constantes";
import { EmploiDuTempsService } from "src/app/core/services/emploi-du-temps.service";
import { responseEmploiDuTemps } from "src/app/core/models/emploi-du-temps.models";

@Injectable()
export class EmploiDuTempsResolver implements Resolve<responseEmploiDuTemps> {

  constructor(
    private emploiDuTempsService: EmploiDuTempsService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<responseEmploiDuTemps>  {
    const eleveObj = localStorage.getItem(constantes.auth.eleve);
    let eleveID = 0;
    let idClasse = 0
    if(eleveObj){
      let eleved: Eleve = JSON.parse(eleveObj);
      idClasse = eleved.IDCLASSES
    }
    return this.emploiDuTempsService.getEmploisDutemps(idClasse, 0, 0, 0, 0, 0)
  }
}
