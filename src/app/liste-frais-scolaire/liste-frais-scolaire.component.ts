import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Niveau } from '../models/niveau.model';
import { NiveauService } from '../services/niveau.service';
import { AlertComponent } from '../core/alert/alert.component';
import { Branche } from '../models/branche.model';
import { BrancheService } from '../services/branche.service';
import { ListeFraisScolaireService } from '../services/liste-frais-scolaire.service';
import { ProduitListeFraisScolaire } from '../models/liste.model.frais.scolaire';
import { AdProduit } from '../models/Ajoutproduit.model';
import { DataSharingService } from '../services/data-sharing.service';
import { ProduitListeFraisScolaireFormComponent } from '../produit/produit-liste-frais-scolaire-form/produit-liste-frais-scolaire-form.component';
import { ListeFraisFormComponent } from './liste-frais-form/liste-frais-form.component';



@Component({
  selector: 'app-liste-frais-scolaire',
  templateUrl: './liste-frais-scolaire.component.html',
  styleUrls: ['./liste-frais-scolaire.component.scss']
})
export class ListeFraisScolaireComponent {

  dataSource1!: any;
  dataSource2!: any;
  dataSource3!: any;
  dataSource4!: any;


  displayedColumns1 = [

    'CodeNiveau',
    'NomNiveau',
    'Action'
  ];

  displayedColumns2 = [

    'CodeBranche',
    'NomBranche',
    'Action'
  ];


  displayedColumns3 = [
    'CodeProduit',
    'LibelleProduit_Fr',
    'Montant',
    'Action'
  ];

  displayedColumns4 = [
    'CodeProduit',
    'LibelleProduit_Fr',
    'Montant',
    'Action'
  ];

  isLoading!: boolean
  IDNIVEAU!: number;
  IDBRANCHE!: number;
  fraisFormisLoadingResolver!: boolean

  isLoadingliste!: boolean;

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private niveauService:NiveauService,
    private brancheService:BrancheService,
    private dataSharingService:DataSharingService,
    private listeproduitfraisScolaireService:ListeFraisScolaireService

  ) { }


  ngOnInit(): void {
    this.niveau();
    this.Branche();
    this.listeProduit()

  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  niveau() {
    this.isLoading = true
    this.niveauService.get().subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.dataSource1 = new MatTableDataSource(data);
      this.dataSource1.sort = this.sort;
      this.dataSource1.paginator = this.paginator;
      this.initializeFirstRadio()
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  Branche() {
    this.isLoading = true
    this.brancheService.get().subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.dataSource2= new MatTableDataSource(data);
      this.dataSource2.sort = this.sort;
      this.dataSource2.paginator = this.paginator;
      this.initializeFirstRadiob()
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  initializeFirstRadio() {
    if (this.dataSource1 && this.dataSource1.data && this.dataSource1.data.length > 0) {
      this.dataSource1.data[0].isChecked = true;
      this.IDNIVEAU = this.dataSource1.data[0].IDNIVEAU;
      // this.dataSharingService.IDNIVEAU = this.IDNIVEAU
    }
  }


  initializeFirstRadiob() {
    if (this.dataSource2&& this.dataSource2.data && this.dataSource2.data.length > 0) {
      this.dataSource2.data[0].isChecked = true;
      this.IDBRANCHE = this.dataSource2.data[0].IDBRANCHE;
      // this.dataSharingService.IDBRANCHE = this.IDBRANCHE
    }
  }



  CheckNiveau(selectedElement: any) {
    const IDNIVEAU = selectedElement.IDNIVEAU;
    this.IDNIVEAU = IDNIVEAU
    this.dataSharingService.IDNIVEAU = IDNIVEAU;

    console.log(IDNIVEAU)

    this.dataSource1.data.forEach((element: any) => {
      element.isChecked = selectedElement === element;
    });

    selectedElement.isChecked = true;

    this.listeProduit()

  }

  CheckBranche(selectedElement: any) {
    const IDBRANCHE = selectedElement.IDBRANCHE;
    this.IDBRANCHE = IDBRANCHE
    this.dataSharingService.IDBRANCHE = IDBRANCHE;

    console.log(IDBRANCHE)

    this.dataSource2.data.forEach((element: any) => {
      element.isChecked = selectedElement === element;
    });

    selectedElement.isChecked = true;

    this.listeProduit()

  }

  listeProduit() {
    this.isLoadingliste = true
    this.listeproduitfraisScolaireService.getList(this.IDNIVEAU, this.IDBRANCHE ,0).subscribe((data)=>{
      console.log(data)
      this.isLoadingliste = false
      this.dataSource3= new MatTableDataSource(data);
      this.dataSource3.sort = this.sort;
      this.dataSource3.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  formatPrix  (prix : number, separateur: string = ' ', device: string = 'XAF') {

    let  reverse : string[] = prix.toString().split('').reverse();
    let prixFormated:string = '';

    for ( let i:number = 1 ; i <= reverse.length; i++ ) {
       prixFormated += reverse[i-1];

       if (i%3 === 0) {
         prixFormated += separateur;
       }
    }

    let formated = prixFormated.split('').reverse().join('')
    let decimal =  ',00 ' + device

    if ( formated[0] == separateur) {
      formated = formated.substring(1)
    }
    return formated + decimal;

   }


   edit(produit: ProduitListeFraisScolaire) {
    const ref = this.dialog.open(ListeFraisFormComponent, {
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDPRODUIT = produit.IDPRODUIT;
  }


  view(produit: ProduitListeFraisScolaire) {
    const refview = this.dialog.open(ListeFraisFormComponent, {
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDPRODUIT = produit.IDPRODUIT;
  }

  create() {
    const refview = this.dialog.open(ProduitListeFraisScolaireFormComponent);
    refview.componentInstance.IDBRANCHE = this.IDBRANCHE
    refview.componentInstance.IDNIVEAU = this.IDNIVEAU
     refview.componentInstance.action = 'create';
     refview.afterClosed().subscribe((result) => {
      if(!result){
        this.listeProduit()
      }


     })
  }
}
