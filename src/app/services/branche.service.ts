import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Branche } from '../models/branche.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class BrancheService {

  uri = "BRANCHE";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService
  ) { }

  get(refresh: boolean = false): Observable<Branche[]>{
    const objStorage = this.globalService.tryRequestFromCache(constantes.requestCache.branchesList);
  
    if (objStorage && !refresh) {
      return objStorage
    }
    return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
      tap(response => {
        localStorage.setItem(constantes.requestCache.branchesList, JSON.stringify(response))
      })
    )
  }

  getOne(IDBRANCHE: string): Observable<Branche> {
    return this.globalService.setHttpRequest(this.uri + '/' + IDBRANCHE, "GET", {},Headers);
  }

  update(Branche: Branche): Observable<Branche> {
    const BASE_PATH = `${this.uri}/${Branche.IDBRANCHE}`;
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", Branche, Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.branchesList)
      })
    );;
  }
  
  
  delete(IDBRANCHE: string): Observable<string> {
    const url = `${this.uri}/${IDBRANCHE}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.branchesList)
      })
    );
  }
  
  

  create(Branche: Branche): Observable<Branche> {
    const BASE_PATH = `${this.uri}`;
    return this.globalService.setHttpRequest(BASE_PATH, "POST", Branche,Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.branchesList)
      })
    );
  }

}
