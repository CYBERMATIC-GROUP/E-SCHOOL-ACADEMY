import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitComponent } from '../produit.component';
import { RouterModule } from '@angular/router';
import { ProduitFormComponent } from './produit-form.component';
import { CoreModule } from 'src/app/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CompteAssocieResolver } from 'src/app/core/resolvers/compte-associe.resolver';
import { CompteService } from 'src/app/services/compte.service';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ProduitFormComponent, resolve: {compteAssocies: CompteAssocieResolver}}]),
    CoreModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [
    CompteService,
    CompteAssocieResolver
  ]
})
export class ProduitFormModule { }
