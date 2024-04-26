import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GabaritComponent } from './gabarit/gabarit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AgentComponent } from './agent/agent.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AgentFormComponent } from './agent/agent-form/agent-form.component';
import { AskTokenComponent } from './login/ask-token/ask-token.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CycleComponent } from './cycle/cycle.component';
import { CycleFormComponent } from './cycle/cycle-form/cycle-form.component';
import { DiplomeComponent } from './diplome/diplome.component';
import { DiplomeFormComponent } from './diplome/diplome-form/diplome-form.component';
import { FonctionComponent } from './fonction/fonction.component';
import { FonctionFormComponent } from './fonction/fonction-form/fonction-form.component';
import { NationaliteComponent } from './nationalite/nationalite.component';
import { NationaliteFormComponent } from './nationalite/nationalite-form/nationalite-form.component';
import { QualiteensComponent } from './qualiteens/qualiteens.component';
import { QualiteensFormComponent } from './qualiteens/qualiteens-form/qualiteens-form.component';
import { SiteComponent } from './site/site.component';
import { SiteFormComponent } from './site/site-form/site-form.component';
import { ArrondissementComponent } from './arrondissement/arrondissement.component';
import { QuartierComponent } from './quartier/quartier.component';
import { DepartementComponent } from './departement/departement.component';
import { DepartementFormComponent } from './departement/departement-form/departement-form.component';
import { QuartierFormComponent } from './quartier/quartier-form/quartier-form.component';
import { ArrondissementFormComponent } from './arrondissement/arrondissement-form/arrondissement-form.component';
import { MatChipsModule } from '@angular/material/chips';
import { LoaderComponent } from './core/loader/loader.component';
import { MatButtonModule } from '@angular/material/button';
import { BrancheComponent } from './branche/branche.component';
import { BrancheFormComponent } from './branche/branche-form/branche-form.component';
import { CaisseComponent } from './caisse/caisse.component';
import { CaisseFormComponent } from './caisse/caisse-form/caisse-form.component';
import { AnneeComponent } from './annee/annee.component';
import { AnneeFormComponent } from './annee/annee-form/annee-form.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NiveauComponent } from './niveau/niveau.component';
import { NiveauFormComponent } from './niveau/niveau-form/niveau-form.component';
import { SalleComponent } from './salle/salle.component';
import { SalleFormComponent } from './salle/salle-form/salle-form.component';
import { TypesalleComponent } from './typesalle/typesalle.component';
import { TypesalleFormComponent } from './typesalle/typesalle-form/typesalle-form.component';
import { ClasseComponent } from './classe/classe.component';
import { ClasseFormComponent } from './classe/classe-form/classe-form.component';
import { FiltreComponent } from './classe/filtre/filtre.component';
import { RouterModule } from '@angular/router';
import { ClasseFiltreComponent } from './classe/classe-filtre/classe-filtre.component';
import { GroupeMatiereComponent } from './groupe-matiere/groupe-matiere.component';
import { GroupeMatiereFormComponent } from './groupe-matiere/groupe-matiere-form/groupe-matiere-form.component';
import { EtablissementComponent } from './etablissement/etablissement.component';
import { EtablissementFormComponent } from './etablissement/etablissement-form/etablissement-form.component';
import { SousMenuComponent } from './dashboard/sous-menu/sous-menu.component';
import { ParametreComponent } from './dashboard/parametre/parametre.component';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { EnseigantFormComponent } from './enseignant/enseigant-form/enseigant-form.component';
import { GradeComponent } from './grade/grade.component';
import { GradeFormComponent } from './grade/grade-form/grade-form.component';
import { SpecialiteComponent } from './specialite/specialite.component';
import { SpecialiteFormComponent } from './specialite/specialite-form/specialite-form.component';
import { EchelonComponent } from './echelon/echelon.component';
import { EchelonFormComponent } from './echelon/echelon-form/echelon-form.component';
import { CategorieComponent } from './categorie/categorie.component';
import { CategorieFormComponent } from './categorie/categorie-form/categorie-form.component';
import { VilleComponent } from './ville/ville.component';
import { VilleFormComponent } from './ville/ville-form/ville-form.component';
import { MatiereComponent } from './matiere/matiere.component';
import { MatiereFormComponent } from './matiere/matiere-form/matiere-form.component';
import { EleveComponent } from './eleve/eleve.component';
import { EleveFormComponent } from './eleve/eleve-form/eleve-form.component';
import { StatuseleveComponent } from './statuseleve/statuseleve.component';
import { StatuseleveFormComponent } from './statuseleve/statuseleve-form/statuseleve-form.component';
import { EcoleComponent } from './ecole/ecole.component';
import { EcoleFormComponent } from './ecole/ecole-form/ecole-form.component';
import { EtatsanitaireComponent } from './etatsanitaire/etatsanitaire.component';
import { EtatsanitaireFormComponent } from './etatsanitaire/etatsanitaire-form/etatsanitaire-form.component';
import { LangueComponent } from './langue/langue.component';
import { LangueFormComponent } from './langue/langue-form/langue-form.component';
import { CentreexamenComponent } from './centreexamen/centreexamen.component';
import { CentreexamenFormComponent } from './centreexamen/centreexamen-form/centreexamen-form.component';

