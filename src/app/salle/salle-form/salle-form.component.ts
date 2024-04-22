import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Salle } from 'src/app/models/salle.model';
import { SalleService } from 'src/app/services/salle.service';
import { MatDialog } from '@angular/material/dialog';
import { Typesalle } from 'src/app/models/typesalle.model';
import { TypesalleService } from 'src/app/services/typesalle.service';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-salle-form',
  templateUrl: './salle-form.component.html',
  styleUrls: ['./salle-form.component.scss']
})
export class SalleFormComponent {

  @Input() action !: "create" | "edit" | "view"
  dataIsloading!: boolean;
  IDSALLES!: number
  CodeSalle!: string
  NomSalle!: string
  Capacite!: number
  NbBancs!: number
  NbRangees!: number
  Superficie!: number
  IDTYPESALLE!: number

  typesalleList!: Typesalle[];


  isFormValid(): any {
    return this.CodeSalle && this.NomSalle && this.NbBancs && this.NbRangees;
  }

  isLoading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private salleService:SalleService,
    private typesalleService:TypesalleService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.typesalle()
    if (this.IDSALLES) {
      this.initForUpdate(this.IDSALLES)
   }
    console.log(this.IDSALLES);
    console.log(this.action)
  }

  typesalle(){
    this.typesalleService.get().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.typesalleList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  initForUpdate(SALLESID: number) {
    this.dataIsloading = true;
    this.salleService.getOne(SALLESID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);
      this.IDSALLES = data.IDSALLES
      this.NomSalle = data.NomSalle
      this.NbRangees = data.NbRangees
      this.Superficie = data.Superficie
      this.IDTYPESALLE = data.IDTYPESALLE
      this.NbBancs = data.NbBancs
      this.CodeSalle = data.CodeSalle
      this.Capacite = data.Capacite

      this.dataIsloading = false;
    });
  }

  onSubmitForm(form: NgForm) {

    const salle: Salle = form.value;

    salle.IDSALLES = this.IDSALLES

    this.isLoading = true;
    if (this.action === 'edit') {
      this.salleService.update(salle).pipe(catchError((error:HttpErrorResponse)=>{
        console.log(error.status);
        return []
      })).subscribe(
        (data) => {

          console.log(data);
          this.isLoading = false
          this.dialog.closeAll()
          this.globalService.toastShow("Salle modifiée avec succès !", "Modification")
          this.globalService.reloadComponent('/salle')
        },
        (Error) => console.log(Error)
      );
    } else {

      this.salleService.create(salle).pipe(catchError((error:HttpErrorResponse)=>{

        console.log(error.status);
        return []
      })).subscribe(
        (data) => {

          console.log(data);
          this.isLoading = false
          this.dialog.closeAll()
          this.globalService.toastShow("Salle ajoutée avec succès !", "Modification")
          this.globalService.reloadComponent('/salle')
        },
        (error) => console.log(error)
      );
    }
  }

}
