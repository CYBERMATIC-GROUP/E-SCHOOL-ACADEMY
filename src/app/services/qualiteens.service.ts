import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Qualiteens } from '../models/qualiteens.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';


@Injectable({
  providedIn: 'root'
})
export class QualiteensService {

  uri = "QUALITEENS";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService
  ) { }

  get(refresh: boolean = false): Observable<Qualiteens[]>{
    const objStorage = localStorage.getItem(constantes.requestCache.qualiteList);
  
    if (objStorage && !refresh) {
      const listqualite: Qualiteens[] = JSON.parse(objStorage);
      return of(listqualite);
    }
    return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
      tap(response => {
        localStorage.setItem(constantes.requestCache.qualiteList, JSON.stringify(response))
      })
    )
  }

  getOne(idqualiteens: number): Observable<Qualiteens> {
    return this.globalService.setHttpRequest(this.uri + '/' + idqualiteens, "GET", {});
  }

  update(qualiteens: Qualiteens): Observable<Qualiteens> {
    const BASE_PATH = `${this.uri}/${qualiteens.IDQUALITEENS}`;
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", qualiteens, Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.qualiteList)
      })
    );
  }
  
  
  delete(IDQUALITEENS: number): Observable<string> {
    const url = `${this.uri}/${IDQUALITEENS}`;
    return this.globalService.setHttpRequest(url, "DELETE", null, Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.qualiteList)
      })
    );
  }
  
  

  create(qualiteens: Qualiteens): Observable<Qualiteens> {
    const BASE_PATH = `${this.uri}`;
    return this.globalService.setHttpRequest(BASE_PATH, "POST", qualiteens,Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.qualiteList)
      })
    );
  }
}
