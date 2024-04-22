import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { environment } from "src/environnements/environnement.prod";
import { HomeComponent } from "./home/home.component";
import { EleveGuard } from "../core/guard/eleve.guard";
import { FraisScolaireComponent } from "./frais-scolaire/frais-scolaire.component";
import { InfoEcoleComponent } from "./info-ecole/info-ecole.component";
import { FraisResolver } from "./core-eleve/resolvers/frais.resolver";


const routes = environment.routes.Eleve.espaceEleve

const routesEleve: Routes = [
    {path: '', component: HomeComponent},
    {path: routes.InfoEcole, component: InfoEcoleComponent},

    {path: routes.fraisScolaire, component: FraisScolaireComponent, resolve: {fraisScolaire: FraisResolver}},

    {path: 'releve-notes', loadChildren: () => import('./releve-notes/releve-notes.module').then(m => m.ReleveNotesModule)},

    {path: 'mes-abscences', loadChildren: () => import('./abscences/abscences.module').then(m => m.AbscencesModule)},
    
    {path: 'emploi-du-temps', loadChildren: () => import('./emplois-du-temps-eleve/emplois-du-temps-eleve.module').then(m => m.EmploisDuTempsEleveModule)},

    {path: 'devoirs-et-cours', loadChildren: () => import('./home/sous-menu-devoirs/sous-menu-devoirs.module').then(m => m.SousMenuDevoirsModule)},

    {path: 'mes-notes', loadChildren: () => import('./consultation-note/consultation-note.module').then(m => m.ConsultationNoteModule)},
]

@NgModule({
  imports: [RouterModule.forChild(routesEleve)],
  exports: [RouterModule]
})
export class EspeceEleveRoutingModule {

}
