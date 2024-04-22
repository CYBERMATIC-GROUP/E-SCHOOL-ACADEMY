import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Eleve } from '../models/eleve.model';
import { EleveService } from '../services/eleve.service';
import { AlertComponent } from '../core/alert/alert.component';
import { EleveFormComponent } from './eleve-form/eleve-form.component';
import { Nationalite } from '../models/nationalite.model';
import { NationaliteService } from '../services/nationalite.service';
import { Classe } from '../models/classe.model';
import { ClasseService } from '../services/classe.service';
import { NiveauService } from 'src/app/services/niveau.service';
import { BrancheService } from 'src/app/services/branche.service';
import { Branche } from 'src/app/models/branche.model';
import { Niveau } from 'src/app/models/niveau.model';
import { Site } from '../models/site.model';
import { SiteService } from '../services/site.service';
import { Cycle } from '../models/cycle.model';
import { CycleService } from '../services/cycle.service';

import { StatusEleve } from '../models/statuseleve.model';
import { StatuseleveService } from '../services/statuseleve.service';
import { EtatSanitaire } from '../models/etatSanitaire.model';
import { EtatsanitaireService } from '../services/etatsanitaire.service';
import { Langue } from '../models/langue.model';
import { LangueService } from '../services/langue.service';
import { CentreExament } from '../models/centreExamen.model';
import { CentreExamenService } from '../services/centre-examen.service';

import { Ecole } from '../models/ecole.model';
import { Ecoleervice } from '../services/ecole.service';
import { Agent } from '../models/agent.model';
import { GlobalService } from '../services/global.service';

