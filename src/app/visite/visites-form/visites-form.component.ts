import { Component, Input, OnInit } from '@angular/core';
import { VisiteService } from '../services/visite.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Visite } from '../models/visite.model';
import { Observable, finalize, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { VisiteurService } from '../services/visiteur.service';
import { Visiteur } from '../models/visiteur.model';
import { TypeVisiteur } from '../models/type-visite.model';
import { TypeVisiteService } from '../services/type-visite.service';
import { VisiteurFormComponent } from '../visiteur-view/visiteur-form/visiteur-form.component';

@Component({
  selector: 'app-visites-form',
  templateUrl: './visites-form.component.html',
  styleUrls: ['./visites-form.component.scss']
})
export class VisitesFormComponent implements OnInit {

  visiteForm!: FormGroup;
  @Input() visite!: Visite
  action!: "view" | "edit" | "create"
  isLoading!: boolean
  title!: string;
  visiteurs!: Observable<Visiteur[]>;
  typeVisiteurs$!: Observable<TypeVisiteur[]>;
  visiteurs$!: Observable<Visiteur[]>

  constructor(
    private visiteService: VisiteService,
    private formBuild: FormBuilder,
    public globalService: GlobalService,
    private dialog: MatDialog,
    private visiteurService: VisiteurService,
    private typeService: TypeVisiteService
  ){}
  
  ngOnInit(): void {
    this.visiteurs$ = this.visiteurService.get().pipe(
      tap(res => {
        console.log(res);
      })
    );
    this.typeVisiteurs$ = this.typeService.get()
    this.initForm()
  }

  initForm(){
    this.visiteForm = this.formBuild.group({
      IDVisites: [null],
      Motif: [null, Validators.required],
      Details: [null, Validators.required],
      IDTypeVisiteur: [null, Validators.required],
      IDVisiteurs: [null, Validators.required],
      NomVisiteur: [null],
    })

    this.visiteForm.patchValue(this.visite)

    if((this.action == "view" || this.action == "edit") && this.visite){
      this.visiteForm.patchValue(this.visite)
      if(this.action == 'view')
        this.visiteForm.disable
    }
  }


  addNewVisiteur(){
    const ref = this.dialog.open(VisiteurFormComponent, {id: 'dialog-visite-form'})
    ref.componentInstance.action = "create";
    ref.afterClosed().subscribe(result => {
      const visiteur: Visiteur = ref.componentInstance.visiteur
      if (visiteur){
        this.visiteForm.get('IDVisiteurs')?.setValue(visiteur.IDVisiteurs)
        this.visiteForm.get('NomVisiteur')?.setValue(visiteur.NomPrenom)
      }
    })
  }


  onSubmit(){
    const visite: Visite = this.visiteForm.value
    this.isLoading = true
    if(this.action == "create"){
      this.visiteService.create(visite).pipe(
        tap(res => {
          this.globalService.toastShow("Nouvelle visite ajoutée avec succès.", "Ajout:");
          this.visite = res
          this.dialog.closeAll()
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }else{
      this.visiteService.update(visite).pipe(
        tap(res => {
          this.globalService.toastShow("Visite modifiée avec succès.", "Modification:");
          this.visite = res
          this.dialog.closeAll();
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }
} 
