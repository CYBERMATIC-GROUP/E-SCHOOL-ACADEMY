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
import { DashboardParentComponent } from './dashboard-parent/dashboard-parent.component';
import { StateComponent } from './state/state.component';
import { ReabonnementEleveComponent } from './reabonnement-eleve/reabonnement-eleve.component';
import { CreateCompteComponent } from '../login-form/create-compte/create-compte.component';
import { ProfileParentComponent } from './profile-parent/profile-parent.component';
import { AlertParentComponent } from './alert-parent/alert-parent.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes : Routes = [
    {path:'' ,  component: DashboardParentComponent},
    {path:'profile-parent' ,  component: ProfileParentComponent},
    {path:'frais-scolaire' ,  component: FraisScolaireComponent},
    {path:'absenece-eleve' ,  component: AbsenceEleveComponent},
    {path:'devoirs' ,  component: DevoirsComponent},
    {path:'consultation-notes-eleve' ,  component: ConsultationNotesEleveByParentComponent},
    {path:'empoloi-du-temps' ,  component: EmploiDuTempsComponent},
    {path:'eleve-add-list' ,  component: ListEleveAddByParentComponent},
    {path:'search-eleve-parent' ,  component: SearchEleveParentComponent},
    {path:'eleve-parent/:IDELEVE' ,  component: HomeParentComponent}


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
        DashboardParentComponent,
        StateComponent,
        ReabonnementEleveComponent,
        ProfileParentComponent,
        AlertParentComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatTableModule,
        MatDialogModule,
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
