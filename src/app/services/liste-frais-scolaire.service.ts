import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { HttpClient } from '@angular/common/http';
import { ProduitListeFraisScolaire } from '../models/liste.model.frais.scolaire';

@Injectable({
  providedIn: 'root'
})
export class ListeFraisScolaireService {

  AddP = 'COMPTA_Get_liste_Frais_Scolaires';
  uri = 'COMPTA_Get_Liste_Frais_Scolaire_Niveau_Branche';
  uriproduit = "PRODUIT"
  creationFraisScolaire = "COMPTA_Cree_Frais_Scolaires"

  constructor(private http: HttpClient, private globalService: GlobalService) {}


  getList(nIDNIVEAU:number,nIDBRANCHE:number,bOccasionnel:number) : Observable<ProduitListeFraisScolaire[]> {
    const url = `${this.uri}/${nIDNIVEAU}/${nIDBRANCHE}/${bOccasionnel}`
    return this.globalService.setHttpRequest(url,'GET', {},Headers);

}

AddProduit(bOccasionnel:number):Observable <ProduitListeFraisScolaire[]> {
  const url = `${this.AddP}/${bOccasionnel}`
  return this.globalService.setHttpRequest(url,'GET', {},Headers);

}

creation(tableau:any[],nIDNIVEAU:number,nIDBRANCHE:number,bOccasionnel:number): Observable<ProduitListeFraisScolaire> {
  const url = `${this.creationFraisScolaire}/${nIDNIVEAU}/${nIDBRANCHE}/${bOccasionnel}`
  return this.globalService.setHttpRequest(url,'POST', tableau , Headers);

}


getOne(nIDPRODUIT: number) {
  return this.globalService.setHttpRequest(this.uriproduit + '/' + nIDPRODUIT, "GET", {},Headers);
}

update(ProduitListeFraisScolaire: ProduitListeFraisScolaire) {
  const BASE_PATH = `${this.uriproduit}/${ProduitListeFraisScolaire.IDPRODUIT}`;
  return this.globalService.setHttpRequest(BASE_PATH, "PUT", ProduitListeFraisScolaire, Headers);
}





}