import { FiltrerComponent } from './agent/filtrer/filtrer.component';
import { EleveInscriptionComponent } from './eleve/eleve-inscription/eleve-inscription.component';
import { TableClassComponent } from './eleve/eleve-inscription/table-class/table-class.component';
import {MatStepperModule} from '@angular/material/stepper';
import { DossierEleveComponent } from './dashboard/dossier-eleve/dossier-eleve.component';
import { DossierEnseignantComponent } from './dashboard/dossier-enseignant/dossier-enseignant.component';
import { ComptabiliteComponent } from './dashboard/comptabilite/comptabilite.component';
import { PlanningComponent } from './dashboard/planning/planning.component';
import { ResultatScolaireComponent } from './dashboard/resultat-scolaire/resultat-scolaire.component';
import { ImpressionComponent } from './dashboard/impression/impression.component';
import { PageeleveComponent } from './eleve/pageeleve/pageeleve.component';
import { ImpressionCarteBadgeEleveComponent } from './eleve/impression-carte-badge-eleve/impression-carte-badge-eleve.component';
import { ProfessionComponent } from './agent/profession/profession.component';
import { ProfessionFormComponent } from './agent/profession/profession-form/profession-form.component';
import { EtablissementTousComponent } from './etablissement/etablissement-tous/etablissement-tous.component';
import { EtablissementTousFormComponent } from './etablissement/etablissement-tous/etablissement-tous-form/etablissement-tous-form.component';
import { FraisScolaireComponent } from './frais-scolaire/frais-scolaire.component';
import { ListeSelectionEleveComponent } from './eleve/liste-selection-eleve/liste-selection-eleve.component';

import { NgChartsModule } from 'ng2-charts';
import { ConsultationCaisseComponent } from './consultation-caisse/consultation-caisse.component';
import { ConsultationCompteComponent } from './consultation-compte/consultation-compte.component';
import { ClotureCaisseHistoriqueComponent } from './cloture-caisse-historique/cloture-caisse-historique.component';
import { HistoriqueVersementCaisseComponent } from './historique-versement-caisse/historique-versement-caisse.component';
import { EtatPaiementComponent } from './frais-scolaire/etat-paiement/etat-paiement.component';
import { ClotureJourneeComptableComponent } from './cloture-journee-comptable/cloture-journee-comptable.component';
import { ToastrModule } from 'ngx-toastr'; import { ReinscriptionComponent } from './reinscription/reinscription.component';
import { ImpressioncatrteagentenseignantComponent } from './impressioncatrteagentenseignant/impressioncatrteagentenseignant.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { FraisscolaireComponent } from './maintenance/fraisscolaire/fraisscolaire.component';
import { ElevesInscritsFormComponent } from './eleve/eleves-inscrits-form/eleves-inscrits-form.component';
import { ImpressionsDocumentsEleveComponent } from './eleve/impressions-documents-eleve/impressions-documents-eleve.component';

