import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsNotesComponent } from './stats-notes.component';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [StatsNotesComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [StatsNotesComponent]
})
export class StatsNotesModule { }
