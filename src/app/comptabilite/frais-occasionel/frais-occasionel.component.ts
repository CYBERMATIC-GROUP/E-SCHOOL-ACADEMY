import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, finalize } from 'rxjs';
import { ListeSelectionEleveComponent } from 'src/app/eleve/liste-selection-eleve/liste-selection-eleve.component';
import { Agent } from 'src/app/models/agent.model';
import { Classe } from 'src/app/models/classe.model';
import { FraisPayer, PaiementFrais, FraisScolaire, DossierEleve } from 'src/app/models/fraispayer.model';
import { ClasseService } from 'src/app/services/classe.service';
import { FraisPayerService } from 'src/app/services/frais-payer.service';
import { GlobalService } from 'src/app/services/global.service';
import { HistoriqueFraisEleveComponent } from '../historique-frais-eleve/historique-frais-eleve.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-frais-occasionel',
  templateUrl: './frais-occasionel.component.html',
  styleUrls: ['./frais-occasionel.component.scss']
})
export class FraisOccasionelComponent {
  IDELEVE!: number;
  IDNIVEAU!: number;
  IDBRANCHE!: number;
  IDCLASSES!: number;
  CodeEleve!: string;
  Civilite!: number;
  DateNaissance!: string;
  Courriel!: string;
  Fr_Nom!: string;
  Fr_Prenom!: string;
  Fr_LieuNaissance!: string;
  Nationalite!: string;
  CodeBranche!: string;
  CodeNiveau!: string;
  CodeClasse!: string;
  TypeEleve!: number;
  Boursier!: boolean;
  TypeBourse!: number;
  IDNationalite!: number;
  EtatEleve!: number;
  IDCYCLES!: number;
  IDFRATRIE!: number;
  IDSTATUTELEVE!: number;
  EtatSanitaire!: string;
  TelMobile!: string;
  Solde!: string;
  Photo!: string;

  bExonere!: boolean;
  sLibelleProduit!: string;
  CompteAssocie!: string;
  CompteProduitEleve!: string;
  DateEcheance!: string;
  NumOrdre!: number;
  IDPRODUIT!: number;
  CodeProduit!: string;
  MontantTotal!: number;
  Deja_Paye!: number;
  Reste_A_Payer!: number;
  MontantImpaye!: number;
  Montant_A_Paye!: number;

  modePaiement!: number;
  totalToPay!: string;
  isLoadingListEleve!:boolean

  eleveID!: number
  FraisEleveList!: FraisPayer;
  ClasseList!:Classe[]

  dataSource!: any;
  displayedColumns = [
    'Checkbox',
    'CodeProduit',
    'sLibelleProduit',
    'DateEcheance',
    'MontantTotal',
    'Deja_Paye',
    'Reste_A_Payer',
    'Montant_A_Paye',
  ];

  isLoading!: boolean;
  IdUtilisateur: any;

  tableFraisAPayer: PaiementFrais[] = [];

  echeancesFraisGetted!: FraisScolaire[];

  dossierEleveSelected!: DossierEleve;

  printRecuChecked!: boolean;

  agentConnected!: Agent;
  totalAmountFrais!: number;
  totalAmountMontantPaye!: number;
  totalAmountMontantDu!: number;

