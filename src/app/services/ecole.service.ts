import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, map, of, tap } from 'rxjs';
import { Ecole } from '../models/ecole.model';
import { GlobalService } from '../services/global.service';
import { Arrondissement } from '../models/arrondissement.model';
import { Quartier } from '../models/quartier.model';
import { environment } from 'src/environnements/environnement';

@Injectable({
  providedIn: 'root',
})
export class Ecoleervice {
  uri = 'ECOLES';

  constructor(private http: HttpClient, private globalService: GlobalService) {}

  get(): Observable<Ecole[]> {
    return this.globalService.setHttpRequest(this.uri, 'GET', {}, Headers);
  }

  getOne(IDECOLE: number): Observable<Ecole> {
    return this.globalService.setHttpRequest(
      this.uri + '/' + IDECOLE,
      'GET',
      {}
    );
  }

  update(ecole: Ecole): Observable<Ecole> {
    const BASE_PATH = `${this.uri}/${ecole.IDECOLES}`;
    return this.globalService.setHttpRequest(BASE_PATH, 'PUT', ecole, Headers);
  }

  delete(IDECOLE: number): Observable<string> {
    const url = `${this.uri}/${IDECOLE}`;
    return this.globalService.setHttpRequest(url, 'DELETE', null, Headers);
  }

  create(ecole: Ecole): Observable<Ecole> {
    return this.http.post<Ecole>(environment.apiUrl + this.uri, ecole, {
      headers: this.globalService.getHeaderForEpay(),
    });
  }

  getFraisCreationScolaire(): Observable<{
    CodeProduit: string;
    Libele: string;
    IDPRODUIT: number;
    Montant: number;
  }> {
    const uri = environment.apiUrl + 'ECHOOL_Get_Frais_Mise_Service';
    return this.http.get<{
      CodeProduit: string;
      Libele: string;
      IDPRODUIT: number;
      Montant: number;
    }>(uri, { headers: this.globalService.getHeaderForEpay() });
  }

  getLogo(): Observable<{ Photo: string }> {
    return this.globalService.setHttpRequest('PHOTO_Logo_Etablissement', 'GET');
  }
}
