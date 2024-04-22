import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { Typesalle } from 'src/app/models/typesalle.model';
import { TypesalleService } from 'src/app/services/typesalle.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-typesalle-form',
  templateUrl: './typesalle-form.component.html',
  styleUrls: ['./typesalle-form.component.scss']
})
export class TypesalleFormComponent {


  @Input() action !: "create" | "edit" | "view"

  IDTYPESALLE!: number
  Libelle!: string
  NumOrdre!: number
  isLoading!: boolean;

  isFormValid(): any {
    return this.Libelle && this.NumOrdre;
  }

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private typesalleService:TypesalleService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {


    if (this.IDTYPESALLE) {

      this.initForUpdate(this.IDTYPESALLE)
   }
  }


  initForUpdate(TYPESALLEID: number) {
    this.isLoading = true;
    this.typesalleService.getOne(TYPESALLEID).subscribe((data) => {
      console.log(data);

      this.Libelle = data.Libelle
      this.NumOrdre = data.NumOrdre

      this.isLoading = false;
    });
  }

  onSubmitForm(form: NgForm) {

    const typesalle: Typesalle = form.value;

    typesalle.IDTYPESALLE = this.IDTYPESALLE

    this.isLoading = true;

    if (this.action === 'edit') {
      this.typesalleService.update(typesalle).pipe(
        tap(data => {
          this.globalService.toastShow("Type de salle modifié avec succès !", "Modification")
          this.dialog.closeAll()
          this.globalService.reloadComponent('/typesalle')
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe()
    } else {

      this.typesalleService.create(typesalle).pipe(
        tap(data => {
          this.globalService.toastShow("Type de salle ajouté avec succès !", "Ajout")
          this.dialog.closeAll()
          this.globalService.reloadComponent('/typesalle')
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe()
    }
  }



}
