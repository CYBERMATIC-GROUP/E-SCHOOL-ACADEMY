import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Grade } from '../models/grade.model';
import { AlertComponent } from '../core/alert/alert.component';
import { LiasseFormComponent } from './liasse-form/liasse-form.component';
import { Liasse } from '../models/liasse.model';
import { LiasseService } from '../services/liasse.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-liasse',
  templateUrl: './liasse.component.html',
  styleUrls: ['./liasse.component.scss']
})
export class LiasseComponent {

  dataSource!: any;
  displayedColumns = [

    'CodeLiasse',
     'LibelleLiasse',
    'Actions',
  ];
  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private liasseService:LiasseService,
    private globalService: GlobalService

  ) { }

  ngOnInit(): void {
    this.liasse();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  liasse() {
    this.isLoading = true
    this.liasseService.get().subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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




  edit(liasse: Liasse) {
    const ref = this.dialog.open(LiasseFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDLIASSE = liasse.IDLIASSE;
  }


  view(liasse: Liasse) {
    const refview = this.dialog.open(LiasseFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDLIASSE = liasse.IDLIASSE;
  }

  create() {
    const refview = this.dialog.open(LiasseFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }



  delete(liasse: Liasse) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la liasse ' + liasse.LibelleLiasse + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true
        this.liasseService.delete(liasse.IDLIASSE).pipe(
          tap(res => {
            this.globalService.toastShow("Liasse supprimée avec succès !", "Suppression")
            this.globalService.reloadComponent('/liasse')
          }),
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe()
      }
    });
    console.log(Grade);
  }


}
