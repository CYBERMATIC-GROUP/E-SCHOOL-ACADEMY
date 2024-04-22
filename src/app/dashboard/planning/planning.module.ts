import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlanningComponent } from './planning.component';

const routes: Routes = [
  {path: '', component: PlanningComponent},
  {path: 'emploi-du-temps', loadChildren: () => import('./emploi-du-temps/emploi-du-temps.module').then(m => m.EmploiDuTempsModule)},
  {path: 'configuration-emploi', loadChildren: () => import('./config-emploi-du-temps/config-emploi-du-temps.module').then(m => m.ConfigEmploiDuTempsModule) }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PlanningModule { }
