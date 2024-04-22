import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Ville } from '../models/ville.model';
import { GlobalService } from '../services/global.service';


@Injectable({
  providedIn: 'root'
})
export class VilleService {

  uri = "VILLE";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService) { }

    get(): Observable<Ville[]>{
 
      return this.globalService.setHttpRequest(this.uri, "GET", {},Headers)
      
    }
    
    

    getOne(IDVILLE: number): Observable<Ville> {
      return this.globalService.setHttpRequest(this.uri + '/' + IDVILLE, "GET", {});
    }
  
    update(ville: Ville): Observable<Ville> {
      const BASE_PATH = `${this.uri}/${ville.IDVILLE}`;
      const headers = this.globalService.getHeaders();
      return this.globalService.setHttpRequest(BASE_PATH, "PUT", ville, headers);
    }
    
    
    delete(IDVILLE: number): Observable<string> {
      const url = `${this.uri}/${IDVILLE}`;
      const headers = this.globalService.getHeaders();
      return this.globalService.setHttpRequest(url, "DELETE", null, headers);
    }
  
    create(ville: Ville): Observable<Ville> {
      const BASE_PATH = `${this.uri}`;
      const headers = this.globalService.getHeaders();
      return this.globalService.setHttpRequest(BASE_PATH, "POST", ville , headers);
    }

}
