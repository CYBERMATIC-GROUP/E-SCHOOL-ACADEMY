import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Echelon } from '../models/echelon.model';
import { EchelonService } from '../services/echelon.service';
import { AlertComponent } from '../core/alert/alert.component';
import { EchelonFormComponent } from './echelon-form/echelon-form.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-echelon',
  templateUrl: './echelon.component.html',
  styleUrls: ['./echelon.component.scss']
})
export class EchelonComponent {

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
    private echelonService:EchelonService,
    private globalService: GlobalService
  
  ) { }


  ngOnInit(): void {
    
    this.Echelon();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  Echelon() {
    this.isLoading = true
    this.echelonService.get().subscribe((data)=>{
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


  edit(echelon: Echelon) {
    const ref = this.dialog.open(EchelonFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDECHELON = echelon.IDECHELON;
  }


  view(echelon: Echelon) {
    const refview = this.dialog.open(EchelonFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDECHELON = echelon.IDECHELON;
  }

  create() {
    const refview = this.dialog.open(EchelonFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(echelon: Echelon) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer l\'echelon ' + echelon.Fr_Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.echelonService.delete(echelon.IDECHELON).pipe(
          tap(data => {
            this.globalService.reloadComponent("/echelon")
            this.globalService.toastShow("Echelon supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
  }



}
