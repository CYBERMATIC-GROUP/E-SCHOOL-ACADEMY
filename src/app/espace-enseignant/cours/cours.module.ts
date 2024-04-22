import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursComponent } from './cours.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CoreModule } from "../../core/core.module";
import { CoreEnseigantModule } from "../core-enseigant/core-enseigant.module";
import { CoursFormComponent } from './cours-form/cours-form.component';

const routes: Routes = [
  {path: "", component: CoursComponent },
  {path: "form/:action/:id", loadChildren: () => import('./cours-form/cours-form.module').then(m => m.CoursFormModule) },
]
@NgModule({
  declarations: [
    CoursComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    RouterModule.forChild(routes),
    CoreModule,
    CoreEnseigantModule
  ]
})
export class CoursModule { }
