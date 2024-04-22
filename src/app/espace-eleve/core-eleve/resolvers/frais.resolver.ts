import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs";
import { Eleve } from "src/app/models/eleve.model";
import { FraisPayer } from "src/app/models/fraispayer.model";
import { constantes } from "src/environnements/constantes";
import { EleveService } from "../../services/eleve.service";

@Injectable()
export class FraisResolver implements Resolve<FraisPayer> {
  constructor(
    private eleveService: EleveService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FraisPayer>  {
    const eleveObj = localStorage.getItem(constantes.auth.eleve);
    let eleveID = 0;
    if(eleveObj){
      let eleved: Eleve = JSON.parse(eleveObj);
      eleveID = eleved.IDELEVE
    }
    return this.eleveService.getFraisScolaire(eleveID)
  }
}
