import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevoirViewComponent } from './devoir-view.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { CoreEleveModule } from '../../core-eleve/core-eleve.module';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DevoirViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: "", component: DevoirViewComponent}]),
    CoreEleveModule,
    CoreModule,
    QuillModule.forRoot(),
    FormsModule
  ],
  exports: [RouterModule]
})
export class DevoirViewModule { }
