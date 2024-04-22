import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GabaritComponent } from '../gabarit/gabarit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { registerLocaleData } from '@angular/common';
import  localeFr from '@angular/common/locales/fr';
import { DatePipe } from '@angular/common';
import { CloseModalComponent } from './close-modal/close-modal.component';
import { EpayComponent } from './epay/epay.component';
import { WaitingValidationComponent } from './epay/waiting-validation/waiting-validation.component';
import { HomeComponent } from '../espace-eleve/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { InfoComptaAgentComponent } from '../comptabilite/info-compta-agent/info-compta-agent.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StudentsByClassComponent } from '../statistiques/students-by-class/students-by-class.component';
import { ClasseListComponent } from './classe-list/classe-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatiereEnseigneComponent } from '../notes-manage/matiere-enseigne/matiere-enseigne.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './request-interceptor';
import { EmploisDuTempsComponent } from './emplois-du-temps/emplois-du-temps.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import { TableauEmlpoiDuTempsComponent } from '../dashboard/planning/emploi-du-temps/tableau-emlpoi-du-temps/tableau-emlpoi-du-temps.component';
import { AlertComponent } from './alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectEnseignantComponent } from './select-enseignant/select-enseignant.component';
import { SelectAgentComponent } from './select-agent/select-agent.component';
import { SelectDateComponent } from './select-date/select-date.component';
import { NewFeatureComponent } from './new-feature/new-feature.component';
import { DocumentPdfComponent } from './document-pdf/document-pdf.component';

@NgModule({
  declarations: [
    GabaritComponent,
    LoaderComponent,
    CloseModalComponent,
    EpayComponent,
    WaitingValidationComponent,
    InfoComptaAgentComponent,
    InputSearchComponent,
    StudentsByClassComponent,
    ClasseListComponent,
    MatiereEnseigneComponent,
    PageLoaderComponent,
    ImageCropComponent,
    EmploisDuTempsComponent,
    TableauEmlpoiDuTempsComponent,
    AlertComponent,
    SelectEnseignantComponent,
    SelectAgentComponent,
    SelectDateComponent,
    NewFeatureComponent,
    DocumentPdfComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressBarModule,
    MatCardModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule,
    ImageCropperModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    FormsModule,
  ],
  exports: [
    GabaritComponent,
    LoaderComponent,
    CloseModalComponent,
    InfoComptaAgentComponent,
    StudentsByClassComponent,
    InputSearchComponent,
    ClasseListComponent,
    MatiereEnseigneComponent,
    ImageCropComponent,
    EmploisDuTempsComponent,
    TableauEmlpoiDuTempsComponent,
    MatButtonModule,
    AlertComponent,
    SelectEnseignantComponent,
    SelectAgentComponent,
    SelectDateComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ]
})
export class CoreModule {
  constructor(){
    registerLocaleData(localeFr, 'fr');

  }
}
