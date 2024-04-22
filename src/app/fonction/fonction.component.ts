import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Fonction } from '../models/fonction.model';
import { FonctionService } from '../services/fonction.service';
import { AlertComponent } from '../core/alert/alert.component';
import { FonctionFormComponent } from './fonction-form/fonction-form.component';

@Component({
  selector: 'app-fonction',
  templateUrl: './fonction.component.html',
  styleUrls: ['./fonction.component.scss']
})
export class FonctionComponent {

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
    private FonctionService:FonctionService
  
  ) { }


  ngOnInit(): void {
    this.Fonction();

  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  Fonction() {
    this.isLoading = true
    this.FonctionService.get().subscribe((data)=>{
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




  edit(fonction: Fonction) {
    const ref = this.dialog.open(FonctionFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDFONCTIONS = fonction.IDFONCTIONS;
  }


  view(fonction: Fonction) {
    const refview = this.dialog.open(FonctionFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDFONCTIONS = fonction.IDFONCTIONS;
  }

  create() {
    const refview = this.dialog.open(FonctionFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(fonction: Fonction) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la fonction ' + fonction.Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.FonctionService.delete(fonction.IDFONCTIONS).subscribe((data) => {
          console.log(data);
          this.router
            .navigateByUrl('/nationalite', { skipLocationChange: true })
            .then(() => {
             location.reload()
            });
        });
      }
    });
    console.log(fonction);
  }



}
