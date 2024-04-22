import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Niveau } from 'src/app/models/niveau.model';
import { NiveauService } from 'src/app/services/niveau.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-niveau-form',
  templateUrl: './niveau-form.component.html',
  styleUrls: ['./niveau-form.component.scss']
})
export class NiveauFormComponent {

  @Input() action !: "create" | "edit" | "view"

  IDNIVEAU!: string
  IndNiveau!: number
  CodeNiveau!: string
  NomNiveau!: string

  isFormValid(): any {
    return this.CodeNiveau && this.NomNiveau;
  }

  isLoading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private niveauService:NiveauService,
    private globalService:GlobalService
  ) {}

  ngOnInit(): void {
    if (this.IDNIVEAU) {
      this.initForUpdate(this.IDNIVEAU)
   }
    console.log(this.IDNIVEAU);
    console.log(this.action)

  }

  initForUpdate(NIVEAUID: string) {
    this.isLoading = true;
    this.niveauService.getOne(NIVEAUID).subscribe((data) => {
      console.log(data);
      this.CodeNiveau = data.CodeNiveau
      this.NomNiveau = data.NomNiveau
      this.isLoading = false;
    });
  }

  onSubmitForm(form: NgForm) {
    const niveau: Niveau = form.value;
    niveau.IDNIVEAU = this.IDNIVEAU
    this.isLoading = true;
    if (this.action === 'edit') {
      this.niveauService.update(niveau).pipe(
        tap(res => {
          this.globalService.toastShow("Niveau modifié avec succès.", "Modification:")
          this.globalService.reloadComponent('/niveau')
          this.dialog.closeAll()
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    } else {

      this.niveauService.create(niveau).pipe(
        tap(res => {
          this.globalService.toastShow("Niveau ajouté avec succès.", "Ajout:")
          this.globalService.reloadComponent('/niveau')
          this.dialog.closeAll()
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }

}
