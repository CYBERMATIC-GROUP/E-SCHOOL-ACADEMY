import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploisDuTempsEleveComponent } from './emplois-du-temps-eleve.component';
import { RouterModule } from '@angular/router';
import { EmploiDuTempsResolver } from '../core-eleve/resolvers/emplois-du-temps.resolver';
import { EmploiDuTempsService } from 'src/app/core/services/emploi-du-temps.service';
import { MatButtonModule } from '@angular/material/button';
import { CoreEleveModule } from '../core-eleve/core-eleve.module';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    EmploisDuTempsEleveComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: EmploisDuTempsEleveComponent, resolve: {emploiDuTemps: EmploiDuTempsResolver}}]),
    CoreEleveModule,
    MatButtonModule,
    CoreModule
  ],
  providers: [
    EmploiDuTempsResolver,
    EmploiDuTempsService
  ]
})
export class EmploisDuTempsEleveModule { }
