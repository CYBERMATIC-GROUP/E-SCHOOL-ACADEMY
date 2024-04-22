import { Component, Input, OnInit, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, finalize, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Agent } from 'src/app/models/agent.model';
import { AgentService } from 'src/app/services/agent.service';
import { Annee } from 'src/app/models/annee.model';
import { AnneeService } from 'src/app/services/annee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Site } from 'src/app/models/site.model';
import { SiteService } from 'src/app/services/site.service';
import { Fonction } from 'src/app/models/fonction.model';
import { FonctionService } from 'src/app/services/fonction.service';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from 'src/app/services/nationalite.service';
import { Location } from '@angular/common';
import { header } from '../../models/header.model';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement.service';
import { Arrondissement } from 'src/app/models/arrondissement.model';
import { ArrondissementService } from 'src/app/services/arrondissement.service';
import { QuartierService } from 'src/app/services/quartier.service';
import { Echelon } from 'src/app/models/echelon.model';
import { EchelonService } from 'src/app/services/echelon.service';
import { Grade } from 'src/app/models/grade.model';
import { GradeService } from 'src/app/services/grade.service';
import { Quartier } from 'src/app/models/quartier.model';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { SpecialiteService } from 'src/app/services/specialite.service';
import { Specialite } from 'src/app/models/specialite.model';
import { Caisse } from 'src/app/models/caisse.model';
import { CaisseService } from 'src/app/services/caisse.service';
import { CentreExamenService } from 'src/app/services/centre-examen.service';
import { CentreExament } from 'src/app/models/centreExamen.model';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { DepartementFormComponent } from 'src/app/departement/departement-form/departement-form.component';
import { ArrondissementFormComponent } from 'src/app/arrondissement/arrondissement-form/arrondissement-form.component';
import { QuartierFormComponent } from 'src/app/quartier/quartier-form/quartier-form.component';
import { FonctionFormComponent } from 'src/app/fonction/fonction-form/fonction-form.component';
import { SiteComponent } from 'src/app/site/site.component';
import { SiteFormComponent } from 'src/app/site/site-form/site-form.component';
import { NationaliteFormComponent } from 'src/app/nationalite/nationalite-form/nationalite-form.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { ImageCropComponent } from 'src/app/core/image-crop/image-crop.component';
import { constantes } from 'src/environnements/constantes';
import { ParamComboAgentService } from '../services/param-combo-agent.service';
import { ModificationMotDePasseAgent } from 'src/app/models/updatePasswordAgent.model';
import { GeneratenewpasswordComponent } from '../generatenewpassword/generatenewpassword.component';
@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss'],
})
export class AgentFormComponent implements OnInit {
  @Input() action!: 'create' | 'edit' | 'view';
  @Input() Agent!: Agent;

  agentForm!: FormGroup;
  agentFormPreview$!: Observable<Agent>;
  anneeList!: Annee[];
  siteList!: Site[];
  suggestSiteList!: Site[];
  nationaliteList!: Nationalite[];
  suggestNationaliteList!: Nationalite[];
  isloadinggeneratepassword!:boolean
  fonctionList!: Fonction[];
  suggestFonctionList!: Fonction[];

  DepartementList!: Departement[];
  ArrondissementList!: Arrondissement[];
  IDDEPARTEMENT!: number;

  suggestEchelonList!: Echelon[];
  echelonsList!: Echelon[];

  suggestGradeList!: Grade[];
  gradeList!: Grade[];

  specialiteList!: Specialite[];

  suggestQuartierList!: Quartier[];
  quartierList!: Quartier[];
  quartiers$: Observable<Quartier[]> = of([])
  categoriesList!: Categorie[];
  caisseList!: Caisse[];
  suggestCaisseList!: Caisse[];
  arrondissements$: Observable<Arrondissement[]> = of([])
  photo$!: Observable<{Photo: string}>;
  centreExamens!: CentreExament[];
  agentConnected!: Agent
  photo!: string;
  idAgentSelected!: number;
  isLaoding!: boolean;
  @ViewChild('prime') prime!: ElementRef;

