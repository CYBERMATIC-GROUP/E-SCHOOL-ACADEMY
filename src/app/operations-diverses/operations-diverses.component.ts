import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from '../services/global.service';
import { OperationsDiversesService } from '../services/operations-diverses.service';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DetailOd, OperationsDivers } from '../models/operationsDivers.model';
import { AlertComponent } from '../core/alert/alert.component';

@Component({
  selector: 'app-operations-diverses',
  templateUrl: './operations-diverses.component.html',
  styleUrls: ['./operations-diverses.component.scss'],
})
export class OperationsDiversesComponent {
  dataSource!: any;
  dataSource2!: any;

  displayedColumns = [
    'IDMOUVEMENT',
    'DateHeure',
    'Caissier',
    'Libelle',
    'Montant',
    'Actions',
  ];
  displayedColumns2 = [
    'NumeroMouvement',
    'LibelleCompte',
    'CodeCompte',
    'LibelleEcriture',
    'MontantDebit',
    'MontantCredit',
  ];
  isLoading!: boolean;
  TabDetailsODivers!: DetailOd[];
  mouvementSelected: any;
  isloadprintOD!: boolean;
  ndetails!: number;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private globalService: GlobalService,
    private operationsdivers: OperationsDiversesService
  ) {}

  dateDebut!: string;
  dateFin!: string;

  ngOnInit(): void {
    this.Init_DateFint();
    this.Init_DateDebut();
    this.OperationsDivers();
  }

  Init_DateDebut() {
    const currentDate = new Date();
    this.dateDebut = currentDate.toISOString().substring(0, 10);
  }

  Init_DateFint() {
    const currentDate = new Date();
    this.dateDebut = currentDate.toISOString().substring(0, 10);
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + 7);
    this.dateFin = endDate.toISOString().substring(0, 10);
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  OperationsDivers() {
    this.isLoading = true;
    this.operationsdivers
      .getOperationDiversListe(
        this.convertToValideDates(this.dateDebut),
        this.convertToValideDates(this.dateFin)
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.isLoading = false;
          this.TabDetailsODivers = data[0].DetailOD;
          console.log(this.TabDetailsODivers);
          this.ndetails = data[0].IDMOUVEMENT;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;

          this.dataSource2 = new MatTableDataSource(this.TabDetailsODivers);
          this.dataSource2.sort = this.sort;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onClickLine(operationsDivers: OperationsDivers) {
    this.mouvementSelected = operationsDivers;
    console.log(this.mouvementSelected);
    this.ndetails = operationsDivers.IDMOUVEMENT;
    this.dataSource2 = new MatTableDataSource(this.mouvementSelected.DetailOD);
    this.dataSource2.sort = this.sort;
  }

  retraitespececaisse() {
    const mvm = this.mouvementSelected;
    console.log(mvm);
    if (this.mouvementSelected) {
      if (mvm.Valide) {
        this.router.navigateByUrl('retrait-espece-caisse/' + mvm.IDMOUVEMENT);
      } else {
        this.globalService.alert(
          'Veuillez selectionné une opération validé',
          'Information',
          'info',
          'OK',
          ''
        );
      }
    } else {
      this.globalService.alert(
        'Selectionné une opération',
        'Information',
        'info',
        'OK',
        ''
      );
    }
  }

  getDateDebut(event: any) {
    console.log(event.target.value);
    this.dateDebut = event.target.value;
  }

  getDateFin(event: any) {
    console.log(event.target.value);
    this.dateFin = event.target.value;
  }
  readListOD() {
    this.OperationsDivers();
  }

  PrintListOperationsDivers() {
    this.isloadprintOD = true;
    this.operationsdivers
      .PrintOperationDivers(
        this.convertToValideDates(this.dateDebut),
        this.convertToValideDates(this.dateFin)
      )
      .subscribe((data) => {
        console.log(data);
        this.isloadprintOD = false;
        var anchor = document.createElement('a');
        anchor.href = data.Etat; // Correction ici
        anchor.download = 'Liste Des eleves ';
        document.body.appendChild(anchor);
        //  anchor.click();
        let pdfWindow = window.open('', '_blank', 'Liste opérations Divers');
        pdfWindow
          ? pdfWindow!.document.write(
              "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
                encodeURI(data.Etat) +
                "'></iframe></body>"
            )
          : null;
        this.isLoading = false;
      });
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  convertToValideDates(Date: string) {
    const year = Date.split('-')[0];
    const month = Date.split('-')[1];
    const day = Date.split('-')[2];
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }

  convertToValideDateH(DateNaissance: string) {
    const parsedDate = parseISO(DateNaissance);
    const formattedDate = format(parsedDate, 'dd MMMM yyyy, HH:mm', {
      locale: fr,
    });
    return formattedDate;
  }

  formatPrix(prix: number, separateur: string = ' ', device: string = 'XAF') {
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

  edit(IDMOUVEMENT: string) {
    this.router.navigateByUrl('saisie/operations/divers/edit/' + IDMOUVEMENT);
  }

  valider(operationsDivers: OperationsDivers) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'info';
    ref.componentInstance.content =
      'Voulez-vous valider opération ' + operationsDivers.Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.operationsdivers
          .ValidationOperationDivers(operationsDivers.IDMOUVEMENT)
          .subscribe((data) => {
            console.log(data);
            this.globalService.toastShow(
              'Votre opération a été validé avec succès',
              'succès'
            );
            this.OperationsDivers();
          });
      }
    });
  }

  delete(operationsDivers: OperationsDivers) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content =
      'Voulez vous supprimer cette opération ' + operationsDivers.Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.operationsdivers
          .deleteOperationDivers(operationsDivers.IDMOUVEMENT)
          .subscribe((data) => {
            console.log(data);
            this.globalService.toastShow(
              'Votre opération a été supprimé avec succès',
              'succès'
            );
            this.OperationsDivers();
          });
      }
    });
  }
}
