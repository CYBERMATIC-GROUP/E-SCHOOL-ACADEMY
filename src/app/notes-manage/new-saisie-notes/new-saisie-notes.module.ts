import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSaisieNotesComponent } from './new-saisie-notes.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    NewSaisieNotesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: NewSaisieNotesComponent}]),
    CoreModule,
    MatCardModule,
    MatTableModule
  ],
  exports: [RouterModule]
})
export class NewSaisieNotesModule { }
