import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, catchError, finalize, map, of, take, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Classe } from 'src/app/models/classe.model';
import { ClasseService } from 'src/app/services/classe.service';
import { Salle } from 'src/app/models/salle.model';
import { SalleService } from 'src/app/services/salle.service';
import { Arrondissement } from 'src/app/models/arrondissement.model';
import { ArrondissementService } from 'src/app/services/arrondissement.service';
import { NiveauService } from 'src/app/services/niveau.service';
import { BrancheService } from 'src/app/services/branche.service';
import { Branche } from 'src/app/models/branche.model';
import { Niveau } from 'src/app/models/niveau.model';
import { Eleve, EleveInscription } from 'src/app/models/eleve.model';
import { EleveService } from 'src/app/services/eleve.service';
import { GlobalService } from 'src/app/services/global.service';
import { Departement } from 'src/app/models/departement.model';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from 'src/app/services/nationalite.service';
import { EtatSanitaire } from 'src/app/models/etatSanitaire.model';
import { StatuseleveService } from 'src/app/services/statuseleve.service';
import { EtatsanitaireService } from 'src/app/services/etatsanitaire.service';
import { StatusEleve } from 'src/app/models/statuseleve.model';
import { Langue } from 'src/app/models/langue.model';
import { LangueService } from 'src/app/services/langue.service';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/models/site.model';
import { EtablissementList } from 'src/app/models/etablissementList.model';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { TableClassComponent } from '../eleve-inscription/table-class/table-class.component';
import { DepartementService } from 'src/app/services/departement.service';
import { CycleService } from 'src/app/services/cycle.service';
import { Cycle } from 'src/app/models/cycle.model';
import { FonctionService } from 'src/app/services/fonction.service';
import { Fonction } from 'src/app/models/fonction.model';
import { ToastrService } from 'ngx-toastr';
import { Agent } from 'src/app/models/agent.model';
import { NationaliteFormComponent } from 'src/app/nationalite/nationalite-form/nationalite-form.component';
import { EtatsanitaireFormComponent } from 'src/app/etatsanitaire/etatsanitaire-form/etatsanitaire-form.component';
import { StatuseleveFormComponent } from 'src/app/statuseleve/statuseleve-form/statuseleve-form.component';
import { LangueFormComponent } from 'src/app/langue/langue-form/langue-form.component';
import { SiteFormComponent } from 'src/app/site/site-form/site-form.component';
import { EtablissementTousFormComponent } from 'src/app/etablissement/etablissement-tous/etablissement-tous-form/etablissement-tous-form.component';
import { environment } from 'src/environnements/environnement.prod';
import { ProfessionService } from 'src/app/services/profession.service';
import { Profession } from 'src/app/models/profession.model';
import { DepartementFormComponent } from 'src/app/departement/departement-form/departement-form.component';
import { sms_parent } from 'src/environnements/constantes';
import { ParamEleveComboService } from '../services/param-eleve-combo.service';

@Component({
  selector: 'app-eleve-form',
  templateUrl: './eleve-form.component.html',
  styleUrls: ['../eleves-inscrits-form/eleves-inscrits-form.component.scss'],
})
export class EleveFormComponent implements OnInit {
  @Input() action!: 'create' | 'edit' | 'view' | 'reinscription';
  agentConnected!: Agent | undefined;
  photoEleve!: string;
  eleveForm!: FormGroup;
  eleveFormPreview$!: Observable<Eleve>;
  eleveID!: number;
  brancheList!: Branche[];
  niveauList!: Niveau[];
  isLoading!: boolean;

  nationaliteList$!: Observable<Nationalite[]>;
  nationaliteIsLoad!: boolean;
  dataEleveLoad!: boolean;
  siteList!: Site[];
  siteList$!: Observable<Site[]>;
  siteListIsLoad!: boolean;

  classeChosed!: Classe;

  etablissementList!: EtablissementList[];
  etablissementList$!: Observable<EtablissementList[]>;
  etablissementListIsLoad!: boolean;

  etatSanitairesList!: EtatSanitaire[];
  etatSanitairesList$!: Observable<EtatSanitaire[]>;
  etatSanitairesListIsLoad!: boolean;

  //statutElevesList!: StatusEleve[];
  statutElevesList$!: Observable<StatusEleve[]>;
  statutElevesIsLoad!: boolean;

  langueVivantes!: Langue[];
  langueVivantes$!: Observable<Langue[]>;
  langueVivantesIsLoad!: boolean;
  professionList$!: Observable<Profession[]>;
  cycleList$!: Observable<Cycle[]>;

