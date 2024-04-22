import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Fonction } from 'src/app/models/fonction.model';
import { MatDialog } from '@angular/material/dialog';
import { FonctionService } from 'src/app/services/fonction.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-fonction-form',
  templateUrl: './fonction-form.component.html',
  styleUrls: ['./fonction-form.component.scss']
})
export class FonctionFormComponent {

  @Input() action !: "create" | "edit" | "view"
  @Input() isOpenByOther!: boolean
  fonctionCreated!: Fonction
  IDFONCTIONS!: number
  Libelle!: string
  NumOrdre!: number
  isLoading!: boolean;
  openFonctioonByEnseignant:boolean = false
  
  isFormValid(): any {
    return this.Libelle && this.NumOrdre;
  }
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private fonctionService:FonctionService,
    private globalService: GlobalService
  ) {}


  ngOnInit(): void {

 
    if (this.IDFONCTIONS) {
      
      this.initForUpdate(this.IDFONCTIONS)
   }
    console.log(this.IDFONCTIONS);
    console.log(this.action)

  }


  initForUpdate(FONCTIONID: number) {
    this.fonctionService.getOne(FONCTIONID).subscribe((data) => {
      console.log(data);

      this.Libelle = data.Libelle
      this.NumOrdre = data.NumOrdre


    });
  }


  onSubmitForm(form: NgForm) {

    const fonction: Fonction = form.value;
    this.isLoading = true;
    fonction.IDFONCTIONS = this.IDFONCTIONS


    if (this.action === 'edit') {
      this.fonctionService.update(fonction).pipe(
        tap(data => {
          this.globalService.reloadComponent('/fonction')
          this.dialog.closeAll()
          this.globalService.toastShow("fonction modifié.", "Modification")
        }),
        finalize(() => {
          this.isLoading = false
        })
        ).subscribe()
    } else {
    
      this.fonctionService.create(fonction).pipe(
        tap(data => {
          this.isLoading = false
          this.fonctionCreated = data.body
          if(this.isOpenByOther){
            this.dialog.closeAll()
            this.globalService.toastShow("Une fonction a été ajouté avec succès.", "Ajout:")
          }
          else{
            this.globalService.reloadComponent('/fonction')
            this.dialog.closeAll()
            this.globalService.toastShow("Nouvelle fonction Ajouté.", "Ajout")
          }
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe()
    }
  }

}
