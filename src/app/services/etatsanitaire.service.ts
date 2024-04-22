import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { EtatSanitaire } from '../models/etatSanitaire.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class EtatsanitaireService {

  uri = "ETAT_SANITAIRE";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService) { }

    get(refresh: boolean = false): Observable<EtatSanitaire[]> {
      const objStorage = localStorage.getItem(constantes.requestCache.etatSanitaire);
      if (objStorage && !refresh) {
        const etats: EtatSanitaire[] = JSON.parse(objStorage);
        return of(etats);
      }
      return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
        tap(res => {
          localStorage.setItem(constantes.requestCache.etatSanitaire, JSON.stringify(res))
        })
      )
    }

    getOne(IDETAT_SANITAIRE: number): Observable<EtatSanitaire> {
      return this.globalService.setHttpRequest(this.uri + '/' + IDETAT_SANITAIRE, "GET", {});
    }
  
    update(sante: EtatSanitaire): Observable<EtatSanitaire> {
      const BASE_PATH = `${this.uri}/${sante.IDETAT_SANITAIRE}`;
      const headers = this.globalService.getHeaders();
      return this.globalService.setHttpRequest(BASE_PATH, "PUT", sante, headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.etatSanitaire)
        })
      );
    }
    
    
    delete(IDETAT_SANITAIRE: number): Observable<string> {
      const url = `${this.uri}/${IDETAT_SANITAIRE}`;
      const headers = this.globalService.getHeaders();
      return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.etatSanitaire)
        })
      );
    }
  
    create(sante: EtatSanitaire): Observable<EtatSanitaire> {
      const BASE_PATH = `${this.uri}`;
      const headers = this.globalService.getHeaders();
      return this.globalService.setHttpRequest(BASE_PATH, "POST", sante , headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.etatSanitaire)
        })
      );
    }
}