  departementsList$!: Observable<Departement[]>;
  Arrondissement$!: Observable<Arrondissement[]>;

  fonctionList$!: Observable<Fonction[]>;
  validator = Validators

  LabelDesChampsObligatoire = {
    IDCLASSES: 'Classe',
    Civilite: 'Civilité',
    Fr_Nom: 'Nom',
    Fr_Prenom: 'Prénoms',
    Fr_LieuNaissance: 'Lieu de naissance',
    Fr_Adresse1: 'Adresse',
    IDNationalite: 'Nationalité',
    IDCYCLES: 'Cycle',
    IDSTATUTELEVE: 'Statut élève',
    NouveauDansAnneeCourante: 'Ancien ou Nouveau',
    Redoublant: 'Redoublant',
    Fr_NomPrenomTuteur: 'Nom et prénoms du tuteur',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private niveauService: NiveauService,
    private brancheService: BrancheService,
    private eleveService: EleveService,
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private nationaliteService: NationaliteService,
    private statutsEleveServices: StatuseleveService,
    private etatSanitaireService: EtatsanitaireService,
    private langueService: LangueService,
    private siteService: SiteService,
    private etablissementService: EtablissementService,
    private departementService: DepartementService,
    private cycleService: CycleService,
    private fonctionService: FonctionService,
    private classeService: ClasseService,
    private arrondissementService: ArrondissementService,
    private professionService: ProfessionService,
    private paramEleveComboService: ParamEleveComboService
  ) {}

  ngOnInit(): void {
    this.eleveID = +this.route.snapshot.params['eleveID'];
    this.action = this.route.snapshot.params['action'];
    this.initEleveForm();

    //this.nationaliteList$ = this.nationaliteService.get();
    //this.etatSanitairesList$ = this.etatSanitaireService.get();
    this.statutElevesList$ = this.statutsEleveServices.get();
    this.langueVivantes$ = this.langueService.get();
    //this.siteList$ = this.siteService.get();

    /*this.professionService.get().subscribe((data) => {
      this.professionList$ = of(data);
    });*/
    this.professionList$ = this.professionService.get()

    //this.loadNationalite();
    //this.loadEtatSanitaireList();
    //this.loadSstatusEleves();
    //this.loadLangues();
    //this.loadSite();
    //this.loadEtablissementList();
    //this.etablissementList$ = this.etablissementService.get();
    //this.departementsList$ = this.departementService.get();
    this.Arrondissement$ = this.arrondissementService.get(0);

    /*this.etablissementService.get().subscribe((data) => {
      console.log(data);
    });*/

    //this.loadbranche();
    //this.loadniveau();

    /*this.cycleList$ = this.cycleService.get();
    this.cycleList$.subscribe((data) => {
      console.log(data);
    });*/

    //init fonctionList
    this.fonctionList$ = this.fonctionService.get();

    //set connected agent
    this.agentConnected = this.globalService.initConnectedAgent();

    this.paramEleveComboService.getParamCombo().pipe(
      tap(res => {
        console.log(res);
        
        this.nationaliteList$ = of(res.NATIONALITE)
        this.etatSanitairesList$ = of(res.ETAT_SANITAIRE)
        //this.langueVivantes$ = of(res.LANGUE)
        this.siteList$ = of(res.SITE)
        //this.professionList$ = of(res.PROFESSION)
        this.etablissementList$ = of(res.ETABLISSEMENT)
        this.departementsList$ = of(res.DEPARTEMENT)
        this.cycleList$ = of(res.CYCLES)
        //this.fonctionList$ = of(res.)
        //this.professionList$ = this.professionService.get()
      }),
      finalize(() => {
      })  
    ).subscribe();
  }

