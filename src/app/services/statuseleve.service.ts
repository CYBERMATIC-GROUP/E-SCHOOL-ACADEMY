import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { StatusEleve } from '../models/statuseleve.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';



@Injectable({
  providedIn: 'root'
})
export class StatuseleveService {

  uri = "STATUTELEVE";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService) { }

    get(refresh: boolean = false): Observable<StatusEleve[]>{
     const objStorage = localStorage.getItem(constantes.requestCache.status);
       if (objStorage && !refresh) {
      const status: StatusEleve[] = JSON.parse(objStorage);
      return of(status);
    }
      return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
      tap(res => {
        localStorage.setItem('status', JSON.stringify(res))
      })
    )
    }

    getOne(IDSTATUTELEVE: number): Observable<StatusEleve> {
      return this.globalService.setHttpRequest(this.uri + '/' + IDSTATUTELEVE, "GET", {});
    }
  
    update(status: StatusEleve): Observable<StatusEleve> {
      const BASE_PATH = `${this.uri}/${status.IDSTATUTELEVE}`;
      return this.globalService.setHttpRequest(BASE_PATH, "PUT", status, Headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.status)
        })
      );
    }
    
    
    delete(IDSTATUTELEVE: number): Observable<string> {
      const url = `${this.uri}/${IDSTATUTELEVE}`;
      const headers = this.globalService.getHeaders();
      return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.status)
        })
      );
    }
  
    create(status: StatusEleve): Observable<StatusEleve> {
      const BASE_PATH = `${this.uri}`;
      const headers = this.globalService.getHeaders();
      return this.globalService.setHttpRequest(BASE_PATH, "POST", status , headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.status)
        })
      );
    }
}
