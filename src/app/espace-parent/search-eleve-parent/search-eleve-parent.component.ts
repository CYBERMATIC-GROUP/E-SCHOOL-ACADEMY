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
import { WaitingPayementComponent } from '../waiting-payement/waiting-payement.component';
@Component({
  selector: 'app-search-eleve-parent',
  templateUrl: './search-eleve-parent.component.html',
  styleUrls: ['./search-eleve-parent.component.scss'],
})
export class SearchEleveParentComponent {
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
  Nom!: string;
  Prenom!: string;
  modelSearcheleveSimplifie!: SearchEleveSimplifie;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private globalService: GlobalService,
    private eleveService: EleveService
  ) {}

  ngOnInit(): void {
    // this.EleveSimplifie();
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  SearchNom(event: any) {
    this.Nom = event.target.value;
    console.log(this.Nom);
  }

  SearchPrenom(event: any) {
    this.Prenom = event.target.value;
  }

  valider() {
    if (this.Nom && this.Prenom) {
      this.EleveSimplifie();
    } else {
      this.globalService.alert(
        'Veuillez saissir le nom et le prenom avant de valider',
        'Information',
        'info',
        'OK',
        ''
      );
    }
  }

  EleveSimplifie() {
    this.isLoading = true;
    const model: SearchEleveSimplifie = {
      Nom: this.Nom,
      Prenom: this.Prenom,
    };
    this.eleveService.RechercheSimplifiee(model).subscribe(
      (data: any) => {
        console.log(data);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  AddEleve(element: ListeEleveSimplifie) {
    console.log(element);
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'info';
    ref.componentInstance.content =
      "Voulez-vous Ajouter l'élève " + element.NomPrenom + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.eleveService
          .AddEleveByParent(element.IDELEVE)
          .pipe(
            tap((data) => {
              console.log(data);
              this.EleveSimplifie();
              this.globalService.toastShow(
                'Votre élève a été ajouté avec succès !',
                'Ajout'
              );
            }),
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe();
      }
    });
  }

  WaintingpayementByMOMO(element:ListeEleveSimplifie){
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'info';
    ref.componentInstance.content = "Vous allez proceder a un payement de 100 FRCFA pour ajouter l'eleve " + element.NomPrenom + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        const dialog = this.dialog.open(WaitingPayementComponent)
        dialog.componentInstance.IDEleve = element.IDELEVE
      } 
    });
 
  }
}
