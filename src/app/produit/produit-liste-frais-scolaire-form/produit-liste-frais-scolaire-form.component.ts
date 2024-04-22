import { Component,Input,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Niveau } from 'src/app/models/niveau.model';
import { NiveauService } from 'src/app/services/niveau.service';
import { Branche } from 'src/app/models/branche.model';
import { BrancheService } from 'src/app/services/branche.service';
import { AdProduit } from 'src/app/models/Ajoutproduit.model';
import { ListeFraisScolaireService } from 'src/app/services/liste-frais-scolaire.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-produit-liste-frais-scolaire-form',
  templateUrl: './produit-liste-frais-scolaire-form.component.html',
  styleUrls: ['./produit-liste-frais-scolaire-form.component.scss']
})
export class ProduitListeFraisScolaireFormComponent {

  @Input() action !: "create" | "edit" | "view"

  dataSource!: any;

  displayedColumns = [
    'CodeProduit',
    'Libelle',
    'Montant',
  ];

  CodeProduit!: string
  Libelle!: string
  NumOrdre!: number
  isLoading!: boolean;
  selectedElement: any;
  element: any;

  IDNIVEAU!: number 
  IDBRANCHE!:number 
  tableau: any[] = [];
  isLoadingliste: boolean = false;
  isValiderButtonDisabled: boolean = true;


  constructor(

    private router:Router,
    public dialog: MatDialog,
    public _location:Location,
    private niveauService:NiveauService,
    private brancheService:BrancheService,
    private dataSharingService:DataSharingService,
    private listeproduitfraisScolaireService:ListeFraisScolaireService
  
  ) { }

  ngOnInit(): void {
    this.ADproduit()
    // const IDNIVEAU = this.dataSharingService.IDNIVEAU;
    // const IDBRANCHE = this.dataSharingService.IDBRANCHE;
    // this.IDNIVEAU = IDNIVEAU
    // this.IDBRANCHE = IDBRANCHE

  console.log(this.IDNIVEAU, this.IDBRANCHE);

  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ADproduit() {
    this.isLoading = true
    this.listeproduitfraisScolaireService.AddProduit(0).subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }
  
  onMontantBlur(element: any) {
    if (element.Montant && element.Montant.trim() !== '') {
      const montant = parseFloat(element.Montant);
  
      if (isNaN(montant)) {
        const dialog = this.dialog.open(AlertComponent, {});
        dialog.componentInstance.content = "Veuillez saisir un montant valide.";
      }
      
      else if (montant <=0) {

        const dialog = this.dialog.open(AlertComponent, {});
        dialog.componentInstance.content = "Veuillez saisir un montant supérieur à zéro.";
      } else {
        const existingElement = this.tableau.find(item => item === element);
  
        if (existingElement) {
          existingElement.Montant = element.Montant;
        } else {
          this.tableau.push(element);
        }
        
        console.log(element);
        console.log(this.tableau);
      }
    }
  }
  
  valider() {
    if (this.tableau.length === 0) {
      const alert = this.dialog.open(AlertComponent, {});
      alert.componentInstance.content = "Veuillez saisir au moins un produit.";
      return;
    }
    const dialog = this.dialog.open(AlertComponent, {});
    dialog.componentInstance.content = "Voulez-vous ajouter les produits sélectionnés ?";
    dialog.afterClosed().subscribe((result) => {
      if (result) {
         this.dialog.closeAll();
        this.listeproduitfraisScolaireService.creation(this.tableau, this.IDNIVEAU, this.IDBRANCHE, 0).subscribe(
          (response) => {
            console.log(this.IDNIVEAU, this.IDBRANCHE);
            console.log(response);
            this.resetMontants();
          },
          (error) => {
            console.error(error);
          }
        );
      } 

      this.resetMontants();

    });
  }
  
  


  resetMontants() {
    this.dataSource.data.forEach((element: any) => {
      element.Montant = '';
    });
  }
  
  
  

}


