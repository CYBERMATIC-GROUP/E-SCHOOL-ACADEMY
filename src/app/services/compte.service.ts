import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, map, of, tap } from 'rxjs';
import { Compte, consulTationCompte } from '../models/compte.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';
import { CreateCopmteParent, ValidateCompte } from '../models/createcompteparent.model';
import { header } from '../models/header.model';
import { environment } from 'src/environnements/environnement.prod';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  uri = "COMPTE_Filtre";
  compte = "COMPTE"
  uricreatecompteparent = "UTILISATEUR_Crer_Compte"
  uriCompteBanque = "COMPTE_Liste_Compte_Simplisiee"
  urivalidatecompte = "UTILISATEUR_Validation_Compte"

  constructor(
    private http: HttpClient,    
    private globalService: GlobalService
  ) { }


get(refresh: boolean = false): Observable<Compte> {
  return this.globalService.setHttpRequest(this.uri, 'POST', {}, Headers)
}

getListCompteBanque(IDCOMPTE: number, cach: boolean = false){
  const cacheCompte = "ALLCOMPTES";
  if (cach){
    const obj = localStorage.getItem(cacheCompte)
    if (obj){
      const comptes = JSON.parse(obj)
      return of(comptes)
    }
  }
  return this.globalService.setHttpRequest(this.uriCompteBanque + '/' + IDCOMPTE, "GET", {}).pipe(
    tap(res => {
      localStorage.setItem(cacheCompte, JSON.stringify(res))
    })
  )
}

  getOne(IDCOMPTE: number): Observable<Compte> {
    return this.globalService.setHttpRequest(this.compte + '/' + IDCOMPTE, "GET", {});
  }

  getOnecompteparent(IDCOMPTE: number): Observable<CreateCopmteParent> {
    return this.globalService.setHttpRequest(this.compte + '/' + IDCOMPTE, "GET", {});
  }


  
  update(data: Compte): Observable<Compte> {
    const BASE_PATH = `${this.compte}/${data.IDCOMPTE}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", data, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.compteList)
      })
    );
  }

  updatecompteparent(data: CreateCopmteParent): Observable<CreateCopmteParent> {
    const BASE_PATH = `${this.compte}/${data.IDCOMPTE_UTILISATEUR}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", data, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.compteList)
      })
    );
  }
  
  
  
  delete(IDCYCLES: number): Observable<string> {
    const url = `${this.compte}/${IDCYCLES}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.compteList)
      })
    );
  }
  
  
  
  create(compte: Compte): Observable<Compte> {
    const BASE_PATH = `${this.compte}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "POST", compte,headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.compteList)
      })
    );
  }


  createcompteparent(compte: CreateCopmteParent,head : header) {
    console.log(compte);
    console.log(head);
    const headerInit = new HttpHeaders({
      ...head
    })
    const uri = "UTILISATEUR_Crer_Compte"
    return this.http.post(environment.apiUrl + uri, compte, { headers: headerInit, observe: 'response' });
  }


  validationcompteparent(compte: ValidateCompte ,head : header) {
    console.log(compte);
    console.log(head);
    const headerInit = new HttpHeaders({
      ...head
    })
    const uri = "UTILISATEUR_Validation_Compte"
    return this.http.post(environment.apiUrl + uri, compte, { headers: headerInit, observe: 'response' });
  }



  getConsultationCompte(sCompte: string, sDateDebut: string, sDateFin: string, nModePaiment: number): Observable<consulTationCompte[]>{
    const url = `Consultation_Compte/${sCompte}/${sDateDebut}/${sDateFin}/${nModePaiment}`;
    return this.globalService.setHttpRequest(url, "POST", {}).pipe(map(res => res.body))
  }
}
