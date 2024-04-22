import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Diplome } from '../models/diplomes.models';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';
import { EleveService } from './eleve.service';
@Injectable({
  providedIn: 'root',
})
export class DiplomeService {
  uri = 'DIPLOME';

  constructor(private http: HttpClient, private globalService: GlobalService) {}

  get(refresh: boolean = false): Observable<Diplome[]> {

      const objStorage = localStorage.getItem(constantes.requestCache.DiplomeList);

      if (objStorage && !refresh) {
      const Diplomes: Diplome[] = JSON.parse(objStorage);
      return of(Diplomes);
    }
    return this.globalService.setHttpRequest(this.uri, 'GET', {}, Headers).pipe(
      tap(response => {
        localStorage.setItem(constantes.requestCache.DiplomeList, JSON.stringify(response))
      })
    )
  }

  getOne(IDDIPLOME: number): Observable<Diplome> {
    return this.globalService.setHttpRequest(
      this.uri + '/' + IDDIPLOME,
      'GET',
      {}
    );
  }

  update(diplome: Diplome): Observable<Diplome> {
    const BASE_PATH = `${this.uri}/${diplome.IDDIPLOME}`;
    return this.globalService.setHttpRequest(
      BASE_PATH,
      'PUT',
      diplome,
      Headers
    ).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.DiplomeList)
      })
    );
  }

  delete(IDDIPLOME: number): Observable<string> {
    const url = `${this.uri}/${IDDIPLOME}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, 'DELETE', null, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.DiplomeList)
      })
    );
  }

  create(diplome: Diplome): Observable<Diplome> {
    const BASE_PATH = `${this.uri}`;
    return this.globalService.setHttpRequest(
      BASE_PATH,
      'POST',
      diplome,
      Headers
    ).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.DiplomeList)
      })
    );
  }
}
