import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { Arrondissement } from 'src/app/models/arrondissement.model';
import { ArrondissementService } from 'src/app/services/arrondissement.service';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement.service';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-arrondissement-form',
  templateUrl: './arrondissement-form.component.html',
  styleUrls: ['./arrondissement-form.component.scss']
})
export class ArrondissementFormComponent {



  @Input() action !: "create" | "edit" | "view"

  IDARRONDISSEMENT!:string
  NomArron!:string
  Ordre!:string
  IDDEPARTEMENT!:string
  NomDepartement!:string
  @Input() arrondissementCreated!: Arrondissement
  @Input() isOpenByAuther!: boolean
  isLoading!: boolean;
  DepartementList!: Departement[];


  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private arrondissementService:ArrondissementService,
    private departementService:DepartementService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {

    this.loadDepartement()

    if (this.IDARRONDISSEMENT) {
      
      this.initForUpdate(this.IDARRONDISSEMENT)
   }
    console.log(this.IDARRONDISSEMENT);
    console.log(this.action)

  }

  isFormValid(): any {
    return this.NomArron && this.Ordre && this.IDDEPARTEMENT;
  }

  loadDepartement(){
    this.departementService.get().subscribe((data)=>{
      console.log(data)
      this.DepartementList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  initForUpdate(ARRONDISSEMENTID: string) {
    this.arrondissementService.getOne(ARRONDISSEMENTID).subscribe((data) => {
      console.log(data);

      this.IDARRONDISSEMENT = data.IDARRONDISSEMENT
      this.NomArron = data.NomArron
      this.Ordre = data.Ordre
      this.IDDEPARTEMENT = data.IDDEPARTEMENT
      this.NomDepartement = data.NomDepartement

    });
  }


  onSubmitForm(form: NgForm) {
    this.isLoading = true;
    const arrondissement: Arrondissement = form.value;

    arrondissement.IDARRONDISSEMENT = this.IDARRONDISSEMENT


    if (this.action === 'edit') {
      this.arrondissementService.update(arrondissement).subscribe(
        (data) => {

          console.log(data);
          this.isLoading = false
          location.reload()
        },
        (Error) => console.log(Error)
      );
    } else {
    
      this.arrondissementService.create(arrondissement).pipe(
        tap(data => {
          this.arrondissementCreated = data.body
          this.globalService.toastShow("Arrondissement ajouté avec succès", "Ajout")
          if(this.isOpenByAuther){
            this.dialog.closeAll()
          }else{
            location.reload()
          }
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe();
    }
  }



  

}
