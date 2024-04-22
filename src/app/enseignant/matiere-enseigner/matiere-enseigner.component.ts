import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { MatiereService } from 'src/app/services/matiere.service';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { ChooseMatiereEnseigneeComponent } from '../choose-matiere-enseignee/choose-matiere-enseignee.component';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { finalize, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-matiere-enseigner',
  templateUrl: './matiere-enseigner.component.html',
  styleUrls: ['./matiere-enseigner.component.scss']
})
export class MatiereEnseignerComponent {

  dataSourceEnseignant!: any;
  dataSource!: any;

  displayedColumns1 = ['CodeEnseignant', 'Fr_Nom', 'Fr_Prenom', 'Civilite','cocher'];
  displayedColumns = ['Fr_CodeMatiere', 'Fr_NomMatiere','Action'];
  
  isLoading!: boolean;
  IDENSEIGNANT!: number;
  isloadingMatiere!: boolean;
  IDMATIERE: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public _location: Location,
    private enseignantService: EnseignantService,
    private matiereService:MatiereService,
    private globaleService:GlobalService
  ) {}

  ngOnInit(): void {
    this.enseignant();
  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  enseignant() {
    this.isLoading = true;
    this.enseignantService.get().subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        this.dataSourceEnseignant = new MatTableDataSource(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkLineEnseignant(element: any) {
    const elements = element
    const ENSEIGNANTID = element.IDENSEIGNANT;
    this.IDENSEIGNANT = ENSEIGNANTID
    console.log(this.IDENSEIGNANT)
    this.getMatiereByEnseignant()
  }

  getMatiereByEnseignant(){
    this.isloadingMatiere = true
    this.dataSource = []
    this.enseignantService.getMatierebyEnsignant(this.IDENSEIGNANT).pipe(
      tap(data =>{
        console.log(data);
        if(data.length === 0){
          this.globaleService.toastShow("Cet enseignant n'a aucune matière associée, veuillez lui associé une matière ","Information")
        }else{
          this.IDENSEIGNANT = data["0"].IDENSEIGNANT
          this.IDMATIERE = data["0"].IDMATIERE
          this.isloadingMatiere = false
          this.dataSource = new MatTableDataSource(data);
        }
      }),finalize(() => {
        this.isloadingMatiere = false
      })
    ).subscribe()
  }

  applyFilterEnseignant(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSourceEnseignant.filter = value.trim().toLowerCase();
  }

  applyFiltermatiere(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

   deleteline(element: any): void {
     const alert =  this.dialog.open(AlertComponent)
     alert.componentInstance.content = "Voulez-vous dissocié la matière " + " " + element.Fr_NomMatiere + ' à ' + 'cet enseignant ?'
     alert.afterClosed().subscribe((result)=>{
       if(result){
         this.matiereService.DeleteMatiereEnseignant(element.IDENSEIGNANT,element.IDMATIERE).subscribe((data)=>{
           console.log(data)
           this.getMatiereByEnseignant()
          })
       }
     })
   }

  openModalMatiere(){
    if(this.IDENSEIGNANT > 0 ){
      const dialog = this.dialog.open(ChooseMatiereEnseigneeComponent)
      dialog.componentInstance.IDENSEIGNANT = this.IDENSEIGNANT
      dialog.id = 'matiereenseigner'
      dialog.afterClosed().subscribe((result)=>{
        if(result){
          this.getMatiereByEnseignant()
        }
      })
    }else{
      const alert = this.dialog.open(AlertComponent)
      alert.componentInstance.content = "Vous devez selectionner un enseignant"
    }
 
  }
  
}
