import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
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
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-classe-form',
  templateUrl: './classe-form.component.html',
  styleUrls: ['./classe-form.component.scss'],
})
export class ClasseFormComponent {
  @Input() action!: 'create' | 'edit' | 'view';

  IDCLASSES!: string;
  IDNIVEAU!: string;
  IDBRANCHE!: string;
  NumClasse!: number;
  CodeClasse!: string;
  NomClasse!: string;
  IDSALLES!: number;
  IDENSEIGNANT_Principal!: number;
  IDClassesInspection!: number;
  CodeNiveau!: string;
  CodeBranche!: string;
  CodeSalle!: string;

  isLoading!: boolean;
  isLoadingsubmit!:boolean

  salleList!: Salle[];
  classeList!: Classe[];
  brancheList!: Branche[];
  niveauList!: Niveau[];
  niveau!: string;
  branche!: string;

  classeForm!: FormGroup;
  @Input() classeParam!: Classe;
  classeID: any;

  isFormValid(): any {
    return this.IDNIVEAU && this.IDBRANCHE && this.CodeClasse && this.NomClasse && this.CodeSalle;
  }

  constructor(
    public dialog: MatDialog,
    private classeService: ClasseService,
    private niveauService: NiveauService,
    private brancheService: BrancheService,
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private router:Router,


  ) {};

  ngOnInit(): void {

    const classeID = this.route.snapshot.params['classeID'];
    this.action = this.route.snapshot.params['action'];
    console.log(classeID);
    if(classeID){
      this.getOneClasse(classeID)
    }


    this.classe(0);
    this.loadbranche();
    this.loadniveau()

    this.initForm();

  }

  initForm(){
    const defaultData = (disabled: 'auto' | boolean = 'auto'): any[] => {
      let isDisabled: boolean;

      if(disabled == 'auto'){
        isDisabled = this.action === 'view';
      }else{
        isDisabled = disabled;
      }

      return [{value: null, disabled: isDisabled}];
    }
    this.classeForm = this.formBuilder.group({
      IDCLASSES: defaultData(),
      IDNIVEAU: defaultData(true),
      IDBRANCHE: defaultData(true),
      NumClasse: defaultData(true),
      CodeClasse: [...defaultData(), Validators.required],
      NomClasse: [...defaultData(), Validators.required],
      IDSALLES: defaultData(true),
      IDENSEIGNANT_Principal: defaultData(true),
      IDClassesInspection: defaultData(true),
      CodeNiveau: defaultData(true),
      CodeBranche: defaultData(true),
      CodeSalle: defaultData(true)
    });

    if(this.classeParam){
      console.log(this.classeParam);

      this.classeForm.patchValue(this.classeParam)
    }else{
      console.log('no class passed');

    }
  }


  getOneClasse(classeID:number){
    this.classeService.getOne(classeID).subscribe((data: Classe) => {
      console.log(data);
      const classe: Classe = data;
      this.classeForm.patchValue(classe);
    });

  }




  classe(IDCLASSES: number) {
    this.classeService
      .getClass(this.IDNIVEAU, this.IDBRANCHE, IDCLASSES)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe(
        (data) => {
          console.log(this.IDNIVEAU, this.IDBRANCHE, IDCLASSES);
          console.log(data);
          this.classeList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  loadbranche() {
    this.brancheService
      .get()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe(
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
    this.niveauService
      .get()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.niveauList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onSubmit(){
    this.isLoadingsubmit  = true;
    this.classeService.update(this.classeForm.value).pipe(
      tap(res => {

        this.globalService.toastShow("Classe modifiée avec succès !", 'Mise à jour', "success");
        this.globalService.reloadComponent('/classe/list')

        this.dialog.closeAll()
      }),
      finalize(() => {
        this.isLoadingsubmit = false;
      })
    ).subscribe()
  }

}
