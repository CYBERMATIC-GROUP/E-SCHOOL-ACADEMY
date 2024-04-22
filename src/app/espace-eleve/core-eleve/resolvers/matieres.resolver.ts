import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of, switchMap, tap } from "rxjs";
import { Eleve } from "src/app/models/eleve.model";
import { Matiere } from "src/app/models/matiere.model";
import { ClasseService } from "src/app/services/classe.service";
import { MatiereService } from "src/app/services/matiere.service";


@Injectable()
export class MatiereResolver implements Resolve<Matiere[]> {

  constructor(
    private matiereService: MatiereService,
    private classeService: ClasseService,
    private router: Router
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Matiere[]> {
    const eleveAuth = localStorage.getItem('eleve-auth');
    if(eleveAuth){
      let eleve: Eleve = JSON.parse(eleveAuth);
      return this.classeService.get().pipe(
        map(res => res.find(elt => Number(elt.IDCLASSES) == eleve.IDCLASSES)),
        tap(res => console.log(res)),
        switchMap(res => this.matiereService.getEnseignantClasseMatiere(Number(res?.IDCLASSES), 0).pipe(
          tap(res => {
            console.log(res);
          })
        ))
      )
    }
    else{
      this.router.navigate(['/']);
    }
    return of([])
  }
}
