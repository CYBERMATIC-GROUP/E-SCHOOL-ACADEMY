import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePointageResultComponent } from './table-pointage-result.component';
import { CoreModule } from 'src/app/core/core.module';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    TablePointageResultComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatTableModule
  ],
  exports: [TablePointageResultComponent]
})
export class TablePointageResultModule { }
