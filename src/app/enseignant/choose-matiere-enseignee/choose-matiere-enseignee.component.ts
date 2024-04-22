import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Classe } from 'src/app/models/classe.model';
import { Nationalite } from 'src/app/models/nationalite.model';
import { Enseigant } from 'src/app/models/enseigant.model';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { GlobalService } from 'src/app/services/global.service';
import { MatiereService } from 'src/app/services/matiere.service';
import { Matiere } from 'src/app/models/matiere.model';


@Component({
  selector: 'app-choose-matiere-enseignee',
  templateUrl: './choose-matiere-enseignee.component.html',
  styleUrls: ['./choose-matiere-enseignee.component.scss']
})
export class ChooseMatiereEnseigneeComponent {

 
  dataSource!: any;

  displayedColumns = [
    'Fr_CodeMatiere',
    'Fr_NomMatiere',
    'cocher'
  ];


  IDCLASSES!: string;
  issendparameters!:boolean
  isLoading!: boolean;
  isLoadmatiere!:boolean
  IDMATIERE!:number
  IDENSEIGNANT!: number;


  constructor(
    private router: Router,
    private dialog: MatDialog,
    private globaleService:GlobalService,
    public _location: Location,
    private matiereService:MatiereService

  ) {}

  ngOnInit(): void {
    this.getListMatiere();
    console.log(this.IDENSEIGNANT)
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getListMatiere(){
    this.isLoadmatiere = true
    this.matiereService.get().subscribe((data)=>{
      console.log(this.IDMATIERE)
      console.log(data)
      this.isLoadmatiere = false
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(data);
    },(error)=>{
      console.log(error)
    })
  }

  checkLineMatiere(element:Matiere){
    const matiereID = element.IDMATIERE;
    this.IDMATIERE = matiereID
    console.log(this.IDMATIERE)
    
  }


  applyFilterclasse(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

 

   valider(){
     this.issendparameters = true
     if(this.IDMATIERE > 0){
       this.matiereService.AjoutMatiereByEnseignant(this.IDENSEIGNANT,this.IDMATIERE).subscribe((data)=>{
         console.log(data)
         this.issendparameters = false
         this.dialog.getDialogById('matiereenseigner')?.close(true)
         this.globaleService.toastShow("Votre operation a été effectué  avec succès", "Succès", "success");
       },(error)=>{
         console.log(error)
       })
  
     }else{
       const dialog = this.dialog.open(AlertComponent)
       dialog.componentInstance.content = "Veuillez cocher une matière avant de valider"
     }
   
   }

}
