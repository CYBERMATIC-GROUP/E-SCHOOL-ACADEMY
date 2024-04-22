import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, Observable, finalize, map, of, tap } from 'rxjs';
import { Classe } from 'src/app/models/classe.model';
import {
  AvisPaiement,
  EtatPaiementByClass,
  EtatPaiementTotaux,
  ParamFilterState,
  TabIdclasses,
} from 'src/app/models/etat-paiement.model';
import { echeanceMensuel } from 'src/app/models/fraispayer.model';
import { Site } from 'src/app/models/site.model';
import { ClasseService } from 'src/app/services/classe.service';
import { EtatPaiementService } from 'src/app/services/etat-paiement.service';
import { GlobalService } from 'src/app/services/global.service';
import { SiteService } from 'src/app/services/site.service';
import { constantes } from 'src/environnements/constantes';

@Component({
  selector: 'app-etat-paiement',
  templateUrl: './etat-paiement.component.html',
  styleUrls: ['./etat-paiement.component.scss'],
})
export class EtatPaiementComponent implements OnInit, AfterViewInit {
  displayedColumns = ['CodeClasse', 'NomClasse'];
  displayedColumnsEcheance = ['Code', 'Mois'];
  displayedColumnsFilter = [
    'CodeEleve',
    'Fr_Nom',
    'Fr_CodeClasse',
    'MontantTotal',
    'Deja_Paye',
    'Reste_A_Payer',
    "MontantImpaye"
  ];
  displayedResum = [
    "sClasse",
    "Montant",
    "Deja_Paye",
    "Reste_A_Payer",
    "MontantImpaye"
  ]
  displayedAllResum = [
    "#",
    "Montant",
    "Deja_Paye",
    "Reste_A_Payer",
    "MontantImpaye"
  ]
  resumData!: any;
  allResumData!: any;
  isLoadingClasse!: boolean;
  dataSource!: any;
  dataSourceEcheance!: any;
  sites$!: Observable<Site[]>;
  tabIDCLASSES: TabIdclasses[] = [];
  tabEcheancesSelected: {CodeProduit: string}[] = [];
  resultFilter!: any;
  isLoadingResultFilter!: boolean;
  isEcheanceLoading!: boolean;
  monthChecked!: string;
  filterOptionForm!: FormGroup;
  totalAmount!: any;
  totalMontantInitial: number = 0;
  totalMontantPaye: number = 0;
  totalMontantDu: number = 0;
  isLoading!: boolean;
  message!: string;

  IDELEVE!: number;
  IDNIVEAU!: string;
  IDBRANCHE!: string;
  CodeProduit!: string;
  bEleveEnRetardPaiement!: number;
  bEleveEnRegelePaiement!: number;
  bEleveInscrits!: number;
  bEleveRadie!: number;
  DateConsideree!: number;
  tabCLASSES!: any;
  isloadingimprimepaiement!:boolean
  isLoad!: boolean;
  filterParam!: ParamFilterState
  filterParamAvispaiement!: AvisPaiement


  constructor(
    private formBuilder: FormBuilder,
    private classeService: ClasseService,
    private siteService: SiteService,
    private etatPaiementService: EtatPaiementService,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.loadClasse();
    this.loadEcheance();
    this.sites$ = this.siteService.get();
    this.initFilterForm();
  }

  ngAfterViewInit(): void {
    //this.resultFilter.paginator = this.paginatorFiltre
  }

  initFilterForm() {
    const loadDataOnSelectObj = localStorage.getItem(
      constantes.etatPaiementCache.loadDataOnSelection
    );

    let loadDataOnSelect: boolean = false;
    if (loadDataOnSelectObj) {
      loadDataOnSelect = loadDataOnSelectObj == '0' ? false : true;
    }

    this.filterOptionForm = this.formBuilder.group({
      stateStudent: ['2'],
      showStudent: ['1'],
      studentExoneration: [false],
      SitesEts: ['0'],
      inscrit: [true],
      radier: [false],
      retard: [false],
      regle: [false],
      loadDataOnSelect: [loadDataOnSelect],
    });

    //events
    this.filterOptionForm
      .get('loadDataOnSelect')
      ?.valueChanges.subscribe((value) => {
        if (value)
          localStorage.setItem(
            constantes.etatPaiementCache.loadDataOnSelection,
            '1'
          );
        else
          localStorage.setItem(
            constantes.etatPaiementCache.loadDataOnSelection,
            '0'
          );
      });

    this.filterOptionForm.valueChanges.subscribe((values) => {
      if (values.loadDataOnSelect) {
        this.onFilter();
      }
    });
  }

