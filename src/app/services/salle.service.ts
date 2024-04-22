import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Salle } from '../models/salle.model';
import { GlobalService } from '../services/global.service';
import { environment } from 'src/environnements/environnement.prod';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  uri = "SALLES";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService) { }

    get(refresh: boolean = false): Observable<Salle[]>{
      const objStorage = localStorage.getItem('salles');
    
      if (objStorage && !refresh) {
        const salles: Salle[] = JSON.parse(objStorage);
        return of(salles);
      }
      return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
        tap(response => {
          localStorage.setItem('salles', JSON.stringify(response))
        })
      )
    }

    getOne(idsalle: number): Observable<Salle> {
      return this.globalService.setHttpRequest(this.uri + '/' + idsalle, "GET", {},Headers);
    }
  
    update(salle: Salle): Observable<Salle> {
      const BASE_PATH = `${this.uri}/${salle.IDSALLES}`;
      return this.globalService.setHttpRequest(BASE_PATH, "PUT", salle, Headers);
    }
    
    
    delete(idsalle: number): Observable<string> {
      const url = `${this.uri}/${idsalle}`;
      return this.globalService.setHttpRequest(url, "DELETE", null, Headers);
    }
    
    
  
    create(salle: Salle): Observable<Salle> {
      const BASE_PATH = `${this.uri}`;
      return this.globalService.setHttpRequest(BASE_PATH, "POST", salle,Headers);
    }
}
