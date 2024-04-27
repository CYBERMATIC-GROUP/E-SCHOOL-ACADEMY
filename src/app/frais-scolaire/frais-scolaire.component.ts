import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Observable, catchError, elementAt, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DossierEleve, FraisPayer, FraisScolaire, PaiementFrais } from '../models/fraispayer.model';
import { FraisPayerService } from '../services/frais-payer.service';
import { AlertComponent } from '../core/alert/alert.component';
import { ListeSelectionEleveComponent } from '../eleve/liste-selection-eleve/liste-selection-eleve.component';
import { Eleve } from '../models/eleve.model';
import { Classe } from '../models/classe.model';
import { ClasseService } from '../services/classe.service';
import { GlobalService } from '../services/global.service';
import { Agent } from '../models/agent.model';
import { HistoriqueFraisEleveComponent } from '../comptabilite/historique-frais-eleve/historique-frais-eleve.component';
import { modePaiementInterface } from '../models/modePaiement.models';
import { ModePaiementService } from '../services/mode-paiement.service';
import { schoolLogin } from '../models/ecole.model';
import { constantes } from 'src/environnements/constantes';

@Component({
  selector: 'app-frais-scolaire',
  templateUrl: './frais-scolaire.component.html',
  styleUrls: ['./frais-scolaire.component.scss'],
})
export class FraisScolaireComponent {
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
  modePaiementList$!: Observable<modePaiementInterface[]>;
  agentConnected!: Agent;
  totalAmountFrais!: number;
  totalAmountMontantPaye!: number;
  totalAmountMontantDu!: number;
  ecole!: schoolLogin

  @ViewChildren('blocLines .amountToPay') AllInputMontantAPayer!: QueryList<ElementRef>;
  recu!: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public _location: Location,
    private fraispayerService: FraisPayerService,
    private classeService: ClasseService,
    public globalService: GlobalService,
    private modePaiementService: ModePaiementService,
  ) {}

  ngOnInit(): void {
    this.modePaiementList$ = this.modePaiementService.getAll().pipe(
      tap(res => {
        console.log(res);
        
      })
    )
    this.route.params.subscribe((params) => {
      this.eleveID = +params['eleveID'];
    });

    const printRecuChecked = localStorage.getItem('printRecuChecked');
    this.printRecuChecked = printRecuChecked && printRecuChecked == '1' ? true : false;

    if(this.eleveID)
      this.Fraispayer(this.eleveID);
    //this.getMontantDu();
    //this.classe();

    const schoolObj = localStorage.getItem(constantes.auth.school)
    if(schoolObj)
      this.ecole = JSON.parse(schoolObj)
  }


  Fraispayer(eleveID: number) {
    this.isLoading = true;
    this.fraispayerService.getFraisScolaire(eleveID).subscribe(res => {
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
        this.globalService.reloadComponent('/frais/' + eleve.IDELEVE);
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
          console.log(res);
          this.globalService.toastShow('Paiement encaissé avec success', 'Paiement frais scolaire', 'success');
          this.globalService.reloadComponent('/frais/' + this.eleveID)
          const recu = res.body.Etat;
          this.printRecu(recu)
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe();
    }else{
      this.globalService.toastShow('Veuillez sélectionner un mode de paiement !', "Attention!", "error");
    }

  }

   imprimer() {
    this.fraispayerService.setPaiementFrais(this.echeancesFraisGetted,1731,1000)
      .subscribe((data) => {
        console.log(data);
        let anchor = document.createElement('a');
        anchor.href = data.body.Etat;
        anchor.download = ' ';
        document.body.appendChild(anchor);
        let pdfWindow = window.open('', '_blank', 'Liste eleves');
        pdfWindow
          ? pdfWindow!.document.write(
              "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
                encodeURI(data.body.Etat) +
                "'></iframe></body>"
            )
          : null;
      });
  }


  printRecu(data: string){
    var anchor = document.createElement('a');
    anchor.href = data;
    anchor.download = 'ReÇu de paiement';
    document.body.appendChild(anchor);
    //  anchor.click();
    let pdfWindow = window.open('', '_blank', 'ReÇu');
    pdfWindow
      ? pdfWindow!.document.write(
          "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
            encodeURI(data) +
            "'></iframe></body>"
        )
      : null;
    this.isLoading = false;

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
