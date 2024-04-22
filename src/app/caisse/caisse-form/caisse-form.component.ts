import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { Caisse } from 'src/app/models/caisse.model';
import { CaisseService } from '../../services/caisse.service';
import { Compte } from 'src/app/models/compte.model';
import { CompteService } from 'src/app/services/compte.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-caisse-form',
  templateUrl: './caisse-form.component.html',
  styleUrls: ['./caisse-form.component.scss']
})
export class CaisseFormComponent {

  @Input() action!: 'create' | 'edit' | 'view';

  IDCAISSE!: number
  CodeCaisse!: string
  LibelleCaisse!: string
  CompteAssocie!: string
  RetraitMaxOperation!: number
  RetraitMaxParPériode!: number
  PeriodeRetraitMax!: number
  VersementsAutorises!: boolean
  RetraitsAutorises!: boolean
  TransfertsIntercaissesAutorises!: boolean
  TransfertsRetraitsBanquesAutorises!: boolean
  isLoading!: boolean;

  compteAssocieList!:Compte[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private compteService:CompteService,
    private CaisseService: CaisseService,
    private globalService: GlobalService
  ) {}

  isFormValid(): any {
    return this.CodeCaisse && this.LibelleCaisse;
  }

  ngOnInit(): void {

    this.loadCompte()

    if (this.IDCAISSE) {
      this.initForUpdate(this.IDCAISSE);
    }

    console.log(this.IDCAISSE);
    console.log(this.action);
  }

  loadCompte(){
    this.compteService.getListCompteBanque(5).subscribe((data)=>{
      console.log(data)
     this.compteAssocieList = data
     console.log(this.compteAssocieList)
    })
  }

  initForUpdate(CAISSEID: number) {
    this.isLoading = true;
    this.CaisseService
      .getOne(CAISSEID)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.isLoading = false;
        this.CodeCaisse = data.CodeCaisse
        this.LibelleCaisse = data.LibelleCaisse
        this.CompteAssocie = data.CompteAssocie
        this.RetraitMaxOperation = data.RetraitMaxOperation
        this.RetraitMaxParPériode = data.RetraitMaxParPériode
        this.PeriodeRetraitMax = data.PeriodeRetraitMax
        this.VersementsAutorises = data.VersementsAutorises
        this.RetraitsAutorises = data.RetraitsAutorises
        this.TransfertsIntercaissesAutorises = data.TransfertsIntercaissesAutorises
        this.TransfertsRetraitsBanquesAutorises = data.TransfertsRetraitsBanquesAutorises
      });
  }

  onSubmitForm(form: NgForm) {
    const caisse: Caisse = form.value;
    this.isLoading = true;
    caisse.IDCAISSE = this.IDCAISSE;

    if (this.action === 'edit') {
      this.CaisseService
        .update(caisse)
        .pipe(
          tap(data => {
            this.globalService.reloadComponent('/caisse')
            this.globalService.toastShow("Caisse modifiée avec succès!", " Modification")
            this.dialog.closeAll()
          }),
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe()
    } else {
      this.CaisseService
        .create(caisse)
        .pipe(
          tap(data => {
            this.globalService.reloadComponent('/caisse')
            this.globalService.toastShow("Caisse ajoutée avec succès!", " Modification")
            this.dialog.closeAll()
          }),
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe()
    }
  }


}
