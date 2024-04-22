import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { Visiteur } from '../models/visiteur.model';

@Injectable({
  providedIn: 'root'
})
export class VisiteurService {

  uri = "Visiteurs"
  
  constructor(
    private globalService: GlobalService
  ) { }

  get(): Observable<Visiteur[]>{
    return this.globalService.setHttpRequest(this.uri, "GET")
  }

  getOne(IDVisiteur: number): Observable<Visiteur>{
    return this.globalService.setHttpRequest(this.uri + '/' + IDVisiteur, "GET")
  }

  create(visiteur: Visiteur): Observable<Visiteur>{
    return this.globalService.setHttpRequest(this.uri, "POST", visiteur).pipe(
      map(res => res.body)
    )
  }

  update(visiteur: Visiteur): Observable<Visiteur>{
    return this.globalService.setHttpRequest(this.uri + '/' + visiteur.IDVisiteurs, "PUT", visiteur).pipe(
      map(res => res.body)
    )
  }

  delete(IDVisiteur: number){
    return this.globalService.setHttpRequest(this.uri + '/' + IDVisiteur, "DELETE")
  }
}
