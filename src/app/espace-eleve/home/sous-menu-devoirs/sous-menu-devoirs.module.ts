import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SousMenuDevoirsComponent } from './sous-menu-devoirs.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreEleveModule } from '../../core-eleve/core-eleve.module';
import { StatsNotesModule } from '../stats-notes/stats-notes.module';

const routes: Routes = [
  {path: '', component: SousMenuDevoirsComponent},
  {path: 'devoirs', loadChildren: () => import('../../devoirs/devoirs.module').then(m => m.DevoirsModule)},
  //{path: 'cours', loadChildren: () => import('../../devoirs/devoirs.module').then(m => m.DevoirsModule)},
]

@NgModule({
  declarations: [
    SousMenuDevoirsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreEleveModule,
    StatsNotesModule
  ],
  exports: [RouterModule]
})
export class SousMenuDevoirsModule { }
