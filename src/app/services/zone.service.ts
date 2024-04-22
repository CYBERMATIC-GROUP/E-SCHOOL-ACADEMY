import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Zone } from '../models/zone.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';


@Injectable({
  providedIn: 'root'
})
export class ZoneService {

uri = "Zone";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService) { }

    get(): Observable<Zone[]>{
      return this.globalService.setHttpRequest(this.uri, "GET", {},Headers)
    }

    getOne(IDZone: number): Observable<Zone> {
      return this.globalService.setHttpRequest(this.uri + '/' + IDZone, "GET", {});
    }
  
    update(zone: Zone): Observable<Zone> {
      const BASE_PATH = `${this.uri}/${zone.IDZone}`;
      const headers = this.globalService.getHeaders();
      return this.globalService.setHttpRequest(BASE_PATH, "PUT", zone, headers);
    }
    
    
    delete(IDZone: number): Observable<string> {
      const url = `${this.uri}/${IDZone}`;
      const headers = this.globalService.getHeaders();
      return this.globalService.setHttpRequest(url, "DELETE", null, headers);
    }
  
    create(zone: Zone): Observable<Zone> {
      const BASE_PATH = `${this.uri}`;
      const headers = this.globalService.getHeaders();
      return this.globalService.setHttpRequest(BASE_PATH, "POST", zone , headers);
    }
}
