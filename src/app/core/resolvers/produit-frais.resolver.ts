import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ProduitFrais } from '../../produit/produit-form/produit.model';
import { Observable } from "rxjs";
import { ProduitService } from "src/app/produit/produit-form/produit.service";
import { PageLoadingService } from "../services/page-loading.service";


@Injectable()
export class ProduitFraisResolver implements Resolve<ProduitFrais[]>{
  constructor(
    private produitService: ProduitService,
    private pageLoadingService: PageLoadingService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProduitFrais[]> {
      this.pageLoadingService.setPageLoaded();
      return this.produitService.getAll()
  }
}
