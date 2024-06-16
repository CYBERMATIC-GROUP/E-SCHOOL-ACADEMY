import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, catchError, finalize, of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Classe } from 'src/app/models/classe.model';
import { ClasseService } from 'src/app/services/classe.service';
import { Salle } from 'src/app/models/salle.model';
import { SalleService } from 'src/app/services/salle.service';
import { NiveauService } from 'src/app/services/niveau.service';
import { BrancheService } from 'src/app/services/branche.service';
import { Branche } from 'src/app/models/branche.model';
import { Niveau } from 'src/app/models/niveau.model';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { Enseigant } from 'src/app/models/enseigant.model';
import { Qualiteens } from 'src/app/models/qualiteens.model';
import { QualiteensService } from 'src/app/services/qualiteens.service';
import { NationaliteService } from 'src/app/services/nationalite.service';
import { Site } from 'src/app/models/site.model';
import { SiteService } from 'src/app/services/site.service';
import { Fonction } from 'src/app/models/fonction.model';
import { FonctionService } from 'src/app/services/fonction.service';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement.service';
import { Arrondissement } from 'src/app/models/arrondissement.model';
import { ArrondissementService } from 'src/app/services/arrondissement.service';
import { Quartier } from 'src/app/models/quartier.model';
import { QuartierService } from 'src/app/services/quartier.service';
import { Specialite } from 'src/app/models/specialite.model';
import { Grade } from 'src/app/models/grade.model';
import { Echelon } from 'src/app/models/echelon.model';
import { Categorie } from 'src/app/models/categorie.model';
import { SpecialiteService } from '../../services/specialite.service';
import { GradeService } from '../../services/grade.service';
import { EchelonService } from '../../services/echelon.service';
import { CategorieService } from '../../services/categorie.service';
import { Diplome } from 'src/app/models/diplomes.models';
import { DiplomeService } from 'src/app/services/diplome.service';
import { Nationalite } from '../../models/nationalite.model';
import { Ville } from 'src/app/models/ville.model';
import { VilleService } from 'src/app/services/ville.service';
import { Caisse } from 'src/app/models/caisse.model';
import { CaisseService } from 'src/app/services/caisse.service';
import { QualiteensFormComponent } from 'src/app/qualiteens/qualiteens-form/qualiteens-form.component';
import { DepartementFormComponent } from 'src/app/departement/departement-form/departement-form.component';
import { NationaliteFormComponent } from 'src/app/nationalite/nationalite-form/nationalite-form.component';
import { SiteFormComponent } from 'src/app/site/site-form/site-form.component';
import { FonctionFormComponent } from 'src/app/fonction/fonction-form/fonction-form.component';
import { VilleFormComponent } from 'src/app/ville/ville-form/ville-form.component';
import { DiplomeFormComponent } from 'src/app/diplome/diplome-form/diplome-form.component';
import { ImageCropComponent } from 'src/app/core/image-crop/image-crop.component';
import { GlobalService } from 'src/app/services/global.service';
import { AgentService } from 'src/app/services/agent.service';
import { ParamComboAgentService } from 'src/app/agent/services/param-combo-agent.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-enseigant-form',
  templateUrl: './enseigant-form.component.html',
  styleUrls: ['./enseigant-form.component.scss'],
})
export class EnseigantFormComponent {
  @Input() action!: 'create' | 'edit' | 'view';

  dataSourceprime: any
  dataSourceRetenue: any

  displayedColumnsprime = [
    'LibellePrime',
    'Montant',
  ];

  displayedColumnsretenue = [
    'LibelleRetenue',
    'Montant',
  ];