import { RadiationEleveComponent } from './radiation-eleve/radiation-eleve.component';
@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.scss'],
})
export class EleveComponent implements OnInit, AfterViewInit {
  IDELEVE!: number;
  DateEntree!: string;
  DateSortie!: string;
  IDNIVEAU!: number;
  IDBRANCHE: number = 0;
  IDCLASSES!: number;
  CodeEleve!: string;
  Civilite!: number;
  DateNaissance!: string;
  Telephone!: string;
  Courriel!: string;
  Fr_Nom!: string;
  Fr_Prenom!: string;
  Fr_LieuNaissance!: string;
  Fr_Adresse1!: string;
  Fr_Adresse2!: string;
  Fr_Ville!: string;
  PassWord!: string;
  IDClasseAvenir!: number;
  TypeEleve!: number;
  Boursier!: boolean;
  TypeBourse!: number;
  IDNationalite!: number;
  ClassesDoublees!: string;
  EtatEleve!: string;
  IDCYCLES!: number;
  IDFRATRIE!: number;
  IDSTATUTELEVE!: number;
  IDSITE!: number;
  IDINSCRIPTIONS!: number;
  IDSORTIES!: number;
  EtablissementOrigine!: number;
  SituationSociale!: number;
  ProfessionPere!: string;
  ProfessionMere!: string;
  LangueVivante1!: string;
  LangueVivante2!: string;
  LangueVivante3!: string;
  NombreFreres!: number;
  NombreSoeurs!: number;
  Fr_Observations!: string;
  ExempteDuSport!: boolean;
  EtatSanitaire!: number;
  Commentaire_Fr!: string;
  NumOrdreClasse!: number;
  Login!: string;
  FraisInscriptionPayes!: boolean;
  NouveauDansAnneeCourante!: boolean;
  TelMobilePere!: string;
  EmailPere!: string;
  TelMobileMere!: string;
  EmailMere!: string;
  TelMobile!: string;
  TauxReductionFraisScolaires!: number;
  TauxReductionFraisOccasionnels!: number;
  MontantReductionFraisScolaires!: number;
  MontantReductionFraisOccasionnels!: number;
  ProduitsExoneres!: string;
  TauxMajorationFraisScolaires!: number;
  MontantMajorationFraisScolaires!: number;
  Fr_NomPrenomTuteur!: string;
  ProfessionTuteur!: number;
  EmailTuteur!: string;
  TelMobileTuteur!: string;
  bPleinTemps!: boolean;
  bMarie!: boolean;
  SMS_ParentParDefaut!: number;
  Travailleur!: boolean;
  NumCNI!: string;
  BEPC_Annee!: number;
  BEPC_Ecole_Fr!: string;
  moImpayesAnneePrec!: number;
  moImpayesAnneePrecRegularises!: number;
  IdentifiantNational!: string;
  IdentifiantBadge!: string;
  DroitImage!: boolean;
  PersonnesDeConfiance!: string;
  Fr_Departement!: string;
  Fr_Arrondissement!: string;
  CodeEtab!: string;
  AccepteInfosPersoPortail!: boolean;
  ConfirmeReinscriptionAnneeSuivante!: number;
  ConfirmeReinscriptionAnneeCourante!: number;
  DateAutortisationPortail!: string;
  IDCENTRE_EXAMEN!: number;
  DatesEcheancesProduits!: string;
  ClasseEcolePublique!: string;
  CommentaireCompta!: string;
  PeutSortirSeul!: boolean;
  ChampLibre_1!: string;
  ChampLibre_2!: string;
  ChampLibre_3!: string;
  ChampLibre_4!: string;
  ChampLibre_5!: string;
  ChampLibre_6!: string;
  Redoublant!: boolean;
  ParentsDivorces!: boolean;
  SiParentsDivorces_QuiChercheEnfant!: number;
  SiParentsDivorces_QuiChercheEnfant_Autre!: string;
  Nationalite!: string;
  NumeroSortie!: string;
  Cycle!: string;
  Site!: string;
  Statut!: string;
  GroupeSanguin!: string;
  CodeBranche!: string;
  CodeNiveau!: string;
  CodeClasse!: string;
  CodeOption!: string;
  CentreExamen!: string;
  EtablissementProvenance!: string;
  DepartementResidence!: string;
  DepartementNaissance!: string;
  contentTableStyle!: Object;
  dataSource!: any;
  displayedColumns = [
    'CodeEleve',
    'Fr_Nom',
    'Fr_Prenom',
    'Civilite',
    'DateNaissance',
    'Fr_LieuNaissance',
    'IDNationalite',
    'CodeClasse'
  ];
  isLoading!: boolean;

  classeList!: Classe[];
  nationaliteList!: Nationalite[];
  niveaueList!: Niveau[];
  brancheList!: Branche[];
  siteList!: Site[];
  cycleList!: Cycle[];
  statusEleveList!: StatusEleve[];
  etatSanitaireList!: EtatSanitaire[];
  langueList!: Langue[];
  centreExamenList!: CentreExament[];
  ecoleList!: Ecole[];

  suggestClasse!: Classe[];
  message!: string;
  filteredNiveaux!: Niveau[];
  filteredClasse!: Classe[];

