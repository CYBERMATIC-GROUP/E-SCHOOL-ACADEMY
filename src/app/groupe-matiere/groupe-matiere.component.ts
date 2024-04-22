import { Component,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../core/alert/alert.component';
import { GroupeMatiere } from '../models/groupeMatiere.model';
import { GroupeMatiereService } from '../services/groupe-matiere.service';
import { GroupeMatiereFormComponent } from './groupe-matiere-form/groupe-matiere-form.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-groupe-matiere',
  templateUrl: './groupe-matiere.component.html',
  styleUrls: ['./groupe-matiere.component.scss']
})
export class GroupeMatiereComponent {

  dataSource!: any;
  displayedColumns = [

    'Libelle',
    'Actions',
  ];
  isLoading!: boolean
  fromapi!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private groupeService:GroupeMatiereService,
    private globalService: GlobalService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.Gmatiere();

  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  Gmatiere() {
    const romapi = this.route.snapshot.params['fromapi']
    this.isLoading = true

    this.fromapi = romapi && romapi > 0 ? true : false;

    this.groupeService.get(this.fromapi).pipe(catchError((error:HttpErrorResponse)=>{
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




  edit(gmatiere: GroupeMatiere) {
    const ref = this.dialog.open(GroupeMatiereFormComponent, {
      // maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDGROUPESMATIERES = gmatiere.IDGROUPESMATIERES;
  }


  view(gmatiere: GroupeMatiere) {
    const refview = this.dialog.open(GroupeMatiereFormComponent, {
      // maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDGROUPESMATIERES = gmatiere.IDGROUPESMATIERES;
  }

  create() {
    const refview = this.dialog.open(GroupeMatiereFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(gmatiere: GroupeMatiere) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer ce groupe ' + gmatiere.Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.groupeService.delete(gmatiere.IDGROUPESMATIERES).pipe(
          tap(data => {
            console.log(data);
            this.globalService.reloadComponent("/graoupeMatiere")  
            this.globalService.toastShow('Groupe matière supprimé avec succès !', "Suppression")
          }),
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe()
      }
    });
  }


}
