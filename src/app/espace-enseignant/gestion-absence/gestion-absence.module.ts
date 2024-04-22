import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionAbsenceComponent } from './gestion-absence.component';
import { RouterModule } from '@angular/router';
import { CoreEnseigantModule } from '../core-enseigant/core-enseigant.module';
import { CoreModule } from 'src/app/core/core.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { SaisieAbsenceEleveModule } from 'src/app/eleve/saisie-absence-eleve/saisie-absence-eleve.module';
import { NoteComponent } from '../note/note.component';
import { EmploisDuTempsEnseignantModule } from '../emplois-du-temps-enseignant/emplois-du-temps-enseignant.module';
import { EmploiDuTempsEnseignantResolver } from '../core-enseigant/emplois-du-temps.resolver';
import { EmploiDuTempsService } from 'src/app/core/services/emploi-du-temps.service';
import { TableAbsenceComponent } from './table-absence/table-absence.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [
    GestionAbsenceComponent,
    TableAbsenceComponent
  ],
  imports: [
    CommonModule,
    CoreEnseigantModule,
    CoreModule,
    MatTableModule,
    FormsModule,
    SaisieAbsenceEleveModule,
    RouterModule.forChild([{path: 'eleve', component: GestionAbsenceComponent, resolve: {resEmploisDuTemps: EmploiDuTempsEnseignantResolver}}]),
    EmploisDuTempsEnseignantModule,
    MatIconModule,
    MatExpansionModule,
  ],
  exports: [RouterModule],
  providers: [
    EmploiDuTempsEnseignantResolver,
    EmploiDuTempsService
  ]
})
export class GestionAbsenceModule { }
