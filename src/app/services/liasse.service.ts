import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Matiere } from '../models/matiere.model';
import { GlobalService } from '../services/global.service';
import { HttpClient } from '@angular/common/http';
import { constantes } from 'src/environnements/constantes';
import { Liasse } from '../models/liasse.model';

@Injectable({
  providedIn: 'root'
})
export class LiasseService {

  uri = "LIASSE";

  constructor(
    private http:HttpClient,
    private globalService: GlobalService
  ) { }

  get(): Observable<Liasse[]> {
    return this.globalService.setHttpRequest(this.uri, "GET", {});
  }
  

  getOne(IDLIASSE: number): Observable<Liasse> {
    return this.globalService.setHttpRequest(this.uri + '/' + IDLIASSE, "GET", {});
  }
  
  update(liasse: Liasse): Observable<Liasse> {
    const BASE_PATH = `${this.uri}/${liasse.IDLIASSE}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", liasse, headers);
  }


  delete(IDLIASSE: number): Observable<string> {
    const url = `${this.uri}/${IDLIASSE}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, "DELETE", null, headers);
  }

  create(liasse: Liasse): Observable<Liasse> {
    const BASE_PATH = `${this.uri}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "POST", liasse,headers);
  }

}
