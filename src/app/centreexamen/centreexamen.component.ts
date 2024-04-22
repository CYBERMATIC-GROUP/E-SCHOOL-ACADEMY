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
import { CentreExament } from '../models/centreExamen.model';
import { CentreExamenService } from '../services/centre-examen.service';
import { CentreexamenFormComponent } from './centreexamen-form/centreexamen-form.component';
import { GlobalService } from '../services/global.service';
@Component({
  selector: 'app-centreexamen',
  templateUrl: './centreexamen.component.html',
  styleUrls: ['./centreexamen.component.scss']
})
export class CentreexamenComponent {

  dataSource!: any;
  displayedColumns = [

    'Fr_Code',
    'Fr_Nom',
    'NbEleves',
    'Actions',
  ];
  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private CentreExamenService:CentreExamenService,
    private globalService: GlobalService
  
  ) { }


  ngOnInit(): void {
    this.CentreExamen();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  CentreExamen() {
    this.isLoading = true
    this.CentreExamenService.get().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
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


  edit(centre: CentreExament) {
    const ref = this.dialog.open(CentreexamenFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDCENTRE_EXAMEN = centre.IDCENTRE_EXAMEN;
  }


  view(centre: CentreExament) {
    const refview = this.dialog.open(CentreexamenFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDCENTRE_EXAMEN = centre.IDCENTRE_EXAMEN;
  }

  create() {
    const refview = this.dialog.open(CentreexamenFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(centre: CentreExament) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer le centre examen ' + centre.Fr_Nom + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.CentreExamenService.delete(centre.IDCENTRE_EXAMEN).pipe(
          tap(data => {
            this.globalService.reloadComponent('/centreexamen')
            this.globalService.toastShow("Centre examen supprimé avec succès.", "Suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
  }



}
