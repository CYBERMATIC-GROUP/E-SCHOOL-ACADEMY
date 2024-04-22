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
import { ConfigurationMatiere } from '../models/config.matiere.model';
import { MatiereService } from '../services/matiere.service';
import { ConfigMatiereFormComponent } from './config-matiere-form/config-matiere-form.component';
import { DataSharingService } from '../services/data-sharing.service';
import { ConfigMatiereAjoutComponent } from './config-matiere-ajout/config-matiere-ajout.component';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-config-matiere',
  templateUrl: './config-matiere.component.html',
  styleUrls: ['./config-matiere.component.scss']
})
export class ConfigMatiereComponent {

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
    'NomMatiere',
    'EnseigneePeriode1',
    'EnseigneePeriode2',
    'EnseigneePeriode3',
    'EnseigneeEnGroupe',
    'nbreHeureSemaine',
    'nbreHeureMaxiJour',
    'Coefficient',
    'CoefBorneMax',
    'Actions'
  ];


   isLoading!: boolean

  IDNIVEAU!: number;
  IDBRANCHE!: number;

  IDMAT_NIV_BRA!:number
  IDmatiereNiveauBranche!:number


  isLoadingliste!: boolean;
  element!: ConfigurationMatiere;
  IDNIVEAUConfigMatiere!: number;
  IDBRANCHEConfigMatiere: any;

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private niveauService:NiveauService,
    private brancheService:BrancheService,
    private matiereservice:MatiereService,
    private globalService:GlobalService,
    private dataSharingService:DataSharingService,
  ) { }


  ngOnInit(): void {
    this.niveau();
    this.Branche();
    this.Matiere()
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
      this.dataSharingService.IDNIVEAUMatiere = this.IDNIVEAU
    }
  }


  initializeFirstRadiob() {
    if (this.dataSource2 && this.dataSource2.data && this.dataSource2.data.length > 0) {
      this.dataSource2.data[0].isChecked = true;
      this.IDBRANCHE = this.dataSource2.data[0].IDBRANCHE;
      this.dataSharingService.IDBRANCHEMatiere = this.IDBRANCHE

    }
  }



  CheckNiveau(selectedElement: any) {
    const IDNIVEAU = selectedElement.IDNIVEAU;
    this.IDNIVEAU = IDNIVEAU

    this.dataSharingService.IDNIVEAUMatiere = this.IDNIVEAU

    console.log(IDNIVEAU)

    this.dataSource1.data.forEach((element: any) => {
      element.isChecked = selectedElement === element;
    });

    selectedElement.isChecked = true;

    this.Matiere()

  }

  CheckBranche(selectedElement: any) {
    const IDBRANCHE = selectedElement.IDBRANCHE;
    this.IDBRANCHE = IDBRANCHE
    this.dataSharingService.IDBRANCHEMatiere = this.IDBRANCHE
    console.log(IDBRANCHE)

    this.dataSource2.data.forEach((element: any) => {
      element.isChecked = selectedElement === element;
    });

    selectedElement.isChecked = true;

    this.Matiere()

  }


  Matiere() {
    this.isLoadingliste = true
    this.matiereservice.getListMatiereByNieveuBranche(this.IDNIVEAU, this.IDBRANCHE).subscribe((data)=>{
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


  edit(matiere: ConfigurationMatiere) {
    const ref = this.dialog.open(ConfigMatiereFormComponent);
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDMAT_NIV_BRA = matiere.IDMAT_NIV_BRA;
     ref.id = 'configMatiereForm'
     ref.afterClosed().subscribe(result => {
      if(result){
        this.Matiere()
      }
    })
  }


  view(matiere: ConfigurationMatiere) {
    const refview = this.dialog.open(ConfigMatiereFormComponent);
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDMAT_NIV_BRA = matiere.IDMAT_NIV_BRA;

  }

  create() {
    const refview = this.dialog.open(ConfigMatiereAjoutComponent);
    refview.id = 'configMatiereAjout'
    refview.afterClosed().subscribe(result => {
      if(result){
        this.Matiere()
      }
    })
  }

}
