import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointageGlobalComponent } from './pointage-global.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { TablePointageResultModule } from '../table-pointage-result/table-pointage-result.module';



@NgModule({
  declarations: [
    PointageGlobalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: PointageGlobalComponent}]),
    CoreModule,
    TablePointageResultModule
  ],
  exports: [RouterModule]
})
export class PointageGlobalModule { }
