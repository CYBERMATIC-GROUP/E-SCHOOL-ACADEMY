import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Etablissements } from '../../models/etablissement-tous.model';
import { EtablissementTousService } from 'src/app/services/etablissement-tous.service';
import { EtablissementTousFormComponent } from './etablissement-tous-form/etablissement-tous-form.component';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-etablissement-tous',
  templateUrl: './etablissement-tous.component.html',
  styleUrls: ['./etablissement-tous.component.scss']
})
export class EtablissementTousComponent {

  dataSource!: any;
  displayedColumns = [
    'Fr_Nom',
    'Actions'
  ];
  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private etablissementsService:EtablissementTousService,
    private globalService: GlobalService
  
  ) { }


  ngOnInit(): void {
    this.etablissements();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  } 
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  etablissements() {
    this.isLoading = true
    this.etablissementsService.get().subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.dataSource = new MatTableDataSource(data);
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




  edit(etab: Etablissements) {
    const ref = this.dialog.open(EtablissementTousFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDETABLISSEMENTS = etab.IDETABLISSEMENTS;
  }


  view(etab: Etablissements) {
    const refview = this.dialog.open(EtablissementTousFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDETABLISSEMENTS = etab.IDETABLISSEMENTS;
  }

  create() {
    const refview = this.dialog.open(EtablissementTousFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(etab: Etablissements) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer l\'établissement ' + etab.Fr_Nom + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.etablissementsService.delete(etab.IDETABLISSEMENTS).pipe(
          tap(data => {
            this.globalService.reloadComponent("/etablissement-tous/liste")
            this.globalService.toastShow("Etablissement supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
  }




}
