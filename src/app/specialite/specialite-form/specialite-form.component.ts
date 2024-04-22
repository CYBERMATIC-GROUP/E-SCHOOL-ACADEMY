import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SpecialiteService } from 'src/app/services/specialite.service';
import { Specialite } from 'src/app/models/specialite.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-specialite-form',
  templateUrl: './specialite-form.component.html',
  styleUrls: ['./specialite-form.component.scss'],
})
export class SpecialiteFormComponent {
  @Input() action!: 'create' | 'edit' | 'view';

  IDSPECIALITE!: number;
  Fr_Libelle!: string;
  CodeSpecialite!: string;
  NumOrdre!: number;
  isLoading!: boolean;

  isFormValid(): any {
    return this.Fr_Libelle && this.CodeSpecialite;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private specialiteService: SpecialiteService,
    private globalService:GlobalService 
  ) {}

  ngOnInit(): void {
    if (this.IDSPECIALITE) {
      this.initForUpdate(this.IDSPECIALITE);
    }
    console.log(this.IDSPECIALITE);
    console.log(this.action);
  }

  initForUpdate(SPECIALITEID: number) {
    this.specialiteService
      .getOne(SPECIALITEID)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe((data) => {
        console.log(data);

        this.Fr_Libelle = data.Fr_Libelle;
        this.CodeSpecialite = data.Fr_Libelle;
        this.NumOrdre = data.NumOrdre;
      });
  }

  onSubmitForm(form: NgForm) {
    const specialite: Specialite = form.value;
    specialite.IDSPECIALITE = this.IDSPECIALITE;

    if (this.action === 'edit') {
      this.specialiteService
        .update(specialite)
        .pipe(
          tap(data => {
            this.dialog.closeAll()
            this.globalService.toastShow("specialité modifié.", "Modification")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
    } else {
      this.specialiteService
        .create(specialite)
        .pipe(
          tap(data => {
            this.dialog.closeAll()
            this.globalService.toastShow("Nouvelle specialité Ajouté.", "Ajout")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
    }
  }
}
