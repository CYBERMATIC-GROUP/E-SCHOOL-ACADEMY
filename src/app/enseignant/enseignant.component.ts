import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EnseignantService } from '../services/enseignant.service';
import { AlertComponent } from '../core/alert/alert.component';
import { Enseigant } from '../models/enseigant.model';
import { Nationalite } from '../models/nationalite.model';
import { NationaliteService } from '../services/nationalite.service';
import { Qualiteens } from '../models/qualiteens.model';
import { QualiteensService } from '../services/qualiteens.service';
import { NiveauService } from 'src/app/services/niveau.service';
import { BrancheService } from 'src/app/services/branche.service';
import { Branche } from 'src/app/models/branche.model';
import { Niveau } from 'src/app/models/niveau.model';
import { Classe } from '../models/classe.model';
import { ClasseService } from '../services/classe.service';
import { Site } from '../models/site.model';
import { SiteService } from '../services/site.service';
import { Matiere } from '../models/matiere.model';
import { MatiereService } from '../services/matiere.service';
import { Specialite } from 'src/app/models/specialite.model';
import { SpecialiteService } from '../services/specialite.service';
import { Grade } from 'src/app/models/grade.model';
import { GradeService } from '../services/grade.service';
import { Echelon } from 'src/app/models/echelon.model';
import { EchelonService } from '../services/echelon.service';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from '../services/categorie.service';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import {JsonPipe} from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ParamComboAgentService } from '../agent/services/param-combo-agent.service';


@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss'],
})
export class EnseignantComponent implements OnInit {
  IDENSEIGNANT!: number;
  CodeEnseignant!: string;
  Civilite!: number;
  DateNaissance!: string;
  CodePostal!: string;
  Telephone!: string;
  Telecopie!: string;
  Courriel!: string;
  Fr_Nom!: string;
  Fr_Prenom!: string;
  Fr_LieuNaissance!: string;
  Fr_Adresse1!: string;
  Fr_Adresse2!: string;
  Fr_Ville!: string;
  Diplome!: number;
  Qualite!: number;
  DateEntreeEtab!: string;
  IDNationalite!: number;
  Signature!: string;
  Login!: string;
  ModeRemuneration!: number;
  RemunerationBase!: number;
  Retenue_CNSS!: number;
  Retenue_Assurance!: number;
  Retenue_CasSocial!: number;
  Retenue_Autre!: number;
  IndemniteMensuelle!: number;
  Retenue_EnfantsACharge!: number;
  RemunerationHeure_AutresCycles!: number;
  TelMobile!: string;
  NumCNI!: string;
  IdentifiantBadge!: string;
  MontantsPrimesDefaut!: string;
  MontantsRetenuesDefaut!: string;
  NumCompteBancaire!: string;
  NumSecuriteSociale!: string;
  SituationFamiliale!: number;
  NombreEnfants!: number;
  NombrePartsImpots!: number;
  EstImposable!: boolean;
  IDSITE!: number;
  Fr_Departement!: string;
  Fr_Arrondissement!: string;
  CodeEtab!: string;
  ModifPasswordNecessaire!: boolean;
  Nationalite!: string;
  Site!: string;
  Fonction!: string;
  CodeCaisse!: string;
  IDDEPARTEMENT_NAISS!: number;
  Departement_Naiss!: number;
  IDSpecialite!: number;
  Specialite!: number;
  IDEchelon!: number;
  Echelon!: number;
  IDCategorie!: number;
  Categorie!: number;
  IDQUARTIER!: number;
  IDGRADE!: number;
  GRADE!: number;
  Photo!: string;

  nationaliteeList!: Nationalite[];
  qualiteList!: Qualiteens[];
  niveaueList!: Niveau[];
  brancheList!: Branche[];
  classeList!: Classe[];
  siteList!: Site[];
  matiereList!: Matiere[];
  gradeList!: Grade[];
  echelonList!: Echelon[];
  specialiteList!: Specialite[];
  categorieList!: Categorie[];


  dataSource!: any;
  displayedColumns = [
    'CodeEnseignant',
    'Fr_Nom',
    'Fr_Prenom',
    'Civilite',
    'DateNaissance',
    'Fr_LieuNaissance',
    'IDNationalite',
    'Actions',
  ];
  isLoading!: boolean;
  classe: any;
  matiere: any;
  IDMATIERE: any;
  IDCLASSES: any;
  IDBRANCHE: any;
  IDNIVEAU: any;
  message!: string;

  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [20, 40, 60];

