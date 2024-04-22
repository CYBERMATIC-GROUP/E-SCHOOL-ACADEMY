import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Categorie } from '../models/categorie.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  uri = "CATEGORIE";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService
  ) { }

  get(refresh: boolean = false): Observable<Categorie[]>{
    const objStorage = localStorage.getItem(constantes.requestCache.categorie);
  
    if (objStorage && !refresh) {
      const arrObj: Categorie[] = JSON.parse(objStorage);
      return of(arrObj);
    }
    return this.globalService.setHttpRequest(this.uri, "GET", {}).pipe(
      tap(res => {
        localStorage.setItem(constantes.requestCache.categorie, JSON.stringify(res))
      })
    )
  }

  getOne(IDcategorie: number): Observable<Categorie> {
    return this.globalService.setHttpRequest(this.uri + '/' + IDcategorie, "GET", {});
  }

  update(categorie: Categorie): Observable<Categorie> {
    const BASE_PATH = `${this.uri}/${categorie.IDCATEGORIE}`;
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", categorie, Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.categorie)
      })
    );;
  }
  
  
  delete(IDcategorie: number): Observable<string> {
    const url = `${this.uri}/${IDcategorie}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.categorie)
      })
    );
  }
  
  

  create(Categorie: Categorie): Observable<Categorie> {
    const BASE_PATH = `${this.uri}`;
    return this.globalService.setHttpRequest(BASE_PATH, "POST", Categorie,Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.categorie)
      })
    );
  }

}
