import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AgentComponent } from './agent/agent.component';
import { AgentFormComponent } from './agent/agent-form/agent-form.component';
import { NationaliteComponent } from './nationalite/nationalite.component';
import { FonctionComponent } from './fonction/fonction.component';
import { FonctionFormComponent } from './fonction/fonction-form/fonction-form.component';
import { SiteComponent } from './site/site.component';
import { DiplomeComponent } from './diplome/diplome.component';
import { CycleComponent } from './cycle/cycle.component';
import { QualiteensComponent } from './qualiteens/qualiteens.component';
import { Arrondissement } from './models/arrondissement.model';
import { ArrondissementComponent } from './arrondissement/arrondissement.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartementComponent } from './departement/departement.component';
import { QuartierComponent } from './quartier/quartier.component';
import { BrancheComponent } from './branche/branche.component';
import { CaisseComponent } from './caisse/caisse.component';
import { Annee } from './models/annee.model';
import { AnneeComponent } from './annee/annee.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NiveauComponent } from './niveau/niveau.component';
import { SalleComponent } from './salle/salle.component';
import { ClasseComponent } from './classe/classe.component';
import { TypesalleComponent } from './typesalle/typesalle.component';
import { ClasseFormComponent } from './classe/classe-form/classe-form.component';
import { ClasseFiltreComponent } from './classe/classe-filtre/classe-filtre.component';
import { GroupeMatiereComponent } from './groupe-matiere/groupe-matiere.component';
import { EtablissementComponent } from './etablissement/etablissement.component';
import { EtablissementFormComponent } from './etablissement/etablissement-form/etablissement-form.component';
import { SousMenuComponent } from './dashboard/sous-menu/sous-menu.component';
import { ParametreComponent } from './dashboard/parametre/parametre.component';
import { environment } from 'src/environnements/environnement.prod';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { EnseigantFormComponent } from './enseignant/enseigant-form/enseigant-form.component';
import { GradeComponent } from './grade/grade.component';
import { SpecialiteComponent } from './specialite/specialite.component';
import { EchelonComponent } from './echelon/echelon.component';
import { CategorieComponent } from './categorie/categorie.component';
import { VilleComponent } from './ville/ville.component';
import { MatiereComponent } from './matiere/matiere.component';
import { EleveComponent } from './eleve/eleve.component';
import { EleveFormComponent } from './eleve/eleve-form/eleve-form.component';
import { StatuseleveComponent } from './statuseleve/statuseleve.component';
import { EtatsanitaireComponent } from './etatsanitaire/etatsanitaire.component';
import { LangueComponent } from './langue/langue.component';
import { CentreexamenComponent } from './centreexamen/centreexamen.component';
import { DossierEleveComponent } from './dashboard/dossier-eleve/dossier-eleve.component';
import { DossierEnseignantComponent } from './dashboard/dossier-enseignant/dossier-enseignant.component';
import { ImpressionComponent } from './dashboard/impression/impression.component';
import { ComptabiliteComponent } from './dashboard/comptabilite/comptabilite.component';
import { PlanningComponent } from './dashboard/planning/planning.component';
import { ResultatScolaireComponent } from './dashboard/resultat-scolaire/resultat-scolaire.component';
import { PageeleveComponent } from './eleve/pageeleve/pageeleve.component';
import { TableClassComponent } from './eleve/eleve-inscription/table-class/table-class.component';
import { ImpressionCarteBadgeEleveComponent } from './eleve/impression-carte-badge-eleve/impression-carte-badge-eleve.component';
import { ProfessionComponent } from './agent/profession/profession.component';
import { EtablissementTousComponent } from './etablissement/etablissement-tous/etablissement-tous.component';
import { FraisScolaireComponent } from './frais-scolaire/frais-scolaire.component';
import { ListeSelectionEleveComponent } from './eleve/liste-selection-eleve/liste-selection-eleve.component';
import { ConsultationCaisseComponent } from './consultation-caisse/consultation-caisse.component';
import { ConsultationCompteComponent } from './consultation-compte/consultation-compte.component';
import { ClotureCaisseHistoriqueComponent } from './cloture-caisse-historique/cloture-caisse-historique.component';
import { HistoriqueVersementCaisseComponent } from './historique-versement-caisse/historique-versement-caisse.component';
import { ClotureJourneeComptableComponent } from './cloture-journee-comptable/cloture-journee-comptable.component';
import { ReinscriptionComponent } from './reinscription/reinscription.component';
import { ImpressioncatrteagentenseignantComponent } from './impressioncatrteagentenseignant/impressioncatrteagentenseignant.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { FraisscolaireComponent } from './maintenance/fraisscolaire/fraisscolaire.component';
import { EtatPaiementComponent } from './frais-scolaire/etat-paiement/etat-paiement.component';
import { EcoleFormComponent } from './ecole/ecole-form/ecole-form.component';
import { EcoleComponent } from './ecole/ecole.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ElevesInscritsFormComponent } from './eleve/eleves-inscrits-form/eleves-inscrits-form.component';
import { ImpressionsDocumentsEleveComponent } from './eleve/impressions-documents-eleve/impressions-documents-eleve.component';
import { ZoneComponent } from './zone/zone.component';
import { ZoneFormComponent } from './zone/zone-form/zone-form.component';
import { ImpressionCarteAgentComponent } from './impression-carte-agent/impression-carte-agent.component';
import { ImpressionCarteEnseignantComponent } from './impression-carte-enseignant/impression-carte-enseignant.component';
import { CompteComponent } from './compte/compte.component';
import { CompteFormComponent } from './compte/compte-form/compte-form.component';
import { ListeFraisScolaireComponent } from './liste-frais-scolaire/liste-frais-scolaire.component';
import { ListeFraisFormComponent } from './liste-frais-scolaire/liste-frais-form/liste-frais-form.component';
import { ProduitListeFraisScolaireFormComponent } from './produit/produit-liste-frais-scolaire-form/produit-liste-frais-scolaire-form.component';
import { ConfigMatiereComponent } from './config-matiere/config-matiere.component';
import { ConfigMatiereFormComponent } from './config-matiere/config-matiere-form/config-matiere-form.component';
import { AnnulationOperationComponent } from './comptabilite/annulation-operation/annulation-operation.component';
import { EpayComponent } from './core/epay/epay.component';
import { AfterCreateComponent } from './ecole/ecole-form/after-create/after-create.component';
import { EnvoieMailComponent } from './home/envoie-mail/envoie-mail.component';
import { ImpressionReleveNoteComponent } from './dashboard/impression/impression-releve-note/impression-releve-note.component';
import { ProfileComponent } from './agent/profile/profile.component';
import { FicheEleveComponent } from './espace-eleve/fiche-eleve/fiche-eleve.component';
import { ImprimeEmploiTempClasseComponent } from './dashboard/planning/imprime-emploi-temp-classe/imprime-emploi-temp-classe.component';
import { VisitesViewComponent } from './visite/visites-view/visites-view.component';
import { RepartitionEnseignantComponent } from './enseignant/repartition-enseignant/repartition-enseignant.component';
import { MatiereEnseignerComponent } from './enseignant/matiere-enseigner/matiere-enseigner.component';
import { EnseignantGuard } from './core/guard/enseignant.guard';
import { RadiationEleveComponent } from './eleve/radiation-eleve/radiation-eleve.component';
import { ProfileEnseignantComponent } from './enseignant/profile-enseignant/profile-enseignant.component';
import { EleveGuard } from './core/guard/eleve.guard';
import { ClassementReleveNoteEleveComponent } from './eleve/classement-releve-note-eleve/classement-releve-note-eleve.component';
import { EnvoisSmsComponent } from './envois-sms/envois-sms.component';
import { LiasseComponent } from './liasse/liasse.component';
import { PersonalisationDocumentComponent } from './dashboard/parametre/personalisation-document/personalisation-document.component';
import { PersonnalisationCertificatComponent } from './dashboard/parametre/personalisation-document/personnalisation-certificat/personnalisation-certificat.component';
import { CertificatComponent } from './dashboard/parametre/personalisation-document/personnalisation-certificat/certificat/certificat.component';
import { ImageDeFondComponent } from './dashboard/parametre/personalisation-document/image-de-fond/image-de-fond.component';
import { PersonnaliserImageComponent } from './dashboard/parametre/personalisation-document/image-de-fond/personnaliser-image/personnaliser-image.component';
import { EntetesComponent } from './dashboard/parametre/personalisation-document/entetes/entetes.component';
import { BulletinComponent } from './dashboard/parametre/personalisation-document/bulletin/bulletin.component';
import { ObsertionsNotesMatiereComponent } from './obsertions-notes-matiere/obsertions-notes-matiere.component';
import { MetionsComponent } from './mentions/mentions.component';
import { ObjectifsComponent } from './objectifs/objectifs.component';
import { CoursComponent } from './espace-enseignant/cours/cours.component';
import { EditUrlComponent } from './edit-url/edit-url.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ValidationCompteComponent } from './login-form/validation-compte/validation-compte.component';
import { HomeParentComponent } from './espace-parent/home-parent/home-parent.component';
import { ParentGuard } from './core/guard/parent.guard';
import { SearchEleveParentComponent } from './espace-parent/search-eleve-parent/search-eleve-parent.component';
import { OperationsDiversesComponent } from './operations-diverses/operations-diverses.component';
import { OptionsOperationsComponent } from './operations-diverses/options-operations/options-operations.component';
import { SaisieOperationsDiversComponent } from './operations-diverses/saisie-operations-divers/saisie-operations-divers.component';
import { RetraitEspaceCaisseComponent } from './comptabilite/retrait-espace-caisse/retrait-espace-caisse.component';
import { CreateCompteComponent } from './login-form/create-compte/create-compte.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "connexion", component: LoginComponent},
  {path: "validation-compte", component: ValidationCompteComponent},
  {path: "connexion-form", component: LoginFormComponent},
  {path: "connexion/:code", component: LoginComponent},
  {path: "fiche-eleve", component: FicheEleveComponent},
  {path: "emploi-du-temp-classe", component: ImprimeEmploiTempClasseComponent},
  {path: "classement-releve-notes-eleve", loadChildren: () => import('./eleve/classement-releve-note-eleve/classement-releve-note-eleve.module').then(m => m.ClassementReleveNoteEleveModule), canActivate: [AuthGuard]},
  {path: "envois-sms", component: EnvoisSmsComponent},
  {path: "liasse", component: LiasseComponent},
  {path: "absence-agent", loadChildren: () => import("./agent/absence-agent/absence-agent.module").then(m => m.AbsenceAgentModule)},
  {path:'creation-compte-parent' ,  component: CreateCompteComponent},


  {path:'search-eleve-parent' ,  component: SearchEleveParentComponent},

  {path:'journal/operations/divers' ,  component: OperationsDiversesComponent},
  {path:'operations/options' ,  component: OptionsOperationsComponent},
  {path:'saisie/operations/divers' ,  component: SaisieOperationsDiversComponent},
  {path:'saisie/operations/divers/:action/:IDMOUVEMENT' ,  component: SaisieOperationsDiversComponent},
  {path:'retrait-espece-caisse/:IDMOUVEMENT' ,  component: RetraitEspaceCaisseComponent},
  {path:'retrait-espece-caisse' ,  component: RetraitEspaceCaisseComponent},




  {path: "personalisation-document", component: PersonalisationDocumentComponent, canActivate: [AuthGuard]},
  {path: "personalisation-certificat/:typecertificat/:typepersonne", component: PersonnalisationCertificatComponent, canActivate: [AuthGuard]},
  {path: "certificat", component: CertificatComponent, canActivate: [AuthGuard]},
  {path: "bulletin", component: BulletinComponent, canActivate: [AuthGuard]},
  {path: "pyramide", loadChildren: () => import("./elevepyramide/elevepyramide.module").then(m => m.ElevepyramideModule), canActivate: [AuthGuard]},


  {path: "image-de-fond", component: ImageDeFondComponent, canActivate: [AuthGuard]},
  {path: "entetes", component: EntetesComponent, canActivate: [AuthGuard]},
  {path: "personnalisation-image/:typecertificat/:typepersonne", component: PersonnaliserImageComponent, canActivate: [AuthGuard]},

  {path: "espace-parent", loadChildren: ()=> import ('./espace-parent/espace-parent.module').then(m => m.EspaceParentModule), canActivate: [ParentGuard]},


  {path: "observation", component: ObsertionsNotesMatiereComponent, canActivate: [AuthGuard]},
  {path: "mentions", component: MetionsComponent, canActivate: [AuthGuard]},
  {path: "objectifs", component: ObjectifsComponent, canActivate: [AuthGuard]},


  {path: "agent", component: AgentComponent, canActivate: [AuthGuard]},
  {path: "agent/:action/:idAgent", component: AgentFormComponent, canActivate: [AuthGuard]},
  {path: "agent-ajout", component: AgentFormComponent, canActivate: [AuthGuard]},

  {path: "impressions", component: ImpressioncatrteagentenseignantComponent, canActivate: [AuthGuard]},

  {path: "impressions/documents-eleves", component: ImpressionsDocumentsEleveComponent, canActivate: [AuthGuard]},

  {path: "maintenanceFraisScolaire", component: FraisscolaireComponent, canActivate: [AuthGuard]},

  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path: "absence-eleve", loadChildren: () => import('./eleve/saisie-absence-eleve/saisie-absence-eleve.module').then(m => m.SaisieAbsenceEleveModule), canActivate: [AuthGuard]},

  //tableau de bord
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path: "tableau-de-bord/parametres", component: ParametreComponent, canActivate: [AuthGuard]},
  {path: "tableau-de-bord/parametres/:idMenu", component: SousMenuComponent, canActivate: [AuthGuard]},
  {path: "fonction", component: FonctionComponent, canActivate: [AuthGuard]},

  {path: "enseignant/list", component: EnseignantComponent, canActivate: [AuthGuard]},
  {path: "enseignant/list/:refresh", component: EnseignantComponent, canActivate: [AuthGuard]},
  {path: "enseignant/:action/:EnseignantID", component: EnseigantFormComponent, canActivate: [AuthGuard]},
  {path: "enseignant/ajout", component: EnseigantFormComponent, canActivate: [AuthGuard]},
  {path: "repartition-enseignant", component: RepartitionEnseignantComponent, canActivate: [AuthGuard]},



  //parametre ecoles
  {path:"site", component: SiteComponent, canActivate: [AuthGuard]},
  {path:"diplome", component: DiplomeComponent, canActivate: [AuthGuard]},
  {path: "cycle", component: CycleComponent, canActivate: [AuthGuard]},
  {path: "niveau", component: NiveauComponent, canActivate: [AuthGuard]},
  {path:"salle", component: SalleComponent, canActivate: [AuthGuard]},
  {path: "typesalle", component: TypesalleComponent, canActivate: [AuthGuard]},
  {path: "branche", component: BrancheComponent, canActivate: [AuthGuard]},
  {path: "graoupeMatiere", component: GroupeMatiereComponent, canActivate: [AuthGuard]},
  {path: "graoupeMatiere/:fromapi", component: GroupeMatiereComponent, canActivate: [AuthGuard]},


  //paramettre divers
  {path: "departement", component: DepartementComponent, canActivate: [AuthGuard]},
  {path: "arrondissement", component: ArrondissementComponent, canActivate: [AuthGuard]},
  {path: "quartier", component: QuartierComponent, canActivate: [AuthGuard]},
  {path: "nationalite", component: NationaliteComponent, canActivate: [AuthGuard]},


  {path: "qualiteens", component: QualiteensComponent, canActivate: [AuthGuard]},

  {path: "caisse", component: CaisseComponent, canActivate: [AuthGuard]},
  {path: "annee", component: AnneeComponent, canActivate: [AuthGuard]},

  {path: "classe/ajout", component: ClasseFiltreComponent, canActivate: [AuthGuard]},

  {path: "etablissement", component: EtablissementComponent, canActivate: [AuthGuard]},
  {path: "etab/:action/:EtabID", component: EtablissementFormComponent, canActivate: [AuthGuard]},
  {path: "etab/ajout", component: EtablissementFormComponent, canActivate: [AuthGuard]},

  {path: "classe/list", component: ClasseComponent, canActivate: [AuthGuard]},
  {path: "classe/ajout/:action/:classeID", component: ClasseFormComponent, canActivate: [AuthGuard] },
  {path: "classe/:niveau/:branche", component: ClasseFormComponent, canActivate: [AuthGuard] },
  {path: "sous-menu", component: SousMenuComponent, canActivate: [AuthGuard] },

  {path: "grade", component: GradeComponent, canActivate: [AuthGuard]},
  {path: "specialite", component: SpecialiteComponent, canActivate: [AuthGuard] },
  {path: "echelon", component: EchelonComponent,canActivate: [AuthGuard] },
  {path: "categorie", component: CategorieComponent, canActivate: [AuthGuard] },
  {path: "ville", component: VilleComponent, canActivate: [AuthGuard] },
  {path: "matiere", component: MatiereComponent, canActivate: [AuthGuard] },

  {path: "eleve/list", component: EleveComponent, canActivate: [AuthGuard] },
  {path: "eleve/inscription/:action/:IDEleve", component: ElevesInscritsFormComponent, canActivate: [AuthGuard] },
  {path: "eleve/list/:reinscription", component: EleveComponent, canActivate: [AuthGuard] },
  {path: "eleve/ajout", component: EleveFormComponent, canActivate: [AuthGuard] },
  {path: "eleve/:action/:eleveID", component: EleveFormComponent, canActivate: [AuthGuard] },
  {path: "selectionEeleve", component: ListeSelectionEleveComponent,canActivate: [AuthGuard] },

  {path: "profession/liste", component: ProfessionComponent, canActivate: [AuthGuard] },
  {path: "etablissement-tous/liste", component: EtablissementTousComponent, canActivate: [AuthGuard] },

  {path: "statuseleve", component: StatuseleveComponent, canActivate: [AuthGuard] },
  {path: "etatsanitaire", component: EtatsanitaireComponent, canActivate: [AuthGuard] },
  {path: "langue", component: LangueComponent, canActivate: [AuthGuard] },
  {path: "centreexamen", component: CentreexamenComponent, canActivate: [AuthGuard] },

  {path: "dossierEleve", component: DossierEleveComponent, canActivate: [AuthGuard] },
  {path: "dossierEnseignant", component: DossierEnseignantComponent, canActivate: [AuthGuard] },
  {path: "impression", component: ImpressionComponent, canActivate: [AuthGuard] },
  {path: "resultatScolaire", component: ResultatScolaireComponent, canActivate: [AuthGuard] },
  {path: "comptabilite", component: ComptabiliteComponent, canActivate: [AuthGuard] },
  //{path: "planning", component: PlanningComponent, canActivate: [AuthGuard] },

  {path:"eleve/menu", component:PageeleveComponent, canActivate: [AuthGuard]},
  {path:"eleve/etat-paiement", component: EtatPaiementComponent, canActivate: [AuthGuard]},

  {path:"tabclass", component:TableClassComponent, canActivate: [AuthGuard]},

  {path:"frais/list", component:FraisScolaireComponent, canActivate: [AuthGuard]},
  {path:"frais/:eleveID", component:FraisScolaireComponent, canActivate: [AuthGuard]},

  {path:"impressionCarte", component:ImpressionCarteBadgeEleveComponent, canActivate: [AuthGuard]},

  {path:"consultationCaisse", component:ConsultationCaisseComponent, canActivate: [AuthGuard]},
  {path:"consultationCompte", component:ConsultationCompteComponent, canActivate: [AuthGuard]},
  {path:"ClotureCaisseHistorique", component:ClotureCaisseHistoriqueComponent, canActivate: [AuthGuard]},
  {path:"Consultation-des-Caisses", component:HistoriqueVersementCaisseComponent, canActivate: [AuthGuard]},
  {path:"cloturejourneecomptable", component:ClotureJourneeComptableComponent, canActivate: [AuthGuard]},

  {path:"reinscription", component:ReinscriptionComponent, canActivate: [AuthGuard]},

  {path:"maintenance", component:MaintenanceComponent, canActivate: [AuthGuard]},

  {path:"ecole/ajout", component:EcoleFormComponent},
  {path:"ecole/:action/:ecoleID", component:EcoleFormComponent},
  {path:"ecole/list", component:EcoleComponent, canActivate: [AuthGuard]},

  {path:"zone/list", component:ZoneComponent, canActivate: [AuthGuard]},
  {path:"zone/ajout", component:ZoneFormComponent, canActivate: [AuthGuard]},

  {path:"compte/list", component:CompteComponent, canActivate: [AuthGuard]},
  {path:"compte/:action/:compteID", component:CompteFormComponent, canActivate: [AuthGuard]},
  {path:"compte/ajout", component:CompteFormComponent, canActivate: [AuthGuard]},

  {path:"impression-carte-agent", component:ImpressionCarteAgentComponent, canActivate: [AuthGuard]},
  {path:"impression-carte-enseignant", component:ImpressionCarteEnseignantComponent, canActivate: [AuthGuard]},

  {path:"liste-frais-scolaire/list", component:ListeFraisScolaireComponent, canActivate: [AuthGuard]},
  {path:"liste-frais-scolaire/:action/:produitID", component:ListeFraisFormComponent, canActivate: [AuthGuard]},


  {path:"ajout-produit", component:ProduitListeFraisScolaireFormComponent, canActivate: [AuthGuard]},

  {path:"config-matiere/list", component:ConfigMatiereComponent, canActivate: [AuthGuard]},
  {path:"config-matiere/:actionn/:matiereID", component:ConfigMatiereFormComponent, canActivate: [AuthGuard]},

  {path:"liste-mouvement", component:AnnulationOperationComponent, canActivate: [AuthGuard]},
  {path:"profile-enseignant", component:ProfileEnseignantComponent},


  {path:"impression-releve-note", component:ImpressionReleveNoteComponent, canActivate: [AuthGuard]},
  {path:"matiere-enseignee-par-enseignant", component:MatiereEnseignerComponent, canActivate: [AuthGuard]},
  {path:"radiation-eleve", component:RadiationEleveComponent, canActivate: [AuthGuard]},
  {path:"radiation-eleve/:IDELEVE", component:RadiationEleveComponent, canActivate: [AuthGuard]},


  {path:"envoie-mail", component:EnvoieMailComponent},



  {path: environment.routes.Comptabilite.Base, loadChildren: () => import('./comptabilite/comptabilite.module').then(m => m.ComptabiliteModule), canActivate: [AuthGuard]},

  {path: environment.routes.services.epay + '/:IDECOLE/:CodeEcole/:typeService', component: EpayComponent},

  {path: environment.routes.services.validationSchool, component: AfterCreateComponent},

  {path: environment.routes.Eleve.espaceEleve.base, loadChildren: () => import('./espace-eleve/espace-eleve.module').then(m => m.EspaceEleveModule), canActivate: [EleveGuard]},

  {path: environment.routes.visites.base, loadChildren: () => import('./visite/visite.module').then(m => m.VisiteModule)},

  {path: environment.routes.statistique.base, loadChildren: () => import('./statistiques/statistiques.module').then(m => m.StatistiquesModule)},

  {path: environment.routes.message.base, loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule)},

  {path: environment.routes.notes.base, loadChildren: () => import('./notes-manage/notes-manage.module').then(m => m.NotesManageModule)},

  {path: environment.routes.Enseignant.espaceEnseigant.base, loadChildren: () => import('./espace-enseignant/espace-enseignant.module').then(m => m.EspaceEnseignantModule), canActivate: [EnseignantGuard]},

  {path: 'edit-url', loadChildren: () => import('./edit-url/edit-url.module').then(m => m.EditUrlModule)},
 {path: 'edit-url', component: EditUrlComponent},
 
  {path: 'impression/bulletin', loadChildren: () => import('./impression-bulletin/impression-bulletin.module').then(m => m.ImpressionBulletinModule)},

  {path: 'configuration/date-comptable', loadChildren: () => import('./date-comptable/date-comptable.module').then(m => m.DateComptableModule), canActivate: [AuthGuard]},

  {path: 'releve-global-des-notes', loadChildren: () => import('./releve-global-notes/releve-global-notes.module').then(m => m.ReleveGlobalNotesModule)},

  {path: 'formulaire/produit/:action/:id', loadChildren: () => import('./produit/produit-form/produit-form.module').then(m => m.ProduitFormModule)},

  {path: 'produit-frais/liste', loadChildren: () => import('./produit/produit.module').then(m => m.ProduitModule), canActivate: [AuthGuard]},


  {path: 'planning', loadChildren: () => import('./dashboard/planning/planning.module').then(m => m.PlanningModule), canActivate: [AuthGuard]},

  {path: 'espace-pointage', loadChildren: () => import('./pointage/sous-menu/sous-menu.module').then(m => m.SousMenuModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
