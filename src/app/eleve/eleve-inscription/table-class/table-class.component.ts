import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TabClasse } from '../../../models/tabclass.model';
import { ClasseService } from 'src/app/services/classe.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { NiveauService } from 'src/app/services/niveau.service';
import { BrancheService } from 'src/app/services/branche.service';
import { Branche } from 'src/app/models/branche.model';
import { Niveau } from 'src/app/models/niveau.model';
import { Classe } from 'src/app/models/classe.model';

@Component({
  selector: 'app-table-class',
  templateUrl: './table-class.component.html',
  styleUrls: ['./table-class.component.scss']
})
export class TableClassComponent {

  dataSource!: any;
  displayedColumns = [
    'CodeClasse',
    'NomClasse',
    'nNbreEleve',
    'nCapacite',
  ];
  isLoading!: boolean
  classeSelected!: Classe;

  niveaueList!: Niveau[];
  brancheList!: Branche[];

  constructor(

    private router:Router,
    public dialog: MatDialog,
    public _location:Location,
    private classeService:ClasseService,
    private niveauService: NiveauService,
    private brancheService: BrancheService,
  
  ) { }

  ngOnInit(): void {
    this.class();
    //this.niveau();
    //this.branche();

  }
  branche() {
    this.brancheService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.brancheList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  niveau() {
    this.niveauService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.niveaueList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getNiveau(niveauId: string): string {
    const niveau = this.niveaueList.find(
      (item) => item.IDNIVEAU === niveauId
    );
    return niveau ? niveau.NomNiveau : '';
  }

  getbranche(brancheid: string): string {
    const branche = this.brancheList.find(
      (item) => item.IDBRANCHE === brancheid
    );
    return branche ? branche.NomBranche : '';
  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  class() {
    this.isLoading = true
    this.classeService.getClassState().subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }


  onClickLine(classe: Classe){
    console.log(classe.IDCLASSES);
    this.classeSelected = classe;
  }

   view(){
     if (this.classeSelected) {
        this.dialog.closeAll();
       /*this.router.navigateByUrl('/eleve/ajout', { state: {

         IDCLASSES: this.classeSelected.IDCLASSES,
         IDNIVEAU: this.classeSelected.IDNIVEAU,
         IDBRANCHE: this.classeSelected.IDBRANCHE,
         NumClasse: this.classeSelected.NumClasse,
         CodeClasse: this.classeSelected.CodeClasse,
         NomClasse: this.classeSelected.NomClasse,
         IDSALLES: this.classeSelected.IDSALLES,
         IDENSEIGNANT_Principal: this.classeSelected.IDENSEIGNANT_Principal,
         IDClassesInspection: this.classeSelected.IDClassesInspection,
         CodeNiveau: this.classeSelected.CodeNiveau,
         CodeBranche: this.classeSelected.CodeBranche,
         CodeSalle: this.classeSelected.CodeSalle
     
       }});*/
     } else {
       const ref = this.dialog.open(AlertComponent);
       ref.componentInstance.type = 'danger';
       ref.componentInstance.content = "Vous devez sélectionner une classe";
     }

     
   }

}
