import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbscencesComponent } from './abscences.component';
import { RouterModule } from '@angular/router';
import { CoreEleveModule } from '../core-eleve/core-eleve.module';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import { EleveService } from '../services/eleve.service';
import { AbsenceResolver } from '../core-eleve/resolvers/absences.resolver';
import { AbsenceTableComponent } from './absence-table/absence-table.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    AbscencesComponent,
    AbsenceTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: AbscencesComponent, resolve: {absences: AbsenceResolver}}]),
    CoreEleveModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CoreModule
  ],
  exports: [RouterModule,AbsenceTableComponent],
  providers: [
    EleveService,
    AbsenceResolver
  ]
})
export class AbscencesModule { }
