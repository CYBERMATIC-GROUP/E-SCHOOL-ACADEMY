import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../core/alert/alert.component';
import { Annee } from '../models/annee.model';
import { AnneeService } from '../services/annee.service';
import { AnneeFormComponent } from './annee-form/annee-form.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-annee',
  templateUrl: './annee.component.html',
  styleUrls: ['./annee.component.scss']
})
export class AnneeComponent {

  dataSource!: any;
  displayedColumns = [

    'nAnnee1',
    'nAnnee2',
    'Annee1Annee2',
    'Actions'
  ];



  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private anneeService:AnneeService,
    private globalService: GlobalService
  
  ) { }


  ngOnInit(): void {
    this.annee();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  annee() {
    this.isLoading = true
    this.anneeService.getList().subscribe((data)=>{
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


  edit(annee: Annee) {
    const ref = this.dialog.open(AnneeFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDANNEE = annee.IDANNEE;
  }


  view(annee: Annee) {
    const refview = this.dialog.open(AnneeFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDANNEE = annee.IDANNEE;
  }

  create() {
    const refview = this.dialog.open(AnneeFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(annee: Annee) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer cettte annéée ' + annee.Annee1Annee2 + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.anneeService.delete(annee.IDANNEE).pipe(
          tap(data => {
            this.globalService.reloadComponent("/annee")
            this.globalService.toastShow("Année supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
    console.log(annee);
  }


}
