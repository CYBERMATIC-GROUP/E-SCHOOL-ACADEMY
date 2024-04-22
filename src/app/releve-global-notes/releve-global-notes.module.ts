import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleveGlobalNotesComponent } from './releve-global-notes.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ReleveGlobalNotesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ReleveGlobalNotesComponent}]),
    CoreModule,
    MatCardModule,
    FormsModule,
    MatTableModule,
    MatIconModule
  ]
})
export class ReleveGlobalNotesModule { }
