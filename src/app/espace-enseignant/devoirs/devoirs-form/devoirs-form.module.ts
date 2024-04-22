import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevoirsComponent } from '../devoirs.component';
import { RouterModule } from '@angular/router';
import { DevoirsFormComponent } from './devoirs-form.component';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { CoreModule } from 'src/app/core/core.module';
import { CoreEnseigantModule } from '../../core-enseigant/core-enseigant.module';



@NgModule({
  declarations: [
    DevoirsFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: DevoirsFormComponent}]),
    FormsModule,
    CoreModule,
    CoreEnseigantModule,
    QuillModule.forRoot(),
  ],
  exports: [RouterModule]
})
export class DevoirsFormModule { }
