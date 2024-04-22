import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from '../models/nationalite.model';
import { NationaliteService } from '../services/nationalite.service';
import { NationaliteFormComponent } from './nationalite-form/nationalite-form.component';
import { AlertComponent } from '../core/alert/alert.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-nationalite',
  templateUrl: './nationalite.component.html',
  styleUrls: ['./nationalite.component.scss']
})
export class NationaliteComponent {

  dataSource!: any;
  displayedColumns = [

    'Libelle',
    // 'NumOrdre',
    'Actions',
  ];
  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private NationaliteService:NationaliteService,
    private globalService : GlobalService
  
  ) { }


  ngOnInit(): void {
    this.initNationalite();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  initNationalite() {
    this.isLoading = true
    this.NationaliteService.get(true).subscribe((data)=>{
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


  edit(nationalite: Nationalite) {
    const ref = this.dialog.open(NationaliteFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDNATIONALITE = nationalite.IDNATIONALITE;
  }


  view(nationalite: Nationalite) {
    const refview = this.dialog.open(NationaliteFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDNATIONALITE = nationalite.IDNATIONALITE;
  }

  create() {
    const refview = this.dialog.open(NationaliteFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(nationalite: Nationalite) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la nationalité ' + nationalite.Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.NationaliteService.delete(nationalite.IDNATIONALITE).pipe(
          tap(data => {
            this.globalService.reloadComponent("/nationalite")
            this.globalService.toastShow("Nationalité. supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
    console.log(nationalite);
  }


}
