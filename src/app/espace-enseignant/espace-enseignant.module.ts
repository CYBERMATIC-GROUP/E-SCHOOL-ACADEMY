import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { EspaceEnseignantRoutingModule } from './espace-enseignant-routing.module';
import { MatCardModule } from '@angular/material/card';
import { CoreModule } from '../core/core.module';
import { NoteComponent } from './note/note.component';
import { NotesManageModule } from '../notes-manage/notes-manage.module';
import { CoreEnseigantModule } from './core-enseigant/core-enseigant.module';
import { SaisieAbsenceEleveModule } from '../eleve/saisie-absence-eleve/saisie-absence-eleve.module';

@NgModule({
  declarations: [

    HomeComponent,
    NoteComponent,
  ],
  imports: [
    CommonModule,
    EspaceEnseignantRoutingModule,
    MatCardModule,
    CoreModule,
    NotesManageModule,
    CoreEnseigantModule,
    SaisieAbsenceEleveModule,
  ]
})
export class EspaceEnseignantModule { }
