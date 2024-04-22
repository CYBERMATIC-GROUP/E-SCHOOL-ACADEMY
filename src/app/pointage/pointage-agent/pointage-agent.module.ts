import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointageAgentComponent } from './pointage-agent.component';
import { RouterModule } from '@angular/router';
import { TablePointageResultModule } from '../table-pointage-result/table-pointage-result.module';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    PointageAgentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: PointageAgentComponent}]),
    TablePointageResultModule,
    CoreModule
  ],
  exports: [RouterModule]
})
export class PointageAgentModule { }
