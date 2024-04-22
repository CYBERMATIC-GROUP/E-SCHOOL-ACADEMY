import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Echelon } from '../models/echelon.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class EchelonService {

  uri = "ECHELON";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService
  ) { }

  get(refresh: boolean = false): Observable<Echelon[]>{
     const objStorage = localStorage.getItem(constantes.requestCache.echelonList);
    if (objStorage && !refresh) {
      const echelons: Echelon[] = JSON.parse(objStorage);
      return of(echelons);
    }
    return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
      tap(response => {
        localStorage.setItem(constantes.requestCache.echelonList, JSON.stringify(response))
      })
    )
  }

  getOne(idechelon: number): Observable<Echelon> {
    return this.globalService.setHttpRequest(this.uri + '/' + idechelon, "GET", {});
  }

  update(echelon: Echelon): Observable<Echelon> {
    const BASE_PATH = `${this.uri}/${echelon.IDECHELON}`;
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", echelon, Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.echelonList)
      })
    );
  }
  
  
  delete(idechelon: number): Observable<string> {
    const url = `${this.uri}/${idechelon}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.echelonList)
      })
    );
  }
  
  

  create(Echelon: Echelon): Observable<Echelon> {
    const BASE_PATH = `${this.uri}`;
    return this.globalService.setHttpRequest(BASE_PATH, "POST", Echelon,Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.echelonList)
      })
    );
  }

}
