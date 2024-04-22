
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { CentreExamenService } from 'src/app/services/centre-examen.service';
import { CentreExament } from 'src/app/models/centreExamen.model';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-centreexamen-form',
  templateUrl: './centreexamen-form.component.html',
  styleUrls: ['./centreexamen-form.component.scss']
})
export class CentreexamenFormComponent {

  @Input() action !: "create" | "edit" | "view"


  IDCENTRE_EXAMEN!: number
  Fr_Code!: string
  Fr_Nom!: string
  NumOrdre!: number
  Capacite!: number
  IDINSPECTIONS!: number
  NbEleves!: number
  isLoading!: boolean;

  isFormValid(): any {
    return this.Fr_Code && this.Fr_Nom;
  }

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private centreexamenService:CentreExamenService,
    private globalService:GlobalService
  ) {}

  ngOnInit(): void {

 
    if (this.IDCENTRE_EXAMEN) {
      
      this.initForUpdate(this.IDCENTRE_EXAMEN)
   }
    console.log(this.IDCENTRE_EXAMEN);
    console.log(this.action)

  }


  initForUpdate(CENTRE_EXAMENID: number) {
    this.centreexamenService.getOne(CENTRE_EXAMENID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.Fr_Code = data.Fr_Nom
      this.Fr_Nom = data.Fr_Nom
      this.NumOrdre = data.NumOrdre
      this.Capacite = data.Capacite
      this.IDINSPECTIONS = data.IDINSPECTIONS
      this.NbEleves = data.NbEleves

    });
  }


  onSubmitForm(form: NgForm) {

    const centre: CentreExament = form.value;
    centre.IDCENTRE_EXAMEN = this.IDCENTRE_EXAMEN

    if (this.action === 'edit') {
      this.centreexamenService.update(centre).pipe(
        tap(data => {
          this.dialog.closeAll()
          this.globalService.toastShow("centre examen modifié.", "Modification")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    } else {
    
      this.centreexamenService.create(centre).pipe(
        tap(data => {
          this.dialog.closeAll()
          this.globalService.toastShow("Centre examen Ajouté.", "Ajout")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }




}
