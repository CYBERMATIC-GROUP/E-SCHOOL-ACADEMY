import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitComponent } from './produit.component';
import { RouterModule } from '@angular/router';
import { ProduitService } from './produit-form/produit.service';
import { ProduitFraisResolver } from '../core/resolvers/produit-frais.resolver';
import { CoreModule } from '../core/core.module';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    ProduitComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ProduitComponent, resolve: {produits: ProduitFraisResolver}}]),
    CoreModule,
    MatTableModule
  ],
  exports: [RouterModule],
  providers: [
    ProduitService,
    ProduitFraisResolver
  ]
})
export class ProduitModule { }
