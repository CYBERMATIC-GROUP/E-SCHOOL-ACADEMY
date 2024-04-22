import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Niveau } from '../models/niveau.model';
import { NiveauService } from '../services/niveau.service';
import { NiveauFormComponent } from './niveau-form/niveau-form.component';
import { AlertComponent } from '../core/alert/alert.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.scss']
})
export class NiveauComponent {

  dataSource!: any;
  displayedColumns = [

    'CodeNiveau',
    'NomNiveau',
    'Actions',
  ];


  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private niveauService:NiveauService,
    private globalService: GlobalService

  ) { }


  ngOnInit(): void {
    this.niveau();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  niveau() {
    this.isLoading = true
    this.niveauService.get().subscribe((data)=>{
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


  edit(niveau: Niveau) {
    const ref = this.dialog.open(NiveauFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDNIVEAU = niveau.IDNIVEAU;
  }


  view(niveau: Niveau) {
    const refview = this.dialog.open(NiveauFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDNIVEAU = niveau.IDNIVEAU;
  }

  create() {
    const refview = this.dialog.open(NiveauFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(niveau: Niveau) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer le niveau ' + niveau.NomNiveau + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true
        this.niveauService.delete(niveau.IDNIVEAU).pipe(
          tap(res => {
            this.globalService.toastShow("Niveau supprimé avec succès.", "Suppression:")
            this.globalService.reloadComponent('/niveau')
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
    console.log(niveau);
  }


}
