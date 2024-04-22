import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { environment } from "src/environnements/environnement.prod"
import { NotificationsComponent } from "./notifications/notifications.component"
const routesBase = environment.routes.message

const routesMessage: Routes = [
  {path:"",component:NotificationsComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routesMessage)],
    exports: [RouterModule]
  })
  export class MessageRoutingModule {
    
  }