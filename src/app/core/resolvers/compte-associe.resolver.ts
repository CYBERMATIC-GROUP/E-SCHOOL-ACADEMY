import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Compte } from "src/app/models/compte.model";
import { CompteService } from "src/app/services/compte.service";


@Injectable()
export class CompteAssocieResolver implements Resolve<Compte[]> {
  constructor(
    private compteService: CompteService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Compte[]> {
      return this.compteService.getListCompteBanque(7)
  }
}