  initEleveForm() {
    const setFormParam = (
      validators: any[] = [],
      disabled: 'auto' | boolean = 'auto',
      defaultVal: string | number = ''
    ) => {
      let isDisabled: boolean;
      if (disabled === 'auto')
        isDisabled = this.action == 'view' ? true : false;
      else isDisabled = disabled;

      return [{ value: defaultVal, disabled: isDisabled }, validators];
    };

    this.eleveForm = this.formBuilder.group({
      IDELEVE: setFormParam(),
      IDNIVEAU: setFormParam(),
      IDBRANCHE: setFormParam(),
      IDCLASSES: setFormParam([Validators.required]),
      CodeEleve: setFormParam(),
      Civilite: setFormParam([Validators.required]),
      DateNaissance: setFormParam([Validators.required]),
      Telephone: setFormParam(),
      Courriel: setFormParam(),
      Fr_Nom: setFormParam([Validators.required]),
      Fr_Prenom: setFormParam([Validators.required]),
      Fr_LieuNaissance: setFormParam([Validators.required]),
      Fr_Adresse1: setFormParam([Validators.required]),
      Fr_Adresse2: setFormParam(),
      Fr_Ville: setFormParam(),
      PassWord: setFormParam(),
      IDClasseAvenir: setFormParam(),
      TypeEleve: setFormParam(),
      Boursier: setFormParam(),
      TypeBourse: setFormParam(),
      IDNationalite: setFormParam([Validators.required]),
      Nationalite: setFormParam([Validators.required]),
      ClassesDoublees: setFormParam(),
      EtatEleve: setFormParam(),
      IDCYCLES: setFormParam(),
      IDFRATRIE: setFormParam(),
      IDSTATUTELEVE: setFormParam([Validators.required]),
      EtatSanitaire: setFormParam([Validators.required]),
      NouveauDansAnneeCourante: setFormParam([Validators.required], 'auto'),
      IDCENTRE_EXAMEN: setFormParam(),
      Redoublant: setFormParam([Validators.required]),
      IDSITE: setFormParam(),
      Site: setFormParam(),
      IDINSCRIPTIONS: setFormParam(),
      IDSORTIES: setFormParam(),
      EtablissementOrigine: setFormParam(),
      SituationSociale: setFormParam(),
      ProfessionPere: setFormParam(),
      ProfessionMere: setFormParam(),
      LangueVivante1: setFormParam(),
      LangueVivante2: setFormParam(),
      LangueVivante3: setFormParam(),
      IDLangueVivante1: setFormParam(),
      IDLangueVivante2: setFormParam(),
      IDLangueVivante3: setFormParam(),
      NombreFreres: setFormParam(),
      NombreSoeurs: setFormParam(),
      Fr_Observations: setFormParam(),
      ExempteDuSport: setFormParam(),
      Commentaire_Fr: setFormParam(),
      Login: setFormParam(),
      FraisInscriptionPayes: setFormParam(),
      TelMobilePere: setFormParam(),
      EmailPere: setFormParam(),
      TelMobileMere: setFormParam(),
      EmailMere: setFormParam(),
      TelMobile: setFormParam(),
      TauxReductionFraisScolaires: setFormParam(),
      TauxReductionFraisOccasionnels: setFormParam(),
      MontantReductionFraisScolaires: setFormParam(),
      MontantReductionFraisOccasionnels: setFormParam(),
      TauxMajorationFraisScolaires: setFormParam(),
      MontantMajorationFraisScolaires: setFormParam(),
      Fr_NomPrenomTuteur: setFormParam([Validators.required]),
      ProfessionTuteur: setFormParam(),
      EmailTuteur: setFormParam(),
      TelMobileTuteur: setFormParam(),
      bPleinTemps: setFormParam(),
      bMarie: setFormParam(),
      SMS_ParentParDefaut: setFormParam(),
      Travailleur: setFormParam(),
      NumCNI: setFormParam(),
      Adresse1: setFormParam(),
      IdentifiantNational: setFormParam(),
      IdentifiantBadge: setFormParam(),
      Fr_Departement: setFormParam(),
      Fr_Arrondissement: setFormParam(),
      CodeEtab: setFormParam(),
      ParentsDivorces: setFormParam(),
      IDSTATUTELEVE_Name: setFormParam(),
      EtablissementProvenance: setFormParam(),
      DepartementResidence: setFormParam(),
      Cycle: setFormParam(),
      Fr_NomPrenomPere: setFormParam(),
      Fr_NomPrenomMere: setFormParam(),
      textClasseValue: setFormParam(),
      LibelleEtatSanitaire: setFormParam([Validators.required]),
      BEPC_Annee: setFormParam(),
      Statut: setFormParam([Validators.required]),
    });

    this.eleveFormPreview$ = this.eleveForm.valueChanges;

    //if eleveID that mean its a reinscritption
    if (this.eleveID) {
      this.dataEleveLoad = true;
      this.eleveService.getOne(this.eleveID).subscribe((data) => {
        this.dataEleveLoad = false;
        console.log(data);
        const eleveInscription: EleveInscription = data;
        this.eleveForm.patchValue(eleveInscription);
        this.setSmasValidators(eleveInscription.SMS_ParentParDefaut)
        this.eleveForm.get('NouveauDansAnneeCourante')?.setValue(0)
        //verify if next classe is give
        if (
          eleveInscription.IDClasseAvenir &&
          eleveInscription.IDClasseAvenir > 0
        ) {
          this.classeService
            .getOne(eleveInscription.IDClasseAvenir)
            .subscribe((res) => {
              this.eleveForm.get('textClasseValue')?.setValue(res.CodeClasse);
              this.eleveForm.get('IDCLASSES')?.setValue(res.IDCLASSES);
            });
        } else {
          this.eleveForm.get('IDCLASSES')?.setValue(0);
        }
      });
    }

    //onChose alert sms by default
    this.eleveForm.get('SMS_ParentParDefaut')?.valueChanges.subscribe(value => {
      this.setSmasValidators(value);
    })
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
    this.eleveForm.get('IDETABLISSEMENTS')?.setValue(IDETABLISSEMENTS);
    this.eleveForm.get('EtablissementOrigineNom')?.setValue(Fr_Nom);
  }
  // open site
  openSiteDialog() {
    const dialog = this.dialog.open(SiteFormComponent);
    dialog.componentInstance.isSiteCall = true;
    dialog.afterClosed().subscribe((result) => {
      const IDSITE = dialog.componentInstance.IDSITE;
      const Libelle = dialog.componentInstance.Libelle;
      console.log(Libelle,IDSITE);
      this.eleveForm.get('IDSITE')?.setValue(IDSITE);
      this.eleveForm.get('Site')?.setValue(Libelle);
    });
  }

