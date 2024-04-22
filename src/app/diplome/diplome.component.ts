import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { finalize, tap } from 'rxjs';
import { Diplome } from '../models/diplomes.models';
import { DiplomeService } from '../services/diplome.service';
import { AlertComponent } from '../core/alert/alert.component';
import { DiplomeFormComponent } from './diplome-form/diplome-form.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-diplome',
  templateUrl: './diplome.component.html',
  styleUrls: ['./diplome.component.scss']
})
export class DiplomeComponent {

  dataSource!: any;
  displayedColumns = [
    'Libelle',
    // 'NumOrdre',
    'Actions',
  ];
  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private DiplomeService:DiplomeService,
    private globalService: GlobalService

  ) { }


  ngOnInit(): void {
    this.diplome();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  diplome() {
    this.isLoading = true
    this.DiplomeService.get(true).subscribe((data)=>{
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


  edit(diplome: Diplome) {
    const ref = this.dialog.open(DiplomeFormComponent, {
      // maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDDIPLOME = diplome.IDDIPLOME;
  }


  view(diplome: Diplome) {
    const refview = this.dialog.open(DiplomeFormComponent, {
      // maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDDIPLOME = diplome.IDDIPLOME;
  }

  create() {
    const refview = this.dialog.open(DiplomeFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(diplome: Diplome) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer le diplome ' + diplome.Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.DiplomeService.delete(diplome.IDDIPLOME).pipe(
          tap(data => {
            console.log(data);
            this.globalService.reloadComponent("/diplome")  
            this.globalService.toastShow('Diplôme supprimé avec succès !', "Suppression");
          }),
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe();
      }
    });
    console.log(diplome);
  }



}
