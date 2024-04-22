import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Langue } from '../models/langue.model';
import { LangueService } from '../services/langue.service';
import { AlertComponent } from '../core/alert/alert.component';
import { LangueFormComponent } from './langue-form/langue-form.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-langue',
  templateUrl: './langue.component.html',
  styleUrls: ['./langue.component.scss']
})
export class LangueComponent {



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
    private LangueService:LangueService,
    private globalService:GlobalService
  
  ) { }


  ngOnInit(): void {
    this.langue();

  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  langue() {
    this.isLoading = true
    this.LangueService.get().subscribe((data)=>{
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




  edit(langue: Langue) {
    const ref = this.dialog.open(LangueFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDLANGUE = langue.IDLANGUE;
  }


  view(langue: Langue) {
    const refview = this.dialog.open(LangueFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDLANGUE = langue.IDLANGUE;
  }

  create() {
    const refview = this.dialog.open(LangueFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(langue: Langue) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la langue ' + langue.Fr_Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.LangueService.delete(langue.IDLANGUE).pipe(
          tap(data => {
            this.globalService.reloadComponent('/langue')
            this.globalService.toastShow("Langue supprimé avec succès.", "Suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
  }
  


}
