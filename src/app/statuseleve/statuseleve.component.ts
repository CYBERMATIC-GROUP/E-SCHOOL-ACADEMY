import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { StatusEleve } from '../models/statuseleve.model';
import { StatuseleveService } from '../services/statuseleve.service';
import { StatuseleveFormComponent } from './statuseleve-form/statuseleve-form.component';
import { AlertComponent } from '../core/alert/alert.component';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-statuseleve',
  templateUrl: './statuseleve.component.html',
  styleUrls: ['./statuseleve.component.scss']
})
export class StatuseleveComponent {

  dataSource!: any;
  displayedColumns = [
    'Fr_Libelle',
    'Actions',
  ];
  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private StatuseleveService:StatuseleveService,
    private globalService: GlobalService
  
  ) { }


  ngOnInit(): void {
    this.statusEleve();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  statusEleve() {
    this.isLoading = true
    this.StatuseleveService.get().subscribe((data)=>{
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


  edit(statuseleve: StatusEleve) {
    const ref = this.dialog.open(StatuseleveFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDSTATUTELEVE = statuseleve.IDSTATUTELEVE;
  }


  view(StatusEleve: StatusEleve) {
    const refview = this.dialog.open(StatuseleveFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDSTATUTELEVE = StatusEleve.IDSTATUTELEVE;
  }

  create() {
    const refview = this.dialog.open(StatuseleveFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(statuseleve: StatusEleve) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer le status ' + statuseleve.Fr_Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.StatuseleveService.delete(statuseleve.IDSTATUTELEVE).pipe(
          tap(data => {
            this.globalService.reloadComponent("/statuseleve")
            this.globalService.toastShow("Status élève supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });

  }

}
