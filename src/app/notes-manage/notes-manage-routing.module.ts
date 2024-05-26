import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environnements/environnement.prod';
import { HomeComponent } from './home/home.component';
import { NoteSaisieExtComponent } from './note-saisie-ext/note-saisie-ext.component';
import { CoreModule } from '../core/core.module';
import { SaisieNotesByEnseignantComponent } from './saisie-notes/saisie-notes-by-enseignant/saisie-notes-by-enseignant.component';

const routesNotes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'saisie-notes-by-enseignant', component: SaisieNotesByEnseignantComponent},
  {path: environment.routes.notes.saisie, component: NoteSaisieExtComponent},
  {path: 'nouveau/saisie/notes', loadChildren: () => import('./new-saisie-notes/new-saisie-notes.module').then(m => m.NewSaisieNotesModule)}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesNotes),
    CoreModule
  ],
  exports: [RouterModule]
})
export class NotesManageRoutingModule { }