  loadClasse() {
    this.isLoadingClasse = true;
    this.classeService.getClasse(0, 0, 0).subscribe((res) => {
      this.isLoadingClasse = false;
      this.dataSource = new MatTableDataSource(res);
      console.log(res);
    });
  }

  loadEcheance() {
    this.isEcheanceLoading = true;
    this.etatPaiementService
      .getLisEcheancesFraisScolaire()
      .subscribe((data) => {
        console.log(data);
        this.dataSourceEcheance = new MatTableDataSource(data);
        this.isEcheanceLoading = false;
      });
  }

  onChangeClasse(classe: Classe, event: any) {

    this.IDNIVEAU = classe.IDNIVEAU
    this.IDBRANCHE = classe.IDBRANCHE
    const state = event.target.checked;

    if (state) {
      this.tabIDCLASSES.push({ IDCLASSES: Number(classe.IDCLASSES) });
    } else {
      const foundElt = this.tabIDCLASSES.find(elt => elt.IDCLASSES == Number(classe.IDCLASSES))
      if(foundElt){
        const indexClasse = this.tabIDCLASSES.indexOf(foundElt);
        this.tabIDCLASSES.splice(indexClasse, 1);
      }
    }

    const loadDataOnSelectObj = localStorage.getItem(
      constantes.etatPaiementCache.loadDataOnSelection
    );

    if (loadDataOnSelectObj && loadDataOnSelectObj == '1') {
      this.onFilter();
    }
  }

  onChangeMonth(month: any) {}

  onFilter() {
    let bEleveEnRetardPaiement: number =
      this.filterOptionForm.value.showStudent == 2 ? 1 : 0;
    let bEleveEnRegelePaiement: number =
      this.filterOptionForm.value.showStudent == 3 ? 1 : 0;
    let bEleveInscrits: number =
      this.filterOptionForm.value.stateStudent == 2 ? 1 : 0;
    let bEleveRadie: number =
      this.filterOptionForm.value.stateStudent == 3 ? 1 : 0;
    let DateConsideree: number;

    let paramFilter: ParamFilterState = {
      IDBRANCHE: 0,
      IDELEVE: 0,
      IDNIVEAU: 0,
      IDPRODUIT: 0,
      tabIDCLASSES: this.tabIDCLASSES,
      tabCodeProduit: this.tabEcheancesSelected,
      bEleveEnRetardPaiement: this.filterOptionForm.value.retard,
      bEleveEnRegelePaiement: this.filterOptionForm.value.regle,
      bEleveInscrits: this.filterOptionForm.value.inscrit,
      bEleveRadie: this.filterOptionForm.value.radier,
      DateConsideree: '',
      IDSITE: this.filterOptionForm.value.SitesEts,
    };

    let paramFilterAvisPaiement: AvisPaiement = {
      IDBRANCHE: 0,
      IDELEVE: 0,
      IDNIVEAU: 0,
      DateConsideree:'',
      tabIDCLASSES: this.tabIDCLASSES,
      tabCodeProduit: this.tabEcheancesSelected,
    };

    this.filterParamAvispaiement = paramFilterAvisPaiement
    this.filterParam = paramFilter

    this.loadEtatPaiement(this.tabIDCLASSES, paramFilter);
  }

