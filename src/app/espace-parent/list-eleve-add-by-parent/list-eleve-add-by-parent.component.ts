import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DiplomeFormComponent } from 'src/app/diplome/diplome-form/diplome-form.component';
import { GlobalService } from 'src/app/services/global.service';
import { EleveService } from 'src/app/services/eleve.service';
import {
  ListeEleveSimplifie,
  SearchEleveSimplifie,
} from 'src/app/models/eleve.model';
import { Diplome } from 'src/app/models/diplomes.models';
import { header } from 'src/app/models/header.model';
import { HttpResponse } from '@angular/common/http';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { finalize, tap } from 'rxjs';
import { constantes } from 'src/environnements/constantes';

@Component({
  selector: 'app-list-eleve-add-by-parent',
  templateUrl: './list-eleve-add-by-parent.component.html',
  styleUrls: ['./list-eleve-add-by-parent.component.scss'],
})
export class ListEleveAddByParentComponent {
  dataSource!: any;
  displayedColumns = [
    'Metricule',
    'NomPrenom',
    'LieuNaissance',
    'Classe',
    'Actions',
  ];
  isLoading!: boolean;
  header!: header;
  Nom: string = 'ABALI';
  Prenom: string = '';
  parent!: any;
  ElevesAbonnes!: ListeEleveSimplifie[]

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private globalService: GlobalService,
    private eleveService: EleveService
  ) {}

  ngOnInit(): void {
    const parentObj = localStorage.getItem(constantes.auth.parent);
    if (parentObj) {
      this.parent = JSON.parse(parentObj);
      this.ListEleveAddByParents(this.parent.Tuteur.IDCOMPTE_UTILISATEUER);
    }
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ListEleveAddByParents(parentID: number) {
    this.isLoading = true
    this.eleveService.getListEleveAddByParent(parentID).subscribe(data => {
      console.log(data);
      this.isLoading = false
      this.ElevesAbonnes = data.ElevesAbonnes      
      this.dataSource = new MatTableDataSource(this.ElevesAbonnes);
    })

  }

 

  deleteEleve(element: ListeEleveSimplifie) {
    console.log(element);
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content =
      'Voulez vous supprimer cet eleve ' + element.NomPrenom + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true
        this.eleveService
          .delteEleveByParent(element.IDELEVE)
          .pipe(
            tap((data) => {
              console.log(data);
              this.globalService.toastShow(
                'Cet eleve a été supprimé avec succès !',
                'Supression'
              );
            }),
            finalize(() => {
              this.isLoading = true
            })
          )
          .subscribe();
      }
    });
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
