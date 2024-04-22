import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EtablissementTousService } from 'src/app/services/etablissement-tous.service';
import { MatDialog } from '@angular/material/dialog';
import { Etablissements } from '../../../models/etablissement-tous.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-etablissement-tous-form',
  templateUrl: './etablissement-tous-form.component.html',
  styleUrls: ['./etablissement-tous-form.component.scss']
})
export class EtablissementTousFormComponent {

  @Input() action !: "create" | "edit" | "view"

  IDETABLISSEMENTS!: number
  Fr_Nom!: string
  NumOrdre!: number
  isLoading!: boolean;
  isEtablissementCall:boolean = true
openEatblissementByEleveForm:boolean=false
isloadingpage!:boolean

  isFormValid(): any {
    return this.Fr_Nom && this.NumOrdre;
  }
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private globalService:GlobalService,
    private etabService:EtablissementTousService
  ) {}


  ngOnInit(): void {

 
    if (this.IDETABLISSEMENTS) {
      
      this.initForUpdate(this.IDETABLISSEMENTS)
   }
    console.log(this.IDETABLISSEMENTS);
    console.log(this.action)

  }


  initForUpdate(ETABLISSEMENTSID: number) {
    this.etabService.getOne(ETABLISSEMENTSID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.Fr_Nom = data.Fr_Nom
      this.NumOrdre = data.NumOrdre


    });
  }


  onSubmitForm(form: NgForm) {
    this.isloadingpage = true
    const etab: Etablissements = form.value;
    etab.IDETABLISSEMENTS = this.IDETABLISSEMENTS
    if (this.action === 'edit') {
      this.etabService.update(etab).pipe(
        tap(data => {
          this.dialog.closeAll()
          this.globalService.toastShow("Etablissement modifié.", "Modification")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    } else {
      this.etabService.create(etab).pipe(
        tap(data => {

          if(this.isEtablissementCall){
            this.IDETABLISSEMENTS=data.body.IDETABLISSEMENTS
            this.Fr_Nom = data.body.Fr_Nom
            this.dialog.closeAll()
            this.globalService.toastShow("Votre établissemet a été ajouté  avec succès", "Succès", "success");
          }else{
            this.dialog.closeAll()
            this.globalService.toastShow("Etablissement Ajouté.", "Ajout")
          }
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }

}

