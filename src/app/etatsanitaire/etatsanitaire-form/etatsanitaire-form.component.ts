import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EtatSanitaire } from 'src/app/models/etatSanitaire.model';
import { EtatsanitaireService } from '../../services/etatsanitaire.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-etatsanitaire-form',
  templateUrl: './etatsanitaire-form.component.html',
  styleUrls: ['./etatsanitaire-form.component.scss']
})
export class EtatsanitaireFormComponent {



  @Input() action !: "create" | "edit" | "view"

  IDETAT_SANITAIRE!: number
  Fr_Libelle!: string
  NumOrdre!: number
  isLoading!: boolean;
  isEtatSanitaireCall:boolean = false
  isloadingpage!:boolean

  
  
  isFormValid(): any {
    return this.Fr_Libelle && this.NumOrdre;
  }
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private EtatsanitaireService:EtatsanitaireService,
    private globalService:GlobalService
  ) {}


  ngOnInit(): void {

 
    if (this.IDETAT_SANITAIRE) {
      
      this.initForUpdate(this.IDETAT_SANITAIRE)
   }
    console.log(this.IDETAT_SANITAIRE);
    console.log(this.action)

  }


  initForUpdate(ETAT_SANITAIREID: number) {
    this.EtatsanitaireService.getOne(ETAT_SANITAIREID).subscribe((data) => {
      console.log(data);

      this.Fr_Libelle = data.Fr_Libelle
      this.NumOrdre = data.NumOrdre
    });
  }


  onSubmitForm(form: NgForm) {
    this.isloadingpage = true
    const etatsanitaire: EtatSanitaire = form.value;
    etatsanitaire.IDETAT_SANITAIRE = this.IDETAT_SANITAIRE
    if (this.action === 'edit') {
      this.EtatsanitaireService.update(etatsanitaire).pipe(
        tap(data => {
          this.dialog.closeAll()
          this.globalService.toastShow("etat sanitaire modifié.", "Modification")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    } else {
    
      this.EtatsanitaireService.create(etatsanitaire).pipe(
        tap(data => {

          if(this.isEtatSanitaireCall){
            this.IDETAT_SANITAIRE = data.body.IDETAT_SANITAIRE
            this.Fr_Libelle = data.body.Fr_Libelle
            this.dialog.closeAll();
            this.globalService.toastShow("Votre état sanitaire  a été ajouté  avec succès", "Succès", "success");
          }else {
            this.dialog.closeAll()
            this.globalService.toastShow("Etat sanitaire Ajouté.", "Ajout")
          }

        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }

}


