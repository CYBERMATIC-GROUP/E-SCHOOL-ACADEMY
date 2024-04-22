import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Ville } from '../models/ville.model';
import { VilleService } from '../services/ville.service';
import { AlertComponent } from '../core/alert/alert.component';
import { VilleFormComponent } from './ville-form/ville-form.component';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.scss']
})
export class VilleComponent {


  dataSource!: any;
  displayedColumns = [

    'Fr_Libelle',
    // 'NumOrdre',
    'Actions',
  ];
  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private villeService:VilleService
  
  ) { }


  ngOnInit(): void {
    this.Ville();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  Ville() {
    this.isLoading = true
    this.villeService.get().subscribe((data)=>{
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


  edit(ville: Ville) {
    const ref = this.dialog.open(VilleFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDVILLE = ville.IDVILLE;
  }


  view(ville: Ville) {
    const refview = this.dialog.open(VilleFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDVILLE = ville.IDVILLE;
  }

  create() {
    const refview = this.dialog.open(VilleFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(ville: Ville) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la ville ' + ville.Fr_Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.villeService.delete(ville.IDVILLE).subscribe((data) => {
          console.log(data);
          this.router
            .navigateByUrl('/site', { skipLocationChange: true })
            .then(() => {
             location.reload()
            });
        });
      }
    });
  }




}