  //open premiere langue

  openPremieierelangueDialog() {
    const dialog = this.dialog.open(LangueFormComponent);
    dialog.componentInstance.isSLangueCall = true;
    dialog.afterClosed().subscribe((result) => {
      const IDLANGUE = dialog.componentInstance.IDLANGUE;
      const Fr_Libelle = dialog.componentInstance.Fr_Libelle;
      console.log(Fr_Libelle,IDLANGUE);
      this.eleveForm.get('IDLangueVivante1')?.setValue(IDLANGUE);
      this.eleveForm.get('LangueVivante1')?.setValue(Fr_Libelle);    });
  }

  //open deuxieme langue

  openDeuxiemelangueDialog() {
    const dialog = this.dialog.open(LangueFormComponent);
    dialog.componentInstance.isSLangueCall = true;
    dialog.afterClosed().subscribe((result) => {
      const IDLANGUE = dialog.componentInstance.IDLANGUE;
      const Fr_Libelle = dialog.componentInstance.Fr_Libelle;
      console.log(Fr_Libelle,IDLANGUE);
      this.eleveForm.get('IDLangueVivante2')?.setValue(IDLANGUE);
      this.eleveForm.get('LangueVivante2')?.setValue(Fr_Libelle);});
  }

  //open troisieme langue

  openTroisiemelangueDialog() {
    const dialog = this.dialog.open(LangueFormComponent);
    dialog.componentInstance.isSLangueCall = true;
    dialog.afterClosed().subscribe((result) => {
      const IDLANGUE = dialog.componentInstance.IDLANGUE;
      const Fr_Libelle = dialog.componentInstance.Fr_Libelle;
      console.log(Fr_Libelle,IDLANGUE);
      this.eleveForm.get('IDLangueVivante3')?.setValue(IDLANGUE);
      this.eleveForm.get('LangueVivante3')?.setValue(Fr_Libelle);});
  }

  //Open Department
  openDepartementNaisse(){
    const dialog = this.dialog.open(DepartementFormComponent);
    dialog.componentInstance.isOpnenByOther = true;
    dialog.afterClosed().subscribe((result) => {
      const IDDEPARTEMENT = dialog.componentInstance.departementCreated.IDDEPARTEMENT;
      const NomDepartement = dialog.componentInstance.departementCreated.NomDepartement;
      console.log(NomDepartement,IDDEPARTEMENT);
      this.eleveForm.get('Fr_Departement')?.setValue(NomDepartement);});


  }


  //lieu de naissance
  openLieuNaisse(){
    const dialog = this.dialog.open(DepartementFormComponent);
    dialog.componentInstance.openDepartementLieuNaissByEleveForm = true;
    dialog.afterClosed().subscribe((result) => {
      const IDDEPARTEMENT = dialog.componentInstance.IDDEPARTEMENT;
      const NomDepartement = dialog.componentInstance.NomDepartement;
      console.log(NomDepartement,IDDEPARTEMENT);
      this.eleveForm.get('Fr_LieuNaissance')?.setValue(NomDepartement);});
  }


