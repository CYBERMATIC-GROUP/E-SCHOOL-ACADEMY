import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { GroupeMatiereService } from 'src/app/services/groupe-matiere.service';
import { MatDialog } from '@angular/material/dialog';
import { GroupeMatiere } from 'src/app/models/groupeMatiere.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-groupe-matiere-form',
  templateUrl: './groupe-matiere-form.component.html',
  styleUrls: ['./groupe-matiere-form.component.scss']
})
export class GroupeMatiereFormComponent {

  @Input() action !: "create" | "edit" | "view"
  isDataLoading!: boolean
  IDGROUPESMATIERES!: number
  Libelle!: string
  NumOrdre!: number
  isLoading!: boolean;

  isFormValid(): any {
    return this.Libelle && this.NumOrdre;
  }

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private groupeService:GroupeMatiereService,
    private globalService:GlobalService
  ) {}


  ngOnInit(): void {


    if (this.IDGROUPESMATIERES) {

      this.initForUpdate(this.IDGROUPESMATIERES)
   }
    console.log(this.IDGROUPESMATIERES);
    console.log(this.action)

  }


  initForUpdate(GROUPESMATIERESID: number) {
    this.isDataLoading = true;
    this.groupeService.getOne(GROUPESMATIERESID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.Libelle = data.Libelle
      this.NumOrdre = data.NumOrdre

      this.isDataLoading = false;

    });
  }


  onSubmitForm(form: NgForm) {

    const groupeMatiere: GroupeMatiere = form.value;

    groupeMatiere.IDGROUPESMATIERES = this.IDGROUPESMATIERES


    if (this.action === 'edit') {
      this.isLoading = true;
      this.groupeService.update(groupeMatiere).pipe(
        tap(data => {
          console.log(data);
          this.isLoading = false
          this.globalService.reloadComponent('/graoupeMatiere/1')
          this.globalService.toastShow("Groupe matière modifié.", "Ajout")
          this.dialog.closeAll()
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    } else {
      this.isLoading = true
      this.groupeService.create(groupeMatiere).pipe(
        tap(data => {
          console.log(data);
          this.isLoading = false
          this.globalService.reloadComponent('/graoupeMatiere/1')
          this.globalService.toastShow("Groupe matière ajouté.", "Ajout")
          this.dialog.closeAll()
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe()
    }
  }

}
