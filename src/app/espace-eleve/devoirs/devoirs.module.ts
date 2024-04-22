import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevoirsComponent } from './devoirs.component';
import { RouterModule } from '@angular/router';
import { CoreEleveModule } from '../core-eleve/core-eleve.module';
import { MatTableModule } from '@angular/material/table';
import { CoreModule } from 'src/app/core/core.module';

const routes = [
  {path: '', component: DevoirsComponent},
  {path: ':id', loadChildren: () => import('./devoir-view/devoir-view.module').then(m => m.DevoirViewModule)},
]


@NgModule({
  declarations: [
    DevoirsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreEleveModule,
    MatTableModule,
    CoreModule
  ],
  exports: [RouterModule]
})
export class DevoirsModule { }
