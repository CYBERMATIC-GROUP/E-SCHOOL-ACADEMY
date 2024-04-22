import { Component, OnInit } from '@angular/core';
import { Ecoleervice } from 'src/app/services/ecole.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement.service';
import { Ecole } from 'src/app/models/ecole.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Arrondissement } from 'src/app/models/arrondissement.model';
import { ArrondissementService } from 'src/app/services/arrondissement.service';
import { Quartier } from 'src/app/models/quartier.model';
import { QuartierService } from 'src/app/services/quartier.service';
import { MatDialog } from '@angular/material/dialog';
import { CentreExamenService } from 'src/app/services/centre-examen.service';
import { CentreExament } from 'src/app/models/centreExamen.model';
import { Ville } from 'src/app/models/ville.model';
import { VilleService } from 'src/app/services/ville.service';
import { Qualiteens } from 'src/app/models/qualiteens.model';
import { QualiteensService } from 'src/app/services/qualiteens.service';
import { Zone } from 'src/app/models/zone.model';
import { ZoneService } from 'src/app/services/zone.service';
import { EpayComponent } from 'src/app/core/epay/epay.component';
import { environment } from 'src/environnements/environnement.prod';
import { EnvoieMailComponent } from 'src/app/home/envoie-mail/envoie-mail.component';
import { Observable, catchError, finalize, map, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { epayService } from 'src/environnements/constantes';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-ecole-form',
  templateUrl: './ecole-form.component.html',
  styleUrls: ['./ecole-form.component.scss'],
})
export class EcoleFormComponent {

  IDECOLES!: number
  CodeEtab!: string
  Ar_NomEcole!: string
  Fr_NomEcole!: string
  Ar_Adresse!: string
  Fr_Adresse!: string
  CodeEcoleDEC!: string
  Telephone!: string
  NomPrenomResponsable!: string
  QualiteResponsable!: string
  TelephoneResponsable!: string
  Fr_Ville!: string
  Departement!: string
  Ar_Commune!: string
  Commune!: string
  Arrondissement!: string
  IdentifiantEtab!: string
  NbEleves!: number
  Cycle_Prescolaire!: boolean
  Cycle_Primaire!: boolean
  Cycle_College!: boolean
  Cycle_Lycee!: boolean
  Cycle_Superieur!: boolean
  Courriel!: string
  NumInscriptionDernier!: number
  IDINSPECTIONS!: number
  IDCENTRE_EXAMEN!: number
  PositionGPS!: string
  CodeDepartement!: string
  Nature!: number
  IDZone!: number
  IDDEPARTEMENT!: number
  IDARRONDISSEMENT!: number
  IDQUARTIER!: number
  NomArrondissement!: string
  NomDepartement!: string
  NomZone!: string
  NomQuartier!: string
  CodeCompte!: string

  DepartementList!: Departement[];
  ArrondissementList!: Arrondissement[];
  QuartierList!: Quartier[];

  centreExamenList!: CentreExament[];
  qualiteList!: Qualiteens[];
  villeList!: Ville[];
  zoneList!: Zone[];

  action!: 'edit' | 'view';

  Annee: string = '2022';
  idecole!: string;
  annee!: string;
  isLoading!: boolean;
  TElephoneResponsable: any;

  fraisCreationEcole$!: Observable<number>

  constructor(
    private ecoleService: Ecoleervice,
    private route: ActivatedRoute,
    private router: Router,
    public _location: Location,
    private departementService: DepartementService,
    private arrondissementService: ArrondissementService,
    private quartier: QuartierService,
    private dialog: MatDialog,
    private qualiteService: QualiteensService,
    private villeService: VilleService,
    private centreexamenService: CentreExamenService,
    private zoneService: ZoneService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    const ecoleID = this.route.snapshot.params['ecoleID'];
    this.action = this.route.snapshot.params['action'];
    console.log(ecoleID);

    if (ecoleID) {
      this.initForUpdate(ecoleID);
    }

    this.loadDepartement();
    this.loadQuartier();
    this.loadArrondissement();
    this.loadCentreExamen();
    this.loadVille();
    this.loadqualite();
    this.loadZone();

    this.fraisCreationEcole$ = this.ecoleService.getFraisCreationScolaire().pipe(
      map(res => res.Montant)
    )
  }

