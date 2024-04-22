import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Site } from '../models/site.model';
import { SiteService } from '../services/site.service';
import { SiteFormComponent } from './site-form/site-form.component';
import { AlertComponent } from '../core/alert/alert.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent {

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
    private siteService:SiteService,
    private globalService: GlobalService

  ) { }


  ngOnInit(): void {
    this.site();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  site() {
    this.isLoading = true
    this.siteService.get().subscribe((data)=>{
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


  edit(site: Site) {
    const ref = this.dialog.open(SiteFormComponent, {
      // maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDSITE = site.IDSITE;
  }


  view(site: Site) {
    const refview = this.dialog.open(SiteFormComponent, {
      // maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDSITE = site.IDSITE;
  }

  create() {
    const refview = this.dialog.open(SiteFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(site: Site) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer le site ' + site.Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.siteService.delete(site.IDSITE).subscribe((data) => {
          this.globalService.toastShow("Site supprimé avec succès !", "Suppression")
          this.globalService.reloadComponent('/site')
        });
      }
    });
    console.log(site);
  }



}
