import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../core/alert/alert.component';
import { Classe } from '../models/classe.model';
import { ClasseFormComponent } from './classe-form/classe-form.component';
import { ClasseService } from '../services/classe.service';
import { FiltreComponent } from './filtre/filtre.component';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent {

  dataSource!: any;
  displayedColumns = [


    'CodeClasse',
    'NomClasse',
    'Actions'
  ];

  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private classeService:ClasseService

  ) { }


  ngOnInit(): void {
    this.loadClasse();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadClasse() {
    this.isLoading = true
    this.classeService.getClasse(0,0,0).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
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


  edit(IDCLASSES: string){
    this.router.navigateByUrl('/classe/ajout/edit/' + IDCLASSES);
  }

  view(IDCLASSES: string){
    this.router.navigateByUrl('/classe/ajout/view/' +  IDCLASSES);
  }

  onOpenClasseForm(action: 'view' | 'edit', classe: Classe){
    const ref = this.dialog.open(ClasseFormComponent);
    ref.componentInstance.classeParam = classe;
    ref.componentInstance.action = action
  }

  create() {
    const refview = this.dialog.open(FiltreComponent, {
      maxWidth: '650px',
    });
  }


  delete(classe: Classe) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la classe ' + classe.NomClasse + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.classeService.delete(classe.IDSALLES).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data);
          this.router
            .navigateByUrl('/classe', { skipLocationChange: true })
            .then(() => {
             location.reload()
            });
        });
      }
    });
    console.log(classe);
  }


}
