import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, of, tap } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { Quartier } from '../models/quartier.model';
import { environment } from 'src/environnements/environnement';
import { ErrorInterface } from '../models/error.model';
import { Arrondissement } from '../models/arrondissement.model';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class QuartierService {

    uri = "Quartier";
    uriRessource = "DEP_ARR_QTIER/Quartier"
    uriRessources = "DEP_ARR_QTIER/Arrondissement"

  constructor(
    private http:HttpClient,
    private globalService: GlobalService
  ) { }

  get(IDDEPARTEMENT: number,IDARRONDISSEMENT: number) {
    const url = `${this.uriRessource}`;
    const data = {IDDEPARTEMENT:IDDEPARTEMENT, DARRONDISSEMENT: IDARRONDISSEMENT};
    return this.globalService.setHttpRequest(url,"POST",data,Headers)

  }


  getByArr(IDARRONDISSEMENT: number) {
    const url = `${this.uriRessource}`;
    const data = {IDARRONDISSEMENT: IDARRONDISSEMENT};
    return this.globalService.setHttpRequest(url,"POST",data,Headers)

  }

  getOne(IDQUARTIER: number): Observable<Quartier> {
    return this.globalService.setHttpRequest(this.uri + '/' + IDQUARTIER, "GET", {});
  }

  update(quartier: Quartier): Observable<Quartier> {
    const BASE_PATH = `${this.uri}/${quartier.IDQUARTIER}`;
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", quartier, Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.quartierList)
      })
    );
  }


  delete(IDQUARTIER: number): Observable<string> {
    const url = `${this.uri}/${IDQUARTIER}`;
    return this.globalService.setHttpRequest(url, "DELETE", null, Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.quartierList)
      })
    );
  }



  create(quartier: Quartier): Observable<any> {
    const BASE_PATH = `${this.uri}`;
    return this.globalService.setHttpRequest(BASE_PATH, "POST", quartier,Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.quartierList)
      })
    );
  }

  RecuperationArrondissement(IDARRONDISSEMENT: number) {
    const url = `$${this.uriRessource}`;
    const data = {IDARRONDISSEMENT: IDARRONDISSEMENT};
    return this.globalService.setHttpRequest(url,"POST",data,Headers)
  }

  RecuperationQuartierByArrondissement(IDDEPARTEMENT:number,IDARRONDISSEMENT: number) {
    const url = `$${this.uriRessource}`;
    const data = {IDDEPARTEMENT:IDDEPARTEMENT,IDARRONDISSEMENT: IDARRONDISSEMENT};
    return this.globalService.setHttpRequest(url,"POST",data,Headers)
  }



  Recuperations(IDDEPARTEMENT: number) {
    const url = `${this.uriRessources}`;
    const data = { IDDEPARTEMENT: IDDEPARTEMENT };
    return this.globalService.setHttpRequest(url,"POST",data,Headers)

  }


  RecuperationDepartement(IDDEPARTEMENT: number) {
    const url = `$${this.uriRessource}`;
    const data = {IDDEPARTEMENT: IDDEPARTEMENT};
    return this.globalService.setHttpRequest(url,"POST",data,Headers)
  }


}
