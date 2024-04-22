import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GabaritEnseignantComponent } from '../gabarit-enseignant/gabarit-enseignant.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    GabaritEnseignantComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    GabaritEnseignantComponent
  ]
})
export class CoreEnseigantModule { }
