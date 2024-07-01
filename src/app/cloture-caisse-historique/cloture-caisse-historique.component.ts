import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../core/alert/alert.component';
import { Caisse } from '../models/caisse.model';
import { CaisseService } from '../services/caisse.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-cloture-caisse-historique',
  templateUrl: './cloture-caisse-historique.component.html',
  styleUrls: ['./cloture-caisse-historique.component.scss'],
})
export class ClotureCaisseHistoriqueComponent {
  dataSource!: any;
  displayedColumns = [
    'Date',
    'SoldeOuverture',
    'SoldeFermeture',
    'TotalVersements',
    'TotalRetraits',
  ];
  IDCAISSE!: number;
  CompteAssocie!: string;
  CaisseList!: Caisse[];
  isLoading!: boolean;
  isloadingprinthistorique!: boolean;
  DateFin!: string;
  Solde!: number;
  DateDebut!: string;
  TypeDocument: number = 0;
  type:number = 1

  TotalRetraits!: string;
  TotalVersements!: string
  SoldeOuverture!: string
  SoldeFermeture!: string

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public _location: Location,
    private globalService: GlobalService,
    private caisseService: CaisseService
  ) {}

  ngOnInit(): void {
    this.loadCaisse();
    this.dateDebut();
    this.dateFin();
  }

  dateDebut() {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const year = sevenDaysAgo.getFullYear();
    const month = ('0' + (sevenDaysAgo.getMonth() + 1)).slice(-2);
    const day = ('0' + sevenDaysAgo.getDate()).slice(-2);
    this.DateDebut = `${year}-${month}-${day}`;
  }

  dateFin() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    this.DateFin = `${year}-${month}-${day}`;
  }

  onCaisseSelect(event: any) {
    const caisseID = parseInt(event.target.value);
    this.IDCAISSE = caisseID;
    const selectedCaisse = this.CaisseList.find(
      (caisse) => caisse.IDCAISSE === caisseID
    );
    if (selectedCaisse) {
      console.log(selectedCaisse);
      this.Solde = selectedCaisse.Solde;
      this.CompteAssocie = selectedCaisse.CompteAssocie;
    } else {
      this.CompteAssocie = '';
    }
  }

  onDateSelectedDebut() {
    console.log(this.DateDebut);
  }

  onDateSelectedFin() {
    console.log(this.DateFin);
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  clotureCaisse() {
    this.isLoading = true;
    this.caisseService
      .getHistoriqueClotureCaisse(
        this.IDCAISSE,
        this.convertToValideDates(this.DateDebut),
        this.convertToValideDates(this.DateFin)
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator
          this.TotalRetraits = this.globalService.formatPrix(this.calculTotal('TotalRetraits', data));
          this.SoldeOuverture = this.globalService.formatPrix(this.calculTotal('SoldeOuverture', data));
          this.TotalVersements = this.globalService.formatPrix(this.calculTotal('TotalVersements', data));
          this.SoldeFermeture = this.globalService.formatPrix(this.calculTotal('SoldeFermeture', data));
        },
        (error) => {
          console.log(error);
        }
      );
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

  loadCaisse() {
    this.caisseService.get().subscribe(
      (data) => {
        console.log(data);
        this.IDCAISSE = data['0'].IDCAISSE;
        this.CaisseList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatPrix(prix: any, separateur: string = ' ', device: string = 'FCFA') {
    let reverse: string[] = prix.toString().split('').reverse();
    let prixFormated: string = '';

    for (let i: number = 1; i <= reverse.length; i++) {
      prixFormated += reverse[i - 1];

      if (i % 3 === 0) {
        prixFormated += separateur;
      }
    }

    let formated = prixFormated.split('').reverse().join('');
    let decimal = ',00 ' + device;

    if (formated[0] == separateur) {
      formated = formated.substring(1);
    }
    return formated + decimal;
  }

  formatPrixSolde(prix: any, separateur: string = ' ', device: string = '') {
    let reverse: string[] = prix.toString().split('').reverse();
    let prixFormated: string = '';

    for (let i: number = 1; i <= reverse.length; i++) {
      prixFormated += reverse[i - 1];

      if (i % 3 === 0) {
        prixFormated += separateur;
      }
    }

    let formated = prixFormated.split('').reverse().join('');
    let decimal = ' ' + device;

    if (formated[0] == separateur) {
      formated = formated.substring(1);
    }
    return formated + decimal;
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  convertToValideDate(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  convertToValideDates(Date: string) {
    const year = Date.split('-')[0];
    const month = Date.split('-')[1];
    const day = Date.split('-')[2];
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }
  view() {
    if (this.IDCAISSE && this.DateDebut && this.DateFin) {
      this.onDateSelectedDebut();
      this.onDateSelectedFin();
      this.onCaisseSelect({ target: { value: this.IDCAISSE } });
      this.clotureCaisse();
    } else {
      const ref = this.dialog.open(AlertComponent);
      ref.componentInstance.type = 'danger';
      ref.componentInstance.content =
        'Veuillez sélectionner une caisse et spécifier les dates de début et de fin.';
    }
  }

  typeDocumentSelected(event:any){
    console.log(event.target.value);
    this.TypeDocument = event.target.value
    this.ImprimeClotureCaisse()
  }
  
  ImprimeClotureCaisse() {
    console.log(this.IDCAISSE,
      this.convertToValideDates(this.DateDebut),
      this.convertToValideDates(this.DateDebut),
      this.TypeDocument);
    
    this.isloadingprinthistorique = true;
    this.caisseService
      .ImprimeclotureCaisseHistorique(
        this.IDCAISSE,
        this.convertToValideDates(this.DateDebut),
        this.convertToValideDates(this.DateDebut),
        this.TypeDocument
      )
      .subscribe((data) => {
        console.log(data);
        this.isloadingprinthistorique = false;
        var anchor = document.createElement('a');
        anchor.href = data.Etat;
        anchor.download = ' ';
        document.body.appendChild(anchor);
        //  anchor.click();
        let pdfWindow = window.open('', '_blank', 'Liste eleves');
        pdfWindow
          ? pdfWindow!.document.write(
              "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
                encodeURI(data.Etat) +
                "'></iframe></body>"
            )
          : null;
      });
  }
}
