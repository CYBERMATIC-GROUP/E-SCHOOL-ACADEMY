import { Component,OnInit,ViewChild} from '@angular/core';
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


@Component({
  selector: 'app-consultation-caisse',
  templateUrl: './consultation-caisse.component.html',
  styleUrls: ['./consultation-caisse.component.scss']
})
export class ConsultationCaisseComponent implements OnInit {

  dataSource!: any;
  displayedColumns = [
    'Mouvement',
    'Date',
    'Compte',
    'Libelle',
    'Debit',
    'Credit'
  ];

  IDCAISSE!: number
  CodeCaisse!: string
  LibelleCaisse!: string
  CompteAssocie!: string
  RetraitMaxOperation!: number
  RetraitMaxParPériode!: number
  PeriodeRetraitMax!: number
  VersementsAutorises!: boolean
  RetraitsAutorises!: boolean
  TransfertsIntercaissesAutorises!: boolean
  TransfertsRetraitsBanquesAutorises!: boolean

  CaisseList!:Caisse[]
  isLoading!: boolean

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private caisseService:CaisseService
  
  ) { }


  ngOnInit(): void {
    this.loadCaisse()
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
  
  onCaisseSelect(event: any) {
    const caisseID = parseInt(event.target.value); // Convertir la valeur en nombre si nécessaire
    const selectedCaisse = this.CaisseList.find((caisse) => caisse.IDCAISSE === caisseID);
    if (selectedCaisse) {
      this.CompteAssocie = selectedCaisse.CompteAssocie;
    } else {
      this.CompteAssocie = '';
    }
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



}
