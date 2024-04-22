import { Inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { Actualite } from '../models/actualite.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {
  uri = "ActualitesPortail"

  constructor(
    private globalService: GlobalService,
    private cookieService: CookieService
  ) { }

  get(refresh: boolean = false): Observable<Actualite[]>{
    const nameCookie = "ActualitesPortaile";
    
    if (!refresh){
      const cookie = this.cookieService.get(nameCookie);
      if(cookie){
        this.globalService.setHttpRequest(this.uri, "GET").pipe(
          tap(res => {
            this.cookieService.set(nameCookie, JSON.stringify(res), this.globalService.getMinForCookie())
          })
        ).subscribe();
        return of(JSON.parse(cookie))
      }
    }
    return this.globalService.setHttpRequest(this.uri, "GET").pipe(
      tap(res => {
        this.cookieService.set(nameCookie, JSON.stringify(res), this.globalService.getMinForCookie())
      })
    )
  }


  getOne(IDActualitesPortail: number): Observable<Actualite> {
    return this.globalService.setHttpRequest(this.uri + '/' + IDActualitesPortail, "GET", {},Headers);
  }

  update(Notification: Actualite): Observable<Actualite> {
    const BASE_PATH = `${this.uri}/${Notification.IDActualitesPortail}`;
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", Notification, Headers)
  }
  
  
  delete(IDActualitesPortail: number): Observable<string> {
    const url = `${this.uri}/${IDActualitesPortail}`;
    return this.globalService.setHttpRequest(url, "DELETE", null, Headers);
  }
  
  

  create(Notification: Actualite): Observable<Actualite> {
    const BASE_PATH = `${this.uri}`;
    return this.globalService.setHttpRequest(BASE_PATH, "POST", Notification,Headers)
  }


}
