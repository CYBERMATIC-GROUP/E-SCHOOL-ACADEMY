import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevoirsComponent } from './devoirs.component';
import { RouterModule, Routes } from '@angular/router';
import { DevoirsFormComponent } from './devoirs-form/devoirs-form.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CoreModule } from "../../core/core.module";
import { CoreEnseigantModule } from "../core-enseigant/core-enseigant.module";

const routes: Routes = [
    {path: "", component: DevoirsComponent },
    {path: "form/:action/:id", loadChildren: () => import('./devoirs-form/devoirs-form.module').then(m => m.DevoirsFormModule) },
]

@NgModule({
    declarations: [
        DevoirsComponent,
    ],
    exports: [RouterModule],
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        RouterModule.forChild(routes),
        CoreModule,
        CoreEnseigantModule
    ]
})
export class DevoirsModule { }
