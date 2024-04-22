import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Classe } from 'src/app/models/classe.model';
import { ClasseService } from 'src/app/services/classe.service';
import { EleveService } from 'src/app/services/eleve.service';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { Nationalite } from 'src/app/models/nationalite.model';
import { Enseigant } from 'src/app/models/enseigant.model';
import { ChooseEnseignantComponent } from '../choose-enseignant/choose-enseignant.component';
import { GlobalService } from 'src/app/services/global.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { ChooseEnseignantByMatiereComponent } from '../choose-enseignant-by-matiere/choose-enseignant-by-matiere.component';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-repartition-enseignant',
  templateUrl: './repartition-enseignant.component.html',
  styleUrls: ['./repartition-enseignant.component.scss']
})
export class RepartitionEnseignantComponent {

  dataSource1!: any;row: any;
;
  dataSource!: any;

  displayedColumns = [
    'Fr_CodeMatiere',
    'Fr_NomMatiere',
    'Fr_Nom',
    'Fr_Prenom',
    // 'cocher',
    'Actions'
  ];

  displayedColumns1 = ['CodeClasse','cochers'];

  

  IDCLASSES!: string;
  IDENS_CLASSE!:number
  IDMATIERE!:number
  IDENSEIGNANT!: number;
  selectedClassId!: string;

  classList!:Classe[]
  isLoading!: boolean;
  isloadingEnseignant!:boolean

// Dans votre composant TypeScript
hovering: boolean = false;

showMessage(value: boolean) {
  this.hovering = value;
}

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public _location: Location,
    private classeService: ClasseService,
    private enseignantService:EnseignantService,
    private globalService:GlobalService
  ) {}

  ngOnInit(): void {
    this.classe();
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  classe() {
    this.classeService.get().subscribe(
      (data) => {
        console.log(data);
        this.dataSource1 = new MatTableDataSource(data);
  
        if (data.length > 0) {
          this.IDCLASSES = data[0].IDCLASSES;
          this.dataSource1.data[0].isChecked = true;
          console.log(this.IDCLASSES)
          this.getEnseignantByClasse()
        }
        this.dataSource1.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  checkLineClass(element: any) {
    const elements = element
    console.log(elements)
    const classID = element.IDCLASSES;
    this.IDCLASSES = classID
    console.log(this.IDCLASSES)
    this.getEnseignantByClasse()
  }

  checkLineMatiere(element:any){
    this.IDMATIERE = element.IDMATIERE
    console.log(this.IDMATIERE,this.IDENS_CLASSE)
  }
 
  
   getEnseignantByClasse(){
     this.isloadingEnseignant = true
     this.enseignantService.getEnsMatiereClasse(this.IDCLASSES).subscribe((data)=>{
       console.log(data)
       this.isloadingEnseignant = false
       this.isLoading = false;
       this.dataSource = new MatTableDataSource(data);
     },(error)=>{
       console.log(error)
     })
   }

   openEnseiganantByMatiere(element:any){
    console.log(element)
    if(element.IDMATIERE > 0 ){
      const ref = this.dialog.open(ChooseEnseignantByMatiereComponent)
      ref.componentInstance.IDCLASSES = element.IDCLASSES
      ref.componentInstance.IDMATIERE = element.IDMATIERE
      ref.componentInstance.IDENS_CLASSE = element.IDENS_CLASSE
      ref.id = 'ChooseEnseignantByMatiereComponent'
      ref.afterClosed().subscribe((result) => {
        console.log(result)
        if(result){
          this.getEnseignantByClasse()
        }
      }
    )}else{
      const alert = this.dialog.open(AlertComponent)
      alert.componentInstance.content = "Vous devez selectionner une matière"
    }
  }

  openEnseiganant(){
    if(this.IDMATIERE > 0 ){
      const dialog = this.dialog.open(ChooseEnseignantComponent)
      dialog.componentInstance.IDCLASSES = this.IDCLASSES
      dialog.componentInstance.IDMATIERE = this.IDMATIERE
      dialog.componentInstance.IDENS_CLASSE = this.IDENS_CLASSE
      dialog.afterClosed().subscribe((result)=>{
        console.log(result)
        if(result){
          this.getEnseignantByClasse()
         }
      })
    }else{
      const alert = this.dialog.open(AlertComponent)
      alert.componentInstance.content = "Vous devez selectionner une matière"
    }

  }

  applyFilterclasse(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource1.filter = value.trim().toLowerCase();
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

  deleteline(element: any): void {
    const Element = element
    const alert =  this.dialog.open(AlertComponent)
    alert.componentInstance.content = "Voulez-vous supprimer la repartition ?"
    alert.afterClosed().subscribe(result =>{
      if(result){
        this.enseignantService.deleteRepartitionEnseignant(Element.IDENS_CLASSE).pipe(
          tap(data => {
            console.log(data);
            this.getEnseignantByClasse()
            this.globalService.toastShow("Repartition supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    })
  }

}
