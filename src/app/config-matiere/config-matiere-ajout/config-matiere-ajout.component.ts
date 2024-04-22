import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Matiere } from 'src/app/models/matiere.model';
import { MatiereService } from 'src/app/services/matiere.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { ConfigMatiereFormComponent } from '../config-matiere-form/config-matiere-form.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-config-matiere-ajout',
  templateUrl: './config-matiere-ajout.component.html',
  styleUrls: ['./config-matiere-ajout.component.scss']
})
export class ConfigMatiereAjoutComponent {

  dataSource!: any;
  displayedColumns = [
    'Fr_CodeMatiere',
    'Fr_NomMatiere',
  ];
  isLoading!: boolean
  matiereSelected!: Matiere;
  isSubmit!: boolean;

  constructor(

    private router:Router,
    public dialog: MatDialog,
    public _location:Location,
    private matiereService:MatiereService,
    private globalService:GlobalService

  ) { }

  ngOnInit(): void {

    this.matiere();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  matiere() {
    this.isLoading = true
    this.matiereService.get().subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
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

  onClickLine(matiere: Matiere){
    console.log("clicque : "+ matiere.IDMATIERE);
    this.matiereSelected = matiere;
  }

  creatematiere(){
    if (this.matiereSelected) {
      const dialog = this.dialog.open(ConfigMatiereFormComponent)
      dialog.componentInstance.action = "create"
      dialog.componentInstance.CodeMatiere = this.matiereSelected.Fr_CodeMatiere
      dialog.componentInstance.NomMatiere = this.matiereSelected.Fr_NomMatiere
      dialog.componentInstance.IDMATIERE = this.matiereSelected.IDMATIERE
      dialog.id = 'configMatiereForm'
      dialog.afterClosed().subscribe((result) => {
        if(result){
          //this.globalService.toastShow("Votre matière a été ajouté  avec succès", "Succès", "success");
          this.dialog.getDialogById('configMatiereAjout')?.close(true)
        }
      })


    } else {

      const ref = this.dialog.open(AlertComponent);
      ref.componentInstance.type = 'danger';
      ref.componentInstance.content = "Vous devez sélectionner une matiere";
    }

  }


}