  @ViewChild(MatPaginator) paginatorFiltre!: MatPaginator;
  loadEtatPaiement(
    tabClasses: TabIdclasses[],
    filterParam: ParamFilterState | undefined = undefined
  ) {
    this.isLoadingResultFilter = true;

    let paramFilter: ParamFilterState;

    if (filterParam) {
      paramFilter = filterParam;
    } else {
      paramFilter = {
        IDBRANCHE: 0,
        IDELEVE: 0,
        IDNIVEAU: 0,
        IDPRODUIT: 0,
        tabIDCLASSES: tabClasses,
        tabCodeProduit: this.tabEcheancesSelected,
        bEleveEnRetardPaiement: 0,
        bEleveEnRegelePaiement: 0,
        bEleveInscrits: 0,
        bEleveRadie: 0,
        DateConsideree: '',
        IDSITE: 0,
      };
    }

    console.log(paramFilter);

    this.etatPaiementService.getByFilter(paramFilter).subscribe((res) => {
      console.log(res);
      /*this.resultFilter = new MatTableDataSource(res.body);
      this.resultFilter.paginator = this.paginatorFiltre;
      this.isLoadingResultFilter = false;

      const totalInitAmount = this.globalService.totalCol(
        res.body,
        'MontantTotal'
      );
      this.totalMontantInitial = totalInitAmount ? totalInitAmount : 0;
      const totalDejaPaye = this.globalService.totalCol(res.body, 'Deja_Paye');
      this.totalMontantPaye = totalDejaPaye ? totalDejaPaye : 0;
      const totalDu = this.globalService.totalCol(res.body, 'Reste_A_Payer');
      this.totalMontantDu = totalDu ? totalDu : 0;*/
    });

    this.etatPaiementService.getByFilterWithTotaux(paramFilter).pipe(
      map(res => {
        console.log(res);
        this.resumData = res.tabResumeClasse
        this.allResumData = [res.stUnResume]
        this.resultFilter = new MatTableDataSource(res.tabFraisScolaires);
        const totalInitAmount = this.globalService.totalCol(
          res.tabFraisScolaires,
          'MontantTotal'
        );
        this.totalMontantInitial = totalInitAmount ? totalInitAmount : 0;
        const totalDejaPaye = this.globalService.totalCol(res.tabFraisScolaires, 'Deja_Paye');
        this.totalMontantPaye = totalDejaPaye ? totalDejaPaye : 0;
        const totalDu = this.globalService.totalCol(res.tabFraisScolaires, 'Reste_A_Payer');
        this.totalMontantDu = totalDu ? totalDu : 0;
      }),
      finalize(() => {
        this.isLoadingResultFilter = false
      })
    ).subscribe()
  }

  onCheckMonth(element: echeanceMensuel, event: any) {

    const state = event.target.checked;

    if (state) {
      this.tabEcheancesSelected.push({CodeProduit: element.CodeProduit})
    } else {
      const foundEcheance = this.tabEcheancesSelected.find(elt => elt.CodeProduit == element.CodeProduit)
      //found end delete
      if(foundEcheance){
        const index = this.tabEcheancesSelected.indexOf(foundEcheance);
        this.tabEcheancesSelected.splice(index, 1);
      }
    }

    const loadDataOnSelectObj = localStorage.getItem(
      constantes.etatPaiementCache.loadDataOnSelection
    );

    if (loadDataOnSelectObj && loadDataOnSelectObj == '1') {
      this.onFilter();
    }

    console.log(this.tabEcheancesSelected);

  }

  getTotalAmount(): number {
    return this.resultFilter.reduce(
      (total: any, element: any) => total + element.amount,
      0
    );
  }

  Imprimer() {
    this.isLoad = true;
    this.message =
      "Patientez un instant, l'impression de votre fichier Pdf est en cours";
      console.log(this.IDNIVEAU)
    this.etatPaiementService.imprimerListe(this.filterParam).pipe(
      tap(res => {
        console.log(res);
        this.globalService.printFile(res.body.Etat, "Etat de paiement")
      }),
      finalize(() => {
        this.isLoad = false
      })
    ).subscribe()
  }

  ImprimerAvispaiement(){
    this.isloadingimprimepaiement = true;
    this.message =
      "Patientez un instant, l'impression de votre fichier Pdf est en cours";
      console.log(this.IDNIVEAU)
    this.etatPaiementService.imprimerListeAvispaiement(this.filterParamAvispaiement).pipe(
      tap(res => {
        console.log(res);
        this.isloadingimprimepaiement = false
        this.globalService.printFile(res.body.Etat, "Etat avis de npaiement")
      }),
      finalize(() => {
        this.isloadingimprimepaiement = false
      })
    ).subscribe()
  }
}
