import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Profession } from 'src/app/models/profession.model';
import { ProfessionService } from 'src/app/services/profession.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profession-form',
  templateUrl: './profession-form.component.html',
  styleUrls: ['./profession-form.component.scss'],
})
export class ProfessionFormComponent {
  
  @Input() action!: 'create' | 'edit' | 'view';

  IDPROFESSION!: number;
  Fr_Libelle!: string;
  NumOrdre!: number;

  isLoading!: boolean;

  isFormValid(): any {
    return this.Fr_Libelle && this.NumOrdre;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private professionService: ProfessionService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    if (this.IDPROFESSION) {
      this.initForUpdate(this.IDPROFESSION);
    }
    console.log(this.IDPROFESSION);
    console.log(this.action);
  }

  initForUpdate(PROFESSIONID: number) {
    this.professionService
      .getOne(PROFESSIONID)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe((data) => {
        console.log(data);

        this.Fr_Libelle = data.Fr_Libelle;
        this.NumOrdre = data.NumOrdre;
      });
  }

  onSubmitForm(form: NgForm) {
    const profession: Profession = form.value;
    profession.IDPROFESSION = this.IDPROFESSION;

    if (this.action === 'edit') {
      this.professionService
        .update(profession).pipe(
          tap(data => {
            this.dialog.closeAll()
            this.globalService.toastShow("Profession modifié.", "Modification")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
    } else {
      this.professionService
        .create(profession).pipe(
          tap(data => {
            this.dialog.closeAll()
            this.globalService.toastShow("Nouvelle profession Ajouté.", "Ajout")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
    }
  }
}