  reinscription!: string;
  agent!: Agent;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public _location: Location,
    private eleveService: EleveService,
    private nationaliteService: NationaliteService,
    private classeService: ClasseService,
    private niveauService: NiveauService,
    private brancheService: BrancheService,
    private siteService: SiteService,
    private cycleService: CycleService,
    private statusEleeveService: StatuseleveService,
    private etatSanitaireService: EtatsanitaireService,
    private langueService: LangueService,
    private centreExamenService: CentreExamenService,
    private ecoleService: Ecoleervice,
    private route: ActivatedRoute,
    private globalService: GlobalService,
  ) {}

  ngOnInit(): void {
    this.agent = this.globalService.initConnectedAgent();
    this.reinscription = this.route.snapshot.params['reinscription'];

    if(!this.reinscription){
      this.displayedColumns.push('Actions');
    }

    this.eleve();
    this.nationalite();
    this.classe();
    this.niveau();
    this.branche();
    this.site();
    this.cycle();
    this.StatusEleve();
    this.EtatSanitaires();
    this.langue();
    this.centreExamen();
    this.ecole();
        //set dynamic heiht for content table
        const windowHeight = window.screen.height
        const contentTableHeight = (52*windowHeight) / 100;
    this.contentTableStyle = {
      height: `${contentTableHeight}px`,
      'overflow-y': 'scroll'
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }

  ecole() {
    this.ecoleService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.ecoleList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  centreExamen() {
    this.centreExamenService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.centreExamenList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  langue() {
    this.langueService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.langueList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  EtatSanitaires() {
    this.etatSanitaireService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.etatSanitaireList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  StatusEleve() {
    this.statusEleeveService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.statusEleveList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  cycle() {
    this.cycleService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.cycleList = data;
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

  niveau() {
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

  nationalite() {
    this.nationaliteService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.nationaliteList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  classe() {
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

  getNationaliteLibelle(nationaliteId: number): string {
    const nationalite = this.nationaliteList.find(
      (item) => item.IDNATIONALITE === nationaliteId
    );
    return nationalite ? nationalite.Libelle : '';
  }

  getclasseList(claaseID: string) {
    const classe = this.classeList.find((item) => item.IDCLASSES === claaseID);
    return classe ? classe.NomClasse : '';
  }

  convertToValideDate(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  eleve(IDELEVE:number = 0,referesh: boolean = false) {
    this.isLoading = true;
    this.eleveService
      .get(IDELEVE,referesh).subscribe((data) => {
          console.log(data);
          this.dataSource = new MatTableDataSource(data.body);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;

      });
  }

    // eleve(IDELEVE: number = 0, referesh: boolean = false) {
  //   this.isLoading = true;
  //   const requestTimeout = 20000; // 20 seconds in milliseconds
  //   const retryDelay = 5000; // 5 seconds in milliseconds

  //   this.eleveService.get(IDELEVE, referesh)
  //     .pipe(
  //       timeout(requestTimeout),
  //       catchError((error) => {
  //         console.error(error);
  //         return throwError(error);
  //       })
  //     )
  //     .subscribe(
  //       (data) => {
  //         console.log(data);
  //         this.dataSource = new MatTableDataSource(data.body);
  //         this.dataSource.sort = this.sort;
  //         this.dataSource.paginator = this.paginator;
  //         this.isLoading = false;
  //       },
  //       (error) => {
  //         console.error('Request failed:', error);
  //         // Retry the request after a delay
  //         setTimeout(() => {
  //           this.eleve(IDELEVE, referesh);
  //         }, retryDelay);
  //       }
  //     );
  // }

  loadListeEleve() {
    this.eleveService
      .Recuperation(
        this.IDNIVEAU,
        this.IDBRANCHE,
        this.IDCLASSES,
        this.IDCYCLES,
        this.IDNationalite,
        this.IDCENTRE_EXAMEN,
        this.IDSITE,
        this.IDSTATUTELEVE,
        this.EtatSanitaire,
        this.Civilite,
        this.EtatEleve,
        this.Fr_Nom,
        this.Fr_Prenom,
        this.Redoublant,
        this.NouveauDansAnneeCourante
      )
      .subscribe(
        (response) => {
          console.log(response);
          console.log(this.Fr_Nom, this.Fr_Prenom);
          this.dataSource = new MatTableDataSource(response.body);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // onSelectionNiveau(event: any) {
  //   console.log(event.target.value);
  //   const selectedNiveau = this.niveaueList.find(
  //     (niveau) => niveau.NomNiveau === event.target.value
  //   );
  //   if (selectedNiveau) {
  //     const idNiveau = +selectedNiveau.IDNIVEAU;
  //     console.log(idNiveau);
  //     this.IDNIVEAU = idNiveau;
  //     this.isLoading = true;
  //     this.loadListeEleve();
  //   }
  // }

    // onSelectionClasse(event: any) {
  //   console.log(event.option.value);
  //   const parametre = event.option.value;
  //   this.isLoading = true;
  //   this.IDCLASSES = parametre.IDCLASSES;
  //   this.loadListeEleve();
  // }


  onSelectionBranche(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.IDBRANCHE = parametre;
    this.loadListeEleve();
  }


  //rechercher le tableau par idniveau
  onSelectionNiveau(event: any) {
    let val = event.option.value;

    const selectniveau = this.niveaueList.find(
      (classe) => classe.NomNiveau === val
    );
    if (selectniveau) {
      const idniveau = parseInt(selectniveau.IDNIVEAU, 10);
      this.IDNIVEAU = idniveau;
      this.isLoading = true;
      this.loadListeEleve();
    }else{
      this.IDNIVEAU = 0;
      this.isLoading = true;
      this.loadListeEleve();
    }
  }

  onSelectionClasse(event: any) {
    console.log(event.option.value);
    const selectClasseName = event.option.value;
    const selectClasse = this.classeList.find(
      (classe) => classe.NomClasse === selectClasseName
    );
    if (selectClasse) {
      const idClasse = parseInt(selectClasse.IDCLASSES, 10);
      console.log(idClasse);
      this.IDCLASSES = idClasse;
      this.isLoading = true;
      this.loadListeEleve();
    }else{
      this.IDCLASSES = 0;
      this.isLoading = true;
      this.loadListeEleve();
    }
  }

  // Faire une recherche sur la liste des niveaux dans le champ
  onInputNiveau(event: any) {
    const value = event.target.value;

    if (!value) {
      this.filteredNiveaux = this.niveaueList;
    } else {
      this.filteredNiveaux = this.niveaueList.filter((niveau) => {
        return niveau.NomNiveau.toLowerCase().includes(value.toLowerCase());
      });
    }
  }

  //Faire apparaitre la liste des niveaux quand on clique pour la premiere fois
  listNiveau(event: any) {
    const value = event.target.value;

    if (!value) {
      this.filteredNiveaux = this.niveaueList;
    } else {
      this.filteredNiveaux = this.niveaueList.filter((niveau) => {
        return niveau.NomNiveau.toLowerCase().includes(value.toLowerCase());
      });
    }
  }


  //filtrer  la liste des classes
  onInputClasse(event: any) {
    const value = event.target.value;
    this.filteredClasse = this.classeList.filter((classe) => {
      return classe.NomClasse.toLowerCase().includes(value.toLowerCase());
    });
  }
  //Faire apparaitre la liste des classes quand on clique pour la premiere fois
  listeclasse(event: any) {
    const value = event.target.value;

    if (!value) {
      this.filteredClasse = this.classeList;
    } else {
      this.filteredClasse = this.classeList.filter((classe) => {
        return classe.NomClasse.toLowerCase().includes(value.toLowerCase());
      });
    }
  }


  onSelectionCycle(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.IDCYCLES = parametre;
    this.loadListeEleve();
  }

  onSelectionNationalite(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.IDNationalite = parametre;
    this.loadListeEleve();
  }

  onSelectionCentreExamen(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.IDCENTRE_EXAMEN = parametre;
    this.loadListeEleve();
  }

  onSelectionSite(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.IDSITE = parametre;
    this.loadListeEleve();
  }

  onSelectionStatus(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.IDSTATUTELEVE = parametre;
    this.loadListeEleve();
  }

  onSelectionEtatSanitaire(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.EtatSanitaire = parametre;
    this.loadListeEleve();
  }

  onSelectionredoublant(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.Redoublant = parametre;
    this.loadListeEleve();
  }

  onSelectionnouveauAncien(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.NouveauDansAnneeCourante = parametre;
    this.loadListeEleve();
  }

  onSelectionEtatcivilite(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.Civilite = parametre;
    this.loadListeEleve();
  }

  onSelectionEtatEleve(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.EtatEleve = parametre;
    this.loadListeEleve();
  }

  onSelectioncodeEtab(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;
    this.CodeEtab = parametre;
    this.loadListeEleve();
  }

  onAfficherClick() {
    this.isLoading = true
    this.onSelectionNom(this.Fr_Nom);
    // this.onSelectionprenom(this.Fr_Prenom);
    this.loadListeEleve();
  }

  onSelectionNom(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.Fr_Nom = parametre;
    this.loadListeEleve();
  }

  onSelectionprenom(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.Fr_Prenom = parametre;
    this.loadListeEleve();
  }


  imprimer() {
    this.isLoading = true;
    this.message =
      "Patientez un instant, l'impression de votre fichier Pdf est en cours";
    this.eleveService
      .imprimerListeEleve(
        this.IDNIVEAU,
        this.IDBRANCHE,
        this.IDCLASSES,
        this.IDCYCLES,
        this.IDNationalite,
        this.IDCENTRE_EXAMEN,
        this.IDSITE,
        this.IDSTATUTELEVE,
        this.EtatSanitaire,
        this.Civilite,
        this.EtatEleve,
        this.Fr_Nom,
        this.Fr_Prenom,
        this.Redoublant,
        this.NouveauDansAnneeCourante
      )
      .subscribe((data) => {
        console.log(data);
        console.log(
          this.IDNIVEAU,
          this.IDBRANCHE,
          this.IDCLASSES,
          this.IDCYCLES,
          this.IDNationalite,
          this.IDCENTRE_EXAMEN,
          this.IDSITE,
          this.IDSTATUTELEVE,
          this.EtatSanitaire,
          this.Civilite,
          this.EtatEleve,
          this.Fr_Nom,
          this.Fr_Prenom,
          this.Redoublant,
          this.NouveauDansAnneeCourante
        )
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


  //filtrer une colone par rapport au nom
  applyFilterNom(filterValue: any) {
    const value = filterValue.target.value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any) => {
      const columnName = 'Fr_Nom';
      const columnValue = data[columnName];
      return columnValue && columnValue.toLowerCase().includes(value);
    };

    this.dataSource.filter = value;
  }

  // applyFilterNom(filterValue: any) {
  //   const value = filterValue.target.value.trim().toLowerCase();
  //   const filterText = value.substring(0, 4);
  //   this.dataSource.filterPredicate = (data: any) => {
  //     const columnName = 'Fr_Nom';
  //     const columnValue = data[columnName];
  //     return columnValue && columnValue.toLowerCase().startsWith(filterText);
  //   };

  //   this.dataSource.filter = filterText;
  // }

  //filtrer une colone par rapport au prenom
  applyFilterpreNom(filterValue: any) {
    const value = filterValue.target.value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any) => {
      const columnName = 'Fr_Prenom';
      const columnValue = data[columnName];
      return columnValue && columnValue.toLowerCase().includes(value);
    };
    this.dataSource.filter = value;
  }

  //filtrer le tableau par rapport a la colone codeEleve
  applyFilter(filterValue: any, columnName: string) {
    const value = filterValue.target.value.trim().toLowerCase();
    if (!columnName || !this.displayedColumns.includes(columnName)) {
      return;
    }
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const columnValue = data[columnName];
      return columnValue && columnValue.toLowerCase().includes(filter);
    };
    this.dataSource.filter = value;
  }

  edit(IDELEVE: string) {
    console.log()
    this.router.navigateByUrl('eleve/inscription/edit/' + IDELEVE);
  }

  view(IDELEVE: string) {
    this.router.navigateByUrl('eleve/inscription/view/' + IDELEVE);
  }

  delete(eleve: Eleve) {
    this.router.navigate(['/radiation-eleve/' + eleve.IDELEVE])
  }

  reloadList(){
    this.eleve(0,true)
  }


}