  constructor(
    private agentService: AgentService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private anneeService: AnneeService,
    private router: Router,
    private siteService: SiteService,
    private fonctionService: FonctionService,
    private nationaliteService: NationaliteService,
    public _location:Location,
    private dialog: MatDialog,
    private arrondissementService:ArrondissementService,
    private departementService:DepartementService,
    private quartierService:QuartierService,
    private echelonService: EchelonService,
    private gradeService: GradeService,
    private categoryService: CategorieService,
    private specialiteService: SpecialiteService,
    private categorieService: CategorieService,
    private caiseService: CaisseService,
    private centreExamenService: CentreExamenService,
    public globalService: GlobalService,
    private renderer: Renderer2,
    private paramComboAgentService: ParamComboAgentService
  ) {}

  ngOnInit(): void {

    const idAgent = this.route.snapshot.params['idAgent'];
    this.idAgentSelected = idAgent;
    this.action = this.route.snapshot.params['action'];
    //this.quartiers$ = this.quartierService.get(0, 0);
    this.paramComboAgentService.getParamAgent().pipe(
      tap(res => {
        this.DepartementList = res.DEPARTEMENT
        this.siteList = res.SITE;
        this.fonctionList = res.FONCTIONS;
        this.nationaliteList = res.NATIONALITE;
        this.echelonsList = res.ECHELON;
        this.gradeList = res.GRADE;
        this.categoriesList = res.CATEGORIE;
        this.specialiteList = res.SPECIALITE;
        //this.caisseList = res.C

      }),
      finalize(() => {

      })
    ).subscribe()
    /*this.loadDepartement()
    this.loadSite();
    this.loadFonction();
    this.loadNationalite();  
    this.loadEchelons();
    this.loadGrade();
    this.loadCategories();
    this.loadSpecialite();*/
    this.loadCaisse();
    this.initForm();

    if (idAgent) {
      this.initAgentForViewOrUpdate(idAgent);
    }

    this.photo$ = this.agentService.getPhoto(idAgent ?? 0).pipe(
      tap(res => {
        console.log(res);

      })
    )

    //this.arrondissements$ = this.arrondissementService.get(0).pipe(map(res => res.body))

    const agentObj = localStorage.getItem(constantes.auth.agent)
    if(agentObj)
      this.agentConnected = JSON.parse(agentObj);
  }

  desctivateSlectForView(){

  }

  loadCaisse() {
    this.caiseService.get().subscribe((data) => {
          console.log(data);
          this.caisseList = this.suggestCaisseList = data;
        });
  }

  loadCategories(){
    this.categoryService.get().subscribe(data => {
      console.log(data);
      this.categoriesList = data;
    })
  }

  loadEchelons(){
    this.echelonService.get().subscribe(data => {
      this.echelonsList = data;
      this.suggestEchelonList = data;
      console.log(data);
    })
  }


