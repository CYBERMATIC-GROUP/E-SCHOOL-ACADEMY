import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisiteurViewComponent } from './visiteur-view/visiteur-view.component';
import { VisiteurFormComponent } from './visiteur-view/visiteur-form/visiteur-form.component';
import { VisitesViewComponent } from './visites-view/visites-view.component';
import { VisitesFormComponent } from './visites-form/visites-form.component';
import { TypeVisitesViewComponent } from './type-visites-view/type-visites-view.component';
import { TypeVisitesFormComponent } from './type-visites-view/type-visites-form/type-visites-form.component';
import { VisiteRoutingModule } from './visite-routing.module';
import { CoreModule } from '../core/core.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



@NgModule({
  declarations: [
    VisiteurViewComponent,
    VisiteurFormComponent,
    VisitesViewComponent,
    VisitesFormComponent,
    TypeVisitesViewComponent,
    TypeVisitesFormComponent
  ],
  imports: [
    CommonModule,
    VisiteRoutingModule,
    CoreModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ]
})
export class VisiteModule { }
