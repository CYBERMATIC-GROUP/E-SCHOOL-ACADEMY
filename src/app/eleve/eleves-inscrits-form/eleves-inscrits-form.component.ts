import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize, map, of, shareReplay, tap } from 'rxjs';
import { Branche } from 'src/app/models/branche.model';
import { Classe } from 'src/app/models/classe.model';
import { Cycle } from 'src/app/models/cycle.model';
import { Departement } from 'src/app/models/departement.model';
import { Etablissement } from 'src/app/models/etablissement.model';
import { EtablissementList } from 'src/app/models/etablissementList.model';
import { EtatSanitaire } from 'src/app/models/etatSanitaire.model';
import { Fonction } from 'src/app/models/fonction.model';
import { Langue } from 'src/app/models/langue.model';
import { Nationalite } from 'src/app/models/nationalite.model';
import { Niveau } from 'src/app/models/niveau.model';
import { Site } from 'src/app/models/site.model';
import { StatusEleve } from 'src/app/models/statuseleve.model';
import { DepartementService } from 'src/app/services/departement.service';
import { EleveService } from 'src/app/services/eleve.service';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { GlobalService } from 'src/app/services/global.service';
import { NationaliteComponent } from 'src/app/nationalite/nationalite.component';
import { MatDialog } from '@angular/material/dialog';
import { NationaliteFormComponent } from 'src/app/nationalite/nationalite-form/nationalite-form.component';
import { EtablissementTousFormComponent } from 'src/app/etablissement/etablissement-tous/etablissement-tous-form/etablissement-tous-form.component';
import { SiteFormComponent } from 'src/app/site/site-form/site-form.component';
import { LangueFormComponent } from 'src/app/langue/langue-form/langue-form.component';
import { StatuseleveFormComponent } from 'src/app/statuseleve/statuseleve-form/statuseleve-form.component';
import { EtatsanitaireFormComponent } from 'src/app/etatsanitaire/etatsanitaire-form/etatsanitaire-form.component';
import { NationaliteService } from 'src/app/services/nationalite.service';
import { EtatsanitaireService } from 'src/app/services/etatsanitaire.service';
import { StatuseleveService } from 'src/app/services/statuseleve.service';
import { LangueService } from 'src/app/services/langue.service';
import { SiteService } from 'src/app/services/site.service';
import { Eleve, EleveInscription } from 'src/app/models/eleve.model';
import { FonctionService } from 'src/app/services/fonction.service';
import { CycleService } from 'src/app/services/cycle.service';
import { ProfessionService } from 'src/app/services/profession.service';
import { Profession } from 'src/app/models/profession.model';
import { TableClassComponent } from '../eleve-inscription/table-class/table-class.component';
import { sms_parent } from 'src/environnements/constantes';
import { ChangeClasseComponent } from '../change-classe/change-classe.component';
import { ImageCropComponent } from 'src/app/core/image-crop/image-crop.component';
import { environment } from 'src/environnements/environnement.prod';
import { FraisPayerService } from 'src/app/services/frais-payer.service';

@Component({
  selector: 'app-eleves-inscrits-form',
  templateUrl: './eleves-inscrits-form.component.html',
  styleUrls: ['./eleves-inscrits-form.component.scss'],
})
export class ElevesInscritsFormComponent implements OnInit {
  eleveInscritForm!: FormGroup;
  parentInfoForm!: FormGroup;
  infoComptableForm!: FormGroup;
  action!: 'view' | 'edit' | 'reinscrire';
  IDEleve!: number;
  isLoading!: boolean;
  brancheList!: Branche[];
  niveauList!: Niveau[];
  nationaliteList$!: Observable<Nationalite[]>;
  siteList$!: Observable<Site[]>;
  classeChosed!: Classe;
  etablissementList$!: Observable<EtablissementList[]>;
  etatSanitairesList$!: Observable<EtatSanitaire[]>;
  statutElevesList$!: Observable<StatusEleve[]>;
  langueVivantes$!: Observable<Langue[]>;
  cycleList$!: Observable<Cycle[]>;
  departementsList$!: Observable<Departement[]>;
  fonctionList$!: Observable<Fonction[]>;
  professionList$!: Observable<Profession[]>;
  photoEleve!: string;
  titlePage!: string;
  NomElevePaiement!: string;
  isLoadingDataStudent!: boolean;
  updateIsLoading!: boolean;
  photo$!: Observable<{ Photo: string }>;
  isNationaliteCall: boolean = false;
  typeImpression = environment.TypeImpressionEleve;
  carteScolaireIsPrint!: boolean;
  dossierIsPrint!: boolean;
  eleve: any;
  infoEleve: any;
  dataSourceFraisSColaire: any;

