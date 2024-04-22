import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Specialite } from '../models/specialite.model';
import { SpecialiteService } from '../services/specialite.service';
import { AlertComponent } from '../core/alert/alert.component';
import { SpecialiteFormComponent } from './specialite-form/specialite-form.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.scss']
})
export class SpecialiteComponent {

  dataSource!: any;
  displayedColumns = [

    'CodeSpecialite',
    'Fr_Libelle',
    'Actions'
  ];
  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private specialiteService:SpecialiteService,
    private globalService: GlobalService
  
  ) { }


  ngOnInit(): void {
    this.specialite();

  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  specialite() {
    this.isLoading = true
    this.specialiteService.get().subscribe((data)=>{
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




  edit(specialite: Specialite) {
    const ref = this.dialog.open(SpecialiteFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDSPECIALITE = specialite.IDSPECIALITE;
  }


  view(specialite: Specialite) {
    const refview = this.dialog.open(SpecialiteFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDSPECIALITE = specialite.IDSPECIALITE;
  }

  create() {
    const refview = this.dialog.open(SpecialiteFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(specialite: Specialite) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la specialité ' + specialite.Fr_Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.specialiteService.delete(specialite.IDSPECIALITE).pipe(
          tap(data => {
            this.globalService.reloadComponent("/specialite")
            this.globalService.toastShow("Specialité supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });

  }



}
