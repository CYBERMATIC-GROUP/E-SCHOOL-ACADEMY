import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpressionBulletinComponent } from './impression-bulletin.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { MatTableModule } from '@angular/material/table';
import { TrimestreSequenceModule } from '../core/trimestre-sequence/trimestre-sequence.module';



@NgModule({
  declarations: [
    ImpressionBulletinComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ImpressionBulletinComponent}]),
    CoreModule,
    MatTableModule,
    TrimestreSequenceModule
  ]
})
export class ImpressionBulletinModule { }
