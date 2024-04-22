import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Branche } from 'src/app/models/branche.model';
import { Classe } from 'src/app/models/classe.model';
import { Niveau } from 'src/app/models/niveau.model';
import { BrancheService } from 'src/app/services/branche.service';
import { ClasseService } from 'src/app/services/classe.service';
import { EleveService } from 'src/app/services/eleve.service';
import { GlobalService } from 'src/app/services/global.service';
import { MatiereService } from 'src/app/services/matiere.service';
import { NationaliteService } from 'src/app/services/nationalite.service';
import { NiveauService } from 'src/app/services/niveau.service';
import { ClassementService } from './services/classement.service';
import { Observable, finalize, map, of, tap } from 'rxjs';
import { classementEleve, paramClassement } from './models/classement.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Matiere, MatiereByNiveauBrancheClasse } from 'src/app/models/matiere.model';
import { PeriodeEleve } from 'src/app/models/eleve.model';
import { ParamFilterState } from 'src/app/models/etat-paiement.model';

@Component({
  selector: 'app-classement-releve-note-eleve',
  templateUrl: './classement-releve-note-eleve.component.html',
  styleUrls: ['./classement-releve-note-eleve.component.scss']
})
export class ClassementReleveNoteEleveComponent {
  printIsLoading!: boolean
  matieres$: Observable<MatiereByNiveauBrancheClasse[]> = of([]);
  niveaux$: Observable<Niveau[]>  = of([]);
  branches$: Observable<Branche[]>  = of([]);
  classes$: Observable<Classe[]>  = of([])
  paramFilterForm!: FormGroup
  classement$: Observable<classementEleve> = of({
    TitresNotes: [],
    tabLesNotes: [],
    Resultats: [],
    tTitrePeriodes: {
      MoyennePeriode1Libelle: "",
      bMoyennePeriode1Visible: false,
      MoyennePeriode2Libelle: "",
      bMoyennePeriode2Visible: false,
      MoyennePeriode3Libelle: "",
      bMoyennePeriode3Visible: false,
      MoyenneLibelle: "",
      bMoyenneVisible: false,
      bCreditVisible: false,
      bTotapointsVisible: false,
      bTotalCoefficient: false,
      bMentionVisible: false,
      bDecisionConseilVisible: false,
    }
  });
  numeroSequences$: Observable<PeriodeEleve[]>  = of([])
  iSLaodData!: boolean;
  printIsLoadingM!:boolean
  istchekedcase: boolean = true;
  istcheckedCompteMatiere: boolean = true;
  detaillematiere: number = 1;
  tenircomptematiere: number = 1
  GoupeMatiere: number = 0

  constructor(
    private eleveService: EleveService,
    private globalService: GlobalService,
    private brancheService: BrancheService,
    private niveauService: NiveauService,
    private classeService: ClasseService,
    private matiereService: MatiereService,
    private classementService: ClassementService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.niveaux$ = this.niveauService.get()
    this.branches$ = this.brancheService.get()
    this.classes$ = this.classeService.get().pipe(
      tap(res => {
        this.paramFilterForm.get('IDCLASSES')?.setValue(res[0].IDCLASSES);
      })
    )
  }

  loadMatieres(){
    const niveau = this.paramFilterForm.get('IDNIVEAU')?.value ?? 0
    const branch = this.paramFilterForm.get('IDBRANCHE')?.value ?? 0
    const classe = this.paramFilterForm.get('IDCLASSES')?.value ?? 0

    this.matieres$ = this.matiereService.getListMatiereByNieveuBrancheClasse(niveau, branch, classe).pipe(
      tap(res => {
        console.log(res);
        
        this.paramFilterForm.get('GoupeMatiere')?.setValue(res[0].IDMATIERE);
      })
    )
  }

