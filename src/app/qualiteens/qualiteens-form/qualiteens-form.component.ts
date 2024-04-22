import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { QualiteensService } from '../../services/qualiteens.service';
import { Qualiteens } from '../../models/qualiteens.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-qualiteens-form',
  templateUrl: './qualiteens-form.component.html',
  styleUrls: ['./qualiteens-form.component.scss']
})
export class QualiteensFormComponent {


  @Input() action !: "create" | "edit" | "view"

  IDQUALITEENS!: number
  Libelle!: string
  NumOrdre!: number
  isLoading!: boolean;

  openQualiteByEnseignant:boolean = false
  isLoadingpage!: boolean;

  isFormValid(): any {
    return this.Libelle && this.NumOrdre;
  }

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private globalService:GlobalService,
    private QualiteensService:QualiteensService
  ) {}

  ngOnInit(): void {

 
    if (this.IDQUALITEENS) {
      
      this.initForUpdate(this.IDQUALITEENS)
   }
    console.log(this.IDQUALITEENS);
    console.log(this.action)

  }


  initForUpdate(QUALITEENSID: number) {
    this.QualiteensService.getOne(QUALITEENSID).subscribe((data) => {
      console.log(data);

      this.Libelle = data.Libelle
      this.NumOrdre = data.NumOrdre

    });
  }

  onSubmitForm(form: NgForm) {
    this.isLoadingpage = true
    const Qualiteens: Qualiteens = form.value;
    Qualiteens.IDQUALITEENS = this.IDQUALITEENS
    if (this.action === 'edit') {
      this.QualiteensService.update(Qualiteens).pipe(
        tap(data => {
          this.dialog.closeAll()
          this.globalService.toastShow("Qualité modifié.", "Modification")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    } else {
      this.QualiteensService.create(Qualiteens).pipe(
        tap(data => {
          if(this.openQualiteByEnseignant){
            this.IDQUALITEENS = data.body.IDQUALITEENS
            this.Libelle = data.body.Libelle
            console.log(this.IDQUALITEENS,this.Libelle)
            this.dialog.closeAll()
            this.globalService.toastShow("Qualité  ajouté !", "Ajout succès")
          
          }else{
            this.dialog.closeAll()
            this.globalService.toastShow("Nouvelle qualité ajouté.", "ajout")
          }
         
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }

}