  IDENSEIGNANT!: number;
  CodeEnseignant!: string;
  Civilite!: number;
  DateNaissance!: string;
  CodePostal!: string;
  Telephone!: string;
  Telecopie!: string;
  Courriel!: string;
  Fr_Nom!: string;
  Fr_Prenom!: string;
  Fr_LieuNaissance!: string;
  Fr_Adresse1!: string;
  Fr_Adresse2!: string;
  Fr_Ville!: string;
  Diplome!: string;
  Qualite!: string;
  DateEntreeEtab!: string;
  IDNationalite!: number;
  Signature: string = 'assets/images/260px-03-BICcristal2008-03-26.jpg';
  Login!: string;
  ModeRemuneration!: number;
  RemunerationBase!: number;
  Retenue_CNSS!: number;
  Retenue_Assurance!: number;
  Retenue_CasSocial!: number;
  Retenue_Autre!: number;
  IndemniteMensuelle!: number;
  Retenue_EnfantsACharge!: number;
  RemunerationHeure_AutresCycles!: number;
  TelMobile!: string;
  NumCNI!: string;
  IdentifiantBadge!: string;
  MontantsPrimesDefaut!: string;
  MontantsRetenuesDefaut!: string;
  NumCompteBancaire!: string;
  NumSecuriteSociale!: string;
  SituationFamiliale!: number;
  NombreEnfants!: number;
  NombrePartsImpots!: number;
  EstImposable!: boolean;
  IDSITE!: number;
  Fr_Departement!: string;
  Fr_Arrondissement!: string;
  CodeEtab!: string;
  ModifPasswordNecessaire!: boolean;
  Nationalite!: string;
  Site!: string;
  Fonction!: string;
  CodeCaisse!: string;
  IDDEPARTEMENT_NAISS!: number;
  Departement_Naiss!: string;
  IDSpecialite!: number;
  Specialite!: number;
  IDEchelon!: number;
  Echelon!: number;
  IDCategorie!: number;
  Categorie!: number;
  IDQUARTIER!: number;
  IDQualite!: number;
  IDGRADE!: number;
  GRADE!: number;
  Photo!: string;
  caisseList!: Caisse[];
  selectedFile!: File;
  image!: string;
  diplomeSelected!: number;
  isLoading!: boolean;

  salleList!: Salle[];
  qualiteList!: Qualiteens[];
  classeList!: Classe[];
  brancheList!: Branche[];
  niveauList!: Niveau[];
  departementList!: Departement[];
  arrondissementList$: Observable<Arrondissement[]> = of([]);
  quartiertList$: Observable<Quartier[]> = of([]);
  fonctiontList!: Fonction[];
  siteList!: Site[];
  gradeList!: Grade[];
  echelonList!: Echelon[];
  specialiteList!: Specialite[];
  categorieList!: Categorie[];
  nationaliteeList!: Nationalite[];
  diplomeList!: Diplome[];
  nationaliteList!: Nationalite[];
  villeList!: Ville[];
  IDDEPARTEMENT!: number;
  backgroundImageStyle: string = 'assets/images/businessman_318-188871.avif';
  photo$: Observable<{ Photo: string }> = of({Photo: ""});
  nationaliteSelectionnee: { IDNATIONALITE: number; Libelle: string } = {
    IDNATIONALITE: 0,
    Libelle: '',
  };
  NatioaliteSelected!: number;
  IDnationaliteCreate!: number;
  NationaliteCreate!: number;
  departementSelected!: number;
  SiteSelected!: number;
  qualiteSelected!: number;
  Fr_Libelle!: string;
  submitLoad!: boolean;
  Signatureenseignant!: string;
  IDDiplome!: number;

