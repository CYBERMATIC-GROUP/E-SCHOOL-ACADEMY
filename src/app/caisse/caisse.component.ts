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
import { Caisse } from '../models/caisse.model';
import { CaisseService } from '../services/caisse.service';
import { CaisseFormComponent } from './caisse-form/caisse-form.component';
import { FiltreComponent } from '../classe/filtre/filtre.component';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent {

  dataSource!: any;
  displayedColumns = [

    'CodeCaisse',
    'LibelleCaisse',
    'CompteAssocie',
    'Actions'
  ];

  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private caisseService:CaisseService,
    private globalService: GlobalService
  ) { }


  ngOnInit(): void {
    this.caisse();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  caisse() {
    this.isLoading = true
    this.caisseService.get(true).subscribe((data)=>{
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


  edit(caisse: Caisse) {
    const ref = this.dialog.open(CaisseFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDCAISSE = caisse.IDCAISSE;
  }


  view(caisse: Caisse) {
    const refview = this.dialog.open(CaisseFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDCAISSE = caisse.IDCAISSE;
  }

  create() {
    const refview = this.dialog.open(CaisseFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(caisse: Caisse) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la caisse ' + caisse.LibelleCaisse + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true
        this.caisseService.delete(caisse.IDCAISSE).pipe(
          tap(res => {
            this.globalService.toastShow("Caisse supprimée avec succès!", "Suppression")
            this.globalService.reloadComponent('/caisse')
          }),
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe()
      }
    });
    console.log(caisse);
  }


}
