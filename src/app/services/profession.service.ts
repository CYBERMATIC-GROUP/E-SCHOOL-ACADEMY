import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Profession } from '../models/profession.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  uri = "PROFESSION";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService) { }

    get(refresh: boolean = false): Observable<Profession[]>{

      return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
        tap(response => {
        })
      )
    }
    getOne(idprofession: number): Observable<Profession> {
      return this.globalService.setHttpRequest(this.uri + '/' + idprofession, "GET", {});
    }
  
    update(profession: Profession): Observable<Profession> {
      const BASE_PATH = `${this.uri}/${profession.IDPROFESSION}`;
      return this.globalService.setHttpRequest(BASE_PATH, "PUT", profession, Headers).pipe(
        tap(response => {
          localStorage.setItem(constantes.requestCache.professionList, JSON.stringify(response))
        })
      );
    }
    
    
    delete(idprofession: number): Observable<string> {
      const url = `${this.uri}/${idprofession}`;
      return this.globalService.setHttpRequest(url, "DELETE", null, Headers);
    }
    
    
  
    create(Profession: Profession): Observable<Profession> {
      const BASE_PATH = `${this.uri}`;
      return this.globalService.setHttpRequest(BASE_PATH, "POST", Profession,Headers).pipe();
    }
}