  //etablissement

  openEtablissementOrigine(){
    const dialog = this.dialog.open(EtablissementTousFormComponent);
    dialog.componentInstance.openEatblissementByEleveForm = true;
    dialog.afterClosed().subscribe((result) => {
      const IDETAB = dialog.componentInstance.IDETABLISSEMENTS;
      const NOMETAB = dialog.componentInstance.Fr_Nom;
      console.log(NOMETAB,IDETAB);
      this.eleveForm.get('EtablissementOrigine')?.setValue(IDETAB);
      this.eleveForm.get('EtablissementProvenance')?.setValue(NOMETAB);;
    });
  }
  //open satatus eleve
  openStatusEleveDialog() {
    const dialog = this.dialog.open(StatuseleveFormComponent);
    dialog.componentInstance.isStatusEleveCall = true;

    dialog.afterClosed().subscribe((result) => {
      const IDSTATUTELEVE = dialog.componentInstance.IDSTATUTELEVE;
      const Fr_Libelle = dialog.componentInstance.Fr_Libelle;

      console.log(IDSTATUTELEVE, Fr_Libelle);

      // Mettez à jour la valeur du champ de statut dans eleveForm
      this.eleveForm.get('Statut')?.setValue(Fr_Libelle);
      this.eleveForm.get('IDSTATUTELEVE')?.setValue(IDSTATUTELEVE);
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
      this.eleveForm.get('LibelleEtatSanitaire')?.setValue(Fr_Libelle);
      this.eleveForm.get('EtatSanitaire')?.setValue(IDETAT_SANITAIRE);
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
      this.eleveForm.get('Nationalite')?.setValue(Libelle);
      this.eleveForm.get('IDNationalite')?.setValue(IDNATIONALITE);
    });
  }

  loadbranche() {
    this.brancheService.get().subscribe((data) => {
      console.log(data);
      this.brancheList = data;
    });
  }

  onInputNomOrPrenom() {
    if (!this.eleveForm.value.IDCLASSES) {
      this.dialog.closeAll()
      this.globalService.alert(
        "Veuillez d'abord sélectionner la classe",
        'Attention !',
        'danger',
        '',
        'OK'
      );
    }
  }

  loadSite() {
    this.siteListIsLoad = true;
    this.siteService.get().subscribe((data) => {
      console.log(data);
      this.siteList = data;
      this.siteListIsLoad = false;
    });
  }

  loadSstatusEleves() {
    this.statutElevesIsLoad = true;
    this.statutsEleveServices.get().subscribe((data) => {
      //this.statutElevesList = data;
      console.log(data);
      this.statutElevesIsLoad = false;
    });
  }

  loadEtatSanitaireList() {
    this.etablissementListIsLoad = true;
    this.etatSanitaireService.get().subscribe((data) => {
      this.etatSanitairesList = data;
      console.log(data);
      this.etablissementListIsLoad = false;
    });
  }

  loadniveau() {
    this.niveauService.get().subscribe((data) => {
      console.log(data);
      this.niveauList = data;
    });
  }

