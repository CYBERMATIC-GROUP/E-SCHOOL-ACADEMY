import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Nationalite } from '../models/nationalite.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';


@Injectable({
  providedIn: 'root'
})
export class NationaliteService {

  uri = "NATIONALITE";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService
  ) { }

  get(refresh: boolean = false): Observable<Nationalite[]>{
    return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
      tap(response => {
        localStorage.setItem(constantes.requestCache.nationalitesList, JSON.stringify(response))
      })
    );
  }

  getOne(IDNATIONALITE: number): Observable<Nationalite> {
    return this.globalService.setHttpRequest(this.uri + '/' + IDNATIONALITE, "GET", {});
  }

  update(nationalite: Nationalite): Observable<Nationalite> {
    const BASE_PATH = `${this.uri}/${nationalite.IDNATIONALITE}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", nationalite, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.nationalitesList)
      })
    );
  }
  
  
  delete(IDNATIONALITE: number): Observable<string> {
    const url = `${this.uri}/${IDNATIONALITE}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.nationalitesList)
      })
    );
  }
  
  

  create(nationalite: Nationalite) : Observable<Nationalite>{
    const BASE_PATH = `${this.uri}`;
    return this.globalService.setHttpRequest(BASE_PATH, "POST", nationalite,Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.nationalitesList)
      })
    );
  }
  
}
