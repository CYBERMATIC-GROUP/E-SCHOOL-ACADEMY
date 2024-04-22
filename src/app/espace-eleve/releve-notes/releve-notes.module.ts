import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleveNotesComponent } from './releve-notes.component';
import { RouterModule } from '@angular/router';
import { CoreEleveModule } from '../core-eleve/core-eleve.module';
import { MatCardModule } from '@angular/material/card';
import { MatiereResolver } from '../core-eleve/resolvers/matieres.resolver';
import { MatiereService } from 'src/app/services/matiere.service';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    ReleveNotesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ReleveNotesComponent,  resolve: {matieres: MatiereResolver}}]),
    CoreEleveModule,
    MatCardModule,
    CoreModule
  ],
  exports: [RouterModule],
  providers: [
    MatiereService,
    MatiereResolver
  ]
})
export class ReleveNotesModule { }