  loadDepartement(){
    this.departementService.get().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data);
      this.DepartementList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }
  onSelectionChange(event: any) {
    const selectedDepartmentId = event.target.value;
    this.arrondissements$ = this.arrondissementService.RecuperationDepartement(selectedDepartmentId)
  }

  onSelecteArrondisssement(event:any){
    const selectedArrondissementId = event.target.value;
    this.quartiers$ = this.quartierService.getByArr(selectedArrondissementId);
    console.log(this.quartiers$)
  }



  loadQuartier(){
    const IDARRONDISSEMENT = this.agentForm.get('IDARRONDISSEMENT')?.value;
    this.quartierService.RecuperationArrondissement(IDARRONDISSEMENT).subscribe(res => {
      console.log(res);
      this.suggestQuartierList = res;
      this.quartierList = res;
      console.log(this.quartierList)
    })
  }


  loadNationalite() {
    this.nationaliteService.get().subscribe((data) => {
      console.log(data);
      this.nationaliteList = data;
      this.suggestNationaliteList = data;
    });
  }

  loadGrade(){
    this.gradeService.get().subscribe(data => {
      console.log(data);
      this.gradeList = data;
      this.suggestGradeList = data;
    })
  }

  loadSite() {
    this.siteService.get().subscribe((data) => {
        console.log(data);
        this.siteList = data;
        this.suggestSiteList = data;
    });
  }

  loadFonction() {
    this.fonctionService.get().subscribe((data) => {
        console.log(data);
        this.fonctionList = data;
        this.suggestFonctionList = data
    });
  }


  initForm() {
    const paramForm = (validators: any[] = []) => {
      return [{value: '', disabled: this.action == 'view' ? true : false}, validators]
    }
    this.agentForm = this.formBuilder.group({
      IDAGENT: paramForm(),
      CodeAgent: paramForm(),
      Fr_Quartier: paramForm(),
      Fr_Nom: paramForm([Validators.required]),
      Fr_Prenom: paramForm([Validators.required]),
      bDroit_ConsultationEleves: paramForm(),
      bDroit_ModificationEleves: paramForm(),
      bDroit_InscriptionEleves: paramForm(),
      bDroit_RadiationEleves: paramForm(),
      bDroit_ChangementEtatEleves: paramForm(),
      bDroit_SaisieNotes: paramForm(),
      bDroit_SaisieNotesAnonyme: paramForm(),
      bDroit_SaisieAbsencesEleves: paramForm(),
      bDroit_SaisieAbsenceEnseignants: paramForm(),
      bDroit_SaisieAbsenceAgents: paramForm(),
      bDroit_ImpressionCertificatsScolarite: paramForm(),
      bDroit_ImpressionCartesScolaires: paramForm(),
      bDroit_ImpressionBulletins: paramForm(),
      bDroit_ImpressionClassementEleve: paramForm(),
      bDroit_ImpressionAbsences: paramForm(),
      bDroit_ImpressionEmploiDuTemps: paramForm(),
      bDroit_GestionProjetsPedagogiques: paramForm(),
      bDroit_PersonnalisationNotesEtMatieres: paramForm(),
      bDroit_ModifcationEmploiDuTemps: paramForm(),
      bDroit_GestionEnseignants: paramForm(),
      bDroit_GestionAgents: paramForm(),
      bDroit_Statistiques: paramForm(),
      bDroit_SauvegardeBDD: paramForm(),
      bDroit_RestaurationBDD: paramForm(),
      bDroit_MiseAJourPortail: paramForm(),
      bDroit_ModifEcolesInspection: paramForm(),
      bDroit_GestionDiplomes: paramForm(),
      bDroit_AttributionDiplomes: paramForm(),
      Login: paramForm(),
      CaisseAssociee: paramForm(),
      bDroit_SuperviseurCaisses: paramForm(),
      DateNaissance: paramForm([Validators.required]),
      IDFONCTION: paramForm(),
      CompteFictif: paramForm(),
      bDroit_FraisOfficielsPayes: paramForm(),
      bDroit_ConsultationComptes: paramForm(),
      bDroit_ConsultationCaisses: paramForm(),
      bDroit_HistoriqueRetraitsCaisses: paramForm(),
      bDroit_HistoriqueVersementsCaisses: paramForm(),
      bDroit_JournalCompta: paramForm(),
      bDroit_GrandLivre: paramForm(),
      bDroit_BalanceCompta: paramForm(),
      bDroit_BilanCompta: paramForm(),
      bDroit_CompteResultat: paramForm(),
      bDroit_DefinirReductionsFraisEleves: paramForm(),
      bDroit_ImportPaiements: paramForm(),
      bDroit_ValiderOperationsDiverses: paramForm(),
      bDroit_EncaisserDroitsScolaires: paramForm(),
      bDroit_EncaisserFraisOccasionnels: paramForm(),
      bDroit_BordereauGeneralSalaire: paramForm(),
      bDroit_AccorderAvances: paramForm(),
      bDroit_ReglerDesCharges: paramForm(),
      ModeRemuneration: paramForm(),
      RemunerationBase: paramForm(),
      Retenue_CNSS: paramForm(),
      Retenue_Assurance: paramForm(),
      Retenue_CasSocial: paramForm(),
      Retenue_Autre: paramForm(),
      IndemniteMensuelle: paramForm(),
      Retenue_EnfantsACharge: paramForm(),
      Courriel: paramForm(),
      Telephone: paramForm(),
      TelMobile: paramForm([Validators.required]),
      IdentifiantBadge: paramForm(),
      Fr_Adresse1: paramForm([Validators.required]),
      Fr_Adresse2: paramForm(),
      Civilite: paramForm([Validators.required]),
      CodePostal: paramForm(),
      Fr_Ville: paramForm(),
      Fr_LieuNaissance: paramForm([Validators.required]),
      NumCNI: paramForm(),
      MontantsPrimesDefaut: paramForm(),
      MontantsRetenuesDefaut: paramForm(),
      NumCompteBancaire: paramForm(),
      NumSecuriteSociale: paramForm(),
      SituationFamiliale: paramForm(),
      NombreEnfants: paramForm(),
      NombrePartsImpots: paramForm(),
      EstImposable: paramForm(),
      IDSITE: paramForm(),
      IDNationalite: paramForm([Validators.required]),
      Fr_Departement: paramForm(),
      Fr_Arrondissement: paramForm(),
      IDCENTRE_EXAMEN: paramForm(),
      ClassesAutoriseesSaisieNotes: paramForm(),
      ModifPasswordNecessaire: paramForm(),
      CodeEtab: paramForm(),
      Nationalite: paramForm(),
      Site: paramForm(),
      Fonction: paramForm(),
      CodeCaisse: paramForm(),
      IDDEPARTEMENT_NAISS: paramForm(),
      Departement_Naiss: paramForm(),
      IDSpecialite: paramForm(),
      Specialite: paramForm(),
      IDEchelon: paramForm(),
      Echelon: paramForm(),
      IDCategorie: paramForm(),
      Categorie: paramForm(),
      IDQUARTIER: paramForm(),
      IDGRADE: paramForm(),
      GRADE: paramForm(),
      Photo: paramForm(),
      IDDEPARTEMENT: paramForm(),
      IDARRONDISSEMENT: paramForm(),
    });

    this.agentFormPreview$ = this.agentForm.valueChanges;
    this.agentForm.get('IDARRONDISSEMENT')?.valueChanges.subscribe((value) => {
      this.quartiers$ = this.quartierService.get(0, value);
    })
    this.agentForm.get('IDDEPARTEMENT')?.valueChanges.subscribe((value) => {
      this.quartiers$ = this.quartierService.get(value, 0);
      this.arrondissements$ = this.arrondissementService.RecuperationDepartement(value).pipe(map(res => res.body))
    })
  }

  onInputQuartier(event: any){
    const eltInput = event.target.value;

    if (eltInput.length > 0){

      const regexQuertier = new RegExp(eltInput + '.*', 'i');
      this.suggestQuartierList = this.suggestQuartierList.filter(elt => regexQuertier.test(elt.NomQuartier));

    }else{
      this.suggestQuartierList = this.suggestQuartierList;
    }

  }

  loadCentreExamens(){
    this.centreExamenService.get().subscribe(data => {
      console.log(data);
      this.centreExamens = data;
    })
  }

  onSelectQuartier(quartier: Quartier){
    this.agentForm.get('IDQUARTIER')?.setValue(quartier.IDQUARTIER);
  }

  loadSpecialite() {
    this.specialiteService.get().subscribe((data) => {
      console.log(data);
      this.specialiteList = data;
    });
  }

  loadCategorie() {
    this.categorieService.get().subscribe((data) => {
        console.log(data);
        this.categoriesList = data;
    });
  }

  onInputGrade(event: any){
    const eltInput = event.target.value;

    if (eltInput.length > 0){

      const regexQuertier = new RegExp(eltInput + '.*', 'i');
      this.suggestEchelonList = this.suggestEchelonList.filter(elt => regexQuertier.test(elt.Fr_Libelle));

    }else{
      this.suggestFonctionList = this.suggestFonctionList;
    }

  }

  onSelectGrade(grade: Grade){
    this.agentForm.get('IDGRADE')?.setValue(grade.Fr_Libelle);
  }

  onInputEchelon(event: any){
    const eltInput = event.target.value;

    if (eltInput.length > 0){

      const regexQuertier = new RegExp(eltInput + '.*', 'i');
      this.suggestEchelonList = this.suggestEchelonList.filter(elt => regexQuertier.test(elt.Fr_Libelle));

    }else{
      this.suggestFonctionList = this.suggestFonctionList;
    }

  }

  onSelectEchelon(echelon: Echelon){
    this.agentForm.get('IDEchelon')?.setValue(echelon.IDECHELON);
  }


  onInputFonction(event: any){
    const eltInput = event.target.value;

    if (eltInput.length > 0){

      const regexQuertier = new RegExp(eltInput + '.*', 'i');
      this.suggestFonctionList = this.suggestFonctionList.filter(elt => regexQuertier.test(elt.Libelle));

    }else{
      this.suggestFonctionList = this.suggestFonctionList;
    }

  }

  onSelectFonction(fonction: Fonction){
    this.agentForm.get('IDFONCTION')?.setValue(fonction.IDFONCTIONS);
  }

  onSelectSite(site: Site){
    this.agentForm.get('IDSITE')?.setValue(site.IDSITE);
  }

  onInputSite(event: any){
    const eltInput = event.target.value;

    if (eltInput.length > 0){

      const regexQuertier = new RegExp(eltInput + '.*', 'i');
      this.suggestSiteList = this.suggestSiteList.filter(elt => regexQuertier.test(elt.Libelle));

    }else{
      this.suggestSiteList = this.suggestSiteList;
    }

  }

  // convertToValideDate(DateEcheance: string){
  //   const year = DateEcheance.split('-')[0];
  //   const month  = DateEcheance.split('-')[1];
  //   const day = DateEcheance.split('-')[2];
  //   const formattedDate = `${day}/${month}/${year}`;
  //   return formattedDate;
  // }

  //this function avoid badge machine to go next stepper
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.focusNextInput()
    }
  }

  focusNextInput(): void {
    const currentElement = this.prime.nativeElement;
    const nextInputElement = currentElement as HTMLInputElement;

    if (nextInputElement) {
      // Utilisez Renderer2 pour définir le focus sur le prochain champ d'entrée
      nextInputElement.focus();
    }
  }

  onSubmit() {

    const agent: Agent = this.agentForm.value;
    //agent.DateNaissance = this.convertToValideDate(agent.DateNaissance); // Conversion de la date de naissance

    console.log(agent);
    if (this.agentForm.value.IDAGENT) {
      this.updateAgent(agent);
    } else {
      this.createAgent(agent);
    }
  }

  onInputCaisse(event: any){
    const eltInput = event.target.value;

    if (eltInput.length > 0){

      const regexQuertier = new RegExp(eltInput + '.*', 'i');
      this.suggestCaisseList = this.suggestCaisseList.filter(elt => regexQuertier.test(elt.CodeCaisse));

    }else{
      this.suggestCaisseList = this.caisseList;
    }
  }

  onInputNationnalite(event: any){
    const eltInput = event.target.value;

    if (eltInput.length > 0){

      const regexQuertier = new RegExp(eltInput + '.*', 'i');
      this.suggestNationaliteList = this.suggestNationaliteList.filter(elt => regexQuertier.test(elt.Libelle));

    }else{
      this.suggestNationaliteList = this.nationaliteList;
    }

  }

  onSelectNationnalite(nationalite: Nationalite){
    this.agentForm.get('IDNationalite')?.setValue(nationalite.IDNATIONALITE);
  }


  updateAgent(agent: Agent) {
    this.isLaoding = true;
    this.agentService.update(agent).pipe(
      tap(res => {
        console.log(res);
        this.isLaoding = false;
        this.globalService.toastShow("Agent modifié avec succès.", "Mise à jour:")
        this.router
          .navigateByUrl('/agent', { skipLocationChange: true })
          .then(() => {});
      }),
      finalize(() => {
        this.isLaoding = false
      })
    ).subscribe()
  }

  createAgent(agent: Agent) {
    this.isLaoding = true;
    this.agentService.create(agent).pipe(
      tap(res => {
        console.log(res);
        this.isLaoding = false;
        this.globalService.toastShow("Agent ajouté avec succès", "Ajout agent")
        this.router
          .navigateByUrl('/agent', { skipLocationChange: true })
          .then(() => {});
      }),
      finalize(() => {
        this.isLaoding = false
      })
    ).subscribe()
  }
  
  initAgentForViewOrUpdate(idAgent: number) {
    this.isLaoding = true
    this.agentService.getOne(idAgent).subscribe((data) => {
      console.log(data)
      this.isLaoding = false
      this.agentForm.patchValue(data);
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const photo = reader.result as string;
      this.photo = photo;
      this.agentForm.get('Photo')?.setValue(photo);
    };
  }

  openDialofForAdd(composant: "departement" | "departementNaiss" | 'arrondissement' | 'quartier' | 'fonction' | 'site' | 'nationalite'){

    console.log('click');


    if(composant == "departement" || composant == "departementNaiss"){
      let ref = this.dialog.open(DepartementFormComponent);
      ref.componentInstance.isOpnenByOther = true;

      ref.afterClosed().subscribe(result => {
        const departement = ref.componentInstance.departementCreated
        console.log(departement)
        if(departement){
          if(composant == "departementNaiss"){
            this.agentForm.get('IDDEPARTEMENT_NAISS')?.setValue(departement.IDDEPARTEMENT);
            this.agentForm.get('Departement_Naiss')?.setValue(departement.NomDepartement);
          }
          else{
            this.agentForm.get('IDDEPARTEMENT')?.setValue(departement.IDDEPARTEMENT);
            this.agentForm.get('Fr_Departement')?.setValue(departement.NomDepartement);
          }

        }
      })
    }
    else if (composant == "arrondissement"){
      const ref = this.dialog.open(ArrondissementFormComponent);
      ref.componentInstance.isOpenByAuther = true;
      ref.afterClosed().subscribe(result => {
        const arr = ref.componentInstance.arrondissementCreated;
        if(arr){
          this.agentForm.get('Fr_Arrondissement')?.setValue(arr.NomArron);
          this.agentForm.get('IDARRONDISSEMENT')?.setValue(arr.IDARRONDISSEMENT);
        }
      })
    }
    else if (composant == "quartier"){
      const ref = this.dialog.open(QuartierFormComponent);
      ref.componentInstance.isOpenByOther = true
      ref.afterClosed().subscribe(result => {
        const quartier = ref.componentInstance.quartierCreated;
        if(quartier){
          this.agentForm.get('Fr_Quartier')?.setValue(quartier.NomQuartier);
          this.agentForm.get('IDQUARIER')?.setValue(quartier.IDQUARTIER);
        }
      })
    }

    else if (composant == "fonction"){
      const ref = this.dialog.open(FonctionFormComponent)
      ref.componentInstance.isOpenByOther = true

      ref.afterClosed().subscribe(result => {
        const fonc = ref.componentInstance.fonctionCreated;
        if(fonc){
          this.agentForm.get('IDFONCTION')?.setValue(fonc.IDFONCTIONS);
          this.agentForm.get('Fonction')?.setValue(fonc.Libelle);
        }
      })
    }

    else if (composant == "site"){
      console.log('click site');

      const ref = this.dialog.open(SiteFormComponent);
      ref.componentInstance.isSiteCall = true;
      ref.afterClosed().subscribe(result => {
        const site = ref.componentInstance.siteCreated;
        if(site){
          this.agentForm.get('IDSITE')?.setValue(site.IDSITE);
        }
      })
    }

    else if (composant == "nationalite"){
      const ref = this.dialog.open(NationaliteFormComponent);
      ref.componentInstance.isNationaliteCall = true;
      ref.afterClosed().subscribe(result => {
        const IDNationalite = ref.componentInstance.IDNATIONALITE;
        const Libelle = ref.componentInstance.Libelle;
        if(IDNationalite && Libelle){
          this.agentForm.get('IDNationalite')?.setValue(IDNationalite);
          this.agentForm.get('Nationalite')?.setValue(Libelle);
        }
      })
    }
  }
  openModal() {
      if (this.agentForm && this.agentConnected && this.agentConnected.IDAGENT == this.idAgentSelected) {
        const dialog = this.dialog.open(UpdatePasswordComponent);
        const codeAgentControl = this.agentForm.get('CodeAgent');
        const loginControl = this.agentForm.get('Login');
        const PhotoControl = this.agentForm.get('Photo');
        const IDAGENTControl = this.agentForm.get('IDAGENT');


        if (codeAgentControl && loginControl && PhotoControl && IDAGENTControl) {
          const codeAgentValue = codeAgentControl.value;
          const loginAgentValue = loginControl.value;
          const PhotoAgentValue = PhotoControl.value;
          const IDAGENTAgentValue = IDAGENTControl.value;


          dialog.componentInstance.CodeAgent = codeAgentValue;
          dialog.componentInstance.Login = loginAgentValue;
          //photo de l'agent n'est pas renvoyer
          // dialog.componentInstance.image = PhotoAgentValue;
          dialog.componentInstance.IDAGENT = IDAGENTAgentValue;


        } else {
          const alert = this.dialog.open(AlertComponent)
          alert.componentInstance.content = "L'agent n'existe pas"
        }
      }
      else if (this.agentForm && this.agentConnected && this.agentConnected.IDAGENT != this.idAgentSelected){
        // const ref = this.globalService.alert("<p>Ceci vas générer un nouveau mot de passe pour l'agent " + this.agentForm.value.Fr_Prenom + " " + this.agentForm.value.Fr_Nom + ". <br/> Cet agent reçevra son nouveau mot de passe par email et sms. <br/> Voulez-vous continuer ? </p>", "Modification de mot de passe : ", "info", "ANNULER", "OUI")
        const ref = this.dialog.open(GeneratenewpasswordComponent)
        ref.componentInstance.CodeAgent = this.agentForm.get('CodeAgent')?.value;
        ref.componentInstance.Login = this.agentForm.get('Login')?.value;
        ref.componentInstance.IDAGENT = this.agentForm.get('IDAGENT')?.value;
      }
      else {
        const alertform = this.dialog.open(AlertComponent)
        alertform.componentInstance.content = "Le formulaire agent est vide"
      }
    }


    openCropImage(){
      const ref = this.dialog.open(ImageCropComponent, {
        maxWidth: "650px"
      })
      ref.afterClosed().subscribe(result => {
         if(ref.componentInstance.finalImage){
          this.photo = ref.componentInstance.finalImage
          this.agentForm.get('Photo')?.setValue(this.photo)
         }
      })
    }


}
