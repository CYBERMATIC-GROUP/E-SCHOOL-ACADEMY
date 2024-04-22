import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { AlertComponent } from '../core/alert/alert.component';
import { ZoneFormComponent } from './zone-form/zone-form.component';
import { ZoneService } from '../services/zone.service';
import { Zone } from '../models/zone.model';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement.service';
import { Arrondissement } from 'src/app/models/arrondissement.model';
import { ArrondissementService } from 'src/app/services/arrondissement.service';
import { QuartierService } from 'src/app/services/quartier.service';
import { Quartier } from '../models/quartier.model';
import { finalize, tap } from 'rxjs';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent {


  dataSource!: any;
  displayedColumns = [
     'CodeZone',
     'NomZone',
     'IDDEPARTEMENT',
     'IDARRONDISSEMENT',
    'Actions',
  ];
  isLoading!: boolean
  IDDEPARTEMENT!: number;
  IDARRONDISSEMENT!: string;

  ArrondissementList!:Arrondissement[]
  DepartementList!:Departement[]
  DeppartementList!: Departement[];
  constructor(
    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private departementSevice:DepartementService,
    private quartierService:QuartierService,
    private zoneService:ZoneService,
    private departementService:DepartementService,
    private arrondissementService:ArrondissementService,
    private globalService: GlobalService
  ) { }


  ngOnInit(): void {
    this.zone();
    this.loadArrondissement()
    this.loadDepartement()
  }

  onSelectionChange(event : any){
    console.log(event.target.value)
    this.quartierService.Recuperations(this.IDDEPARTEMENT).subscribe((data)=>{
      console.log(data)
      this.ArrondissementList= data
    },
    (error) =>{
      console.log(error)
    }
    )
  }
  loadDepartement() {
    this.departementService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.DeppartementList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  loadArrondissement() {
    this.arrondissementService
      .get(0).subscribe(
        (data) => {
          console.log(data);
          this.ArrondissementList = data.body;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getDepartement(departementID: number): string {
    const departement = this.DeppartementList.find(
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

  
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  zone() {
    this.isLoading = true
    this.zoneService.get().subscribe((data)=>{
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

  edit(zone: Zone) {
    const ref = this.dialog.open(ZoneFormComponent, {
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDZone = zone.IDZone;
  }

  view(zone: Zone) {
    const refview = this.dialog.open(ZoneFormComponent, {
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDZone = zone.IDZone;
  }

  create() {
    const refview = this.dialog.open(ZoneFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }

  delete(zone: Zone) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la zone ' + zone.NomZone + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.zoneService.delete(zone.IDZone).pipe(
          tap(data => {
            this.globalService.reloadComponent("/zone/list")
            this.globalService.toastShow("Zone supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
  }

}
