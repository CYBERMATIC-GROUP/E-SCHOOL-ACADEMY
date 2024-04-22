import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from "rxjs";
import { constantes } from "src/environnements/constantes";
import { EmploiDuTempsService } from "src/app/core/services/emploi-du-temps.service";
import { EmploiDuTemps, responseEmploiDuTemps } from "src/app/core/models/emploi-du-temps.models";
import { Enseigant } from "src/app/models/enseigant.model";

@Injectable()
export class EmploiDuTempsEnseignantResolver implements Resolve<responseEmploiDuTemps> {
  constructor(
    private emploiDuTempsService: EmploiDuTempsService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<responseEmploiDuTemps>  {
    const enseignantObj = localStorage.getItem(constantes.auth.enseignant);
    let idEnseignant = 0
    if(enseignantObj){
      let enseignant: Enseigant = JSON.parse(enseignantObj);
      idEnseignant = enseignant.IDENSEIGNANT
    }
    return this.emploiDuTempsService.getEmploisDutemps(0, 0, 0, 0, idEnseignant, 0)
  }
}
