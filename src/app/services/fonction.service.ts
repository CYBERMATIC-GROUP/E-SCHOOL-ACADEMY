import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Fonction } from '../models/fonction.model';
import { GlobalService } from '../services/global.service';
import { environment } from 'src/environnements/environnement.prod';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class FonctionService {

  uri = "FONCTIONS";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService
  ) { }

  get(refresh: boolean = false): Observable<Fonction[]>{
    const objStorage = localStorage.getItem(constantes.requestCache.fonctionList);
    if (objStorage && !refresh) {
      const fonctions: Fonction[] = JSON.parse(objStorage);
      return of(fonctions);
    }
    return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
      tap(response => {
        localStorage.setItem(constantes.requestCache.fonctionList, JSON.stringify(response))
      })
    )
  }

  getOne(idfonction: number): Observable<Fonction> {
    return this.globalService.setHttpRequest(this.uri + '/' + idfonction, "GET", {});
  }

  update(fonction: Fonction): Observable<Fonction> {
    const BASE_PATH = `${this.uri}/${fonction.IDFONCTIONS}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", fonction, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.fonctionList)
      })
    );
  }
  
  
  delete(IDFONCTIONS: number): Observable<string> {
    const url = `${this.uri}/${IDFONCTIONS}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, "DELETE", null, headers);
  }
  
  

  create(fonction: Fonction): Observable<any> {
    const BASE_PATH = `${this.uri}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "POST", fonction,headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.fonctionList)
      })
    );
  }
}
