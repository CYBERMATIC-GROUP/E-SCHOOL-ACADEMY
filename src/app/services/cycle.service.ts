import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Cycle } from '../models/cycle.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class CycleService {

  uri = "CYCLES";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService
  ) { }

  get(refresh: boolean = false): Observable<Cycle[]>{

    const objStorage = this.globalService.tryRequestFromCache(constantes.requestCache.cyclesList);
    if (objStorage && !refresh) {
      return objStorage;
    }
    return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
      tap(response => {
        localStorage.setItem(constantes.requestCache.cyclesList, JSON.stringify(response))
      })
    )
  }

  //TEST SANS LOCALSTORAGE

  getList(){
    return this.globalService.setHttpRequest(this.uri, "GET", {},Headers)
  }

  MiseAjour(cycle: Cycle): Observable<Cycle> {
    const BASE_PATH = `${this.uri}/${cycle.IDCYCLES}`;
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", cycle, Headers)
  }


  getOne(IDCYCLES: number): Observable<Cycle> {
    return this.globalService.setHttpRequest(this.uri + '/' + IDCYCLES, "GET", {});
  }





  update(cycle: Cycle): Observable<Cycle> {
    const BASE_PATH = `${this.uri}/${cycle.IDCYCLES}`;
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", cycle, Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.cyclesList)
      })
    );
  }
  
  
  delete(IDCYCLES: number): Observable<string> {
    const url = `${this.uri}/${IDCYCLES}`;
    return this.globalService.setHttpRequest(url, "DELETE", {}, Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.cyclesList)
      })
    );
  }
  
  
  
  create(cycle: Cycle): Observable<Cycle> {
    const BASE_PATH = `${this.uri}`;
    return this.globalService.setHttpRequest(BASE_PATH, "POST", cycle,Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.cyclesList)
      })
    );
  }
  
}
