import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateComptableComponent } from './date-comptable.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DateComptableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: DateComptableComponent}]),
    CoreModule,
    FormsModule
  ]
})
export class DateComptableModule { }