  constructor(
    private eleveSerivice: EleveService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private etablissementService: EtablissementService,
    private departementService: DepartementService,
    private globalService: GlobalService,
    private nationnaliteService: NationaliteService,
    private etatSanitaireService: EtatsanitaireService,
    private statutService: StatuseleveService,
    private langueService: LangueService,
    public GlobalService: GlobalService,
    private siteService: SiteService,
    private fonctionService: FonctionService,
    private professionService: ProfessionService,
    private cycleService: CycleService,
    private fraisScolaireService: FraisPayerService
  ) {}

  ngOnInit(): void {
    this.action = this.route.snapshot.params['action'];
    this.IDEleve = this.route.snapshot.params['IDEleve'];

    this.getLists();
    this.initELeveInscrit();

    if (this.action == 'reinscrire') this.titlePage = "Réinscrire l'élève";
    else if (this.action == 'edit')
      this.titlePage = "Modifier les informations de l'élève";
    else if (this.action == 'view') this.titlePage = "Fiche de l'élève ";

    this.photo$ = this.eleveSerivice.getPhoto(this.IDEleve).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  OpenPaiement(){
    this.router.navigateByUrl('reduction-exoneration/' + this.IDEleve)
  }

    initDataFraisScolaire(idEleve: number) {
      console.log(idEleve);
      this.fraisScolaireService.getHistoriquePaiementByEleve(idEleve).subscribe((res) => {
          console.log(res);
          this.infoEleve = res;
          this.dataSourceFraisSColaire = res.tabDétailProduits;
        });
    }

  loadEleve(idEleve: number) {
    this.isLoadingDataStudent = true;
    this.eleveSerivice.getOne(idEleve).subscribe((res) => {
      console.log(res)
      console.log(res.CodeClasse);
      ;
      this.infoEleve = res.HistiriquePaiementFraisScolaire
      this.eleveInscritForm.patchValue(res);
      this.isLoadingDataStudent = false;      
      this.eleveInscritForm.get('textClasseValue')?.setValue(res.CodeClasse);
      this.setSmasValidators(res.SMS_ParentParDefaut);
    });
  }

  getLists() {
    const params$ = this.eleveSerivice.getPrametresEleve().pipe(
      shareReplay(1)  // Partage la même réponse entre tous les abonnés
    );
  
    params$.subscribe((data) => {
      console.log(data);
    });
  
    this.departementsList$ = params$.pipe(map((data) => data.DEPARTEMENT));
    this.nationaliteList$ = params$.pipe(map((data) => data.NATIONALITE));
    this.siteList$ = params$.pipe(map((data) => data.SITE));
    this.cycleList$ = params$.pipe(map((data) => data.CYCLES));
    this.statutElevesList$ = params$.pipe(map((data) => data.STATUTELEVE));
    this.etatSanitairesList$ = params$.pipe(map((data) => data.ETAT_SANITAIRE));
    this.professionList$ = params$.pipe(map((data) => data.PROFESSION));
    this.etablissementList$ = params$.pipe(map((data) => data.ETABLISSEMENT));
    this.langueVivantes$ = params$.pipe(map((data) => data.LANGUE));
  }

  



  ViewHistoriquePaiement() {
    this.router.navigateByUrl(
      'historique-paiement-by-eleve-inscrit' + '/' + this.IDEleve
    );
  }

  convertToValideDates(Date: string) {
    const year = Date.split('-')[0];
    const month = Date.split('-')[1];
    const day = Date.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  delete() {
    this.router.navigate(['/radiation-eleve/' + this.IDEleve])
  }

  initELeveInscrit() {
    const settingForm = (validatorsList: any[] | boolean = false) => {
      if (validatorsList == false)
        return [
          { value: null, disabled: this.action == 'view' ? true : false },
        ];
      else if (validatorsList == true)
        return [
          { value: null, disabled: this.action == 'view' ? true : false },
          Validators.required,
        ];

      return [
        { value: null, disabled: this.action == 'view' ? true : false },
        validatorsList,
      ];
    };
  
    this.eleveInscritForm = this.formBuilder.group({
      IDELEVE: settingForm(),
      IDNIVEAU: settingForm(),
      IDBRANCHE: settingForm(),
      IDCLASSES: settingForm(),
      CodeEleve: settingForm(),
      Civilite: settingForm(true),
      DateNaissance: settingForm(true),
      Telephone: settingForm(),
      Courriel: settingForm(),
      Fr_Nom: settingForm(true),
      Fr_Prenom: settingForm(true),
      Fr_LieuNaissance: settingForm(true),
      Fr_Adresse1: settingForm(true),
      Fr_Adresse2: settingForm(),
      Fr_Ville: settingForm(true),
      PassWord: settingForm(),
      IDClasseAvenir: settingForm(),
      TypeEleve: settingForm(),
      Boursier: settingForm(),
      TypeBourse: settingForm(),
      IDNationalite: settingForm(),
      ClassesDoublees: settingForm(),
      EtatEleve: settingForm(),
      IDCYCLES: settingForm(),
      IDFRATRIE: settingForm(),
      IDSTATUTELEVE: settingForm(),
      EtatSanitaire: settingForm(true),
      NouveauDansAnneeCourante: settingForm(true),
      IDCENTRE_EXAMEN: settingForm(),
      Redoublant: settingForm(true),
      IDSITE: settingForm(),
      IDINSCRIPTIONS: settingForm(),
      IDSORTIES: settingForm(),
      EtablissementOrigine: settingForm(),
      SituationSociale: settingForm(),
      ProfessionPere: settingForm(),
      ProfessionMere: settingForm(),
      LangueVivante1: settingForm(),
      LangueVivante2: settingForm(),
      LangueVivante3: settingForm(),
      NombreFreres: settingForm(),
      NombreSoeurs: settingForm(),
      Fr_Observations: settingForm(),
      ExempteDuSport: settingForm(),
      Commentaire_Fr: settingForm(),
      Login: settingForm(),
      FraisInscriptionPayes: settingForm(),
      TelMobilePere: settingForm(),
      EmailPere: settingForm(),
      TelMobileMere: settingForm(),
      EmailMere: settingForm(),
      TelMobile: settingForm(),
      TauxReductionFraisScolaires: settingForm(),
      TauxReductionFraisOccasionnels: settingForm(),
      MontantReductionFraisScolaires: settingForm(),
      MontantReductionFraisOccasionnels: settingForm(),
      TauxMajorationFraisScolaires: settingForm(),
      MontantMajorationFraisScolaires: settingForm(),
      Fr_NomPrenomTuteur: settingForm(),
      ProfessionTuteur: settingForm(),
      EmailTuteur: settingForm(),
      TelMobileTuteur: settingForm(),
      bPleinTemps: settingForm(),
      bMarie: settingForm(),
      SMS_ParentParDefaut: settingForm(),
      Travailleur: settingForm(),
      NumCNI: settingForm(),
      IdentifiantNational: settingForm(),
      IdentifiantBadge: settingForm(),
      Fr_Departement: settingForm(),
      Fr_Arrondissement: settingForm(),
      CodeEtab: settingForm(),
      ParentsDivorces: settingForm(),
      Photo: settingForm(),
      Fr_NomPrenomMere: settingForm(),
      Fr_NomPrenomPere: settingForm(),
      LibelleEtatSanitaire: settingForm(true),
      Nationalite: settingForm(),
      IDLangueVivante1: settingForm(),
      IDLangueVivante2: settingForm(),
      IDLangueVivante3: settingForm(),
      EtablissementProvenance: settingForm(),
      Cycle: settingForm(),
      Site: settingForm(),
      IDProfessionMere: settingForm(),
      IDProfessionPere: settingForm(),
      IDProfessionTuteur: settingForm(),
      Statut: settingForm(),
      textClasseValue: settingForm(),
      DepartementResidence: settingForm(),
      BEPC_Annee: settingForm(),
    });

    this.parentInfoForm = this.formBuilder.group({});

    this.infoComptableForm = this.formBuilder.group({});

    if (this.IDEleve) {
      this.loadEleve(this.IDEleve);
    }
    //events on change sms alerte parent
    this.eleveInscritForm
      .get('SMS_ParentParDefaut')
      ?.valueChanges.subscribe((value) => {
        this.setSmasValidators(value);
      });
  }

  openTableClasse() {
    const ref = this.dialog.open(TableClassComponent);
    ref.afterClosed().subscribe((res) => {
      this.eleveInscritForm
        .get('IDCLASSES')
        ?.setValue(ref.componentInstance.classeSelected.IDCLASSES);
      this.classeChosed = ref.componentInstance.classeSelected;
      console.log(this.classeChosed);
      this.eleveInscritForm
        .get('textClasseValue')
        ?.setValue(this.classeChosed.CodeClasse);
    });
  }


  // open etablissement
  openEtablissement() {
    const dialog = this.dialog.open(EtablissementTousFormComponent, {});
    dialog.componentInstance.isEtablissementCall = true;
    dialog.afterClosed().subscribe((result) => {
      const IDETABLISSEMENTS = dialog.componentInstance.IDETABLISSEMENTS;
      const Fr_Nom = dialog.componentInstance.Fr_Nom;
      console.log(Fr_Nom);
      this.getLastEtablissement(IDETABLISSEMENTS, Fr_Nom);
    });
  }

  getLastEtablissement(IDETABLISSEMENTS: number, Fr_Nom: string) {
    this.eleveInscritForm.get('IDETABLISSEMENTS')?.setValue(IDETABLISSEMENTS);
    this.eleveInscritForm.get('EtablissementOrigineNom')?.setValue(Fr_Nom);
  }
  // open site
  openSiteDialog() {
    const dialog = this.dialog.open(SiteFormComponent, {});
    dialog.componentInstance.isSiteCall = true;
    dialog.afterClosed().subscribe((result) => {
      const IDSITE = dialog.componentInstance.IDSITE;
      const Libelle = dialog.componentInstance.Libelle;
      console.log(Libelle);
      this.getLatestSite(IDSITE, Libelle);
    });
  }

  getLatestSite(IDSITE: number, Libelle: string) {
    this.eleveInscritForm.get('IDSITE')?.setValue(IDSITE);
    this.eleveInscritForm.get('SiteName')?.setValue(Libelle);
  }

  //open premiere langue

  openPremieierelangueDialog() {
    const dialog = this.dialog.open(LangueFormComponent, {});
    dialog.componentInstance.isSLangueCall = true;
    dialog.afterClosed().subscribe((result) => {
      const IDLANGUE = dialog.componentInstance.IDLANGUE;
      const Fr_Libelle = dialog.componentInstance.Fr_Libelle;
      console.log(Fr_Libelle);
      this.getLatestLangue(IDLANGUE, Fr_Libelle);
    });
  }

  getLatestLangue(IDLANGUE: number, Fr_Libelle: string) {
    this.eleveInscritForm.get('IDLANGUE')?.setValue(IDLANGUE);
    this.eleveInscritForm.get('LangueVivanteText1')?.setValue(Fr_Libelle);
  }

  //open deuxieme langue

  openDeuxiemelangueDialog() {
    const dialog = this.dialog.open(LangueFormComponent, {});
    dialog.componentInstance.isSLangueCall = true;
    dialog.componentInstance.action = 'create';

    dialog.afterClosed().subscribe((result) => {
      const IDLANGUE = dialog.componentInstance.IDLANGUE;
      const Fr_Libelle = dialog.componentInstance.Fr_Libelle;
      console.log(Fr_Libelle);
      this.getLatestLangue2(IDLANGUE, Fr_Libelle);
    });
  }

  getLatestLangue2(IDLANGUE: number, Fr_Libelle: string) {
    this.eleveInscritForm.get('IDLANGUE')?.setValue(IDLANGUE);
    this.eleveInscritForm.get('LangueVivanteText2')?.setValue(Fr_Libelle);
  }

  //open troisieme langue

  openTroisiemelangueDialog() {
    const dialog = this.dialog.open(LangueFormComponent, {});
    dialog.componentInstance.isSLangueCall = true;
    dialog.afterClosed().subscribe((result) => {
      const IDLANGUE = dialog.componentInstance.IDLANGUE;
      const Fr_Libelle = dialog.componentInstance.Fr_Libelle;
      console.log(Fr_Libelle);
      this.getLatestLangue3(IDLANGUE, Fr_Libelle);
    });
  }

  getLatestLangue3(IDLANGUE: number, Fr_Libelle: string) {
    this.eleveInscritForm.get('IDLANGUE')?.setValue(IDLANGUE);
    this.eleveInscritForm.get('LangueVivanteText3')?.setValue(Fr_Libelle);
  }

  //open satatus eleve
  openStatusEleveDialog() {
    const dialog = this.dialog.open(StatuseleveFormComponent, {});
    dialog.componentInstance.isStatusEleveCall = true;

    dialog.afterClosed().subscribe((result) => {
      const IDSTATUTELEVE = dialog.componentInstance.IDSTATUTELEVE;
      const Fr_Libelle = dialog.componentInstance.Fr_Libelle;

      console.log(IDSTATUTELEVE, Fr_Libelle);

      // Mettez à jour la valeur du champ de statut dans eleveForm
      this.eleveInscritForm.get('Statut')?.setValue(Fr_Libelle);
      this.eleveInscritForm.get('IDSTATUTELEVE')?.setValue(IDSTATUTELEVE);
    });
  }

  // open etat sanitaire
  openEtatSanitaireDialog() {
    const dialog = this.dialog.open(EtatsanitaireFormComponent, {});
    dialog.componentInstance.isEtatSanitaireCall = true;
    dialog.afterClosed().subscribe((result) => {
      const IDETAT_SANITAIRE = dialog.componentInstance.IDETAT_SANITAIRE;
      const Fr_Libelle = dialog.componentInstance.Fr_Libelle;

      // Mettez à jour la valeur du champ de statut dans eleveForm
      this.eleveInscritForm.get('LibelleEtatSanitaire')?.setValue(Fr_Libelle);
      this.eleveInscritForm.get('EtatSanitaire')?.setValue(IDETAT_SANITAIRE);
      console.log(Fr_Libelle, IDETAT_SANITAIRE);
    });
  }

  //open nationalite
  openNationaliteDialog() {
    const dialog = this.dialog.open(NationaliteFormComponent);
    dialog.componentInstance.isNationaliteCall = true;
    dialog.afterClosed().subscribe((result) => {
      const IDNATIONALITE = dialog.componentInstance.IDNATIONALITE;
      const Libelle = dialog.componentInstance.Libelle;

      console.log(dialog.componentInstance.IDNATIONALITE);
      console.log(dialog.componentInstance.Libelle);

      console.log(IDNATIONALITE, Libelle);
      this.eleveInscritForm.get('Nationalite')?.setValue(Libelle);
      this.eleveInscritForm.get('IDNationalite')?.setValue(IDNATIONALITE);
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const photo = reader.result as string;
      this.photoEleve = photo;
      this.eleveInscritForm.get('Photo')?.setValue(photo);
    };
  }

  onInputNomOrPrenom() {
    if (!this.eleveInscritForm.value.IDCLASSES) {
      this.globalService.alert(
        "Veuillez d'abord sélectionner la classe",
        'Attention !',
        'danger',
        '',
        'OK'
      );
    }
  }

  filterElement(listeToGilter: any[], value: string, keyTofilter: string) {
    if (listeToGilter && listeToGilter.length > 0) {
      const isKeyExist = listeToGilter[0][keyTofilter];
      if (isKeyExist) {
        let result!: any[];
        if (value.length > 0) {
          const regexQuertier = new RegExp('.*' + value + '.*', 'i');
          result = listeToGilter.filter((elt) =>
            regexQuertier.test(elt[keyTofilter])
          );
        } else {
          result = listeToGilter;
        }

        return result;
      } else {
        this.globalService.alert(
          "Attention la cle de recherche passe n'existe pas pour la liste '" +
            keyTofilter +
            "'",
          'Erreur',
          'danger',
          '',
          'OK'
        );
        return [];
      }
    }

    return [];
  }

  onSubmitForm() {
    const eleve: Eleve = this.eleveInscritForm.value;
    console.log(eleve);
    this.updateIsLoading = true;
    this.eleveSerivice
      .update(eleve)
      .pipe(
        tap((res) => {
          this.globalService.toastShow(
            'Eleve ' + eleve.Fr_Nom + ' a été mis à jour avec succès !',
            'Modification'
          );
          console.log(res);
          this.updateIsLoading = false;
        }),
        finalize(() => {
          this.updateIsLoading = false;
        })
      )
      .subscribe();
  }

  private setSmasValidators(value: number) {
    this.eleveInscritForm.get('Fr_NomPrenomTuteur')?.clearValidators();
    this.eleveInscritForm.get('Fr_NomPrenomTuteur')?.updateValueAndValidity();
    this.eleveInscritForm.get('TelMobileTuteur')?.clearValidators();
    this.eleveInscritForm.get('TelMobileTuteur')?.updateValueAndValidity();

    this.eleveInscritForm.get('Fr_NomPrenomPere')?.clearValidators();
    this.eleveInscritForm.get('Fr_NomPrenomPere')?.updateValueAndValidity();
    this.eleveInscritForm.get('TelMobilePere')?.clearValidators();
    this.eleveInscritForm.get('TelMobilePere')?.updateValueAndValidity();

    this.eleveInscritForm.get('Fr_NomPrenomMere')?.clearValidators();
    this.eleveInscritForm.get('Fr_NomPrenomMere')?.updateValueAndValidity();
    this.eleveInscritForm.get('TelMobileMere')?.clearValidators();
    this.eleveInscritForm.get('TelMobileMere')?.updateValueAndValidity();

    this.eleveInscritForm.get('TelMobile')?.clearValidators();
    this.eleveInscritForm.get('TelMobile')?.updateValueAndValidity();

    if (value == sms_parent.PERE) {
      this.eleveInscritForm
        .get('Fr_NomPrenomPere')
        ?.setValidators(Validators.required);
      this.eleveInscritForm.get('Fr_NomPrenomPere')?.updateValueAndValidity();
      this.eleveInscritForm
        .get('TelMobilePere')
        ?.setValidators(Validators.required);
      this.eleveInscritForm.get('TelMobilePere')?.updateValueAndValidity();
    } else if (value == sms_parent.MERE) {
      console.log('mere');
      this.eleveInscritForm
        .get('Fr_NomPrenomMere')
        ?.setValidators(Validators.required);
      this.eleveInscritForm.get('Fr_NomPrenomMere')?.updateValueAndValidity();
      this.eleveInscritForm
        .get('TelMobileMere')
        ?.setValidators(Validators.required);
      this.eleveInscritForm.get('TelMobileMere')?.updateValueAndValidity();
    } else if (value == sms_parent.TUTEUR) {
      console.log('tuteur');
      this.eleveInscritForm
        .get('Fr_NomPrenomTuteur')
        ?.setValidators(Validators.required);
      this.eleveInscritForm.get('Fr_NomPrenomTuteur')?.updateValueAndValidity();
      this.eleveInscritForm
        .get('TelMobileTuteur')
        ?.setValidators(Validators.required);
      this.eleveInscritForm.get('TelMobileTuteur')?.updateValueAndValidity();
    } else if (value == sms_parent.ELEVE) {
      console.log('eleve');
      this.eleveInscritForm
        .get('TelMobile')
        ?.setValidators(Validators.required);
      this.eleveInscritForm.get('TelMobile')?.updateValueAndValidity();
    }
  }

  onChangeClass() {
    const ref = this.dialog.open(ChangeClasseComponent, {
      maxWidth: '750px',
    });
    const eleve: Eleve = this.eleveInscritForm.value;
    ref.componentInstance.eleve = eleve;
    ref.afterClosed().subscribe((result) => {
      if (ref.componentInstance.isModified) {
        this.globalService.reloadComponent(
          'eleve/inscription/edit/' + eleve.IDELEVE
        );
      }
    });
  }

  openCropImage() {
    const ref = this.dialog.open(ImageCropComponent, {
      maxWidth: '650px',
    });
    ref.afterClosed().subscribe((result) => {
      if (ref.componentInstance.finalImage) {
        this.photoEleve = ref.componentInstance.finalImage;
        this.eleveInscritForm.get('Photo')?.setValue(this.photoEleve);
      }
    });
  }

  printDoc(typeimpression: number) {
    if (typeimpression == this.typeImpression.CARTE_SCOLAIRE)
      this.carteScolaireIsPrint = true;
    else if (typeimpression == this.typeImpression.DOSSIER_ELEVE)
      this.dossierIsPrint = true;

    this.eleveSerivice
      .impressionDocumentEleve(typeimpression, [{ IDELEVE: this.IDEleve }])
      .pipe(
        tap((res) => {
          const etat = res.body.Etat;
          this.globalService.printFile(etat, "Document de l'élève");
        }),
        finalize(() => {
          this.carteScolaireIsPrint = false;
          this.dossierIsPrint = false;
        })
      )
      .subscribe();
  }
}
