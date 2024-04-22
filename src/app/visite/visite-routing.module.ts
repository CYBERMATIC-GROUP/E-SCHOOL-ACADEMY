import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { VisitesViewComponent } from "./visites-view/visites-view.component";
import { AuthGuard } from "../core/guard/auth.guard";
import { VisiteurViewComponent } from "./visiteur-view/visiteur-view.component";
import { TypeVisitesViewComponent } from "./type-visites-view/type-visites-view.component";

const routes: Routes = [
    {path: '', component: VisitesViewComponent, canActivate: [AuthGuard]},
    {path: 'visiteurs', component: VisiteurViewComponent, canActivate: [AuthGuard]},
    {path: 'type-visiteurs', component: TypeVisitesViewComponent, canActivate: [AuthGuard]},
]

@NgModule({
    imports: [
      RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
  })
  export class VisiteRoutingModule { }