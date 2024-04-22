import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUrlComponent } from './edit-url.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditUrlComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: EditUrlComponent}]),
  ]
})
export class EditUrlModule { }
