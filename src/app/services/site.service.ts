import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Site } from '../models/site.model';
import { GlobalService } from '../services/global.service';
import { environment } from 'src/environnements/environnement.prod';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  uri = "SITE";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService) { }

    get(refresh: boolean = false): Observable<Site[]>{
      const objStorage = this.globalService.tryRequestFromCache(constantes.requestCache.sitesList);
    
      if (objStorage && !refresh) {
        return objStorage;
      }
      return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
        tap(response => {
          localStorage.setItem(constantes.requestCache.sitesList, JSON.stringify(response))
        })
      )
    }

    getOne(idsite: number): Observable<Site> {
      return this.globalService.setHttpRequest(this.uri + '/' + idsite, "GET", {});
    }
  
    update(site: Site): Observable<Site> {
      const BASE_PATH = `${this.uri}/${site.IDSITE}`;
      return this.globalService.setHttpRequest(BASE_PATH, "PUT", site, Headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.sitesList)
        })
      );
    }
    
    
    delete(IDSITE: number): Observable<string> {
      const url = `${this.uri}/${IDSITE}`;
      return this.globalService.setHttpRequest(url, "DELETE", {}, Headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.sitesList)
        })
      );
    }
    
    
  
    create(site: Site): Observable<any> {
      const BASE_PATH = `${this.uri}`;
      return this.globalService.setHttpRequest(BASE_PATH, "POST", site,Headers).pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.sitesList)
        })
      );
    }
}
