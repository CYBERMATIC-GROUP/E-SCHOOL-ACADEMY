import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GabarieEleveComponent } from '../gabarie-eleve/gabarie-eleve.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    GabarieEleveComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    GabarieEleveComponent
  ]
})
export class CoreEleveModule { }
