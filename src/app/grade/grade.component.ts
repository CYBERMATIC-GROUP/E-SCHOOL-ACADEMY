import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Grade } from '../models/grade.model';
import { GradeService } from '../services/grade.service';
import { AlertComponent } from '../core/alert/alert.component';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent {

  dataSource!: any;
  displayedColumns = [

    'CodeGrade',
     'Fr_Libelle',
    'Actions',
  ];
  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private gradeService:GradeService,
    private globalService: GlobalService
  
  ) { }

  ngOnInit(): void {
    this.grade();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  grade() {
    this.isLoading = true
    this.gradeService.get(false).subscribe((data)=>{
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




  edit(grade: Grade) {
    const ref = this.dialog.open(GradeFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDGRADE = grade.IDGRADE;
  }


  view(grade: Grade) {
    const refview = this.dialog.open(GradeFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDGRADE = grade.IDGRADE;
  }

  create() {
    const refview = this.dialog.open(GradeFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }
  


  delete(Grade: Grade) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer le grade ' + Grade.Fr_Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.gradeService.delete(Grade.IDGRADE).pipe(
          tap(data => {
            this.globalService.reloadComponent("/grade")
            this.globalService.toastShow("Grade supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
    console.log(Grade);
  }



}
