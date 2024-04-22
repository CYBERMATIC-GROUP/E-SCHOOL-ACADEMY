import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { BrancheService } from 'src/app/services/branche.service';
import { Branche } from 'src/app/models/branche.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-branche-form',
  templateUrl: './branche-form.component.html',
  styleUrls: ['./branche-form.component.scss'],
})
export class BrancheFormComponent {
  @Input() action!: 'create' | 'edit' | 'view';

  IDBRANCHE!: string;
  CodeBranche!: string;
  NomBranche!: string;
  isLoading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private brancheService: BrancheService,
    private globalService:GlobalService
  ) {}

  ngOnInit(): void {
    if (this.IDBRANCHE) {
      this.initForUpdate(this.IDBRANCHE);
    }
    console.log(this.IDBRANCHE);
    console.log(this.action);
  }

  isFormValid(): any {
    return this.CodeBranche && this.NomBranche;
  }

  initForUpdate(BRANCHEID: string) {
    this.brancheService
      .getOne(BRANCHEID).subscribe((data) => {
        console.log(data);

        this.CodeBranche = data.CodeBranche;
        this.NomBranche = data.NomBranche;
      });
  }

  onSubmitForm(form: NgForm) {
    const branche: Branche = form.value;

    branche.IDBRANCHE = this.IDBRANCHE;

    if (this.action === 'edit') {
      this.brancheService
        .update(branche).pipe(
          tap(data => {
            this.dialog.closeAll()
            this.globalService.toastShow("Branche modifié.", "Modification")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
    } else {
      this.brancheService
        .create(branche).pipe(
          tap(data => {
            this.dialog.closeAll()
            this.globalService.toastShow("Nouvelle branche Ajouté.", "Ajout")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
    }
  }
}
