import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Niveau } from '../models/niveau.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  uri = "NIVEAU";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService
  ) { }

  get(refresh: boolean = false): Observable<Niveau[]>{
    const objStorage = this.globalService.tryRequestFromCache(constantes.requestCache.niveauxList);
  
    if (objStorage && !refresh) {
      return objStorage
    }
    return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
      tap(response => {
        localStorage.setItem(constantes.requestCache.niveauxList, JSON.stringify(response))
      })
    )
  }

  getOne(idniveau: string): Observable<Niveau> {
    return this.globalService.setHttpRequest(this.uri + '/' + idniveau, "GET", {},Headers);
  }

  update(niveau: Niveau): Observable<Niveau> {
    const BASE_PATH = `${this.uri}/${niveau.IDNIVEAU}`;
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", niveau, Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.niveauxList)
      })
    );
  }
  
  
  delete(idniveau: string): Observable<string> {
    const url = `${this.uri}/${idniveau}`;
    return this.globalService.setHttpRequest(url, "DELETE", null, Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.niveauxList)
      })
    );
  }
  
  

  create(niveau: Niveau): Observable<Niveau> {
    const BASE_PATH = `${this.uri}`;
    return this.globalService.setHttpRequest(BASE_PATH, "POST", niveau,Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.niveauxList)
      })
    );
  }
}
