import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Observable, finalize, tap } from 'rxjs';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Agent } from 'src/app/models/agent.model';
import { Caisse } from 'src/app/models/caisse.model';
import { codeJournalInterface } from 'src/app/models/code-journal.model';
import { modePaiementInterface } from 'src/app/models/modePaiement.models';
import { CaisseService } from 'src/app/services/caisse.service';
import { CodeJournalService } from 'src/app/services/code-journal.service';
import { GlobalService } from 'src/app/services/global.service';
import { HistoriqueversementcaisseService } from 'src/app/services/historiqueversementcaisse.service';
import { ModePaiementService } from 'src/app/services/mode-paiement.service';
import { constantes } from 'src/environnements/constantes';

@Component({
  selector: 'app-historique-retraits-caisses',
  templateUrl: './historique-retraits-caisses.component.html',
  styleUrls: ['./historique-retraits-caisses.component.scss']
})
export class HistoriqueRetraitsCaissesComponent {
  dataSource!: any;
  displayedColumns = [
    'NumeroMouvement',
    'DateHeure',
    'CodeCompte',
    'LibelleEcriture',
    //'MontantDebit',
    'MontantCredit',
  ];
  dataSourceJournaux!: any;
  displayedColumnsJournaux = [
    'Code',
    'Libelle',
    'Action'
  ]
  codeJournauxSelected:  {CodeJournal: string }[] = [];
  IDCAISSE!: number;
  CompteAssocie!: string;
  codeJournauxIsLoading!: boolean;
  CaisseList!: Caisse[];
  isLoading!: boolean;
  DateFin!: string;
  Date!: string;
  codeJournal!: string;
  modePaiementList$!: Observable<modePaiementInterface[]>;
  isPrinting!: boolean;
  agent!: Agent;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public _location: Location,
    private caisseService: CaisseService,
    private historiqueCaisseService: HistoriqueversementcaisseService,
    public globalService: GlobalService,
    private modePaiementService: ModePaiementService,
    private codeJournalService: CodeJournalService
  ) {}

  ngOnInit(): void {
    const agentObj = localStorage.getItem(constantes.auth.agent)
    if(agentObj)
      this.agent = JSON.parse(agentObj);
    this.loadCaisse();

    this.modePaiementList$ = this.modePaiementService.getAll();
    this.loadCodeJournaux(1);

    this.dateDebut()
    this.dateFin()
  }



  dateDebut(){
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const year = sevenDaysAgo.getFullYear();
    const month = ('0' + (sevenDaysAgo.getMonth() + 1)).slice(-2);
    const day = ('0' + sevenDaysAgo.getDate()).slice(-2);

    this.Date = `${year}-${month}-${day}`;
  }

  dateFin(){
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    this.DateFin = `${year}-${month}-${day}`;
  }


  loadCodeJournaux(bRetraits: 1 | 0){
    this.codeJournauxIsLoading = true;
    this.codeJournalService.getAll(bRetraits).subscribe(res => {
      this.dataSourceJournaux = new MatTableDataSource(res);
      this.codeJournauxIsLoading = false;
      console.log(res);

    });

  }

  onCaisseSelect(event: any) {
    const caisseID = parseInt(event.target.value);
    this.IDCAISSE = caisseID;
    console.log(this.IDCAISSE);
    console.log(caisseID);

    const selectedCaisse = this.CaisseList.find(
      (caisse) => caisse.IDCAISSE === caisseID
    );

    if (selectedCaisse) {
      this.CompteAssocie = selectedCaisse.CompteAssocie;
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

  HistoriqueCaisse() {
    this.isLoading = true;
    this.historiqueCaisseService
      .getHistoriqueRetraitsCaisses(
        this.IDCAISSE,
        this.convertToValideDates(this.Date),
        this.convertToValideDates(this.DateFin),
        this.codeJournal,
        this.codeJournauxSelected
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  loadCaisse() {
    this.caisseService.get().subscribe(
      (data) => {
        console.log(data);
        this.CaisseList = data;
        console.log(this.agent)
        data.forEach(element => {
          if(element.IDCAISSE == this.agent.CaisseAssociee){
            this.CompteAssocie = element.CompteAssocie;
            this.IDCAISSE = element.IDCAISSE;
          }
        });
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
      this.onDateSelectedDebut();
      this.onDateSelectedFin();
      this.onCaisseSelect({ target: { value: this.IDCAISSE } });
      this.HistoriqueCaisse();
    } else {
      const ref = this.dialog.open(AlertComponent);
      ref.componentInstance.type = 'danger';
      ref.componentInstance.content =
        'Veuillez sélectionner une caisse et spécifier les dates de début et de fin.';
    }
  }

  onCheckJournal(element: codeJournalInterface){
    const journal =  {CodeJournal:  element.Code}
    const codeFound = this.codeJournauxSelected.find(elt => elt.CodeJournal == element.Code)
    if(codeFound){
      const index = this.codeJournauxSelected.indexOf(codeFound)
      this.codeJournauxSelected.splice(index, 1);
    }else{
      this.codeJournauxSelected.push(journal);
    }
    this.codeJournal = this.codeJournauxSelected[0].CodeJournal;
  }

  printHistoryque(){
    this.isPrinting = true;
    this.historiqueCaisseService.printHistoriqueRetrait(this.IDCAISSE, this.Date, this.DateFin, this.codeJournauxSelected).pipe(
      tap(res => {
        console.log(res)
        this.globalService.printFile(res.body.Etat, 'Historique des retraits de caisses');
      }),
      finalize(() => {
        this.isPrinting = false;
      })
    ).subscribe()
  }
}
