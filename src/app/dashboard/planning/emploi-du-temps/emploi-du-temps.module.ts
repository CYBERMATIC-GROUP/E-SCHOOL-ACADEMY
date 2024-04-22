import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploiDuTempsComponent } from './emploi-du-temps.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    EmploiDuTempsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: EmploiDuTempsComponent}]),
    CoreModule
  ],
  exports: [
    RouterModule
  ]
})
export class EmploiDuTempsModule { }
