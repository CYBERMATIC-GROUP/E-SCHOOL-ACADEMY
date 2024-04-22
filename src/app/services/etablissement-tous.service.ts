import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { Etablissements } from '../models/etablissement-tous.model';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class EtablissementTousService {

  uri = "ETABLISSEMENTS";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService) { }

    get(refresh: boolean = false): Observable<Etablissements[]> {
      const objStorage = localStorage.getItem(constantes.requestCache.etablissementList);
      if (objStorage && !refresh) {
        const etabs: Etablissements[] = JSON.parse(objStorage);
        return of(etabs);
      }
      return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
        tap(response => {
          localStorage.setItem(constantes.requestCache.etablissementList, JSON.stringify(response))
        })
      )
    }

    getOne(idetablissement: number): Observable<Etablissements> {
      return this.globalService.setHttpRequest(this.uri + '/' + idetablissement, "GET", {});
    }
  
    update(etablissement: Etablissements): Observable<Etablissements> {
      const BASE_PATH = `${this.uri}/${etablissement.IDETABLISSEMENTS}`;
      const headers = this.globalService.getHeaders();
      return this.globalService.setHttpRequest(BASE_PATH, "PUT", etablissement, headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.etablissementList)
        })
      );
    }
    
    
    delete(idetablissement: number): Observable<string> {
      const url = `${this.uri}/${idetablissement}`;
      const headers = this.globalService.getHeaders();
      return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.etablissementList)
        })
      );
    }
  
    create(etablissement: Etablissements): Observable<Etablissements> {
      const BASE_PATH = `${this.uri}`;
      const headers = this.globalService.getHeaders();
      return this.globalService.setHttpRequest(BASE_PATH, "POST", etablissement , headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.etablissementList)
        })
      );
    }
}
