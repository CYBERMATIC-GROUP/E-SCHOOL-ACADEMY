import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Salle } from '../models/salle.model';
import { SalleService } from '../services/salle.service';
import { SalleFormComponent } from './salle-form/salle-form.component';
import { AlertComponent } from '../core/alert/alert.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.scss']
})
export class SalleComponent {


  dataSource!: any;
  displayedColumns = [

    'CodeSalle',
    'NomSalle',
    // 'Capacité',
    'NbBancs',
    'NbRangees',
    'Superficie',
    'Actions',
  ];



  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private salleService:SalleService,
    private globalService: GlobalService

  ) { }


  ngOnInit(): void {
    this.salle();

  }



  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  salle() {
    this.isLoading = true
    this.salleService.get(true).pipe(catchError((error:HttpErrorResponse)=>{
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


  edit(salle: Salle) {
    const ref = this.dialog.open(SalleFormComponent)
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDSALLES = salle.IDSALLES;
  }


  view(salle: Salle) {
    const refview = this.dialog.open(SalleFormComponent)
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDSALLES = salle.IDSALLES;
  }

  create() {
    const refview = this.dialog.open(SalleFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(salle: Salle) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la salle ' + salle.NomSalle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.salleService.delete(salle.IDSALLES).pipe(
          tap(data => {
            console.log(data);
            this.globalService.reloadComponent("/salle")
            this.globalService.toastShow('Salle supprimé !', "Suppression");
          }),
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe();
      }
    });
    console.log(salle);
  }


}