import { ZoneComponent } from './zone/zone.component';
import { ZoneFormComponent } from './zone/zone-form/zone-form.component';
import { ImpressionCarteAgentComponent } from './impression-carte-agent/impression-carte-agent.component';
import { ImpressionCarteEnseignantComponent } from './impression-carte-enseignant/impression-carte-enseignant.component';
import { CompteComponent } from './compte/compte.component';
import { CompteFormComponent } from './compte/compte-form/compte-form.component';
import { ListeFraisScolaireComponent } from './liste-frais-scolaire/liste-frais-scolaire.component';
import { ProduitFormComponent } from './produit/produit-form/produit-form.component';
import { ProduitListeFraisScolaireFormComponent } from './produit/produit-liste-frais-scolaire-form/produit-liste-frais-scolaire-form.component';
import { ListeFraisFormComponent } from './liste-frais-scolaire/liste-frais-form/liste-frais-form.component';
import { EmptyListComponent } from './core/empty-list/empty-list.component';
import { ConfigMatiereComponent } from './config-matiere/config-matiere.component';
import { ConfigMatiereFormComponent } from './config-matiere/config-matiere-form/config-matiere-form.component';
import { CoreModule } from './core/core.module';
import { ConfigMatiereAjoutComponent } from './config-matiere/config-matiere-ajout/config-matiere-ajout.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AfterCreateComponent } from './ecole/ecole-form/after-create/after-create.component';
import { ReductionExonerationComponent } from './comptabilite/reduction-exoneration/reduction-exoneration.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EnvoieMailComponent } from './home/envoie-mail/envoie-mail.component';
import { EnvoiemessageAccueilComponent } from './home/envoiemessage-accueil/envoiemessage-accueil.component';
import { ImpressionReleveNoteComponent } from './dashboard/impression/impression-releve-note/impression-releve-note.component';
import { ProfileComponent } from './agent/profile/profile.component';
import { NotificationComponent } from './dashboard/notification/notification.component';
import { DescriptionComponent } from './dashboard/notification/description/description.component';
import {MatCardModule} from '@angular/material/card';
import { ImprimeEmploiTempClasseComponent } from './dashboard/planning/imprime-emploi-temp-classe/imprime-emploi-temp-classe.component';
import { ChangeClasseComponent } from './eleve/change-classe/change-classe.component';
import { RepartitionEnseignantComponent } from './enseignant/repartition-enseignant/repartition-enseignant.component';
import { ChooseEnseignantComponent } from './enseignant/choose-enseignant/choose-enseignant.component';
import { InfoCaisseComponent } from './cloture-journee-comptable/info-caisse/info-caisse.component';
import { UpdatePasswordComponent } from './agent/update-password/update-password.component';
import { MatiereEnseignerComponent } from './enseignant/matiere-enseigner/matiere-enseigner.component';
import { ChooseMatiereEnseigneeComponent } from './enseignant/choose-matiere-enseignee/choose-matiere-enseignee.component';
import { ProfileEnseignantComponent } from './enseignant/profile-enseignant/profile-enseignant.component';
import { ChooseEnseignantByMatiereComponent } from './enseignant/choose-enseignant-by-matiere/choose-enseignant-by-matiere.component';
import { RadiationEleveComponent } from './eleve/radiation-eleve/radiation-eleve.component';
import {MatSelectModule} from '@angular/material/select';
import { EnvoisSmsComponent } from './envois-sms/envois-sms.component';
import { ContactInfoComponent } from './home/contact-info/contact-info.component';
import { LiasseComponent } from './liasse/liasse.component';
import { LiasseFormComponent } from './liasse/liasse-form/liasse-form.component';
import { PersonalisationDocumentComponent } from './dashboard/parametre/personalisation-document/personalisation-document.component';
import { PersonnalisationCertificatComponent } from './dashboard/parametre/personalisation-document/personnalisation-certificat/personnalisation-certificat.component';
import { CertificatComponent } from './dashboard/parametre/personalisation-document/personnalisation-certificat/certificat/certificat.component';
import { QuillModule } from 'ngx-quill';
import { ChooseBaliseComponent } from './dashboard/parametre/personalisation-document/personnalisation-certificat/choose-balise/choose-balise.component';
import { ImageDeFondComponent } from './dashboard/parametre/personalisation-document/image-de-fond/image-de-fond.component';
import { PersonnaliserImageComponent } from './dashboard/parametre/personalisation-document/image-de-fond/personnaliser-image/personnaliser-image.component';
import { EntetesComponent } from './dashboard/parametre/personalisation-document/entetes/entetes.component';
import { BulletinComponent } from './dashboard/parametre/personalisation-document/bulletin/bulletin.component';
import { ColorpickerComponent } from './dashboard/parametre/personalisation-document/bulletin/colorpicker/colorpicker.component';
import { ObsertionsNotesMatiereComponent } from './obsertions-notes-matiere/obsertions-notes-matiere.component';
import { ObservationNotesMatiereFormComponent } from './obsertions-notes-matiere/observation-notes-matiere-form/observation-notes-matiere-form.component';
import { MetionsComponent } from './mentions/mentions.component';
import { MentionsFormComponent } from './mentions/mentions-form/mentions-form.component';
import { ObjectifsComponent } from './objectifs/objectifs.component';
import { ObjectifFormComponent } from './objectifs/objectif-form/objectif-form.component';
import { ParentEleveComponent } from './parent-eleve/parent-eleve.component';
import { SelectionCompteModule } from './core/selection-compte/selection-compte.module';
import { GeneratenewpasswordComponent } from './agent/generatenewpassword/generatenewpassword.component';
import {FormBuilder, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginFormComponent } from './login-form/login-form.component';
import { CreateCompteComponent } from './login-form/create-compte/create-compte.component';
import { ValidationCompteComponent } from './login-form/validation-compte/validation-compte.component';
import { OperationsDiversesComponent } from './operations-diverses/operations-diverses.component';
import { OptionsOperationsComponent } from './operations-diverses/options-operations/options-operations.component';
import { SaisieOperationsDiversComponent } from './operations-diverses/saisie-operations-divers/saisie-operations-divers.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AgentComponent,
    HomeComponent,
    AgentFormComponent,
    AskTokenComponent,
    DashboardComponent,
    CycleComponent,
    CycleFormComponent,
    DiplomeComponent,
    DiplomeFormComponent,
    FonctionComponent,
    FonctionFormComponent,
    NationaliteComponent,
    NationaliteFormComponent,
    QualiteensComponent,
    QualiteensFormComponent,
    SiteComponent,
    SiteFormComponent,
    ArrondissementComponent,
    QuartierComponent,
    DepartementComponent,
    DepartementFormComponent,
    QuartierFormComponent,
    ArrondissementFormComponent,
    BrancheComponent,
    BrancheFormComponent,
    CaisseComponent,
    CaisseFormComponent,
    AnneeComponent,
    AnneeFormComponent,
    AccueilComponent,
    NiveauComponent,
    NiveauFormComponent,
    SalleComponent,
    SalleFormComponent,
    TypesalleComponent,
    TypesalleFormComponent,
    ClasseComponent,
    ClasseFormComponent,
    FiltreComponent,
    ClasseFiltreComponent,
    GroupeMatiereComponent,
    GroupeMatiereFormComponent,
    EtablissementComponent,
    EtablissementFormComponent,
    SousMenuComponent,
    ParametreComponent,
    EnseignantComponent,
    EnseigantFormComponent,
    GradeComponent,
    GradeFormComponent,
    SpecialiteComponent,
    SpecialiteFormComponent,
    EchelonComponent,
    EchelonFormComponent,
    CategorieComponent,
    CategorieFormComponent,
    VilleComponent,
    VilleFormComponent,
    FiltrerComponent,
    MatiereFormComponent,
    MatiereComponent,
    EleveComponent,
    EleveFormComponent,
    StatuseleveComponent,
    StatuseleveFormComponent,
    EcoleComponent,
    EcoleFormComponent,
    EtatsanitaireComponent,
    EtatsanitaireFormComponent,
    LangueComponent,
    LangueFormComponent,
    CentreexamenComponent,
    CentreexamenFormComponent,
    EleveInscriptionComponent,
    TableClassComponent,
    DossierEleveComponent,
    DossierEnseignantComponent,
    ComptabiliteComponent,
    PlanningComponent,
    ResultatScolaireComponent,
    ImpressionComponent,
    PageeleveComponent,
    ImpressionCarteBadgeEleveComponent,
    ProfessionComponent,
    ProfessionFormComponent,
    EtablissementTousComponent,
    EtablissementTousFormComponent,
    FraisScolaireComponent,
    ListeSelectionEleveComponent,
    ConsultationCaisseComponent,
    ConsultationCompteComponent,
    ClotureCaisseHistoriqueComponent,
    HistoriqueVersementCaisseComponent,
    EtatPaiementComponent,
    ClotureJourneeComptableComponent,
    ReinscriptionComponent,
    ImpressioncatrteagentenseignantComponent,
    MaintenanceComponent,
    FraisscolaireComponent,
    ElevesInscritsFormComponent,
    ImpressionsDocumentsEleveComponent,
    ZoneComponent,
    ZoneFormComponent,
    ImpressionCarteAgentComponent,
    ImpressionCarteEnseignantComponent,
    CompteComponent,
    CompteFormComponent,
    ListeFraisScolaireComponent,
    ProduitFormComponent,
    ProduitListeFraisScolaireFormComponent,
    ListeFraisFormComponent,
    EmptyListComponent,
    ConfigMatiereComponent,
    ConfigMatiereFormComponent,
    ConfigMatiereFormComponent,
    ConfigMatiereAjoutComponent,
    AfterCreateComponent,
    ReductionExonerationComponent,
    EnvoieMailComponent,
    EnvoiemessageAccueilComponent,
    ImpressionReleveNoteComponent,
    ProfileComponent,
    NotificationComponent,
    DescriptionComponent,
    ImprimeEmploiTempClasseComponent,
    ChangeClasseComponent,
    RepartitionEnseignantComponent,
    ChooseEnseignantComponent,
    InfoCaisseComponent,
    UpdatePasswordComponent,
    MatiereEnseignerComponent,
    ChooseMatiereEnseigneeComponent,
    ProfileEnseignantComponent,
    ChooseEnseignantByMatiereComponent,
    RadiationEleveComponent,
    EnvoisSmsComponent,
    LiasseComponent,
    LiasseFormComponent,
    ContactInfoComponent,
    PersonalisationDocumentComponent,
    PersonnalisationCertificatComponent,
    CertificatComponent,
    ChooseBaliseComponent,
    ImageDeFondComponent,
    PersonnaliserImageComponent,
    EntetesComponent,
    BulletinComponent,
    ColorpickerComponent,
    ObsertionsNotesMatiereComponent,
    ObservationNotesMatiereFormComponent,
    MetionsComponent,
    MentionsFormComponent,
    ObjectifsComponent,
    ObjectifFormComponent,
    ParentEleveComponent,
    GeneratenewpasswordComponent,
    LoginFormComponent,
    CreateCompteComponent,
    ValidationCompteComponent,
    OperationsDiversesComponent,
    OptionsOperationsComponent,
    SaisieOperationsDiversComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    FormsModule,
    MatChipsModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatStepperModule,
    NgChartsModule,
    ToastrModule.forRoot(),
    QuillModule.forRoot(),
    MatProgressBarModule,
    MatCheckboxModule,
    CoreModule,
    MatCardModule,
    MatSelectModule,
    SelectionCompteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
