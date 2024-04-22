import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { Quartier } from 'src/app/models/quartier.model';
import { QuartierService } from 'src/app/services/quartier.service';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement.service';
import { Arrondissement } from 'src/app/models/arrondissement.model';
import { ArrondissementService } from 'src/app/services/arrondissement.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-quartier-form',
  templateUrl: './quartier-form.component.html',
  styleUrls: ['./quartier-form.component.scss']
})
export class QuartierFormComponent {

  @Input() action !: "create" | "edit" | "view"

  IDQUARTIER!: number
  NomQuartier!: string
  IDDEPARTEMENT!: number
  IDARRONDISSEMENT: number = 0
  NomArron!: string
  NomDepartement!: string
  @Input() quartierCreated!: Quartier
  @Input() isOpenByOther!: boolean;
  DepartementList!: Departement[];
  ArrondissementList!: Arrondissement[];
  dataIsLoading!: boolean;

  isLoading!: boolean;


  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private quartierService:QuartierService,
    private arrondissementService:ArrondissementService,
    private departementService:DepartementService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {

    this.loadDepartement()
    this.loadArrondissement()

    if (this.IDQUARTIER) {

      this.initForUpdate(this.IDQUARTIER)
   }
    console.log(this.IDQUARTIER);
    console.log(this.action)

  }

  isFormValid(): any {
    return this.NomQuartier && this.IDDEPARTEMENT && this.IDARRONDISSEMENT;
  }


  loadDepartement(){
    this.departementService.get().subscribe((data)=>{
      console.log(data)
      this.DepartementList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  loadArrondissement(){
    this.arrondissementService.get(0).subscribe((data)=>{
      console.log(data)
      this.ArrondissementList = data.body;
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  onSelectionChange(event : any){
    console.log(event.target.value)
    this.quartierService.Recuperations(this.IDDEPARTEMENT).subscribe((data)=>{
      console.log(data)
      this.ArrondissementList= data.body
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  initForUpdate(QUARTIERID: number) {
    this.dataIsLoading = true;
    this.quartierService.getOne(QUARTIERID).pipe(
      tap(data => {
        this.IDQUARTIER = data.IDQUARTIER
        this.NomQuartier = data.NomQuartier
        this.IDDEPARTEMENT = data.IDDEPARTEMENT
        this.IDARRONDISSEMENT = data.IDARRONDISSEMENT
        this.NomArron = data.NomArron
        this.NomDepartement = data.NomDepartement
      }),
      finalize(() => {
        this.dataIsLoading = false
      })
    ).subscribe()
  }

  onSubmitForm(form: NgForm) {
    this.isLoading = true;
    const quartier: Quartier = form.value;

    quartier.IDQUARTIER = this.IDQUARTIER


    if (this.action === 'edit') {
      this.quartierService.update(quartier).pipe(
        tap(data => {
          this.globalService.toastShow("Votre quartier a été modifié avec succès.", "Ajout:")
          this.dialog.closeAll()
          this.globalService.reloadComponent('/quartier')
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    } else {

      this.quartierService.create(quartier).pipe(
        tap(res => {
          this.globalService.toastShow("Nouveau quartier ajouté avec succès.", "Ajout:")
          this.isLoading = false
          this.quartierCreated = res.body
          if(!this.isOpenByOther){
            this.globalService.reloadComponent('/quartier')
          }
          this.dialog.closeAll()
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }

}