  isFormValid(): any {
    return (
      this.Fr_Nom &&
      this.Fr_Prenom &&
      this.DateNaissance &&
      this.Fr_LieuNaissance &&
      this.Nationalite &&
      this.Civilite &&
      this.Departement_Naiss
    );
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private classeService: ClasseService,
    private salleService: SalleService,
    private niveauService: NiveauService,
    private brancheService: BrancheService,
    private enseignantService: EnseignantService,
    private qualiteService: QualiteensService,
    private siteService: SiteService,
    private fonctionService: FonctionService,
    private departementService: DepartementService,
    private arrService: ArrondissementService,
    private quartierService: QuartierService,
    private nationaliteService: NationaliteService,
    private SpecialiteService: SpecialiteService,
    private GradeService: GradeService,
    private EchelonService: EchelonService,
    private CategorieService: CategorieService,
    private diplomesevice: DiplomeService,
    private villeService: VilleService,
    private agentService: AgentService,
    private caiseService: CaisseService,
    private globalService: GlobalService,
    private paramComboAgentService: ParamComboAgentService
  ) {}

  ngOnInit(): void {
    const EnseignantID = this.route.snapshot.params['EnseignantID'];
    this.action = this.route.snapshot.params['action'];
    console.log(EnseignantID);

    if (EnseignantID) {
      this.initForUpdate(EnseignantID);
      this.photo$ = this.enseignantService.getePhoto(EnseignantID).pipe(tap((res) => console.log(res)));
    }

    //this.qualite();
    //this.site();
    //this.arrondissement();
    //this.departement();
    //this.fonction();
    //this.quartier();
    //this.nationalite();
    //this.specialite();
    //this.grade();
    //this.echelon();
    //this.categorie();
    this.loaddiplome();
    //this.nationalite();
    //this.ville();
    this.caisse();

    this.paramComboAgentService.getParamAgent().pipe(
      tap(res => {
        this.qualiteList = res.QUALITEENS;
        this.siteList = res.SITE;
        this.departementList = res.DEPARTEMENT;
        this.fonctiontList = res.FONCTIONS;
        this.nationaliteList = res.NATIONALITE;
        this.specialiteList = res.SPECIALITE
        this.gradeList = res.GRADE;
        this.echelonList = res.ECHELON;
        this.categorieList = res.CATEGORIE;
        //this.diplomeList = re
      })
    ).subscribe()

    if (this.action !== 'edit' && this.action !== 'view') {      
      this.getlistePrime()
      this.getlisteRetenue()
    }
  }

  getlistePrime(){
    this.agentService.getListePrimes().subscribe(data => {
      console.log(data);
      this.dataSourceprime = new MatTableDataSource(data)
    
    })
  }

  getlisteRetenue(){
    this.agentService.getListeRetenue().subscribe(data => {
      console.log(data);
     this.dataSourceRetenue = new MatTableDataSource(data)
    })
  }

  updateMontant(element: any, newValue: any) {
    const newMontant = parseFloat(newValue.target.value);
    if (!isNaN(newMontant)) {
      element.Montant = newMontant;
    }
    console.log( this.dataSourceprime.data);
    
  }

  updateMontantRetenue(element: any, newValue: any) {
    const newMontant = parseFloat(newValue.target.value);
    if (!isNaN(newMontant)) {
      element.Montant = newMontant;
    }
    console.log( this.dataSourceRetenue.data);
    
  }

