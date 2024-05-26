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
  bAvecDetailMatieres: number = 1
  GoupeMatiere: number = 0
  selectedMatiereId: number = 0;

  objetSend!: paramClassement

  IDNIVEAU!: number
  IDBRANCHE!: number
  IDCLASSE!: number
  typemoyenne: number = 1

  constructor(
    private eleveService: EleveService,
    private globalService: GlobalService,
    private brancheService: BrancheService,
    private niveauService: NiveauService,
    private router: Router,
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
    console.log(classe);

    this.matieres$ = this.matiereService.getListMatiereByNieveuBrancheClasse(niveau, branch, classe).pipe(
      tap(res => {
        console.log(res);
        this.paramFilterForm.get('GoupeMatiere')?.setValue(res[0].IDMATIERE);
        this.selectedMatiereId = 0
        this.ObjectSend()
      })
    )
  }

  initForm(){
    this.paramFilterForm = this.formBuilder.group({
      IDNIVEAU: 0,
      IDBRANCHE: 0,
      IDCLASSES: 0,
      NumeroTrimestre: [1],
      NumeroSequence: [0],
      TypeMoyenne: 1,
      GoupeMatiere: 0,
      TenirCompteCoeffMatieres: 1,
      bAvecDetailMatieres: 1,
      ClassementOuReleveNotes: 0,
      eleveConcerned: [5]
    });

    console.log(this.paramFilterForm.value);
    
    this.paramFilterForm.get('IDBRANCHE')?.disable()
    this.paramFilterForm.get('IDNIVEAU')?.disable()

    this.numeroSequences$ = this.eleveService.GetParametresPeriode(this.paramFilterForm.get('NumeroTrimestre')?.value).pipe(
      tap(res => {
        console.log(res);
        this.paramFilterForm.get('NumeroSequence')?.setValue(res[0].NumPeriode);
      })
    )    
    this.paramFilterForm.get('NumeroTrimestre')?.valueChanges.subscribe((value) => {
      this.numeroSequences$ = this.eleveService.GetParametresPeriode(value);
      console.log(value);
      this.typemoyenne = value
      this.ObjectSend()
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


  ObjectSend(){
    const param: paramClassement = {
      IDNIVEAU: this.paramFilterForm.get('IDNIVEAU')?.value,
      IDBRANCHE: this.paramFilterForm.get('IDBRANCHE')?.value,
      IDCLASSES:  this.IDCLASSE,
      NumeroTrimestre: this.paramFilterForm.get('NumeroTrimestre')?.value,
      NumeroSequence: this.paramFilterForm.get('NumeroSequence')?.value,
      TypeMoyenne: this.typemoyenne,
      GoupeMatiere:this.selectedMatiereId,
      TenirCompteCoeffMatieres: this.tenircomptematiere,
      ClassementOuReleveNotes: this.paramFilterForm.get('ClassementOuReleveNotes')?.value,
      bAvecDetailMatieres: this.bAvecDetailMatieres

    };
    this.objetSend = param
    console.log(this.objetSend);
  }


getSelectedMatiereId(): void {
    this.selectedMatiereId = this.paramFilterForm.get('GoupeMatiere')?.value;
    console.log( this.selectedMatiereId);
    this.ObjectSend()
}

  onChangeSommeElement(){
    this.paramFilterForm.get('IDNIVEAU')?.valueChanges.subscribe((value) => {
      this.loadMatieres()
      this.IDNIVEAU = value
      this.IDCLASSE = 0
      this.ObjectSend()
    })
    this.paramFilterForm.get('IDBRANCHE')?.valueChanges.subscribe((value) => {
      this.loadMatieres()
      this.IDBRANCHE = value
      this.IDCLASSE = 0
      this.ObjectSend()
    })
    this.paramFilterForm.get('IDCLASSES')?.valueChanges.subscribe((value) => {
      this.loadMatieres()
      this.paramFilterForm.get('IDBRANCHE')?.setValue(0);
      this.paramFilterForm.get('IDNIVEAU')?.setValue(0);
      this.IDCLASSE = value
     this.ObjectSend()
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
    this.iSLaodData = true;
        this.classement$ = this.classementService.getClassement(this.objetSend,this.bAvecDetailMatieres).pipe(
          finalize(() => {
            this.iSLaodData = false;
          })
        )
  }

  toggleDetailleMatiere(event: any) {
    this.bAvecDetailMatieres = event.target.checked ? 1 : 0;
    console.log(this.bAvecDetailMatieres);
    this.ObjectSend()
  }

  togglecompteMtiere(event: any){
    this.tenircomptematiere = event.target.checked ? 1 : 0;
    console.log(this.tenircomptematiere);
    this.ObjectSend()
  }

  printClassement(){
    const param: paramClassement = this.objetSend
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
    const param: paramClassement = this.objetSend
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
  
  openPageStatistiqueBydiscipline(){
    const jsonString = JSON.stringify(this.objetSend);
    localStorage.setItem('objetSend', jsonString);
    if (jsonString) {
      this.router.navigate(['statistique-par-discipline']);
    }
  }
}
