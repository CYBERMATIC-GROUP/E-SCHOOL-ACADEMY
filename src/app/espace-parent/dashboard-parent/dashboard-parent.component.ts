import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environnements/environnement.prod';
import { Eleve, ListeEleveSimplifie } from 'src/app/models/eleve.model';
import { FraisScolaire } from 'src/app/models/fraispayer.model';
import { Observable, finalize, map, pipe, startWith, tap } from 'rxjs';
import { constantes } from 'src/environnements/constantes';
import { GlobalService } from 'src/app/services/global.service';
import { Actualite } from 'src/app/espace-eleve/models/actualite.model';
import { ActualiteService } from 'src/app/espace-eleve/services/actualite.service';
import { Abse, statAbsence } from 'src/app/eleve/models/absence.models';
import { AbsenceService } from 'src/app/eleve/services/absence.service';
import { DevoirEnseignant } from 'src/app/models/devoirs.model';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';
import { EleveService } from 'src/app/services/eleve.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Tuteur } from '../model/response.model';
import { PartageDesDonneesService } from '../Services/partage-des-donnees.service';
import { ImageCropComponent } from 'src/app/core/image-crop/image-crop.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { ReabonnementEleveComponent } from '../reabonnement-eleve/reabonnement-eleve.component';

@Component({
  selector: 'app-dashboard-parent',
  templateUrl: './dashboard-parent.component.html',
  styleUrls: ['./dashboard-parent.component.scss']
})
export class DashboardParentComponent {
  emploiDuTempsIsLoad!: boolean
  routes = environment.routes.Eleve.espaceEleve;
  fraisIsLoad!: boolean;
  absenceIsLoad!: boolean
  eleve!:Eleve
  IDeleve!: number;
  fraisScolaire$!: Observable<FraisScolaire[]>
  statAbsence$!: Observable<Abse>;
  actualites$!: Observable<Actualite[]>;
  devoirIsLoad!: boolean;
  lastNote!: number;
  isLoading!: boolean;
  dataSource: any;
  parent: any;
  Famille!: ListeEleveSimplifie[]
  ElevesAbonnes!: ListeEleveSimplifie[]
  dataSource1: any;
  image!: string
  isloadphoto!: boolean
  imageParDefaut = "assets/images/man-161282_640.png"
  photoEleve!: string
  constructor(
    private eleveService: EleveService,
    private globalService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    private actualiteService: ActualiteService,
    private absenceService: AbsenceService,
    private partageDesDonneesServices: PartageDesDonneesService
  ) {}

  ngOnInit(): void {
    const parentObj = localStorage.getItem(constantes.auth.parent)
    if (parentObj) {
      this.parent = JSON.parse(parentObj)
      this.ListEleveAddByParents(this.parent.Tuteur.IDCOMPTE_UTILISATEUER)
    }
    console.log(this.parent);
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() eleveSelected = new EventEmitter<any>();


  ListEleveAddByParents(parentID: number) {
    this.isLoading = true
    this.eleveService.getListEleveAddByParent(parentID).subscribe(data => {
      console.log(data);
      this.isLoading = false
      this.Famille =  data.Famille
      this.ElevesAbonnes = data.ElevesAbonnes      
      if (this.Famille.length > 0) {
        this.getImageUrlsForFamily(this.Famille);
      }
    })

  }

  convertToValideDates(Date: string) {
    const year = Date.split('-')[0];
    const month = Date.split('-')[1];
    const day = Date.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }


  setEleveSelected(elt: any) {
    localStorage.setItem('eleveSelected', JSON.stringify(elt));
    console.log(elt);
    
  }
  
  convertAmountToPercentage(total: number, rest_amount: number){
     const resPercentage = (rest_amount * 100) / total;
     return resPercentage;
  }

  getImageUrlsForFamily(eleves: ListeEleveSimplifie[]): void {
    this.isloadphoto = true
    eleves.forEach(eleve => {
      console.log(eleve.IDELEVE);
      this.eleveService.getPhotoEleveParent(eleve.IDELEVE).pipe(
        tap(data => {
          console.log(data);
          eleve.Photo = data.Photo; 
          if (eleve.Photo === '' ) {
            eleve.Photo = this.imageParDefaut
          }
          this.isloadphoto = false
        }),
        finalize(() => {
        })
      ).subscribe()
    });
  }


  getimagesByeleve(){
    this.eleveService.getPhotoEleveParent(11).subscribe(data => {
      console.log(data);
      
    })
  }
  

onBlockClick(element: any) {
  const elementEleveJSON = JSON.stringify(element);
  localStorage.setItem('clickedElement', elementEleveJSON);
  console.log(elementEleveJSON);
  if (elementEleveJSON) {
      this.router.navigateByUrl('espace-parent/eleve-parent/' + element.IDELEVE);

  }

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
      this.eleveService.delteEleveByParent(element.IDELEVE).pipe(
          tap((data) => {
            console.log(data);
            this.globalService.toastShow(
              'Cet eleve a été supprimé avec succès !',
              'Supression'
            );
          }),
          finalize(() => {
            this.isLoading = false
          })
        )
        .subscribe();
    }
  });
}

reabonnement(objet: ListeEleveSimplifie){
  console.log(objet);
  const dialog = this.dialog.open(ReabonnementEleveComponent)
  dialog.componentInstance.objetreceveByparent = objet
  dialog.componentInstance.MobilePayeur = this.parent.Tuteur.Mobile
  dialog.componentInstance.IDTuteur = this.parent.Tuteur.IDCOMPTE_UTILISATEUER
  dialog.id = 'ReabonnementEleveComponent'
  dialog.afterClosed().subscribe(result => {
    if(result){
      this.globalService.toastShow('Payement effectué', 'Succès');
    }
  })

}
}