  initForm(){
    this.paramFilterForm = this.formBuilder.group({
      IDNIVEAU: [null],
      IDBRANCHE: [null],
      IDCLASSES: [null],
      NumeroTrimestre: [1],
      NumeroSequence: [null],
      TypeMoyenne: [null],
      GoupeMatiere: [],
      TenirCompteCoeffMatieres: [null],
      ClassementOuReleveNotes: [null],
      eleveConcerned: [5]
    });
    this.paramFilterForm.get('IDBRANCHE')?.disable()
    this.paramFilterForm.get('IDNIVEAU')?.disable()

    this.numeroSequences$ = this.eleveService.GetParametresPeriode(this.paramFilterForm.get('NumeroTrimestre')?.value).pipe(
      tap(res => {
        this.paramFilterForm.get('NumeroSequence')?.setValue(res[0].NumPeriode);
      })
    )

    this.paramFilterForm.get('NumeroTrimestre')?.valueChanges.subscribe((value) => {
      this.numeroSequences$ = this.eleveService.GetParametresPeriode(value);
    })

    this.paramFilterForm.get('eleveConcerned')?.valueChanges.subscribe((value) => {
      switch (value) {
        case 1:
          this.paramFilterForm.get('IDBRANCHE')?.disable()
          this.paramFilterForm.get('IDNIVEAU')?.disable()
          break;
        case 2:
          this.paramFilterForm.get('IDBRANCHE')?.enable()
          this.paramFilterForm.get('IDNIVEAU')?.enable()
          this.paramFilterForm.get('IDCLASSES')?.disable()
          break;
        case 3:
          this.paramFilterForm.get('IDBRANCHE')?.disable()
          this.paramFilterForm.get('IDNIVEAU')?.enable()
          this.paramFilterForm.get('IDCLASSES')?.disable()
          break;
        case 4:
          this.paramFilterForm.get('IDBRANCHE')?.enable()
          this.paramFilterForm.get('IDNIVEAU')?.disable()
          this.paramFilterForm.get('IDCLASSES')?.disable()
          break;
        case 5:
            this.paramFilterForm.get('IDBRANCHE')?.disable()
            this.paramFilterForm.get('IDNIVEAU')?.disable()
            this.paramFilterForm.get('IDCLASSES')?.enable()
          break;
        default:
          break;
      }
    })
    this.onChangeSommeElement()
  }

  onChangeSommeElement(){
    this.paramFilterForm.get('IDNIVEAU')?.valueChanges.subscribe((value) => {
      //this.loadMatieres()
    })
    this.paramFilterForm.get('IDBRANCHE')?.valueChanges.subscribe((value) => {
      //this.loadMatieres()
    })
    this.paramFilterForm.get('IDCLASSES')?.valueChanges.subscribe((value) => {
      this.loadMatieres()
    })

  }

  convertToValideDate(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  loadClassement(){
    const param: paramClassement = this.paramFilterForm.value;
    console.log(param);
    
    this.iSLaodData = true
    this.classement$ = this.classementService.getClassement(param,this.detaillematiere).pipe(
      finalize(() => {
        this.iSLaodData = false;
      })
    )
  }

  toggleDetailleMatiere(event: any) {
    this.detaillematiere = event.target.checked ? 1 : 0;
    console.log(this.detaillematiere);
    
  }
  togglecompteMtiere(event: any){
    this.tenircomptematiere = event.target.checked ? 1 : 0;
    console.log(this.tenircomptematiere);
    
  }

  printClassement(){
    const param: paramClassement = this.paramFilterForm.value;
    this.printIsLoading = true;
    this.eleveService.getNOTES_Imprime_ClassementsansDetail(param).pipe(
      tap(res => {
        this.globalService.printFile(res.Etat, "Impression classement")
      }),
      finalize(() => {
        this.printIsLoading = false;
      })
    ).subscribe()
  }

  printMatrise(){
    const param: paramClassement = this.paramFilterForm.value;
    this.printIsLoadingM = true;
    this.classementService.imprimeMatrise(param).pipe(
      tap(res => {
        console.log(res);
        this.globalService.printFile(res.Etat, "Impression classement")
      }),
      finalize(() => {
        this.printIsLoadingM = false;
      })
    ).subscribe()
  }
}
