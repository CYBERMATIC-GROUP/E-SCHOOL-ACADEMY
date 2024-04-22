import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Classe } from 'src/app/models/classe.model';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { Nationalite } from 'src/app/models/nationalite.model';
import { Enseigant } from 'src/app/models/enseigant.model';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-choose-enseignant',
  templateUrl: './choose-enseignant.component.html',
  styleUrls: ['./choose-enseignant.component.scss']
})
export class ChooseEnseignantComponent {

  dataSource!: any;

  displayedColumns = [
    'CodeEnseignant',
    'Fr_Nom',
    'Fr_Prenom',
    'Civilite',
    'cocher'
  ];


  IDCLASSES!: string;
  classList!:Classe[]
  nationaliteeList!: Nationalite[];
  issendparameters!:boolean
  isLoading!: boolean;
  isloadingEnseignant!:boolean
  IDENS_CLASSE!:number
  IDMATIERE!:number
  IDENSEIGNANT!: number;


  constructor(
    private router: Router,
    private dialog: MatDialog,
    private globaleService:GlobalService,
    public _location: Location,
    private enseignantService:EnseignantService

  ) {}

  isFormValid(): any {
    return this.IDENSEIGNANT ;
  }

  ngOnInit(): void {
    this.getListEnseignant();
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getListEnseignant(){
    this.isloadingEnseignant = true
    this.enseignantService.getList().subscribe((data)=>{
      console.log(this.IDCLASSES)
      console.log(data)
      this.isloadingEnseignant = false
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(data);
    },(error)=>{
      console.log(error)
    })
  }

  checkLineEnseignant(element:Enseigant){
    const EnseigantID = element.IDENSEIGNANT;
    this.IDENSEIGNANT = EnseigantID
    console.log(this.IDENSEIGNANT)
    
  }


  applyFilterclasse(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  getNationaliteLibelle(nationaliteId: number): string {
    const nationalite = this.nationaliteeList.find(
      (item) => item.IDNATIONALITE === nationaliteId
    );
    return nationalite ? nationalite.Libelle : '';
    }

  convertToValideDate(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  valider(){
    if(this.IDENSEIGNANT > 0){
      this.enseignantService.AjoutPlanning(this.IDCLASSES,this.IDMATIERE,this.IDENSEIGNANT,this.IDENS_CLASSE).subscribe((data)=>{
        console.log("IDENSEIGNANT ASSOCIE : ", data)
        this.dialog.closeAll()
        this.globaleService.toastShow("Votre operation a été effectué  avec succès", "Succès", "success");
      })
  
    }else{
      const dialog = this.dialog.open(AlertComponent)
      dialog.componentInstance.content = "Veuillez cocher un enseignant avant de valider"
    }
   
  }

  
}
