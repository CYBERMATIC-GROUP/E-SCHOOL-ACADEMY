import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/models/site.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})
export class SiteFormComponent {


  @Input() action !: "create" | "edit" | "view"

  IDSITE!: number
  Libelle!: string
  NumOrdre!: number
  isLoading!: boolean;
  isSiteCall: boolean = false;
  siteCreated!: Site;
  isOpenByAuther: boolean = false;
  isLoadingpage!:boolean

  isFormValid(): any {
    return this.Libelle && this.NumOrdre;
  }

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private siteService:SiteService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {


    if (this.IDSITE) {

      this.initForUpdate(this.IDSITE)
   }
    console.log(this.IDSITE);
    console.log(this.action)

  }


  initForUpdate(siteID: number) {
    this.isLoadingpage = true;
    this.siteService.getOne(siteID).subscribe((data) => {
      console.log(data);

      this.Libelle = data.Libelle
      this.NumOrdre = data.NumOrdre

      this.isLoadingpage = false;

    });
  }

  onSubmitForm(form: NgForm) {
    this.isLoadingpage = true
    const site: Site = form.value;
    this.isLoading = true;
    site.IDSITE = this.IDSITE
    if (this.action === 'edit') {
      this.siteService.update(site).pipe(
        tap(res => {
          this.globalService.toastShow("Site modifié avec succès !", "Modification")
          this.globalService.reloadComponent('/site')
          this.dialog.closeAll()
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe()
    } else {

      this.siteService.create(site).pipe(
        tap(data => {
          this.isLoading = false
          this.siteCreated = data.body
          if(!this.isOpenByAuther && !this.isSiteCall){
            this.globalService.toastShow("Site a été ajouté avec succès.", "Ajout:")
            this.globalService.reloadComponent('/site')
          }
          this.dialog.closeAll()
        }),
        finalize(() => {
          this.isLoading= false
        })
      ).subscribe();
    }
  }

}
