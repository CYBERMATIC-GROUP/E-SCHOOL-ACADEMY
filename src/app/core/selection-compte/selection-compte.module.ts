import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionCompteComponent } from './selection-compte.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core.module';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    SelectionCompteComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    FormsModule,
    CoreModule,
    MatTableModule
  ],
  exports: [SelectionCompteComponent]
})
export class SelectionCompteModule { }