  @ViewChildren('blocLines .amountToPay') AllInputMontantAPayer!: QueryList<ElementRef>;
  recu!: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public _location: Location,
    private fraispayerService: FraisPayerService,
    private classeService: ClasseService,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eleveID = +params['eleveID'];
    });

    const printRecuChecked = localStorage.getItem('printRecuChecked');
    this.printRecuChecked = printRecuChecked && printRecuChecked == '1' ? true : false;

    if(this.eleveID)
      this.Fraispayer(this.eleveID);
  }


  Fraispayer(eleveID: number) {
    this.isLoading = true;
    this.fraispayerService.getFraisOcasionel(eleveID).subscribe(res => {
      console.log(res)
      const data: FraisPayer = res;
      this.dossierEleveSelected = data.DossierEleve;
      this.CodeEleve = data.DossierEleve.CodeEleve;
      this.Fr_Nom = data.DossierEleve.Fr_Nom;
      this.Fr_Prenom = data.DossierEleve.Fr_Prenom;
      this.DateNaissance = data.DossierEleve.DateNaissance;
      this.Photo = data.DossierEleve.Photo
      this.IDCLASSES = data.DossierEleve.IDCLASSES;
      this.CodeClasse = data.DossierEleve.CodeClasse;
      this.Solde = this.globalService.formatPrix(data.DossierEleve.Solde)

      //load liste
      this.echeancesFraisGetted = data.FraisScolaires;
      this.dataSource = new MatTableDataSource(data.FraisScolaires);
      this.isLoading = false;

      //totaux
      const totalAmountFrais = this.globalService.totalCol(data.FraisScolaires, 'MontantTotal')
      this.totalAmountFrais = totalAmountFrais != false ? totalAmountFrais : 0
      const totalAmounPaye = this.globalService.totalCol(data.FraisScolaires, 'Deja_Paye')
      this.totalAmountMontantPaye = totalAmounPaye != false ? totalAmounPaye : 0
      const totalMontantDu = this.globalService.totalCol(data.FraisScolaires, 'Reste_A_Payer')
      this.totalAmountMontantDu = totalMontantDu != false ? totalMontantDu : 0;
    })
  }


  getSommeRestesAPayer(): string {
    let sommeRestesAPayer = "";
    if (this.FraisEleveList?.FraisScolaires) {
      sommeRestesAPayer = this.globalService.formatPrix( this.FraisEleveList.FraisScolaires.reduce(
        (sum, frais) => sum + frais.Reste_A_Payer,
        0
      ))
    }
    return sommeRestesAPayer;
  }


  getSommeMinApayer(): number {
    let sommeRestesAPayer = 0;
    if (this.FraisEleveList?.FraisScolaires) {
      sommeRestesAPayer = this.FraisEleveList.FraisScolaires.reduce(
        (sum, frais) => sum + frais.Montant_A_Paye,
        0
      );
    }
    return sommeRestesAPayer;
  }

  getMontantDu() {
    this.fraispayerService.getFraisPayer(this.eleveID).subscribe(
      (data) => {
        console.log(data);
        this.FraisEleveList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  classe() {
    this.classeService.get().subscribe(
      (data) => {
        console.log(data);
        this.ClasseList = data;
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

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  openList() {
    const dialogRef = this.dialog.open(ListeSelectionEleveComponent);
    dialogRef.componentInstance.openByFrais = true
    dialogRef.afterClosed().subscribe(result => {
      const eleve = dialogRef.componentInstance.eleveSelected
      if(result && eleve.IDELEVE){
        this.globalService.reloadComponent('/comptabilite/frais-occasionel/' + eleve.IDELEVE);
      }
    });
  }

  onInputFrais(fraisScolaire: FraisScolaire, event: any | Number){
    let newAmountToPay: number;
    console.log(event)

    if((event || event == 0) && typeof event === 'number'){
      newAmountToPay = event
    }else{
      newAmountToPay = event.target.value;

      if(newAmountToPay > fraisScolaire.Reste_A_Payer){
        //event is used like that because only the input manual can be greater thant the amount du
        newAmountToPay = event.target.value = fraisScolaire.Reste_A_Payer;
      }
    }
    console.log(newAmountToPay);
    const indexToUpdate = this.echeancesFraisGetted.indexOf(fraisScolaire);

    this.echeancesFraisGetted[indexToUpdate].Montant_A_Paye = Number(newAmountToPay);

    this.totalToPay = this.globalService.formatPrix(this.calculTotal('Montant_A_Paye', this.echeancesFraisGetted));
  }

  onPayFrais(){
    localStorage.setItem('printRecuChecked', this.printRecuChecked ? '1' : '0');
    if(this.modePaiement){
      this.isLoading = true;
      console.log(this.tableFraisAPayer);
      this.fraispayerService.setPaiementFrais(this.echeancesFraisGetted, this.eleveID, this.modePaiement).pipe(
        tap(res => {
          this.globalService.toastShow('Paiement encaissé avec success', 'Paiement frais occasionel', 'success');

          this.globalService.reloadComponent('/comptabilite/frais-occasionel/' + this.eleveID)
          const recu = res.body.Etat;
          this.globalService.printFile(recu, 'ReÇu de paiement')
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe();
    }else{
      this.globalService.toastShow('Veuillez sélectionner un mode de paiement !', "Attention!", "error");
    }

  }


  onCheckedProduit(element: FraisScolaire, event: any){
    if(event && event.target.checked){
      element.Montant_A_Paye = element.Reste_A_Payer;
    }else{
      element.Montant_A_Paye = 0;
    }
    this.onInputFrais(element, element.Montant_A_Paye);
  }


  calculTotal(keyToCalcult: string, tab: Array<any>){
    let total = 0;
    if(tab && tab.length > 0) {
      for (let index = 0; index < tab.length; index++) {
        const nbr: number = tab[index][keyToCalcult];
        total += nbr;
      }
      return total;
    }else{
      return 0
    }
  }

  showHistoriqueFraisEleve(){
    const ref = this.dialog.open(HistoriqueFraisEleveComponent);
    ref.componentInstance.IDELEVE = this.eleveID;
    ref.componentInstance.nomEleve = this.Fr_Nom;
  }
}
