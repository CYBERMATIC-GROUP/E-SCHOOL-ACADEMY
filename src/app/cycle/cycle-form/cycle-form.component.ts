
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { CycleService } from 'src/app/services/cycle.service';
import { Cycle } from '../../models/cycle.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-cycle-form',
  templateUrl: './cycle-form.component.html',
  styleUrls: ['./cycle-form.component.scss']
})
export class CycleFormComponent {
  @Input() action !: "create" | "edit" | "view"
  IDCYCLES!: number
  Libelle!: string
  NumOrdre!: number
  isLoading!: boolean;
  complet!: boolean;
  dataIsloading!: boolean;

  isFormValid(): any {
    return this.Libelle && this.NumOrdre;
  }

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private cycleService:CycleService,
    private globalService:GlobalService
  ) {}

  ngOnInit(): void {


    if (this.IDCYCLES) {
      this.initForUpdate(this.IDCYCLES)
   }
    console.log(this.IDCYCLES);
    console.log(this.action)

  }


  initForUpdate(CYCLESID: number) {
    this.dataIsloading = true
    this.cycleService.getOne(CYCLESID).pipe(
      tap(data => {
        this.Libelle = data.Libelle
        this.NumOrdre = data.NumOrdre
      }),
      finalize(() => {
        this.dataIsloading = false
      })
    ).subscribe()
  }


  onSubmitForm(form: NgForm) {
    this.isLoading = true;
    const Cycle: Cycle = form.value;
    Cycle.IDCYCLES = this.IDCYCLES
    if (this.action === 'edit') {
      this.cycleService.update(Cycle).pipe(
        tap(res => {
          this.complet = true
          this.dialog.closeAll()
          this.globalService.toastShow("Votre cycle a été modifié avec succès.", "Modification")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()

    } else {

      this.cycleService.create(Cycle).pipe(
        tap(res => {
          this.complet = true
          this.dialog.closeAll()
          this.globalService.toastShow("Cycle a ajouté avec succès.", "Ajout")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }



}
