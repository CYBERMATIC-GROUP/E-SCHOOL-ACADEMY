import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Actualite } from 'src/app/espace-eleve/models/actualite.model';
import { ActualiteService } from 'src/app/espace-eleve/services/actualite.service';
import { NotificationsFormComponent } from './notifications-form/notifications-form.component';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  dataSource!: any;
  displayedColumns = [
    'DateHeure',
    'Titre',
    'Contenu',
    'Actions',
  ];
  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private notificationService:ActualiteService
  
  ) { }


  ngOnInit(): void {
    this.Notification();
  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  Notification() {
    this.isLoading = true
    this.notificationService.get().subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }




  edit(notification: Actualite) {
    const ref = this.dialog.open(NotificationsFormComponent, {
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.notification = notification;
  }


  view(notification: Actualite) {
    const refview = this.dialog.open(NotificationsFormComponent, {
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.notification = notification;
  }

  create() {
    const refview = this.dialog.open(NotificationsFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(notification: Actualite) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer cette notification ' + notification.Titre + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.notificationService.delete(notification.IDActualitesPortail).subscribe((data) => {
          console.log(data);
          this.router
            .navigateByUrl('/gmatiere', { skipLocationChange: true })
            .then(() => {
             location.reload()
            });
        });
      }
    });
  }


}
