import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatistiquesRoutingModule } from './statistiques-routing.module';
import { CoreModule } from '../core/core.module';
import { StatViewComponent } from './stat-view/stat-view.component';



@NgModule({
  declarations: [
    StatViewComponent
  ],
  imports: [
    CommonModule,
    StatistiquesRoutingModule,
    CoreModule
  ]
})
export class StatistiquesModule { }
