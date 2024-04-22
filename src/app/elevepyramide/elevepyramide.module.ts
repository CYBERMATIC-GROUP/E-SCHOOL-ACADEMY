import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElevepyramideComponent } from './elevepyramide.component';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { CoreModule } from '../core/core.module';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ElevepyramideComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: "", component: ElevepyramideComponent}]),
    NgChartsModule,
    CoreModule,
    MatTableModule,
    MatCheckboxModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class ElevepyramideModule { }
