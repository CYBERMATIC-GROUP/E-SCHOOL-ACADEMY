import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Profession } from 'src/app/models/profession.model';
import { ProfessionService } from 'src/app/services/profession.service';
import { ProfessionFormComponent } from './profession-form/profession-form.component';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.scss']
})
export class ProfessionComponent  {

  dataSource!: any;
  displayedColumns = [

    'Fr_Libelle',
    'Actions',
  ];
  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private professionService:ProfessionService,
    private globalService: GlobalService
  
  ) { }


  ngOnInit(): void {
    this.Profession();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  Profession() {
    this.isLoading = true
    this.professionService.get().subscribe((data)=>{
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




  edit(profession: Profession) {
    const ref = this.dialog.open(ProfessionFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDPROFESSION = profession.IDPROFESSION;
  }


  view(profession: Profession) {
    const refview = this.dialog.open(ProfessionFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDPROFESSION = profession.IDPROFESSION;
  }

  create() {
    const refview = this.dialog.open(ProfessionFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(profession: Profession) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la profession ' + profession.Fr_Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.professionService.delete(profession.IDPROFESSION).pipe(
          tap(data => {
            this.globalService.reloadComponent("/profession/liste")
            this.globalService.toastShow("Profession supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
  }


}
