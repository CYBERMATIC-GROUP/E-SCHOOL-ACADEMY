import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploisDuTempsEnseignantComponent } from './emplois-du-temps-enseignant.component';
import { RouterModule } from '@angular/router';
import { EmploiDuTempsEnseignantResolver } from '../core-enseigant/emplois-du-temps.resolver';
import { EmploiDuTempsService } from 'src/app/core/services/emploi-du-temps.service';
import { CoreEnseigantModule } from '../core-enseigant/core-enseigant.module';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    EmploisDuTempsEnseignantComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: EmploisDuTempsEnseignantComponent, resolve: {resEmploisDuTemps: EmploiDuTempsEnseignantResolver}}]),
    CoreEnseigantModule,
    CoreModule
  ],
  exports:[
    RouterModule,
    EmploisDuTempsEnseignantComponent
  ],
  providers: [
    EmploiDuTempsEnseignantResolver,
    EmploiDuTempsService
  ]
})
export class EmploisDuTempsEnseignantModule { }
