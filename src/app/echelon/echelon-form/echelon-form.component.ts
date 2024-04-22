
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { Echelon } from 'src/app/models/echelon.model';
import { EchelonService } from 'src/app/services/echelon.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-echelon-form',
  templateUrl: './echelon-form.component.html',
  styleUrls: ['./echelon-form.component.scss']
})
export class EchelonFormComponent {

  @Input() action !: "create" | "edit" | "view"

  IDECHELON!: number
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
  private echelonService:EchelonService,
  private globalService:GlobalService
) {}
ngOnInit(): void {
  if (this.IDECHELON) {
    this.initForUpdate(this.IDECHELON)
 }
  console.log(this.IDECHELON);
  console.log(this.action)
}
initForUpdate(ECHELONID: number) {
  this.echelonService.getOne(ECHELONID).subscribe((data) => {
    console.log(data);
    this.Fr_Libelle = data.Fr_Libelle
    this.NumOrdre = data.NumOrdre
  });
}
onSubmitForm(form: NgForm) {
  const echelon: Echelon = form.value;
  echelon.IDECHELON = this.IDECHELON
  if (this.action === 'edit') {
    this.echelonService.update(echelon).pipe(
      tap(data => {
        this.dialog.closeAll()
        this.globalService.toastShow("echelon modifié.", "Modification")
      }),
      finalize(() => {
        this.isLoading = false
      })
    ).subscribe()
  } else {
    this.echelonService.create(echelon).pipe(
      tap(data => {
        this.dialog.closeAll()
        this.globalService.toastShow("Nouvel echelon Ajouté.", "Ajout")
      }),
      finalize(() => {
        this.isLoading = false
      })
    ).subscribe()
  }
}
}
