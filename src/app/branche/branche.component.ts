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
import { Branche } from '../models/branche.model';
import { BrancheService } from '../services/branche.service';
import { BrancheFormComponent } from './branche-form/branche-form.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-branche',
  templateUrl: './branche.component.html',
  styleUrls: ['./branche.component.scss']
})
export class BrancheComponent {

  dataSource!: any;
  displayedColumns = [

    'CodeBranche',
    'NomBranche',
    'Actions'
  ];

  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private brancheService:BrancheService,
    private globalService: GlobalService
  
  ) { }


  ngOnInit(): void {
    this.Branche();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  Branche() {
    this.isLoading = true
    this.brancheService.get().subscribe((data)=>{
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


  edit(branche: Branche) {
    const ref = this.dialog.open(BrancheFormComponent);
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDBRANCHE = branche.IDBRANCHE;
  }


  view(branche: Branche) {
    const refview = this.dialog.open(BrancheFormComponent);
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDBRANCHE = branche.IDBRANCHE;
  }

  create() {
    const refview = this.dialog.open(BrancheFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(Branche: Branche) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la branche ' + Branche.NomBranche + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.brancheService.delete(Branche.IDBRANCHE).pipe(
          tap(res => {
            this.globalService.toastShow("Branche supprimé avec succès.", "Suppression")
            this.globalService.reloadComponent('/branche')
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
    console.log(Branche);
  }

}
