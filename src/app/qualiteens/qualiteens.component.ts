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
import { Qualiteens } from '../models/qualiteens.model';
import { QualiteensService } from '../services/qualiteens.service';
import { QualiteensFormComponent } from './qualiteens-form/qualiteens-form.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-qualiteens',
  templateUrl: './qualiteens.component.html',
  styleUrls: ['./qualiteens.component.scss']
})
export class QualiteensComponent {

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
    private qualiteService:QualiteensService,
    private globalService:  GlobalService
  
  ) { }


  ngOnInit(): void {
    this.qualiteens();
  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  qualiteens() {
    this.isLoading = true
    this.qualiteService.get().subscribe((data)=>{
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



  edit(qualiteens: Qualiteens) {
    const ref = this.dialog.open(QualiteensFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDQUALITEENS = qualiteens.IDQUALITEENS;
  }


  view(qualiteens: Qualiteens) {
    const refview = this.dialog.open(QualiteensFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDQUALITEENS = qualiteens.IDQUALITEENS;
  }

  create() {
    const refview = this.dialog.open(QualiteensFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(Qualiteens: Qualiteens) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la qualiteens ' + Qualiteens.Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.qualiteService.delete(Qualiteens.IDQUALITEENS).pipe(
          tap(data => {
            this.globalService.reloadComponent("/qualiteens")
            this.globalService.toastShow("Qualité supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
    console.log(Qualiteens);
  }


}
