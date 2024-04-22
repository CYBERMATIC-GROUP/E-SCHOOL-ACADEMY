import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Matiere } from '../models/matiere.model';
import { MatiereService } from '../services/matiere.service';
import { AlertComponent } from '../core/alert/alert.component';
import { MatiereFormComponent } from './matiere-form/matiere-form.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.scss']
})
export class MatiereComponent {

  dataSource!: any;
  displayedColumns = [
    'Fr_CodeMatiere',
    'Fr_NomMatiere',
    'Actions',
  ];
  isLoading!: boolean
  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private matiereService:MatiereService,
    private globalService: GlobalService,
  
  ) { }


  ngOnInit(): void {
    this.matiere();

  }
  
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  matiere() {
    this.isLoading = true
    this.matiereService.get().subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort
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




  edit(matiere: Matiere) {
    const ref = this.dialog.open(MatiereFormComponent);
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDMATIERE = matiere.IDMATIERE;
     ref.id = 'MatiereFormComponent'
     ref.afterClosed().subscribe((result) => {
      if (result) {
        this.matiere()
      }
     })
  }


  view(matiere: Matiere) {
    const refview = this.dialog.open(MatiereFormComponent);
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDMATIERE = matiere.IDMATIERE;
  }

  create() {
    const refview = this.dialog.open(MatiereFormComponent);
     refview.componentInstance.action = 'create';
     refview.id = 'MatiereFormComponent'
     refview.afterClosed().subscribe((result) => {
      if (result) {
        this.matiere()
      }
     })
  }


  delete(matiere: Matiere) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la matière ' + matiere.Fr_NomMatiere + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.matiereService.delete(matiere.IDMATIERE).pipe(
          tap(data => {
            this.globalService.reloadComponent('/matiere')
            this.globalService.toastShow("Matière supprimé avec succès.", "Suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
    console.log(matiere);
  }



}
