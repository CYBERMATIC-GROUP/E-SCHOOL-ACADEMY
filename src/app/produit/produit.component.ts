import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProduitFrais } from './produit-form/produit.model';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

  produits$!: Observable<ProduitFrais[]>;
  displayColumns = [
     "CodeProduit",
     "LibelleProduit_Fr",
     "Occasionnel",
     "Montant",
     "DateEcheance",
     "CompteAssocie",
     "AccepteReduction",
     "AccepteMajoration",
     "Actions"
  ]

  constructor(
    private route: ActivatedRoute,
    public globalService: GlobalService,
    private router: Router
  ){}

  ngOnInit() {
      this.produits$ = this.route.data.pipe(
        map(res => res['produits'])
      )
  }

  applyFilter(event: any){

  }

  onChangeTypeFrais(event: any){
    const type: number = event.target.value;
    let boolType = true;
    if (type == 1)
      boolType = true
    else if(type == 0)
      boolType = false

    if (type <= 1){
      this.produits$ = this.route.data.pipe(
        map(res => res['produits']),
        map((res: ProduitFrais[]) => res.filter(elt => elt.Occasionnel == boolType))
      )
    }else{
      this.produits$ = this.route.data.pipe(
        map(res => res['produits'])
      )
    }

  }

  openForm(action: "voir" | "modification" | "creation", produit?: ProduitFrais){
    this.router.navigate([`/formulaire/produit/${action}/${produit?.IDPRODUIT ?? 0}`])
  }

  ondelete(produit: ProduitFrais){

  }

}