  caisse() {
    this.caiseService.get().subscribe(
      (data) => {
        console.log(data);
        this.caisseList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ville() {
    this.villeService.get().subscribe(
      (data) => {
        console.log(data);
        this.villeList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  onSelectionChange(event: any) {
    const selectedDepartementId = event.target.value;
    console.log(selectedDepartementId);

    this.quartierService.Recuperations(selectedDepartementId).subscribe(
      (data) => {
        console.log(data);
        this.arrondissementList$ = of(data.body);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSelectionChanges(event: any) {
    const selectedarrID = event.target.value;
    console.log(selectedarrID);
    this.quartierService.getByArr(selectedarrID).subscribe(
      (data) => {
        console.log(data);
        this.quartiertList$ = of(data.body);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loaddiplome() {
    this.diplomesevice.get().subscribe(
      (data) => {
        console.log(data);
        this.diplomeList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  grade() {
    this.GradeService.get().subscribe(
      (data) => {
        console.log(data);
        this.gradeList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  specialite() {
    this.SpecialiteService.get().subscribe(
      (data) => {
        console.log(data);
        this.specialiteList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  echelon() {
    this.EchelonService.get().subscribe(
      (data) => {
        console.log(data);
        this.echelonList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  categorie() {
    this.CategorieService.get().subscribe(
      (data) => {
        console.log(data);
        this.categorieList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  nationalite() {
    this.nationaliteService.get().subscribe(
      (data) => {
        console.log(data);
        this.nationaliteeList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fonction() {
    this.fonctionService.get().subscribe(
      (data) => {
        console.log(data);
        this.fonctiontList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  departement() {
    this.departementService.get().subscribe(
      (data) => {
        console.log(data);
        this.departementList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  site() {
    this.siteService.get().subscribe(
      (data) => {
        console.log(data);
        this.siteList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  qualite() {
    this.qualiteService.get().subscribe(
      (data) => {
        console.log(data);
        this.qualiteList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openFonction() {
    const dialog = this.dialog.open(FonctionFormComponent);
    dialog.componentInstance.isOpenByOther = true;
    dialog.afterClosed().subscribe((result) => {
      this.Fonction = dialog.componentInstance.fonctionCreated.Libelle;
      console.log(this.Fonction);
    });
  }

  openVille() {
    const dialog = this.dialog.open(VilleFormComponent);
    dialog.componentInstance.openVilleByEnseignant = true;
    dialog.afterClosed().subscribe((result) => {
      this.Fr_Ville = dialog.componentInstance.Fr_Libelle;
      console.log(this.Fr_Libelle);
    });
  }

  openDiplome() {
    const dialog = this.dialog.open(DiplomeFormComponent);
    dialog.componentInstance.openDiplomeByEnseignant = true;
    dialog.afterClosed().subscribe((result) => {
      this.IDDiplome = dialog.componentInstance.IDDIPLOME;
      this.Diplome = dialog.componentInstance.Libelle;
      console.log(this.Diplome);
    });
  }

  initForUpdate(EnseignantID: number) {
    this.isLoading = true;
    this.enseignantService.getOne(EnseignantID).subscribe((data) => {
      console.log(data);
      this.dataSourceRetenue = new MatTableDataSource(data.tabMontantsRetenuesDefaut)
      this.dataSourceprime = new MatTableDataSource(data.tabMontantsPrimesDefaut)
      this.isLoading = false;
      this.IDENSEIGNANT = data.IDENSEIGNANT;
      this.CodeEnseignant = data.CodeEnseignant;
      this.Civilite = data.Civilite;
      this.DateNaissance = data.DateNaissance;
      this.CodePostal = data.CodePostal;
      this.Telephone = data.Telephone;
      this.Telecopie = data.Telecopie;
      this.Courriel = data.Courriel;
      this.Fr_Nom = data.Fr_Nom;
      this.Fr_Prenom = data.Fr_Prenom;
      this.Fr_LieuNaissance = data.Fr_LieuNaissance;
      this.Fr_Adresse1 = data.Fr_Adresse1;
      this.Fr_Adresse2 = data.Fr_Adresse2;
      this.Fr_Ville = data.Fr_Ville;
      this.Diplome = data.Diplome;
      this.Qualite = data.Qualite;
      this.DateEntreeEtab = data.DateEntreeEtab;
      this.Nationalite = data.Nationalite;
      this.Signature = data.Signature;
      this.Login = data.Login;
      this.ModeRemuneration = data.ModeRemuneration;
      this.RemunerationBase = data.RemunerationBase;
      this.Retenue_CNSS = data.Retenue_CNSS;
      this.Retenue_Assurance = data.Retenue_Assurance;
      this.Retenue_CasSocial = data.Retenue_CasSocial;
      this.Retenue_Autre = data.Retenue_Autre;
      this.IndemniteMensuelle = data.IndemniteMensuelle;
      this.Retenue_EnfantsACharge = data.Retenue_EnfantsACharge;
      this.RemunerationHeure_AutresCycles = data.RemunerationHeure_AutresCycles;
      this.TelMobile = data.TelMobile;
      this.NumCNI = data.NumCNI;
      this.IdentifiantBadge = data.IdentifiantBadge;
      this.MontantsPrimesDefaut = data.MontantsPrimesDefaut;
      this.MontantsRetenuesDefaut = data.MontantsRetenuesDefaut;
      this.NumCompteBancaire = data.NumCompteBancaire;
      this.NumSecuriteSociale = data.NumSecuriteSociale;
      this.SituationFamiliale = data.SituationFamiliale;
      this.NombreEnfants = data.NombreEnfants;
      this.NombrePartsImpots = data.NombrePartsImpots;
      this.EstImposable = data.EstImposable;
      this.IDSITE = data.IDSITE;
      this.Fr_Departement = data.Fr_Departement;
      this.Fr_Arrondissement = data.Fr_Arrondissement;
      this.CodeEtab = data.CodeEtab;
      this.ModifPasswordNecessaire = data.ModifPasswordNecessaire;
      this.Site = data.Site;
      this.Fonction = data.Fonction;
      this.CodeCaisse = data.CodeCaisse;
      this.IDDEPARTEMENT_NAISS = data.IDDEPARTEMENT_NAISS;
      this.Departement_Naiss = data.Departement_Naiss;
      this.IDSpecialite = data.IDSpecialite;
      this.Specialite = data.Specialite;
      this.IDEchelon = data.IDEchelon;
      this.Echelon = data.Echelon;
      this.IDCategorie = data.IDCategorie;
      this.Categorie = data.Categorie;
      this.IDQUARTIER = data.IDQUARTIER;
      this.IDGRADE = data.IDGRADE;
      this.GRADE = data.GRADE;
      this.IDDiplome = data.IDDiplome;
      this.Diplome = data.Diplome;
      this.IDQualite = data.IDQualite;
      this.Signatureenseignant = data.Signature;
      console.log(this.Signatureenseignant);
      console.log(this.IDDiplome, this.Diplome);
      console.log(this.Qualite);
      console.log(this.IDQualite);
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.Signatureenseignant = reader.result as string;
      console.log(this.Signatureenseignant);
    };
  }

  salle() {
    this.salleService.get().subscribe(
      (data) => {
        console.log(data);
        this.salleList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadbranche() {
    this.brancheService.get().subscribe(
      (data) => {
        console.log(data);
        this.brancheList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadniveau() {
    this.niveauService.get().subscribe(
      (data) => {
        console.log(data);
        this.niveauList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onFileSelectede(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.Signatureenseignant = reader.result as string;

      console.log(this.Signatureenseignant);
    };
  }

  IDnationaliteSelected(nationalite: Nationalite) {
    console.log(nationalite.IDNATIONALITE);
    this.NatioaliteSelected = nationalite.IDNATIONALITE;
  }

  IDDEPARTEMENTNAISSSelected(departement: Departement) {
    console.log(departement.IDDEPARTEMENT);
    this.departementSelected = departement.IDDEPARTEMENT;
  }

  IDSiteSelected(site: Site) {
    console.log(site.IDSITE);
    this.SiteSelected = site.IDSITE;
  }

  IDQualiteSelected(qualite: Qualiteens) {
    console.log(qualite.IDQUALITEENS);
    this.qualiteSelected = qualite.IDQUALITEENS;
  }

  IDDilpomeSelected(diplome: Diplome) {
    console.log(diplome.IDDIPLOME);
    this.diplomeSelected = diplome.IDDIPLOME;
  }

  openSiteDialog() {
    const dialog = this.dialog.open(SiteFormComponent);
    dialog.componentInstance.isOpenByAuther = true;
    dialog.afterClosed().subscribe((result) => {
      this.SiteSelected = dialog.componentInstance.siteCreated.IDSITE;
      this.Site = dialog.componentInstance.siteCreated.Libelle;
      console.log(this.Site, this.SiteSelected);
    });
  }

  openQualite() {
    const dialog = this.dialog.open(QualiteensFormComponent);
    dialog.componentInstance.openQualiteByEnseignant = true;
    dialog.afterClosed().subscribe((result) => {
      this.SiteSelected = dialog.componentInstance.IDQUALITEENS;
      this.Qualite = dialog.componentInstance.Libelle;
      console.log(this.Qualite, dialog.componentInstance.Libelle);
    });
  }

  openNationaliteDialog() {
    const dialog = this.dialog.open(NationaliteFormComponent);
    dialog.componentInstance.isNationaliteCall = true;
    dialog.afterClosed().subscribe((result) => {
      this.Nationalite = dialog.componentInstance.Libelle;
      this.NatioaliteSelected = dialog.componentInstance.IDNATIONALITE;
    });
  }

  openDepartementNaisse() {
    const dialog = this.dialog.open(DepartementFormComponent);
    dialog.componentInstance.isOpnenByOther = true;
    dialog.afterClosed().subscribe((result) => {
      this.Departement_Naiss =
        dialog.componentInstance.departementCreated.NomDepartement;
      this.departementSelected =
        dialog.componentInstance.departementCreated.IDDEPARTEMENT;
    });
  }

  onSubmitForm(form: NgForm) {
    const enseignant: Enseigant = form.value;
    enseignant.IDENSEIGNANT = this.IDENSEIGNANT;
    enseignant.IDNationalite = this.NatioaliteSelected;
    enseignant.IDDEPARTEMENT_NAISS = this.departementSelected;
    enseignant.IDSITE = this.SiteSelected;
    enseignant.IDQualite = this.qualiteSelected;
    enseignant.IDDiplome = this.diplomeSelected;

    console.log(enseignant.IDQualite, this.Qualite, enseignant.Diplome);

    this.submitLoad = true;
    enseignant.Signature = this.Signatureenseignant;
    console.log(enseignant.Signature);

    console.log(enseignant);
    console.log(enseignant.IDNationalite, enseignant.IDDEPARTEMENT_NAISS);
    if (this.image == '../assets/images/imageVide.png') {
      this.image = '';
    } else {
      enseignant.Photo = this.image;
      enseignant.Signature = this.Signatureenseignant;
    }

    if (this.action === 'edit') {
      this.enseignantService.update(enseignant).pipe(
        tap(data => {
          console.log(enseignant.Diplome, enseignant.Qualite);
          this.submitLoad = false;
          this.globalService.reloadComponent('/enseignant/list/1');
          this.globalService.toastShow("Enseignant modifié avec succès !", "Modification")
        }),
        finalize(() => {
          this.submitLoad = false
        })
      ).subscribe();
    } else {
      this.enseignantService.create(enseignant).pipe(
        tap(data => {
          console.log(enseignant.Diplome, enseignant.Qualite);
          this.submitLoad = false;
          this.globalService.reloadComponent('/enseignant/list/1');
          this.globalService.toastShow("Enseignant ajouté avec succès !", "Ajout")
        }),
        finalize(() => {
          this.submitLoad = false
        })
      ).subscribe()
    }
  }

  openCropImage() {
    const ref = this.dialog.open(ImageCropComponent, {
      maxWidth: '650px',
    });
    ref.afterClosed().subscribe((result) => {
      if (ref.componentInstance.finalImage) {
        this.image = ref.componentInstance.finalImage;
      }
    });
  }


  onCropSignature() {
    const ref = this.dialog.open(ImageCropComponent, {
      maxWidth: '650px',
    });
    ref.componentInstance.maintainAspetRation = false
    ref.afterClosed().subscribe((result) => {
      if (ref.componentInstance.finalImage) {
        this.Signatureenseignant = ref.componentInstance.finalImage;
      }
    });
  }
}
