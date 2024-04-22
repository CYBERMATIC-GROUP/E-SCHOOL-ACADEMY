import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { StatuseleveService } from '../../services/statuseleve.service';
import { StatusEleve } from '../../models/statuseleve.model';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-statuseleve-form',
  templateUrl: './statuseleve-form.component.html',
  styleUrls: ['./statuseleve-form.component.scss']
})
export class StatuseleveFormComponent {

  @Input() action !: "create" | "edit" | "view"

  IDSTATUTELEVE!: number
  Fr_Libelle!: string
  NumOrdre!: number
  isLoading!: boolean;
  isloadingpage!:boolean
  isStatusEleveCall:boolean = false
  isFormValid(): any {
    return this.Fr_Libelle && this.NumOrdre;
  }

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private globalService:GlobalService,
    private StatuseleveService:StatuseleveService
  ) {}

  ngOnInit(): void {

 
    if (this.IDSTATUTELEVE) {
      
      this.initForUpdate(this.IDSTATUTELEVE)
   }
    console.log(this.IDSTATUTELEVE);
    console.log(this.action)

  }


  initForUpdate(StatusEleveID: number) {
    this.StatuseleveService.getOne(StatusEleveID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.Fr_Libelle = data.Fr_Libelle
      this.NumOrdre = data.NumOrdre


    });
  }

  onSubmitForm(form: NgForm) {
    this.isloadingpage = true
    const statuseleve: StatusEleve = form.value;
    statuseleve.IDSTATUTELEVE = this.IDSTATUTELEVE
    if (this.action === 'edit') {
      this.StatuseleveService.update(statuseleve).pipe(
        tap(data => {
          this.dialog.closeAll()
          this.globalService.toastShow("status  modifié.", "Modification")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    } else {
      this.StatuseleveService.create(statuseleve).pipe(
        tap(data => {

          if(this.isStatusEleveCall){
            this.IDSTATUTELEVE = data.body.IDSTATUTELEVE
            this.Fr_Libelle = data.body.Fr_Libelle
            console.log(this.IDSTATUTELEVE,this.Fr_Libelle)
            this.dialog.closeAll();
            this.globalService.toastShow("Votre status a été ajouté  avec succès", "Succès", "success");
          
          }else{
            this.dialog.closeAll()
            this.globalService.toastShow("Nouveau status Ajouté.", "Ajout")
          }
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }

}
