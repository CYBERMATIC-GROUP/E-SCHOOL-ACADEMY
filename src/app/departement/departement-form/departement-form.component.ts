
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement.service';
import { GlobalService } from 'src/app/services/global.service';
import { constantes } from 'src/environnements/constantes';
import { environment } from 'src/environnements/environnement.prod';


@Component({
  selector: 'app-departement-form',
  templateUrl: './departement-form.component.html',
  styleUrls: ['./departement-form.component.scss']
})
export class DepartementFormComponent {

  @Input() action !: "create" | "edit" | "view"
  @Input() isOpnenByOther!: boolean;
  departementCreated!: Departement

  IDDEPARTEMENT!: number
  CodeDepartement!: string
  NomDepartement!: string
  Ordre!: string
  isLoadingpage!:boolean
  isLoading!: boolean;
  openDepartementByEleveForm:boolean = false
  openDepartementLieuNaissByEleveForm:boolean = false

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private departementService:DepartementService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {


    if (this.IDDEPARTEMENT) {

      this.initForUpdate(this.IDDEPARTEMENT)
   }
    console.log(this.IDDEPARTEMENT);
    console.log(this.action)

  }

  isFormValid(): any {
    return this.CodeDepartement && this.NomDepartement && this.Ordre ;
  }

  initForUpdate(DEPARTEMENTID: number) {
    this.isLoadingpage = true;
    this.departementService.getOne(DEPARTEMENTID).subscribe((data) => {
      console.log(data);
      this.isLoadingpage = false;
      this.IDDEPARTEMENT = data.IDDEPARTEMENT
      this.CodeDepartement = data.CodeDepartement
      this.NomDepartement = data.NomDepartement
      this.Ordre = data.Ordre


    });
  }



  onSubmitForm(form: NgForm) {

    this.isLoadingpage = true
    const departement: Departement = form.value;
    departement.IDDEPARTEMENT = this.IDDEPARTEMENT
    if (this.action === 'edit') {
      this.departementService.update(departement).pipe(
        tap(data => {
          this.afterCreateOrUpdate(data)
          this.dialog.closeAll()
          this.globalService.toastShow("département modifié !", "succès")

        }),
        finalize(() => {
          this.isLoadingpage = false
        })
      ).subscribe()
    } else {

      this.departementService.create(departement).pipe(
        tap(data => {
          this.afterCreateOrUpdate(data)
           this.dialog.closeAll()
           this.globalService.toastShow("Nouveau département ajouté !", "Ajout succès")
        }),
        finalize(() => {
          this.isLoadingpage = false
        })
      ).subscribe()
    }
  }

  private afterCreateOrUpdate(data: any){
    this.departementCreated = data.body;
    console.log(this.departementCreated);
    if(this.isOpnenByOther){
      this.dialog.closeAll()
    }else{
      this.globalService.reloadComponent(environment.routes.parametres.localisation.departement)
    }

    this.isLoading = false
  }

}
