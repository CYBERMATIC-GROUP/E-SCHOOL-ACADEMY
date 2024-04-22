import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigEmploiDuTempsComponent } from './config-emploi-du-temps.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { ConfigEmploiResolver } from '../resolvers/configuration-emploi.resolver';
import { ConfigService } from './config.service';
import { TableConfigEmploiComponent } from './table-config-emploi/table-config-emploi.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    ConfigEmploiDuTempsComponent,
    TableConfigEmploiComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ConfigEmploiDuTempsComponent, resolve: {configEmploi: ConfigEmploiResolver}}]),
    CoreModule,
    MatIconModule,
    MatTableModule
  ],
  exports: [RouterModule],
  providers: [
    ConfigEmploiResolver,
    ConfigService
  ]
})
export class ConfigEmploiDuTempsModule { }
