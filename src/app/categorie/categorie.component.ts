import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Categorie } from '../models/categorie.model';
import { CategorieService } from '../services/categorie.service';
import { AlertComponent } from '../core/alert/alert.component';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent {

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
    private categorieService:CategorieService,
    private globalService: GlobalService
  ) { }


  ngOnInit(): void {
    this.categorie();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  categorie() {
    this.isLoading = true
    this.categorieService.get().subscribe((data)=>{
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


  edit(categorie: Categorie) {
    const ref = this.dialog.open(CategorieFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDCATEGORIE = categorie.IDCATEGORIE;
  }


  view(categorie: Categorie) {
    const refview = this.dialog.open(CategorieFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDCATEGORIE = categorie.IDCATEGORIE;
  }

  create() {
    const refview = this.dialog.open(CategorieFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(categorie: Categorie) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la categorie ' + categorie.Fr_Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.categorieService.delete(categorie.IDCATEGORIE).pipe(
          tap(data => {
            this.globalService.reloadComponent("/categorie")
            this.globalService.toastShow("Categorie supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
  }


}
