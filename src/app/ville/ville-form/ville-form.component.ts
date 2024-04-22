
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { Ville } from 'src/app/models/ville.model';
import { VilleService } from 'src/app/services/ville.service';
import { GlobalService } from 'src/app/services/global.service';



@Component({
  selector: 'app-ville-form',
  templateUrl: './ville-form.component.html',
  styleUrls: ['./ville-form.component.scss']
})
export class VilleFormComponent {

  @Input() action !: "create" | "edit" | "view"

  IDVILLE!: number
  Fr_Libelle!: string
  NumOrdre!: number
  isLoading!: boolean;
  isLoadingpage!:boolean
  openVilleByEnseignant:boolean = false

isFormValid(): any {
  return this.Fr_Libelle && this.NumOrdre;
}

constructor(
  private route: ActivatedRoute,
  private router:Router,
  public dialog: MatDialog,
  private globalService:GlobalService,
  private villeService:VilleService
) {}

ngOnInit(): void {


  if (this.IDVILLE) {
    
    this.initForUpdate(this.IDVILLE)
 }
  console.log(this.IDVILLE);
  console.log(this.action)

}


initForUpdate(VILLEID: number) {
  this.villeService.getOne(VILLEID).subscribe((data) => {
    console.log(data);

    this.Fr_Libelle = data.Fr_Libelle
    this.NumOrdre = data.NumOrdre


  });
}

onSubmitForm(form: NgForm) {

  this.isLoadingpage = true

  const ville: Ville = form.value;
  ville.IDVILLE = this.IDVILLE
  if (this.action === 'edit') {
    this.villeService.update(ville).subscribe(
      (data) => {

        console.log(data);
        location.reload()
      },
      (Error) => console.log(Error)
    );
  } else {
  
    this.villeService.create(ville).subscribe(
      (data) => {
        if(this.openVilleByEnseignant){
          this.Fr_Libelle = data.body.Fr_Libelle
          this.IDVILLE = data.body.IDVILLE
          this.dialog.closeAll()
          this.globalService.toastShow("Nouvelle ville ajouté.", "Ajout")
        }else{
          this.dialog.closeAll()
          location.reload()
        }

        console.log(data);
        this.isLoadingpage = false
      },
      (error) => console.log(error)
    );
  }
}

}
