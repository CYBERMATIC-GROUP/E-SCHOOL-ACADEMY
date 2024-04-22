import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { header } from 'src/app/models/header.model';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environnements/environnement.prod';

@Injectable({
  providedIn: 'root'
})
export class EpayService {
  uri = environment.apiUrl;
  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) { }

  setPay(mobile: string, nIDECOLE: number, montant: number): Observable<any>{
    const uri = `MOBILE_MONEY_Demande_Paiement/${montant}/${mobile}/${nIDECOLE}/1`;

    return this.http.post(this.uri + uri, {}, {headers: this.globalService.getHeaderForEpay()})
  }


  verifPay(sReference: string): Observable<any>{
    const uri = `MOBILE_MONEY_Verifie_Statut_Transaction/${sReference}`;
    return this.http.get(this.uri + uri, {headers: this.globalService.getHeaderForEpay()})
  }
}
