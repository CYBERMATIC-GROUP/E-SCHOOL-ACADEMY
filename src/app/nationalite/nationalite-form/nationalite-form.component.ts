import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService} from 'src/app/services/global.service';

@Component({
  selector: 'app-nationalite-form',
  templateUrl: './nationalite-form.component.html',
  styleUrls: ['./nationalite-form.component.scss']
})
export class NationaliteFormComponent {

  @Input() action !: "create" | "edit" | "view"

  IDNATIONALITE!: number
  Libelle!: string
  NumOrdre!: number
  isLoading!: boolean;
  isloadingpage!:boolean

  isNationaliteCall :boolean = false


  isFormValid(): any {
    return this.Libelle && this.NumOrdre;
  }

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private nationaliteService:NationaliteService,
    private globalService:GlobalService
  ) {}

  ngOnInit(): void {

    if (this.IDNATIONALITE) {

      this.initForUpdate(this.IDNATIONALITE)
   }
    console.log(this.IDNATIONALITE);
    console.log(this.action)

  }

  initForUpdate(NATIONALITEID: number) {
    this.nationaliteService.getOne(NATIONALITEID).subscribe((data) => {
      console.log(data);
      this.Libelle = data.Libelle
      this.NumOrdre = data.NumOrdre


    });
  }


  getIDnationalite(){
    console.log(this.IDNATIONALITE)

  }
  onSubmitForm(form: NgForm) {
    this.isloadingpage = true
    const natioanlite: Nationalite = form.value;
    natioanlite.IDNATIONALITE = this.IDNATIONALITE

    if (this.action === 'edit') {
      this.nationaliteService.update(natioanlite).pipe(
        tap(res => {
          this.globalService.toastShow("Nationalité modifiée avec succès !", "Modification")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    } else {

      this.nationaliteService.create(natioanlite).pipe(
        tap(data => {
          if (this.isNationaliteCall) {
            this.IDNATIONALITE = data.body.IDNATIONALITE;
            this.Libelle = data.body.Libelle;
          } else {
            this.dialog.closeAll();
            this.globalService.reloadComponent('/')
          }

          this.dialog.closeAll();
          this.globalService.toastShow("Nationalité ajoutée  avec succès", "Succès", "success");
        }),
        finalize(() => {
          this.isloadingpage = false
        })
      ).subscribe()

    }
  }


}
