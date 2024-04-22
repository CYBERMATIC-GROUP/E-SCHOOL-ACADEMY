import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, of, tap } from 'rxjs';
import { Arrondissement } from '../models/arrondissement.model';
import { GlobalService } from '../services/global.service';
import { environment } from 'src/environnements/environnement';
import { ErrorInterface } from '../models/error.model';
import { Annee } from '../models/annee.model';
import { constantes } from 'src/environnements/constantes';


@Injectable({
  providedIn: 'root',
})
export class ArrondissementService {
  uri = 'Arrondissement';
  uriRessource = 'DEP_ARR_QTIER/Arrondissement';

  constructor(private http: HttpClient, private globalService: GlobalService) {}

  getOne(IDARRONDISSEMENT: string): Observable<Arrondissement> {
    return this.globalService.setHttpRequest(
      this.uri + '/' + IDARRONDISSEMENT,
      'GET',
      {},
      Headers
    );
  }

  update(arrondissement: Arrondissement): Observable<Arrondissement> {
    const BASE_PATH = `${this.uri}/${arrondissement.IDARRONDISSEMENT}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(
      BASE_PATH,
      'PUT',
      arrondissement,
      headers
    ).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.arrondissementList)
      })
    );
  }

  delete(IDARRONDISSEMENT: string): Observable<string> {
    const url = `${this.uri}/${IDARRONDISSEMENT}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, 'DELETE', null, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.arrondissementList)
      })
    );
  }

  create(arrondissement: Arrondissement): Observable<any> {
    const BASE_PATH = `${this.uri}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(
      BASE_PATH,
      'POST',
      arrondissement,
      headers
    ).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.arrondissementList)
      })
    );
  }

  get(iddepartement: number) {
    const url = `${this.uriRessource}`;
    const data = {IDDEPARTEMENT: iddepartement};
    return this.globalService.setHttpRequest(url,"POST", data, Headers)
  }

  RecuperationDepartement(iddepartement: number) {
    const url = `${this.uriRessource}`;
    const data = {
      IDDEPARTEMENT: iddepartement,
    };
    return this.globalService.setHttpRequest(url,"POST", data, Headers)

  }
}
  