import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Typesalle } from '../models/typesalle.model';
import { TypesalleService } from '../services/typesalle.service';
import { TypesalleFormComponent } from './typesalle-form/typesalle-form.component';
import { AlertComponent } from '../core/alert/alert.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-typesalle',
  templateUrl: './typesalle.component.html',
  styleUrls: ['./typesalle.component.scss']
})
export class TypesalleComponent {

  dataSource!: any;
  displayedColumns = [
    'Libelle',
    'Actions',
  ];
  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private typesalleService:TypesalleService,
    private globalService: GlobalService

  ) { }


  ngOnInit(): void {
    this.typesalle();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  typesalle() {
    this.isLoading = true
    this.typesalleService.get().subscribe((data)=>{
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


  edit(typesalle: Typesalle) {
    const ref = this.dialog.open(TypesalleFormComponent, {
      // maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDTYPESALLE = typesalle.IDTYPESALLE;
  }


  view(typesalle: Typesalle) {
    const refview = this.dialog.open(TypesalleFormComponent, {
      // maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDTYPESALLE = typesalle.IDTYPESALLE;
  }

  create() {
    const refview = this.dialog.open(TypesalleFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(typesalle: Typesalle) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer le type ' + typesalle.Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true
        this.typesalleService.delete(typesalle.IDTYPESALLE).pipe(
          tap(data => {
            console.log(data);
            this.globalService.reloadComponent("/typesalle")
            this.globalService.toastShow('Type salle supprimé !', "Suppression");
          }),
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe();
      }
    });
    console.log(typesalle);
  }



}
