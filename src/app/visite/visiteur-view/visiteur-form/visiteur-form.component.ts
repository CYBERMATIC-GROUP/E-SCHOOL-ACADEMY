import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Visiteur } from '../../models/visiteur.model';
import { Observable, finalize, tap } from 'rxjs';
import { VisiteurService } from '../../services/visiteur.service';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-visiteur-form',
  templateUrl: './visiteur-form.component.html',
  styleUrls: ['./visiteur-form.component.scss']
})
export class VisiteurFormComponent {
  visiteurForm!: FormGroup
  visiteur!: Visiteur
  action!: "view" | "edit" | "create"
  isLoading!: boolean
  title!: string;
  idUniqueForDialog = 'dialog-visite-form';

  constructor(
    private formBuild: FormBuilder,
    public globalService: GlobalService,
    private dialog: MatDialog,
    private visiteurService: VisiteurService
  ){}
  
  ngOnInit(): void {
      this.initForm()
  }

  initForm(){
    this.visiteurForm = this.formBuild.group({
      IDVisiteurs: [null],
      NomPrenom: [null, Validators.required],
      Mobile: [null],
      email: [null],
      Notes: [null],
    })

    if((this.action == "view" || this.action == "edit") && this.visiteur){
      this.visiteurForm.patchValue(this.visiteur)
      this.visiteurForm.get('')
      if(this.action == 'view')
        this.visiteurForm.disable
    }
  }


  onSubmit(){
    const visiteur: Visiteur = this.visiteurForm.value
    this.isLoading = true
    if(this.action == "create"){
      this.visiteurService.create(visiteur).pipe(
        tap(res => {
          this.globalService.toastShow("Nouveau visiteur ajouté avec succès.", "Ajout:");
          this.visiteur = res;
          console.log(res);
          this.dialog.getDialogById(this.idUniqueForDialog)?.close()
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }else{
      this.visiteurService.update(visiteur).pipe(
        tap(res => {
          this.globalService.toastShow("Visiteur modifié avec succès.", "Modification:");
          this.visiteur = res
          this.dialog.getDialogById(this.idUniqueForDialog)?.close()
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }
}
