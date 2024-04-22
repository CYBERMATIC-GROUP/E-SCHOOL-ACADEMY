import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from "../../core/core.module";
import { AbsenceAgentComponent } from './absence-agent.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { AjoutAbsenceAgentComponent } from './ajout-absence-agent/ajout-absence-agent.component';
import { ListeAgentComponent } from './liste-agent/liste-agent.component';
@NgModule({
    declarations: [
    AbsenceAgentComponent,
    AjoutAbsenceAgentComponent,
    ListeAgentComponent
  ],
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        MatTableModule,
        RouterModule.forChild([{path:"", component: AbsenceAgentComponent}])
    ],
    exports: [
      RouterModule
    ]
})
export class AbsenceAgentModule { }
