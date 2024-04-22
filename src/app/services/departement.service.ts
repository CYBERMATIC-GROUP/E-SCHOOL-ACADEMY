import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Departement } from '../models/departement.model';
import { GlobalService } from '../services/global.service';
import { environment } from 'src/environnements/environnement.prod';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  uri = "Departement";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService
  ) { }

  get(refresh: boolean = false): Observable<Departement[]>{
    const objStorage = localStorage.getItem(constantes.requestCache.departementsList);
  
    if (objStorage && !refresh) {
      const arrObj: Departement[] = JSON.parse(objStorage);
      return of(arrObj);
    }
    return this.globalService.setHttpRequest(this.uri, "GET", {}).pipe(
      tap(res => {
        localStorage.setItem(constantes.requestCache.departementsList, JSON.stringify(res));
      })
    )
  }

  getOne(IDDEPARTEMENT: number): Observable<Departement> {
    return this.globalService.setHttpRequest(this.uri + '/' + IDDEPARTEMENT, "GET", {});
  }

  update(departement: Departement): Observable<Departement> {
    const BASE_PATH = `${this.uri}/${departement.IDDEPARTEMENT}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", departement, headers).pipe(
      tap(res => {
        localStorage.removeItem(constantes.requestCache.departementsList)
      })
    )
  }
  
  
  delete(IDDEPARTEMENT: number): Observable<string> {
    const url = `${this.uri}/${IDDEPARTEMENT}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
      tap(res => {
        localStorage.removeItem(constantes.requestCache.departementsList)
      })
    )
  }
  
  

  create(departement: Departement): Observable<Departement> {
    const BASE_PATH = `${this.uri}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "POST", departement,headers).pipe(
      tap(res => {
        localStorage.removeItem(constantes.requestCache.departementsList)
      })
    )
  }
}
