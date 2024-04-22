import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { CentreExament } from '../models/centreExamen.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class CentreExamenService {
  uri = "CENTRE_EXAMEN";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService
  ) { }

  get(refresh: boolean = false): Observable<CentreExament[]>{
    const objStorage = localStorage.getItem(constantes.requestCache.centreExamenList);
  
    if (objStorage && !refresh) {
      const centres: CentreExament[] = JSON.parse(objStorage);
      return of(centres);
    }
    return this.globalService.setHttpRequest(this.uri, "GET", {}).pipe(
      tap(res => {
        localStorage.setItem(constantes.requestCache.centreExamenList, JSON.stringify(res))
      })
    )
  }

  getOne(IDCYCLES: number): Observable<CentreExament> {
    return this.globalService.setHttpRequest(this.uri + '/' + IDCYCLES, "GET", {});
  }

  update(CentreExament: CentreExament): Observable<CentreExament> {
    const BASE_PATH = `${this.uri}/${CentreExament.IDCENTRE_EXAMEN}`;
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", CentreExament, Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.centreExamenList)
      })
    );;;
  }
  
  
  delete(IDCENTRE_EXAMEN: number): Observable<string> {
    const url = `${this.uri}/${IDCENTRE_EXAMEN}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.centreExamenList)
      })
    );
  }
  
  

  create(CentreExament: CentreExament): Observable<CentreExament> {
    const BASE_PATH = `${this.uri}`;
    return this.globalService.setHttpRequest(BASE_PATH, "POST", CentreExament,Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.centreExamenList)
      })
    );
  }
  
}
