import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FraisOccasionelComponent } from './frais-occasionel.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    FraisOccasionelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: FraisOccasionelComponent}]),
    CoreModule,
    FormsModule,
    MatTableModule
  ],
  exports: [RouterModule]
})
export class FraisOccasionelModule { }
