import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { ProduitFrais } from './produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  uri = 'LES_FRAIS_SCOLAIRES'

  constructor(
    private globalService: GlobalService
  ) { }

  create(produit: ProduitFrais): Observable<ProduitFrais>{
    return this.globalService.setHttpRequest(this.uri, "POST", produit)
  }

  update(produit: ProduitFrais): Observable<ProduitFrais>{
    return this.globalService.setHttpRequest(this.uri + '/' + produit.IDPRODUIT, "PUT", produit)
  }

  getOne(IDPRODUIT: number): Observable<ProduitFrais>{
    return this.globalService.setHttpRequest(this.uri + '/' + IDPRODUIT, "GET")
  }

  getAll(): Observable<ProduitFrais[]>{
    return this.globalService.setHttpRequest(this.uri, "GET")
  }
}
