import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimestreSequenceComponent } from './trimestre-sequence.component';
import { CoreModule } from '../core.module';



@NgModule({
  declarations: [
    TrimestreSequenceComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [TrimestreSequenceComponent]
})
export class TrimestreSequenceModule { }
