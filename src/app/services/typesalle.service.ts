import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Typesalle } from '../models/typesalle.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class TypesalleService {

  uri = "TYPESALLE";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService) { }

    get(refresh: boolean = false): Observable<Typesalle[]>{
      const objStorage = localStorage.getItem(constantes.requestCache.typesalle);
    
      if (objStorage && !refresh) {
        const typesalles: Typesalle[] = JSON.parse(objStorage);
        return of(typesalles);
      }
      return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
        tap(response => {
          localStorage.setItem(constantes.requestCache.typesalle, JSON.stringify(response))
        })
      )
    }
    
    

    getOne(IDTYPESALLE: number): Observable<Typesalle> {
      return this.globalService.setHttpRequest(this.uri + '/' + IDTYPESALLE, "GET", {});
    }
  
    update(typesalle: Typesalle): Observable<Typesalle> {
      const BASE_PATH = `${this.uri}/${typesalle.IDTYPESALLE}`;
      return this.globalService.setHttpRequest(BASE_PATH, "PUT", typesalle, Headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.typesalle)
        })
      );
    }
    
    
    delete(IDTYPESALLE: number): Observable<string> {
      const url = `${this.uri}/${IDTYPESALLE}`;
      return this.globalService.setHttpRequest(url, "DELETE", {}, Headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.typesalle)
        })
      );
    }
  
    create(typesalle: Typesalle): Observable<Typesalle> {
      const BASE_PATH = `${this.uri}`;
      return this.globalService.setHttpRequest(BASE_PATH, "POST", typesalle , Headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.typesalle)
        })
      );;
    }

}
