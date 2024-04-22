import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement.service';
import { GlobalService } from 'src/app/services/global.service';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { Agent } from 'src/app/models/agent.model';
import { FonctionService } from 'src/app/services/fonction.service';
import { EchelonService } from 'src/app/services/echelon.service';
import { GradeService } from 'src/app/services/grade.service';
import { Echelon } from 'src/app/models/echelon.model';
import { Grade } from 'src/app/models/grade.model';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/models/site.model';
import { Fonction } from 'src/app/models/fonction.model';


@Component({
  selector: 'app-filtrer',
  templateUrl: './filtrer.component.html',
  styleUrls: ['./filtrer.component.scss']
})
export class FiltrerComponent implements OnInit{

  filterForm!: FormGroup;
  filterFormPreview$!: Observable<Agent>;
  departements!: Departement[];
  suggestDepartements!: Departement[];
  categoryList!: Categorie[];

  suggestEchelonList!: Echelon[];
  echelonsList!: Echelon[];

  suggestGradeList!: Grade[];
  gradeList!: Grade[];

  isLoading!: boolean;
  isLoadingPrint!:boolean

  resultFiltre!: any;

  siteList!: Site[];
  suggestSiteList!: Site[];

  fonctionList!: Fonction[];
  suggestFonctionList!: Fonction[];

  @Output() filtreClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() onPrint: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private departementService: DepartementService,
    private fonctionService: FonctionService,
    private echelonService: EchelonService,
    private gradeService: GradeService,
    private categoryService: CategorieService,
    private siteService: SiteService,
  ){}

  ngOnInit(){
    this.loadCategory();
    this.loadEchelons();
    this.loadGrade();
    this.initForm();
    this.loadSite();
    this.loadFonction();
  }

  onSubmitForm(){
    this.resultFiltre = this.filterForm.value;
    this.filtreClick.emit();
  }

  onPrintAgent(){
    this.resultFiltre = this.filterForm.value;
    this.isLoadingPrint = true
    this.onPrint.emit();
    this.isLoadingPrint = false

  }

  initForm(){
    this.filterForm = this.formBuilder.group({
      IDAGENT: [null],
      Fr_Nom: [null],
      Fr_Prenom: [null],
      IDFONCTION: [null],
      Fonction: [null],
      Civilite: [null],
      IDSITE: [null],
      IDEchelon: [null],
      Echelon: [null],
      IDCategorie: [null],
      IDGRADE: [null],
      GRADE: [null],
      Site: [null]
    })

    this.filterFormPreview$ = this.filterForm.valueChanges;
    
  }

  isAnyFieldFilled(): boolean {
    return Object.values(this.filterForm.value).filter(val => val !== null && val !== '').length > 0;
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
    this.filterForm.get('IDGRADE')?.setValue(grade.Fr_Libelle);
  }

  onSelectEchelon(echelon: Echelon){
    this.filterForm.get('IDEchelon')?.setValue(echelon.IDECHELON);
  }

  onSelectSite(site: Site){
    this.filterForm.get('IDSITE')?.setValue(site.IDSITE);
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
    this.filterForm.get('IDFONCTION')?.setValue(fonction.IDFONCTIONS);
  }

  loadEchelons(){
    this.echelonService.get().subscribe(data => {
      this.echelonsList = data;
      this.suggestEchelonList = data;
      console.log(data);
    })
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

  loadCategory(){
    this.categoryService.get().subscribe(liste => {
        this.categoryList = liste;
        console.log(liste);
    });
  }

  loadDepartements(){
      this.departementService.get().subscribe(departements => {
      console.log(departements);

      this.departements = departements
    })
  }
}
