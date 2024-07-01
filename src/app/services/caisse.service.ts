import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, map, of, tap } from 'rxjs';
import { Caisse } from '../models/caisse.model';
import { GlobalService } from '../services/global.service';
import { HistoriqueClotureCaisse } from '../models/historiquecloturecaisse.model';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root',
})
export class CaisseService {
  uri = 'CAISSE';
  historiqueClotureCaisse = 'COMPTA_Get_Cloture_Caisse';
  Cloture_Decloture_Caisse = 'COMPTA_Cloture_Decloture_Caisse';
  imprimeclotureCaisse = 'COMPTA_Imprime_Cloture_Caisse';
  modePayement = 'COMPTA_MODE_PAIEMENT'

  constructor(private http: HttpClient, private globalService: GlobalService) {}

  
  get(refresh: boolean = false): Observable<Caisse[]> {
    const objStorage = localStorage.getItem(constantes.requestCache.caisse);

    if (objStorage && !refresh) {
      const arrObj: Caisse[] = JSON.parse(objStorage);
      return of(arrObj);
    }
    return this.globalService.setHttpRequest(this.uri, 'GET', {}).pipe(
      tap((res) => {
        localStorage.setItem(constantes.requestCache.caisse, JSON.stringify(res));
      })
    );
  }

  getOne(IDCAISSE: number): Observable<Caisse> {
    return this.globalService.setHttpRequest(
      this.uri + '/' + IDCAISSE,
      'GET',
      {}
    );
  }

  getModePayement() {
    return this.globalService.setHttpRequest(this.modePayement,'GET',{},Headers);
  }

  update(caisse: Caisse): Observable<Caisse> {
    const BASE_PATH = `${this.uri}/${caisse.IDCAISSE}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, 'PUT', caisse, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.caisse)
      })
    );;
  }

  delete(IDCAISSE: number): Observable<string> {
    const url = `${this.uri}/${IDCAISSE}`;
    return this.globalService.setHttpRequest(url, 'DELETE', {}, Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.caisse)
      })
    );
  }

  create(caisse: Caisse): Observable<Caisse> {
    const BASE_PATH = `${this.uri}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(
      BASE_PATH,
      'POST',
      caisse,
      headers
    ).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.caisse)
      })
    );;
  }

  getJourneeComptable(nIDCAISSE: number, sDateComptable: string){
    const uri = `COMPTA_Get_Journee_Comptable/${nIDCAISSE}/${sDateComptable}`;
    return this.globalService.setHttpRequest(uri, "GET")
  }

  getHistoriqueClotureCaisse(
    nIDCAISSE: number,
    sDateDebut: string,
    sDateFin: string
  ): Observable<HistoriqueClotureCaisse[]> {
    const url = `${this.historiqueClotureCaisse}/${nIDCAISSE}/${sDateDebut}/${sDateFin}`;
    return this.globalService.setHttpRequest(url, 'GET', {}, Headers);
  }

  ImprimeclotureCaisse(
    nIDCAISSE: number,
    dDate: string
  ) {
    const url = `${this.imprimeclotureCaisse}/${nIDCAISSE}/${dDate}`;
    return this.globalService.setHttpRequest(url, 'GET', {}, Headers);
  }

  ImprimeclotureCaisseHistorique(
    nIDCAISSE: number,
    dDate: string,
    fDate:string,
    typeDocument:number
  ) {
    const url = `${this.imprimeclotureCaisse}/${nIDCAISSE}/${dDate}/${fDate}/${typeDocument}`;
    return this.globalService.setHttpRequest(url, 'GET', {}, Headers);
  }


  ClotureDeclotureCaisse(IDcaisseJours: number, bcloture: number): Observable<HistoriqueClotureCaisse> {
    const url = `${this.Cloture_Decloture_Caisse}/${IDcaisseJours}/${bcloture}`;
    return this.globalService.setHttpRequest(url, 'POST', {}, Headers);
  }


  getPaadingTransfert(
    nIDCaisseSource: number,
    nIDCaisseDestination: number,
    bValide: 1 | 0 | 2
  ){
    const uri = `COMPTA_Transfert_Inter_Caisse/${nIDCaisseSource}/${nIDCaisseDestination}/${bValide}`;

    return this.globalService.setHttpRequest(uri, "POST", {})
  }
}