  loadZone() {
    this.zoneService.get().subscribe(
      (data) => {
        console.log(data);
        this.zoneList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadqualite() {
    this.qualiteService.get().subscribe(
      (data) => {
        console.log(data);
        this.qualiteList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadVille() {
    this.villeService.get().subscribe(
      (data) => {
        console.log(data);
        this.villeList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadCentreExamen() {
    this.centreexamenService.get().subscribe(
      (data) => {
        console.log(data);
        this.centreExamenList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadDepartement() {
    this.departementService.get().subscribe(
      (data) => {
        console.log(data);
        this.DepartementList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadArrondissement() {
    this.arrondissementService.get(0).subscribe(
      (data) => {
        console.log(data);
        this.ArrondissementList = data.body;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadQuartier() {
    this.quartier.get(0,0).subscribe(
      (data) => {
        console.log(data);
        this.QuartierList = data.body;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSelectionChange(event: any) {
    console.log(event.target.value);
    this.quartier.Recuperations(this.IDDEPARTEMENT).subscribe(
      (data) => {
        console.log(data);
        this.ArrondissementList = data.body;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  quartierByArrondissement(event: any) {
    console.log(event.target.value);
    this.quartier.get(1,6).subscribe(
      (data) => {
        console.log(data);
        this.QuartierList = data.body;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  // quartierByArrondissement(event: any) {
  //   console.log(event.target.value);
  //   const parametre = event.target.value
  //   console.log(parametre)
  //   this.quartier.RecuperationArrondissement(parametre).subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.QuartierList = data.body;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  initForUpdate(ecoleID: number) {
    this.ecoleService.getOne(ecoleID).subscribe((data) => {
      console.log(data);

      this.CodeEtab = data.CodeEtab;
      this.Ar_NomEcole = data.Ar_NomEcole;
      this.Fr_NomEcole = data.Fr_NomEcole;
      this.Ar_Adresse = data.Ar_Adresse;
      this.Fr_Adresse = data.Fr_Adresse;
      this.CodeEcoleDEC = data.CodeEcoleDEC;
      this.Telephone = data.Telephone;
      this.TelephoneResponsable = data.TelephoneResponsable;
      this.Fr_Ville = data.Fr_Ville;
      this.Departement = data.Departement;
      this.Ar_Commune = data.Ar_Commune;
      this.Commune = data.Commune;
      this.Arrondissement = data.Arrondissement;
      this.IdentifiantEtab = data.IdentifiantEtab;
      this.NbEleves = data.NbEleves;
      this.Cycle_Prescolaire = data.Cycle_Prescolaire;
      this.Cycle_Primaire = data.Cycle_Primaire;
      this.Cycle_College = data.Cycle_College;
      this.Cycle_Lycee = data.Cycle_Lycee;
      this.Cycle_Superieur = data.Cycle_Superieur;
      this.Courriel = data.Courriel;
      this.NumInscriptionDernier = data.NumInscriptionDernier;
      this.IDINSPECTIONS = data.IDINSPECTIONS;
      this.IDCENTRE_EXAMEN = data.IDCENTRE_EXAMEN;
      this.PositionGPS = data.PositionGPS;
      this.CodeDepartement = data.CodeDepartement;
      this.Nature = data.Nature;
      this.IDZone = data.IDZone;
      this.IDDEPARTEMENT = data.IDDEPARTEMENT;
      this.IDARRONDISSEMENT = data.IDARRONDISSEMENT;
      this.IDQUARTIER = data.IDQUARTIER;
      this.NomArrondissement = data.NomArrondissement;
      this.NomDepartement = data.NomDepartement;
      this.NomZone = data.NomZone;
      this.NomQuartier = data.NomQuartier;
      this.CodeCompte = data.CodeCompte;
    });
  }


  envoieMail(){
    const dialog = this.dialog.open(EnvoieMailComponent,{
      maxWidth:'700px'
    })
  }

  onSubmitForm(form: NgForm) {
    this.isLoading = true;
    console.log(form.value);
    const ecole: Ecole = form.value;

    console.log(ecole)

    ecole.IDECOLES = this.IDECOLES;

    if (this.action === 'edit') {
      this.isLoading = true;
      this.ecoleService.update(ecole).pipe(
        tap(data => {
          this.globalService.reloadComponent('/ecole/list')
          this.globalService.toastShow("Ecole modifié.", "Modification")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    } else {
      this.ecoleService.create(ecole).pipe(
        tap(data => {
          this.globalService.reloadComponent('/ecole/ajout')
          this.globalService.toastShow("Ecole ajouté.", "Ajout")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }
}
