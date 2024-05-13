import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesManageRoutingModule } from './notes-manage-routing.module';
import { SaisieNotesComponent } from './saisie-notes/saisie-notes.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from '../core/core.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NoteSaisieExtComponent } from './note-saisie-ext/note-saisie-ext.component';
import { MobileNoteSaisieComponent } from './saisie-notes/mobile-note-saisie/mobile-note-saisie.component';
import { SelectTrimestreComponent } from './select-trimestre/select-trimestre.component';


@NgModule({
  declarations: [
    SaisieNotesComponent,
    HomeComponent,
    NoteSaisieExtComponent,
    MobileNoteSaisieComponent,
    SelectTrimestreComponent
  ],
  imports: [
    CommonModule,
    NotesManageRoutingModule,
    CoreModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    SaisieNotesComponent
  ]
})
export class NotesManageModule { }
