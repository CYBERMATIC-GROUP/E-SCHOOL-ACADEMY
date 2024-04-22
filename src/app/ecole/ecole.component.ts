import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { Ecole } from '../models/ecole.model';
import { Ecoleervice } from '../services/ecole.service';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement.service';
import { Arrondissement } from 'src/app/models/arrondissement.model';
import { ArrondissementService } from 'src/app/services/arrondissement.service';
import { QuartierService } from 'src/app/services/quartier.service';
import { Quartier } from '../models/quartier.model';
import { Zone } from '../models/zone.model';
import { ZoneService } from '../services/zone.service';
import { AlertComponent } from '../core/alert/alert.component';
import { GlobalService } from '../services/global.service';
import { finalize, tap } from 'rxjs';


@Component({
  selector: 'app-ecole',
  templateUrl: './ecole.component.html',
  styleUrls: ['./ecole.component.scss']
})
export class EcoleComponent {

  dataSource!: any;
  displayedColumns = [
    'CodeEtab',
    'Fr_NomEcole',
    'Fr_Adresse',
    // 'IDDEPARTEMENT',
    // 'IDARRONDISSEMENT',
    // 'IDQUARTIER',
    'Actions'
  ];
  isLoading!: boolean

  ArrondissementList!:Arrondissement[]
  DepartementList!:Departement[]
  QuartierList!:Quartier[]
  ZoneList!:Zone[]
  IDDEPARTEMENT!: number;
  IDARRONDISSEMENT!: number;
  arrondissement: any;
  departement!: number;

  constructor(
    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private ecoleService:Ecoleervice,
    private arrondissementService:ArrondissementService,
    private departementSevice:DepartementService,
    private quartierService:QuartierService,
    private zoneService:ZoneService,
    private globalService:GlobalService,

  
  ) { }


  ngOnInit(): void {
    this.ecole();
    this.loadArrondissement()
    this.loadDepartement()
    this.loaZone()
    this.loadQuartier()
  }

   @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ecole() {
    this.isLoading = true
    this.ecoleService.get().subscribe((data)=>{
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


  getArrondissementByDepartement(event : any){
    this.isLoading = true
    console.log(event.target.value)
    const parametre = event.target.value;
    this.departement = parametre;
    this.quartierService.RecuperationDepartement(this.departement).subscribe((data)=>{
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

  getQuartierByArrondissement(event : any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true
    this.arrondissement = parametre;
    this.quartierService.getByArr(this.arrondissement).subscribe((data)=>{
      console.log(data)
      this.QuartierList = data.body
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



  getDepartement(departementID: number): string {
    const departement = this.DepartementList.find(
      (item) => item.IDDEPARTEMENT === departementID
    );
    return departement ? departement.NomDepartement : '';
  }

  getArrondissement(arrondissementID: string): string {
    const arrondissement = this.ArrondissementList.find(
      (item) => item.IDARRONDISSEMENT === arrondissementID
    );
    return arrondissement ? arrondissement.NomArron : '';
  }


  getQuartier(quartierID: number): string {
    const quartier = this.QuartierList.find(
      (item) => item.IDQUARTIER === quartierID
    );
    return quartier ? quartier.NomQuartier : '';
  }

    
  quartierByArrondissement(event : any){
    console.log(event.target.value)
    this.quartierService.get(0,this.IDARRONDISSEMENT).subscribe((data)=>{
      console.log(data)
      this.QuartierList= data
    },
    (error) =>{
      console.log(error)
    }
    )
  }
  loadDepartement(){
    this.departementSevice.get(true).subscribe((data)=>{
      console.log(data)
      this.DepartementList = data
    })
    
  }

  loadArrondissement(){
    this.arrondissementService.get(0).subscribe((data)=>{
      console.log(data)
      this.ArrondissementList = data
    })
    
  }


  loaZone(){
    this.zoneService.get().subscribe((data)=>{
      console.log(data)
      this.ZoneList = data
    })
    
  }


  loadQuartier(){
    this.quartierService.get(0,0).subscribe((data)=>{
      console.log(data)
      this.QuartierList = data

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoading = false
    })
    
  }

 

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  
  edit(IDECOLES: number){
    this.router.navigateByUrl('ecole/edit/' + IDECOLES);
  }

  view(IDECOLES: number){
    this.router.navigateByUrl('ecole/view/' + IDECOLES);
  }

delete(ecole:Ecole){
  const dialog = this.dialog.open(AlertComponent,{})
  dialog.componentInstance.content = "Voulez-vous supprimer l'école : " + ecole.Fr_NomEcole + ' ?'
  dialog.afterClosed().subscribe((result)=>{
    this.ecoleService.delete(ecole.IDECOLES).pipe(
      tap(data => {
        this.globalService.reloadComponent("/ecole/list")
        this.globalService.toastShow("Ecole supprimé avec succès.", "suppression")
      }),
      finalize(() => {
        this.isLoading = false
      })
    ).subscribe()
  })
}


}
