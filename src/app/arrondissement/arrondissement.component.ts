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
import { Arrondissement } from '../models/arrondissement.model';
import { ArrondissementService } from '../services/arrondissement.service';
import { ArrondissementFormComponent } from './arrondissement-form/arrondissement-form.component';
import { Departement } from '../models/departement.model';
import { DepartementService } from '../services/departement.service';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-arrondissement',
  templateUrl: './arrondissement.component.html',
  styleUrls: ['./arrondissement.component.scss']
})
export class ArrondissementComponent {


  dataSource!: any;
  displayedColumns = [

    'NomArron',
    'NomDepartement',
    'Actions',
  ];

  DepartementList!: Departement[];
  departement: any;


  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private arrondissementService:ArrondissementService,
    private departementService:DepartementService,
    private globalService: GlobalService
  
  ) { }


  ngOnInit(): void {
    this.arrondissement();
    this.loadDepartement()
  }

  onSelectionChanges(event : any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true

    this.departement = parametre;
    this.arrondissementService.RecuperationDepartement(this.departement).subscribe((data)=>{
      console.log(data)

         this.dataSource = new MatTableDataSource(data.body);
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
         this.isLoading = false
    },
    (error) =>{
      console.log(error)
    }
    )

  }


  loadDepartement(){
    this.departementService.get().subscribe((data)=>{
      console.log(data)
      this.DepartementList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  arrondissement() {
    this.isLoading = true
    this.arrondissementService.get(0).subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.dataSource = new MatTableDataSource(data.body);
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


  edit(arrondissement: Arrondissement) {
    const ref = this.dialog.open(ArrondissementFormComponent, {
      // maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDARRONDISSEMENT = arrondissement.IDARRONDISSEMENT;
  }


  view(arrondissement: Arrondissement) {
    const refview = this.dialog.open(ArrondissementFormComponent, {
      // maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDARRONDISSEMENT = arrondissement.IDARRONDISSEMENT;
  }

  create() {
    const refview = this.dialog.open(ArrondissementFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(arrondissement: Arrondissement) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer l\'arrondissement ' + arrondissement.NomArron + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.arrondissementService.delete(arrondissement.IDARRONDISSEMENT).pipe(
          tap(data => {
            this.globalService.reloadComponent("/arrondissement")
            this.globalService.toastShow("Arrondissement supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
    console.log(arrondissement);
  }




}
