import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PointageComponent } from './pointage.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { ListAgentComponent } from './list-agent/list-agent.component';
import { CheckCapsLockDirective } from './force-caps-lock.directive';



@NgModule({
  declarations: [
    PointageComponent,
    ListAgentComponent,
    CheckCapsLockDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: PointageComponent}]),
    CoreModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [DatePipe]
})
export class PointageModule { }
