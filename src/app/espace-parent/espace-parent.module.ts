import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeParentComponent } from './home-parent/home-parent.component';
import { CoreModule } from '../core/core.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreEleveModule } from "../espace-eleve/core-eleve/core-eleve.module";
import { StatsNotesModule } from "../espace-eleve/home/stats-notes/stats-notes.module";
import { RouterModule, Routes } from '@angular/router';
import { GabaritParentComponent } from './gabarit-parent/gabarit-parent.component';
import { SearchEleveParentComponent } from './search-eleve-parent/search-eleve-parent.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { ListEleveAddByParentComponent } from './list-eleve-add-by-parent/list-eleve-add-by-parent.component';
import { WaitingPayementComponent } from './waiting-payement/waiting-payement.component';
import { AbsenceEleveComponent } from './absence-eleve/absence-eleve.component';
import { AbsenceTableComponent } from './absence-eleve/absence-table/absence-table.component';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { EmploiDuTempsComponent } from './emploi-du-temps/emploi-du-temps.component';
import { ConsultationNotesEleveByParentComponent } from './consultation-notes-eleve-by-parent/consultation-notes-eleve-by-parent.component';
import { DevoirsComponent } from './devoirs/devoirs.component';
import { DevoirViewComponent } from './devoirs/devoir-view/devoir-view.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { FraisScolaireComponent } from './frais-scolaire/frais-scolaire.component';
import { InfoEcheanceComponent } from './frais-scolaire/info-echeance/info-echeance.component';
const routes : Routes = [
    {path:'' ,  component: HomeParentComponent},
    {path:'frais-scolaire' ,  component: FraisScolaireComponent},
    {path:'absenece-eleve' ,  component: AbsenceEleveComponent},
    {path:'devoirs' ,  component: DevoirsComponent},
    {path:'consultation-notes-eleve' ,  component: ConsultationNotesEleveByParentComponent},
    {path:'empoloi-du-temps' ,  component: EmploiDuTempsComponent},
    {path:'eleve-add-list' ,  component: ListEleveAddByParentComponent},
    {path:'search-eleve-parent' ,  component: SearchEleveParentComponent}

]

@NgModule({
    declarations: [
        HomeParentComponent,
        GabaritParentComponent,
        SearchEleveParentComponent,
        EmptyListComponent,
        ListEleveAddByParentComponent,
        WaitingPayementComponent,
        AbsenceEleveComponent,
        AbsenceTableComponent,
        EmploiDuTempsComponent,
        ConsultationNotesEleveByParentComponent,
        DevoirsComponent,
        DevoirViewComponent,
        FraisScolaireComponent,
        InfoEcheanceComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatTableModule,
        MatCardModule,
        MatButtonModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatInputModule,
        FormsModule,
        MatFormFieldModule,
        CoreEleveModule,
        QuillModule,
        StatsNotesModule,
        RouterModule,
        RouterModule.forChild(routes)
    ],

    exports: [
        RouterModule
    ]
})
export class EspaceParentModule { }