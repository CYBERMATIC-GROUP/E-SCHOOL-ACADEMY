import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassementReleveNoteEleveComponent } from './classement-releve-note-eleve.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClassementReleveNoteEleveComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ClassementReleveNoteEleveComponent}]),
    CoreModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class ClassementReleveNoteEleveModule { }
