import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursFormComponent } from './cours-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { CoreModule } from 'src/app/core/core.module';
import { CoreEnseigantModule } from '../../core-enseigant/core-enseigant.module';



@NgModule({
  declarations: [
    CoursFormComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    QuillModule,
    RouterModule.forChild([{path: '', component: CoursFormComponent}]),
    FormsModule,
    CoreModule,
    CoreEnseigantModule,
  ],
  exports: [RouterModule]
})
export class CoursFormModule { }
