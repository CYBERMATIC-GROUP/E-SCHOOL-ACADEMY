import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointageEnseignantComponent } from './pointage-enseignant.component';
import { RouterModule } from '@angular/router';
import { TablePointageResultComponent } from '../table-pointage-result/table-pointage-result.component';
import { GabaritComponent } from 'src/app/gabarit/gabarit.component';
import { TablePointageResultModule } from '../table-pointage-result/table-pointage-result.module';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    PointageEnseignantComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: PointageEnseignantComponent}]),
    TablePointageResultModule,
    CoreModule
  ],
  exports: [RouterModule]
})
export class PointageEnseignantModule { }
