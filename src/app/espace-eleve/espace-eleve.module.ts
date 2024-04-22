import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EspeceEleveRoutingModule } from './espace-eleve-routing.module';
import { CoreModule } from '../core/core.module';
import { FraisScolaireComponent } from './frais-scolaire/frais-scolaire.component';
import { MatTableModule } from '@angular/material/table';
import { InfoEcheanceComponent } from './frais-scolaire/info-echeance/info-echeance.component';
import { FicheEleveComponent } from './fiche-eleve/fiche-eleve.component';
import { InfoEcoleComponent } from './info-ecole/info-ecole.component';
import { MatCardModule } from '@angular/material/card';
import { GabarieEleveComponent } from './gabarie-eleve/gabarie-eleve.component';
import { EleveService } from './services/eleve.service';
import { FraisResolver } from './core-eleve/resolvers/frais.resolver';
import { CoreEleveModule } from './core-eleve/core-eleve.module';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import { StatsNotesComponent } from './home/stats-notes/stats-notes.component';
import { StatsNotesModule } from './home/stats-notes/stats-notes.module';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    FraisScolaireComponent,
    InfoEcheanceComponent,
    FicheEleveComponent,
    InfoEcoleComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    EspeceEleveRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    CoreEleveModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    StatsNotesModule
  ],
  providers: [
    EleveService,
    FraisResolver
  ]
})
export class EspaceEleveModule { }