  loadEtablissementList() {
    this.etablissementListIsLoad = true;
    this.etablissementService.get().subscribe((data) => {
      this.etablissementList = data;
      this.etablissementListIsLoad = false;
    });
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
        /*this.globalService.alert(
          "Attention la cle de recherche passe n'existe pas pour la liste '" +
            keyTofilter +
            "'",
          'Erreur',
          'danger',
          '',
          'OK'
        );*/
        return [];
      }
    }

    return [];
  }

  loadCycle() {}

  onInputDepartement(event: any) {}

  onSubmitForm() {
    const newEleve: EleveInscription = this.eleveForm.value;
    console.log(newEleve);
    console.log(this.eleveForm.value);

    this.isLoading = true;
    console.log(this.eleveForm.value);

    const eleve: EleveInscription = this.eleveForm.value;

    if (this.eleveID) {
      this.eleveService
        .reinscrireEleve(eleve)
        .pipe(
          tap((res) => {
            this.isLoading = false;
            const msgSucess = 'Réinscription réalisée avec succès.';
            this.afterSuccessSubmit(msgSucess, res.body);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    } else {
      this.eleveService
        .inscrireEleve(eleve)
        .pipe(
          tap((res) => {
            this.isLoading = false;
            const msgSucess = 'Inscription réalisée avec succès.';
            this.afterSuccessSubmit(msgSucess, res.body);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    }
  }

  afterSuccessSubmit(msg: string, idEleve: number) {
    this.globalService.toastShow(msg, 'Opération réusssie');

    if (
      this.agentConnected &&
      this.agentConnected.bDroit_EncaisserDroitsScolaires &&
      this.agentConnected.CaisseAssociee > 0
    ) {
      this.router.navigate(['/frais/' + idEleve]);
    } else {
      //ask him if he want to continue inscription or nor
      const ref = this.globalService.alert(
        'Voulez-vous inscrire/réinscrire un autre élève ?',
        'Inscription éffectuée avec succès !',
        'success',
        'NON',
        'OUI'
      );

      ref.afterClosed().subscribe((resultat) => {
        if (resultat) {
          this.router.navigate(['/eleve/menu']);
        } else {
          this.router.navigate(['/dossierEleve']);
        }
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const photo = reader.result as string;
      this.photoEleve = photo;
      this.eleveForm.get('Photo')?.setValue(photo);
    };
  }

  openTableClasse() {
    const ref = this.dialog.open(TableClassComponent);
    ref.afterClosed().subscribe((res) => {
      this.eleveForm
        .get('IDCLASSES')
        ?.setValue(ref.componentInstance.classeSelected.IDCLASSES);
      this.classeChosed = ref.componentInstance.classeSelected;
      this.eleveForm
        .get('textClasseValue')
        ?.setValue(this.classeChosed.CodeClasse);
    });
  }

  get invalidControls() {
    const invalidControls = [];
    const controls = this.eleveForm.controls;

    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);
      }
    }

    return invalidControls;
  }

  show(event: any){
    console.log(event)
    console.log(this.eleveForm.get('IDProfessionTuteur')?.value)
  }

  private setSmasValidators (value: number) {
    this.eleveForm.get('Fr_NomPrenomTuteur')?.clearValidators();
    this.eleveForm.get('Fr_NomPrenomTuteur')?.updateValueAndValidity()
    this.eleveForm.get('TelMobileTuteur')?.clearValidators();
    this.eleveForm.get('TelMobileTuteur')?.updateValueAndValidity();

    this.eleveForm.get('Fr_NomPrenomPere')?.clearValidators();
    this.eleveForm.get('Fr_NomPrenomPere')?.updateValueAndValidity();
    this.eleveForm.get('TelMobilePere')?.clearValidators();
    this.eleveForm.get('TelMobilePere')?.updateValueAndValidity();

    this.eleveForm.get('Fr_NomPrenomMere')?.clearValidators();
    this.eleveForm.get('Fr_NomPrenomMere')?.updateValueAndValidity();
    this.eleveForm.get('TelMobileMere')?.clearValidators();
    this.eleveForm.get('TelMobileMere')?.updateValueAndValidity();

    this.eleveForm.get('TelMobile')?.clearValidators();
    this.eleveForm.get('TelMobile')?.updateValueAndValidity();

    if(value == sms_parent.PERE){
      this.eleveForm.get('Fr_NomPrenomPere')?.setValidators(Validators.required);
      this.eleveForm.get('Fr_NomPrenomPere')?.updateValueAndValidity();
      this.eleveForm.get('TelMobilePere')?.setValidators(Validators.required);
      this.eleveForm.get('TelMobilePere')?.updateValueAndValidity();
    }
    else if(value == sms_parent.MERE){
      console.log('mere');
      this.eleveForm.get('Fr_NomPrenomMere')?.setValidators(Validators.required);
      this.eleveForm.get('Fr_NomPrenomMere')?.updateValueAndValidity();
      this.eleveForm.get('TelMobileMere')?.setValidators(Validators.required);
      this.eleveForm.get('TelMobileMere')?.updateValueAndValidity();
    }
    else if(value == sms_parent.TUTEUR){
      console.log('tuteur');
      this.eleveForm.get('Fr_NomPrenomTuteur')?.setValidators(Validators.required);
      this.eleveForm.get('Fr_NomPrenomTuteur')?.updateValueAndValidity();
      this.eleveForm.get('TelMobileTuteur')?.setValidators(Validators.required);
      this.eleveForm.get('TelMobileTuteur')?.updateValueAndValidity();
    }
    else if(value == sms_parent.ELEVE){
      console.log('eleve');
      this.eleveForm.get('TelMobile')?.setValidators(Validators.required);
      this.eleveForm.get('TelMobile')?.updateValueAndValidity();
    }
  }
}
