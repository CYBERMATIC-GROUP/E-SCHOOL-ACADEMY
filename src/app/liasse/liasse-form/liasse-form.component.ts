import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GradeService } from 'src/app/services/grade.service';
import { Liasse } from 'src/app/models/liasse.model';
import { LiasseService } from 'src/app/services/liasse.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-liasse-form',
  templateUrl: './liasse-form.component.html',
  styleUrls: ['./liasse-form.component.scss']
})
export class LiasseFormComponent {

  @Input() action !: "create" | "edit" | "view"

  IDLIASSE!:number
  CodeLiasse!:string
  LibelléLiasse_Ar!:string
  LibelleLiasse!:string
  isLoading!: boolean;

  isFormValid(): any {
    return this.CodeLiasse && this.LibelleLiasse;
  }

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private liasseSerivice:LiasseService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {


    if (this.IDLIASSE) {

      this.initForUpdate(this.IDLIASSE)
   }
    console.log(this.IDLIASSE);
    console.log(this.action)

  }


  initForUpdate(GRADEID: number) {
    this.isLoading = true
    this.liasseSerivice.getOne(GRADEID).subscribe((data) => {
      console.log(data);
      this.CodeLiasse = data.CodeLiasse
      this.LibelleLiasse = data.LibelleLiasse
      this.isLoading = false;
    });
  }


  onSubmitForm(form: NgForm) {

    const liasse: Liasse = form.value;
    liasse.IDLIASSE = this.IDLIASSE
    this.isLoading = true;

    if (this.action === 'edit') {
      this.liasseSerivice.update(liasse).pipe(
        tap(res => {
          this.globalService.reloadComponent('/liasse')
          this.globalService.toastShow('Liasse modifiée avec succès !', "Modification")
          this.dialog.closeAll()
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe()
    } else {

      this.liasseSerivice.create(liasse).pipe(
        tap(res => {
          this.globalService.reloadComponent('/liasse')
          this.globalService.toastShow('Liasse ajoutée avec succès !', "Ajout")
          this.dialog.closeAll()
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe()
    }
  }
}
