import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Langue } from '../models/langue.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';
@Injectable({
  providedIn: 'root'
})
export class LangueService {

  uri = "LANGUE";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService) { }

    get(refresh: boolean = false): Observable<Langue[]> {
      const objStorage = this.globalService.tryRequestFromCache(constantes.requestCache.languesList)
      
      /*if (objStorage && !refresh) {
        return objStorage;
      }*/
      return this.globalService.setHttpRequest(this.uri, "GET").pipe(
        tap(res => {
          localStorage.setItem(constantes.requestCache.languesList, JSON.stringify(res))
        })
      )
    }

    getOne(IDLANGUE: number): Observable<Langue> {
      return this.globalService.setHttpRequest(this.uri + '/' + IDLANGUE, "GET", {});
    }
  
    update(langue: Langue): Observable<Langue> {
      const BASE_PATH = `${this.uri}/${langue.IDLANGUE}`;
      return this.globalService.setHttpRequest(BASE_PATH, "PUT", langue, Headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.languesList)
        })
      );
    }
    
    
    delete(IDLANGUE: number): Observable<string> {
      const url = `${this.uri}/${IDLANGUE}`;
      const headers = this.globalService.getHeaders();
      return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.languesList)
        })
      );
    }
  
    create(langue: Langue): Observable<Langue> {
      const BASE_PATH = `${this.uri}`;
      return this.globalService.setHttpRequest(BASE_PATH, "POST", langue , Headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.languesList)
        })
      );
    }
}
