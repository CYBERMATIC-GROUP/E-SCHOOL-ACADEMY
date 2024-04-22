import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EtatsanitaireService } from '../services/etatsanitaire.service';
import { EtatsanitaireFormComponent } from './etatsanitaire-form/etatsanitaire-form.component';
import { AlertComponent } from '../core/alert/alert.component';
import { EtatSanitaire } from '../models/etatSanitaire.model';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-etatsanitaire',
  templateUrl: './etatsanitaire.component.html',
  styleUrls: ['./etatsanitaire.component.scss']
})
export class EtatsanitaireComponent {

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
    private etatSanitaireService:EtatsanitaireService,
    private globalService: GlobalService
  
  ) { }


  ngOnInit(): void {
    this.EtatSanitaire();

  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  EtatSanitaire() {
    this.isLoading = true
    this.etatSanitaireService.get().subscribe((data)=>{
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




  edit(sante: EtatSanitaire) {
    const ref = this.dialog.open(EtatsanitaireFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDETAT_SANITAIRE = sante.IDETAT_SANITAIRE;
  }


  view(sante: EtatSanitaire) {
    const refview = this.dialog.open(EtatsanitaireFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDETAT_SANITAIRE = sante.IDETAT_SANITAIRE;
  }

  create() {
    const refview = this.dialog.open(EtatsanitaireFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }


  delete(sante: EtatSanitaire) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer etat sanitaire ' + sante.Fr_Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.etatSanitaireService.delete(sante.IDETAT_SANITAIRE).pipe(
          tap(data => {
            this.globalService.reloadComponent("/etatsanitaire")
            this.globalService.toastShow("Etat sanitaire supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
  }



}
