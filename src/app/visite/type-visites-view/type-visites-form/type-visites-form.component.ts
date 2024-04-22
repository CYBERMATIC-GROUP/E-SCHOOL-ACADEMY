import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeVisiteur } from '../../models/type-visite.model';
import { TypeVisiteService } from '../../services/type-visite.service';
import { finalize, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-type-visites-form',
  templateUrl: './type-visites-form.component.html',
  styleUrls: ['./type-visites-form.component.scss']
})
export class TypeVisitesFormComponent implements OnInit {

  typeForm!: FormGroup;
  type!: TypeVisiteur;
  action!: "create" | "edit" | "view"
  isLoading!: boolean;
  title!: string;

  constructor(
    private formBuilder: FormBuilder,
    private typeService: TypeVisiteService,
    private globalService: GlobalService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.typeForm = this.formBuilder.group({
      Libelle: [null, Validators.required],
      IDTypeVisiteur: [null]
    })

    if(TypeVisiteur && (this.action == "edit" || this.action == "view")){
        this.typeForm.patchValue(this.type)
        if(this.action == "view")
          this.typeForm.disable
    }
  }


  onSubmit(){
    const type: TypeVisiteur = this.typeForm.value
    this.isLoading = true
    if(this.action == "create"){
      this.typeService.create(type).pipe(
        tap(res => {
          this.globalService.toastShow("Nouveau type de visite ajouté avec succès.", "Ajout:");
          this.type = res
          this.dialog.closeAll()
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }else{
      this.typeService.update(type).pipe(
        tap(res => {
          this.globalService.toastShow("Type de visite modifié avec succès.", "Modification:");
          this.type = res;
          this.dialog.closeAll();
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }

}
