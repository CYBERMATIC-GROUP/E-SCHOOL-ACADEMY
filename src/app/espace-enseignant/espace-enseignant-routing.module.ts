import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NoteSaisieExtComponent } from "../notes-manage/note-saisie-ext/note-saisie-ext.component";
import { NoteComponent } from "./note/note.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'devoirs', loadChildren: () => import('./devoirs/devoirs.module').then(m => m.DevoirsModule)},
  {path: 'cours', loadChildren: () => import('./cours/cours.module').then(m => m.CoursModule)},
  {path: 'saisie-note_enseignant/:trimestre', component: NoteComponent},
  {path: 'emploi-du-temps', loadChildren: () => import('./emplois-du-temps-enseignant/emplois-du-temps-enseignant.module').then(m => m.EmploisDuTempsEnseignantModule)},
  {path: 'gestion-absences', loadChildren: () => import('./gestion-absence/gestion-absence.module').then(m => m.GestionAbsenceModule)}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EspaceEnseignantRoutingModule {}
