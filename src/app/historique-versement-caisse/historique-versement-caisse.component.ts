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
import { HistoriqueversementcaisseService } from '../services/historiqueversementcaisse.service';
import { CaisseService } from '../services/caisse.service';
import { Caisse } from '../models/caisse.model';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-historique-versement-caisse',
  templateUrl: './historique-versement-caisse.component.html',
  styleUrls: ['./historique-versement-caisse.component.scss'],
})
export class HistoriqueVersementCaisseComponent {
  dataSource!: any;
  displayedColumns = [
    'NumeroMouvement',
    'DateHeure',
    'CodeCompte',
    'LibelleEcriture',
    'MontantDebit',
    'MontantCredit',
  ];

  IDCAISSE!: number;
  CompteAssocie!: string;
  Solde!:string

  CaisseList!: Caisse[];
  isLoading!: boolean;
  DateFin!: string;
  Date!: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public _location: Location,
    private caisseService: CaisseService,
    private globalService: GlobalService,
    private historiqueCaisseService: HistoriqueversementcaisseService
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

    this.Date = `${year}-${month}-${day}`;
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
    console.log(selectedCaisse);
    if (selectedCaisse) {
      this.CompteAssocie = selectedCaisse.CompteAssocie;
      this.Solde = selectedCaisse.Solde + " FCFA"
    } else {
      this.CompteAssocie = '';
    }
  }
  onDateSelectedDebut() {
    console.log(this.Date);
  }
  onDateSelectedFin() {
    console.log(this.DateFin);
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadCaisse() {
    this.caisseService.get().subscribe(
      (data) => {
        console.log(data);
        this.CaisseList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatPrix(prix: number, separateur: string = ' ', device: string = '') {
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

  formatNumero(prix: number, separateur: string = ' ', device: string = '') {
    let reverse: string[] = prix.toString().split('').reverse();
    let prixFormated: string = '';

    for (let i: number = 1; i <= reverse.length; i++) {
      prixFormated += reverse[i - 1];

      if (i % 3 === 0) {
        prixFormated += separateur;
      }
    }

    let formated = prixFormated.split('').reverse().join('');
    let decimal = '' + device;

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

  convertToValideDateHeure(DateNaissance: string) {
    const dateParts = DateNaissance.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const day = parseInt(dateParts[2], 10);
    const parsedDate = new Date(year, month - 1, day);
    const formattedDate = format(parsedDate, 'dd MMMM yyyy, HH:mm', {
      locale: fr,
    });
    return formattedDate;
  }

  convertToValideDateH(DateNaissance: string) {
    const parsedDate = parseISO(DateNaissance);
    const formattedDate = format(parsedDate, 'dd MMMM yyyy, HH:mm', {
      locale: fr,
    });
    return formattedDate;
  }

  view() {
    if (this.IDCAISSE && this.Date && this.DateFin) {
      this.isLoading = true
      this.historiqueCaisseService
        .getConsultationCaisse(
          this.IDCAISSE,
          this.convertToValideDates(this.Date),
          this.convertToValideDates(this.DateFin),
          1
        )
        .subscribe((data) => {
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false

        });
    } else {
     this.globalService.alert("Veuillez sélectionner une caisse et spécifier les dates de début et de fin","Information","info","","OK")
    }
  }
}
