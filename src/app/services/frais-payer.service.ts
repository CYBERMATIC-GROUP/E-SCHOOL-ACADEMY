import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { FraisPayer, PaiementFrais, echeanceMensuel } from '../models/fraispayer.model';
import { FraisScolaire } from '../models/fraispayer.model';
import { DossierEleve } from '../models/fraispayer.model';
import { GlobalService } from '../services/global.service';
import { environment } from 'src/environnements/environnement';
@Injectable({
  providedIn: 'root'
})
export class FraisPayerService {

  uri = "ELEVE_Solde_Frais_Scolaires";
  private apiUrl = 'http://51.178.29.100/eschool/V1/ELEVE_Solde_Frais_Scolaires';

  constructor(
    private http:HttpClient,
    private globalService: GlobalService
  ) { }

  getEleve(IDELEVE: number): Observable<FraisPayer> {
    return this.globalService.setHttpRequest(this.uri + '/' + IDELEVE, "GET", {});
  }

  getFraisPayer(IDELEVE: number): Observable<FraisPayer> {
    const url = `${this.apiUrl}/${IDELEVE}`;
    return this.http.get<FraisPayer>(url);
  }

  getFraisScolaire(IDELEVE: number): Observable<FraisPayer>{
    return this.globalService.setHttpRequest(this.uri + '/' + IDELEVE, "GET")
  }

  setPaiementFrais(paiement: FraisScolaire[], idEleve: number, modePaiement: number){
    return this.globalService.setHttpRequest('/COMPTA_Paiement_Frais_Scolaire/' + idEleve + '/' + modePaiement, "POST", paiement);
  }

  getFraisOcasionel(IDELEVE: number, nIDProduit?: number): Observable<FraisPayer>{
    return this.globalService.setHttpRequest(`ELEVE_FraisScolaires_Occasionnels/${IDELEVE}/${nIDProduit}`, "GET")
  }

}





