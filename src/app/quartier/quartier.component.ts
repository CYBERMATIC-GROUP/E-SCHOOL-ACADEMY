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
import { Quartier } from '../models/quartier.model';
import { QuartierService } from '../services/quartier.service';
import { QuartierFormComponent } from './quartier-form/quartier-form.component';
import { Departement } from '../models/departement.model';
import { DepartementService } from '../services/departement.service';
import { Arrondissement } from '../models/arrondissement.model';
import { ArrondissementService } from '../services/arrondissement.service';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-quartier',
  templateUrl: './quartier.component.html',
  styleUrls: ['./quartier.component.scss']
})
export class QuartierComponent {

  dataSource!: any;
  displayedColumns = [

    'NomQuartier',
    'NomArron',
    'NomDepartement',
    'Actions',
  ];

  ArrondissementList!: Arrondissement[];
  DepartementList!: Departement[];
  departement: any;
  arrondissement: any;

  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private quartierService:QuartierService,
    private arrondissementService:ArrondissementService,
    private departementService: DepartementService,
    private globalService: GlobalService

  ) { }


  ngOnInit(): void {
    this.loadArrondissement()
    this.loadDepartement()
    this.quartier();
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

  loadArrondissement(){
    this.arrondissementService.get(0).subscribe((data)=>{
      console.log(data)
      this.ArrondissementList = data.dody;
      console.log(this.ArrondissementList)
    },
    (error) =>{
      console.log(error)
    }
    )
  }




  onSelectionChange(event : any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true
    this.departement = parametre;
    this.quartierService.get(this.departement,0).subscribe((data)=>{
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

    this.quartierService.Recuperations(parametre).subscribe((data)=>{
      console.log(data)
      this.ArrondissementList =data.body
    },
        (error)=>{
          console.log(error)
        }
    )


  }

  onSelectionChanges(event : any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true
    this.arrondissement = parametre;
    this.quartierService.getByArr(this.arrondissement).subscribe((data)=>{
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


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  quartier() {
    this.isLoading = true
    this.quartierService.get(0,0).subscribe((data)=>{
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



  edit(quartier: Quartier) {
    const ref = this.dialog.open(QuartierFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDQUARTIER = quartier.IDQUARTIER;
  }


  view(quartier: Quartier) {
    const refview = this.dialog.open(QuartierFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDQUARTIER = quartier.IDQUARTIER;
  }

  create() {
    const refview = this.dialog.open(QuartierFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(quartier: Quartier) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer le quatier ' + quartier.NomQuartier + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true
        this.quartierService.delete(quartier.IDQUARTIER).pipe(
          tap(res => {
            this.globalService.reloadComponent('/quartier');
            this.globalService.toastShow("Quartier supprimé avec succès !", "Suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
  }

}
