import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Langue } from 'src/app/models/langue.model';
import { LangueService } from 'src/app/services/langue.service';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-langue-form',
  templateUrl: './langue-form.component.html',
  styleUrls: ['./langue-form.component.scss']
})
export class LangueFormComponent {

  @Input() action !: "create" | "edit" | "view"

  IDLANGUE!: number
  Fr_Libelle!: string
  NumOrdre!: number
  isLoading!: boolean;
  isSLangueCall:boolean=false
  isLoadingpage!:boolean
  
  isFormValid(): any {
    // return this.Fr_Libelle && this.NumOrdre;
  }
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private langueService:LangueService,
    private globalService:GlobalService
  ) {}


  ngOnInit(): void {

 
    if (this.IDLANGUE) {
      
      this.initForUpdate(this.IDLANGUE)
   }
    console.log(this.IDLANGUE);
    console.log(this.action)

  }


  initForUpdate(LANGUEID: number) {
    this.langueService.getOne(LANGUEID).subscribe((data) => {
      console.log(data);
      this.NumOrdre = data.NumOrdre
      this.Fr_Libelle = data.Fr_Libelle
    });
  }


  onSubmitForm(form: NgForm) {
    this.isLoadingpage = true
    const langue: Langue = form.value;
    langue.IDLANGUE = this.IDLANGUE
    if (this.action === 'edit') {
      this.langueService.update(langue).pipe(
        tap(data => {
          this.dialog.closeAll()
          this.globalService.toastShow("Langue modifié.", "Modification")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    } else {
    
      this.langueService.create(langue).pipe(
        tap(data => {

          if(this.isSLangueCall){
            this.IDLANGUE = data.body.IDLANGUE
            this.Fr_Libelle = data.body.Fr_Libelle
            console.log(this.IDLANGUE,this.Fr_Libelle)
            this.dialog.closeAll()
            this.globalService.toastShow("la langue a été ajouté  avec succès", "Succès", "success");
          
          }else{
            this.dialog.closeAll()
            this.globalService.toastShow("Nouvelle langue Ajouté.", "Ajout")
          }

        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }

}


