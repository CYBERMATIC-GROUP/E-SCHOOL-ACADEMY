import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GradeService } from 'src/app/services/grade.service';
import { Grade } from '../../models/grade.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.scss']
})
export class GradeFormComponent {

  @Input() action !: "create" | "edit" | "view"

  IDGRADE!: number
  CodeGrade!: string
  Fr_Libelle!: string
  NumOrdre!: number
  isLoading!: boolean;
  
  isFormValid(): any {
    return this.CodeGrade && this.Fr_Libelle;
  }
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private gradeService:GradeService,
    private globalService:GlobalService
  ) {}


  ngOnInit(): void {

 
    if (this.IDGRADE) {
      
      this.initForUpdate(this.IDGRADE)
   }
    console.log(this.IDGRADE);
    console.log(this.action)

  }


  initForUpdate(GRADEID: number) {
    this.gradeService.getOne(GRADEID).subscribe((data) => {
      console.log(data);

      this.CodeGrade = data.CodeGrade
      this.NumOrdre = data.NumOrdre
      this.Fr_Libelle = data.Fr_Libelle


    });
  }


  onSubmitForm(form: NgForm) {

    const grade: Grade = form.value;

    grade.IDGRADE = this.IDGRADE


    if (this.action === 'edit') {
      this.gradeService.update(grade).pipe(
        tap(data => {
          this.dialog.closeAll()
          this.globalService.toastShow("Grade modifié.", "Modification")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    } else {
    
      this.gradeService.create(grade).pipe(
        tap(data => {
          this.dialog.closeAll()
          this.globalService.toastShow("Grade Ajouté.", "Ajout")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }

}
