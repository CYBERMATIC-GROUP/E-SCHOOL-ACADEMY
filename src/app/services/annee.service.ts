import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Annee } from '../models/annee.model';
import { GlobalService } from '../services/global.service';
import { environment } from 'src/environnements/environnement.prod';
import { login } from '../login/login.component';
import { header } from '../models/header.model';

@Injectable({
  providedIn: 'root'
})
export class AnneeService {

  uri = "ANNEE_SCOLAIRE";

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  get(header: header): Observable<Annee[]>{
    console.log(header);
    const headConfig = new HttpHeaders({...header});
    return this.http.get<Annee[]>(environment.apiUrl + this.uri, {headers: headConfig})
  }

  getList(refresh: boolean = false): Observable<Annee[]>{
    const objStorage = localStorage.getItem('anneeList');
    
    if (objStorage && !refresh) {
      const anneeList: Annee[] = JSON.parse(objStorage);
      return of(anneeList);
    }
    return this.globalService.setHttpRequest(this.uri, "GET", {}).pipe(
      tap(response => {
        localStorage.setItem('anneeList', JSON.stringify(response))
      })
    )
  }


  getOne(idannee: number): Observable<Annee> {
    return this.globalService.setHttpRequest(this.uri + '/' + idannee, "GET", {});
  }

  update(annee: Annee): Observable<Annee> {
    const BASE_PATH = `${this.uri}/${annee.IDANNEE}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", annee, headers).pipe(
      tap(data => {
        localStorage.removeItem("anneeList")
      })
    );
  }
  
  
  delete(idannee: number): Observable<string> {
    const url = `${this.uri}/${idannee}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
      tap(data => {
        localStorage.removeItem("anneeList")
      })
    );
  }
  
  

  create(Annee: Annee): Observable<Annee> {
    const BASE_PATH = `${this.uri}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "POST", Annee,headers).pipe(
      tap(data => {
        localStorage.removeItem("anneeList")
      })
    );
  }

}
