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
import { finalize, tap } from 'rxjs';



@Component({
  selector: 'app-choose-enseignant-by-matiere',
  templateUrl: './choose-enseignant-by-matiere.component.html',
  styleUrls: ['./choose-enseignant-by-matiere.component.scss']
})
export class ChooseEnseignantByMatiereComponent {

  dataSource!: any;

  displayedColumns = [
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

  ngOnInit(): void {
    this.getListEnseignant();
    console.log(this.IDCLASSES,this.IDMATIERE,this.IDENS_CLASSE)
  }


  isFormValid(): any {
    return this.IDENSEIGNANT ;
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getListEnseignant(){
    this.isloadingEnseignant = true
    this.enseignantService.getEnseignantbyMatiere(this.IDMATIERE).subscribe((data)=>{
      console.log(this.IDMATIERE)
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
    this.isLoading = true
    if(this.IDENSEIGNANT > 0){
      this.enseignantService.AjoutPlanning(this.IDCLASSES,this.IDMATIERE,this.IDENSEIGNANT,this.IDENS_CLASSE).pipe(        
        tap(data => {
          console.log("IDENSEIGNANT ASSOCIE : ", data)
          this.dialog.getDialogById('ChooseEnseignantByMatiereComponent')?.close(true)
          this.globaleService.toastShow("Votre operation a été effectué  avec succès", "Succès", "success");
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
  
    }else{
      const dialog = this.dialog.open(AlertComponent)
      dialog.componentInstance.content = "Veuillez cocher un enseignant avant de valider"
    }
   
  }

}
