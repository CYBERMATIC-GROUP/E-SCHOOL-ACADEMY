import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, tap } from 'rxjs';
import { Etablissement } from '../models/etablissement.model';
import { GlobalService } from '../services/global.service';
import { EtablissementList } from '../models/etablissementList.model';
import { apiUris, constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  uri = "ETAB";

  constructor(
    private http:HttpClient,
    private globalService: GlobalService
  ) { }

  get(refresh: boolean = false): Observable<EtablissementList[]>{

    const objStore = this.globalService.tryRequestFromCache(constantes.requestCache.etablissementsScolaires);

    if(objStore && !refresh){
      console.log('etatblissements getted from storage');
      return objStore;
    }

    return this.globalService.setHttpRequest(apiUris.etablissement.etablissementList, "GET").pipe(
      tap(res => {
        console.log(res);

        localStorage.setItem(constantes.requestCache.etablissementsScolaires, JSON.stringify(res))
      })
    )
  }

  getOne(IDETAB: string): Observable<Etablissement> {
    return this.globalService.setHttpRequest(this.uri + '/' + IDETAB, "GET", {});
  }

   update(etablissement: Etablissement): Observable<Etablissement> {
    const BASE_PATH = `${this.uri}/${etablissement.IDETAB}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", etablissement);
  }


  delete(IDETAB: number): Observable<string> {
    const url = `${this.uri}/${IDETAB}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, "DELETE", null, headers);
  }



  create(etablissement: Etablissement): Observable<Etablissement> {
    const BASE_PATH = `${this.uri}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "POST", etablissement,headers);
  }
}
