import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SousMenuComponent } from './sous-menu.component';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';



@NgModule({
  declarations: [
    SousMenuComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      {path: '', component: SousMenuComponent},
      {path: 'pointage-des-heures', loadChildren: () => import('../pointage.module').then(m => m.PointageModule), canActivate: [AuthGuard]},

      {path: 'pointage-agent', loadChildren: () => import('../pointage-agent/pointage-agent.module').then(m => m.PointageAgentModule), canActivate: [AuthGuard]},

      {path: 'pointage-enseignant', loadChildren: () => import('../pointage-enseignant/pointage-enseignant.module').then(m => m.PointageEnseignantModule), canActivate: [AuthGuard]},

      {path: 'pointage-global', loadChildren: () => import('../pointage-global/pointage-global.module').then(m => m.PointageGlobalModule), canActivate: [AuthGuard]},
    ])
  ]
})
export class SousMenuModule { }
