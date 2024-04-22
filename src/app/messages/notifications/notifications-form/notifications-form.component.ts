import { Component,Input,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Actualite } from 'src/app/espace-eleve/models/actualite.model';
import { ActualiteService } from 'src/app/espace-eleve/services/actualite.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-notifications-form',
  templateUrl: './notifications-form.component.html',
  styleUrls: ['./notifications-form.component.scss']
})
export class NotificationsFormComponent {

  @Input() action !: "create" | "edit" | "view"

  IDActualitesPortail!: number
  DateHeure!: string
  Titre!: string
  Contenu!: string
  isLoading!: boolean;
  notification!: Actualite


  
  constructor(
    private router:Router,
    public dialog: MatDialog,
    public _location:Location,
    private notificationService:ActualiteService
  ) {}


  ngOnInit(): void {

 
    if (this.notification) {
      this.initForUpdate()
   }
    console.log(this.IDActualitesPortail);
    console.log(this.action)

  }


  initForUpdate() {
    this.Contenu = this.notification.Contenu
    this.DateHeure = this.notification.DateHeure
    this.Titre = this.notification.Titre
  }


  onSubmitForm(form: NgForm) {
    this.isLoading = true
    const Notification: Actualite = form.value;

    Notification.IDActualitesPortail = this.IDActualitesPortail


    if (this.action === 'edit') {
      this.notificationService.update(Notification).subscribe(
        (data) => {

          console.log(data);
          this.isLoading = false
          location.reload()
        },
        (Error) => console.log(Error)
      );
    } else {
    
      this.notificationService.create(Notification).subscribe(
        (data) => {

          console.log(data);
          this.isLoading = false
          location.reload()
        },
        (error) => console.log(error)
      );
    }
  }


}
