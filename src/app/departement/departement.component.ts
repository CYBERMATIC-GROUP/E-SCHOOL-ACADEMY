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
import { Departement } from '../models/departement.model';
import { DepartementService } from '../services/departement.service';
import { DepartementFormComponent } from './departement-form/departement-form.component';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent {

  dataSource!: any;
  displayedColumns = [
    'CodeDepartement',
    'NomDepartement',
    'Actions',
    
  ];

  isLoading!: boolean
isMobile: any;

  constructor(
    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private departementService:DepartementService,
    private globalService: GlobalService
  
  ) { }


  ngOnInit(): void {
    this.Departement();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  Departement() {
    this.isLoading = true
    this.departementService.get().subscribe((data)=>{
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


  edit(Departement: Departement) {
    const ref = this.dialog.open(DepartementFormComponent, {
      // maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDDEPARTEMENT = Departement.IDDEPARTEMENT;
  }


  view(Departement: Departement) {
    const refview = this.dialog.open(DepartementFormComponent, {
      // maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDDEPARTEMENT = Departement.IDDEPARTEMENT;
  }

  create() {
    const refview = this.dialog.open(DepartementFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(Departement: Departement) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer le departement de ' + Departement.NomDepartement + '?';
    ref.afterClosed().subscribe((result) => {
        this.departementService.delete(Departement.IDDEPARTEMENT).pipe(
          tap(data => {
            this.globalService.reloadComponent("/departement")
            this.globalService.toastShow("Departement supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    );
    console.log(Departement);
  }


}
