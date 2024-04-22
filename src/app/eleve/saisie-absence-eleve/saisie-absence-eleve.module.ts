import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { SaisieAbsenceEleveComponent } from './saisie-absence-eleve.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbenceFormComponent } from './abence-form/abence-form.component';
import { TableEmploiDuTempsComponent } from './table-emploi-du-temps/table-emploi-du-temps.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SaisieAbsenceEleveComponent,
    AbenceFormComponent,
    TableEmploiDuTempsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatTableModule,
    RouterModule.forChild([{path: '', component: SaisieAbsenceEleveComponent}]),
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [RouterModule, TableEmploiDuTempsComponent]
})
export class SaisieAbsenceEleveModule { }
