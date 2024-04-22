import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Specialite } from '../models/specialite.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  uri = "SPECIALITE";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService
  ) { }
  get(refresh: boolean = false){
    const objStorage = localStorage.getItem(constantes.requestCache.specialiteList);
  
    if (objStorage && !refresh) {
      const specialits: Specialite[] = JSON.parse(objStorage);
      return of(specialits);
    }
    return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
      tap(response => {
        localStorage.setItem(constantes.requestCache.specialiteList, JSON.stringify(response))
      })
    )
  }

  getOne(idspecialite: number): Observable<Specialite> {
    return this.globalService.setHttpRequest(this.uri + '/' + idspecialite, "GET", {});
  }

  update(specialite: Specialite): Observable<Specialite> {
    const BASE_PATH = `${this.uri}/${specialite.IDSPECIALITE}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", specialite, headers).pipe(
      tap(response => {
        localStorage.setItem(constantes.requestCache.specialiteList, JSON.stringify(response))
      })
    );
  }
  
  
  delete(idsepecialite: number): Observable<string> {
    const url = `${this.uri}/${idsepecialite}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
      tap(response => {
        localStorage.setItem(constantes.requestCache.specialiteList, JSON.stringify(response))
      })
    );
  }
  
  

  create(Specialite: Specialite): Observable<Specialite> {
    const BASE_PATH = `${this.uri}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "POST", Specialite,headers).pipe(
      tap(response => {
        localStorage.setItem(constantes.requestCache.specialiteList, JSON.stringify(response))
      })
    );
  }

}
