import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StatViewComponent } from './stat-view/stat-view.component';

const statRoutes: Routes = [
  {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'effectifs-eleve', component: StatViewComponent},
  {path: 'pyramide-des-ages', loadChildren: () => import('../elevepyramide/elevepyramide.module').then(m => m.ElevepyramideModule)}
]

@NgModule({
  imports: [
    RouterModule.forChild(statRoutes)
  ],
  exports: [RouterModule]
})
export class StatistiquesRoutingModule { }