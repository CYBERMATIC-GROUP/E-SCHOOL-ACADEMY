import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { constantes } from "src/environnements/constantes";
import { HomeComponent } from "./home/home.component";

const routesPortail: Routes = [
    {path: '', component: HomeComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routesPortail)],
    exports: [RouterModule]
  })
export class PortailRoutingModule {}