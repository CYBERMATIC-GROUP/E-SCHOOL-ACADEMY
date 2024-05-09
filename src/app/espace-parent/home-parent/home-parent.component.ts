import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { environment } from 'src/environnements/environnement.prod';
import { Eleve, ListeEleveSimplifie } from 'src/app/models/eleve.model';
import { FraisScolaire } from 'src/app/models/fraispayer.model';
import { Observable, map, pipe, startWith, tap } from 'rxjs';
import { constantes } from 'src/environnements/constantes';
import { GlobalService } from 'src/app/services/global.service';
import { Actualite } from 'src/app/espace-eleve/models/actualite.model';
import { ActualiteService } from 'src/app/espace-eleve/services/actualite.service';
import { Abse, statAbsence } from 'src/app/eleve/models/absence.models';
import { AbsenceService } from 'src/app/eleve/services/absence.service';
import { DevoirEnseignant } from 'src/app/models/devoirs.model';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EleveService } from 'src/app/services/eleve.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Tuteur } from '../model/response.model';
import { PartageDesDonneesService } from '../Services/partage-des-donnees.service';
import { ImageCropComponent } from 'src/app/core/image-crop/image-crop.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/core/alert/alert.component';

@Component({
  selector: 'app-home-parent',
  templateUrl: './home-parent.component.html',
  styleUrls: ['./home-parent.component.scss'],
})
export class HomeParentComponent {
  emploiDuTempsIsLoad!: boolean;
  routes = environment.routes.Eleve.espaceEleve;
  fraisIsLoad!: boolean;
  absenceIsLoad!: boolean;
  eleve!: Eleve;
  IDeleve!: number;
  fraisScolaire$!: Observable<FraisScolaire[]>;
  statAbsence$!: Observable<Abse>;
  actualites$!: Observable<Actualite[]>;
  devoirIsLoad!: boolean;
  lastNote!: number;
  isLoading!: boolean;
  dataSource: any;
  parent: any;
  Famille!: ListeEleveSimplifie[];
  ElevesAbonnes!: ListeEleveSimplifie[];
  dataSource1: any;
  image: any;
  clickedElement: any;
  photoEleve!: string;
  isloadmobile!: boolean
  ELEVEID!: number;
  cookieService: any;
  constructor(
    private eleveService: EleveService,
    private globalService: GlobalService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private actualiteService: ActualiteService,
    private absenceService: AbsenceService,
  ) {}

  ngOnInit(): void {
    const IDELEVE = this.router.snapshot.params['IDELEVE'];
    this.ELEVEID = IDELEVE;
    this.getimagesByeleve(IDELEVE);

    const clickedElementJSON = localStorage.getItem('clickedElement');
    if (clickedElementJSON) {
      this.clickedElement = JSON.parse(clickedElementJSON);
      this.statAbsence$ = this.absenceService.getStatAbsenceForEleve(this.IDeleve).pipe(map((res) => res.ABSE));
    }

    this.actualites$ = this.actualiteService.get();
    this.actualites$.subscribe((data) => {
      console.log(data);
    });
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() eleveSelected = new EventEmitter<any>();

  getimagesByeleve(IDeleve: number) {
    this.isLoading = true;
    this.isloadmobile = true
    this.eleveService.getPhotoEleveParent(IDeleve).subscribe((data) => {
      console.log(data);
      this.image = data.Photo;
      if (this.image === '') {
        this.image = 'assets/images/man-161282_640.png';
      }
      this.isLoading = false;
      this.isloadmobile = false

    });
  }

  

  openCropImage() {
    const alert = this.dialog.open(AlertComponent);
    alert.componentInstance.backgroundColor = 'info';
    alert.componentInstance.content = 'Voulez-vous modifier cette image ?';
    alert.afterClosed().subscribe((result) => {
      if (result) {
        const ref = this.dialog.open(ImageCropComponent, {
          maxWidth: '650px',
        });
        ref.afterClosed().subscribe((result) => {
          if (ref.componentInstance.finalImage) {
            this.photoEleve = ref.componentInstance.finalImage;
            this.image = this.photoEleve;
            if (this.image != '') {
              this.isLoading = true;
              const objetPhoto = {
                Photo: this.image,
              };
              console.log(objetPhoto);
              this.eleveService
                .updatephotoEleveParent(this.ELEVEID, objetPhoto)
                .subscribe((data) => {
                  console.log(data);
                  this.isLoading = false;
                });
            } else {
              this.isLoading = false;
            }
          }
        });
      }
    });
  }

  convertToValideDates(Date: string) {
    const year = Date.split('-')[0];
    const month = Date.split('-')[1];
    const day = Date.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}
