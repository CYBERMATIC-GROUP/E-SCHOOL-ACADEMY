import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationNoteComponent } from './consultation-note.component';
import { RouterModule } from '@angular/router';
import { CoreEleveModule } from '../core-eleve/core-eleve.module';
import { MatCardModule } from '@angular/material/card';
import { CoreModule } from 'src/app/core/core.module';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ConsultationNoteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: "", component: ConsultationNoteComponent}]),
    CoreEleveModule,
    MatCardModule,
    CoreModule,
    MatTableModule
  ],
  exports: [RouterModule]
})
export class ConsultationNoteModule { }
