
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { Diplome } from 'src/app/models/diplomes.models';
import { DiplomeService } from 'src/app/services/diplome.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-diplome-form',
  templateUrl: './diplome-form.component.html',
  styleUrls: ['./diplome-form.component.scss']
})
export class DiplomeFormComponent {


  @Input() action !: "create" | "edit" | "view"
  completRequest!: boolean
  IDDIPLOME!: number
  Libelle!: string
  NumOrdre!: number
  isLoading!: boolean;
  openDiplomeByEnseignant: boolean = false
  isLoadingpage!:boolean

  isFormValid(): any {
    return this.Libelle && this.NumOrdre;
  }

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private globalService:GlobalService,
    private diplomeService:DiplomeService
  ) {}

  ngOnInit(): void {


    if (this.IDDIPLOME) {

      this.initForUpdate(this.IDDIPLOME)
   }
    console.log(this.IDDIPLOME);
    console.log(this.action)

  }


  initForUpdate(DIPLOMEID: number) {
    this.isLoadingpage = true
    this.diplomeService.getOne(DIPLOMEID).subscribe((data) => {
      console.log(data);
      this.isLoadingpage = false
      this.Libelle = data.Libelle
      this.NumOrdre = data.NumOrdre
    });
  }

  onSubmitForm(form: NgForm) {

    this.isLoadingpage = true
    const Diplome: Diplome = form.value;

    Diplome.IDDIPLOME = this.IDDIPLOME


    if (this.action === 'edit') {
      this.diplomeService.update(Diplome).pipe(
        tap(data => {
          this.globalService.reloadComponent('/diplome')
          this.dialog.closeAll()
          this.globalService.toastShow("Nouveau diplome modifié.", "Modification")
        }),
        finalize(() => {
          this.isLoadingpage = false
        })
      ).subscribe()
    } else {

      this.diplomeService.create(Diplome).pipe(
        tap(data => {
          if(this.openDiplomeByEnseignant){
            this.IDDIPLOME = data.body.IDDIPLOME
            this.Libelle = data.body.Libelle
            this.dialog.closeAll()
          }else{

            this.dialog.closeAll()
            this.globalService.reloadComponent('/diplome')
          }

          this.globalService.toastShow("Nouveau diplôme ajouté.", "Ajout")
        }),
        finalize(() => {
          this.isLoadingpage = false;
        })
      ).subscribe()
    }
  }

}
