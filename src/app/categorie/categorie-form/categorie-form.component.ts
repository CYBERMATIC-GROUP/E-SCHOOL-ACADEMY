
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-categorie-form',
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.scss']
})
export class CategorieFormComponent {


  @Input() action !: "create" | "edit" | "view"

  IDCATEGORIE!: number
  Fr_Libelle!: string
    NumOrdre!: number
  isLoading!: boolean;

  isFormValid(): any {
    return this.Fr_Libelle && this.NumOrdre;
  }

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private categorieService:CategorieService,
    private globalService:GlobalService
  ) {}

  ngOnInit(): void {

 
    if (this.IDCATEGORIE) {
      
      this.initForUpdate(this.IDCATEGORIE)
   }
    console.log(this.IDCATEGORIE);
    console.log(this.action)

  }


  initForUpdate(CATEGORIEID: number) {
    this.categorieService.getOne(CATEGORIEID).subscribe((data) => {
      console.log(data);

      this.Fr_Libelle = data.Fr_Libelle
      this.NumOrdre = data.NumOrdre


    });
  }

  onSubmitForm(form: NgForm) {

    const categorie: Categorie = form.value;
    categorie.IDCATEGORIE = this.IDCATEGORIE


    if (this.action === 'edit') {
      this.categorieService.update(categorie).pipe(
        tap(data => {
          this.dialog.closeAll()
          this.globalService.toastShow("Categorie modifié.", "Modification")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    } else {
    
      this.categorieService.create(categorie).pipe(
        tap(data => {
          this.dialog.closeAll()
          this.globalService.toastShow("Categorie Ajouté.", "Ajout")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }

}