  hidePageSize = true;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  paramComboIsLoad!: boolean;
  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public _location: Location,
    private enseigantService: EnseignantService,
    private nationaliteService: NationaliteService,
    private qualiteService: QualiteensService,
    private niveauService: NiveauService,
    private brancheService: BrancheService,
    private classeService: ClasseService,
    private siteService:SiteService,
    private MatiereService:MatiereService,
    private SpecialiteService:SpecialiteService,
    private GradeService:GradeService,
    private EchelonService:EchelonService,
    private CategorieService:CategorieService,
    private paramComboService: ParamComboAgentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const refresEnseignant = this.route.snapshot.params['refresh'] ? true : false
    this.enseignant();
    //this.nationalite();
    //this.qualite();
    //this.Niveau();
    //this.branche();
    //this.Classe();
    //this.site()
    this.Matiere()
    //this.specialite()
    //this.grade()
    //this.echelon()
    //this.categorie()

    this.paramComboService.getParamAgent().pipe(
      tap(res => {
        this.nationaliteeList = res.NATIONALITE;
        this.qualiteList = res.QUALITEENS;
        this.niveaueList = res.NIVEAU;
        this.brancheList = res.BRANCHE;
        this.classeList = res.CLASSES;
        //this.matiereList = 
        this.specialiteList = res.SPECIALITE;
        this.gradeList = res.GRADE;
        this.echelonList = res.ECHELON;
        this.categorieList = res.CATEGORIE
      })
    ).subscribe()

  }


  enseignant() {
    this.isLoading = true;
    this.enseigantService
      .getList().subscribe(
        (data) => {
          console.log(data);
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  categorie() {
    this.CategorieService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.categorieList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  grade() {
    this.GradeService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.gradeList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  specialite() {
    this.SpecialiteService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.specialiteList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  echelon() {
    this.EchelonService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.echelonList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  Matiere() {
    this.MatiereService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.matiereList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  site() {
    this.siteService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.siteList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  Classe() {
    this.classeService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.classeList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  branche() {
    this.brancheService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.brancheList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  Niveau() {
    this.niveauService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.niveaueList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  qualite() {
    this.qualiteService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.qualiteList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  nationalite() {
    this.nationaliteService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.nationaliteeList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getNationaliteLibelle(nationaliteId: number): string {
    const nationalite = this.nationaliteeList.find(
      (item) => item.IDNATIONALITE === nationaliteId
    );
    return nationalite ? nationalite.Libelle : '';
  }

  loadListeEnseignant() {
    this.enseigantService
      .Recuperation(0, this.Civilite, this.IDNationalite, this.Qualite, 0, 0, 0)
      .subscribe(
        (response) => {
          console.log(response);
          this.dataSource = new MatTableDataSource(response.body);
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  convertToValideDate(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  

  onSelectionCivilite(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.Civilite = parametre;
    this.loadListeEnseignant();
  }

  onSelectionNationalite(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.IDNationalite = parametre;
    this.loadListeEnseignant();
  }

  onSelectionqualite(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.Qualite = parametre;
    this.loadListeEnseignant();
  }

  onSelectionNiveau(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.Niveau = parametre;
    this.loadListeEnseignant();
  }

  onSelectionBranche(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.branche = parametre;
    this.loadListeEnseignant();
  }

  onSelectionClasse(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.classe = parametre;
    this.loadListeEnseignant();
  }

  onSelectionmatiere(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.matiere = parametre;
    this.loadListeEnseignant();
  }


  imprimer() {
    this.isLoading = true;
    this.message =
      "Patientez un instant, l'impression de votre fichier Pdf est en cours";
    this.enseigantService
      .imprimerListeEnseignant(this.IDENSEIGNANT,this.Civilite,this.IDNationalite,this.Qualite,this.classe,this.matiere)
      .subscribe((data) => {
        console.log(data)
        var anchor = document.createElement('a');
        anchor.href = data.body.Etat;
        anchor.download = 'Liste Des eleves ';
        document.body.appendChild(anchor);
        //  anchor.click();
        let pdfWindow = window.open('', '_blank', 'Liste eleves');
        pdfWindow
          ? pdfWindow!.document.write(
              "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
                encodeURI(data.body.Etat) +
                "'></iframe></body>"
            )
          : null;
        this.isLoading = false;
        this.message = 'chargement de la liste';
      });
  }
  
  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  edit(IDENSEIGNANT: string) {
    this.router.navigateByUrl('enseignant/edit/' + IDENSEIGNANT);
  }

  view(IDENSEIGNANT: string) {
    this.router.navigateByUrl('enseignant/view/' + IDENSEIGNANT);
  }

  delete(enseigant: Enseigant) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content =
      "Voulez vous supprimer l'enseiagnant " + enseigant.Fr_Nom + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.enseigantService
          .delete(enseigant.IDENSEIGNANT)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              console.log(error.status);
              return [];
            })
          )
          .subscribe((data) => {
            console.log(data);
            this.router
              .navigateByUrl('/enseignant/list', { skipLocationChange: true })
              .then(() => {
                location.reload();
              });
          });
      }
    });
    console.log(enseigant);
  }
}
