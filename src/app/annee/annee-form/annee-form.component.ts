import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Annee } from 'src/app/models/annee.model';
import { AnneeService } from 'src/app/services/annee.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-annee-form',
  templateUrl: './annee-form.component.html',
  styleUrls: ['./annee-form.component.scss'],
})
export class AnneeFormComponent {
  @Input() action!: 'create' | 'edit' | 'view';

  IDANNEE!: number;

  isLoading!: boolean;

  nAnnee1: number = 0;
  nAnnee2: number = 0;
  Annee1Annee2: string = '';
  NomEcole: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private anneeService: AnneeService,
    private globalService:GlobalService
  ) {}

  ngOnInit(): void {
    if (this.IDANNEE) {
      this.initForUpdate(this.IDANNEE);
    }
    console.log(this.IDANNEE);
    console.log(this.action);
  }

  initForUpdate(ANNEEID: number) {
    this.anneeService
      .getOne(ANNEEID).subscribe((data) => {
        console.log(data);

        this.nAnnee1 = data.nAnnee1;
        this.nAnnee2 = data.nAnnee2;
        this.Annee1Annee2 = data.Annee1Annee2;
        this.NomEcole = data.NomEcole;
      });
  }

  isFormValid(): any {
    return this.nAnnee1 && this.nAnnee2 && this.Annee1Annee2;
  }

  onSubmitForm(form: NgForm) {
    this.isLoading = true
    const annee: Annee = form.value;
    annee.IDANNEE = this.IDANNEE;

    if (this.action === 'edit') {
      this.anneeService.update(annee).pipe(
        tap(data => {
          this.dialog.closeAll()
          this.globalService.toastShow("Année modifié.", "Modification")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    } else {
      this.anneeService
        .create(annee).pipe(
          tap(data => {
            this.dialog.closeAll()
            this.globalService.toastShow("Année ajouté.", "Ajout")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
    }
  }
}
