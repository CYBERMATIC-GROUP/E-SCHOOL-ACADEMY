import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Classe } from 'src/app/models/classe.model';
import { ClasseService } from 'src/app/services/classe.service';
import { Branche } from 'src/app/models/branche.model';
import { BrancheService } from 'src/app/services/branche.service';
import { Niveau } from 'src/app/models/niveau.model';
import { NiveauService } from 'src/app/services/niveau.service';
import { GlobalService } from 'src/app/services/global.service';
import { constantes } from 'src/environnements/constantes';
import { ClasseFormComponent } from '../classe-form/classe-form.component';

@Component({
  selector: 'app-classe-filtre',
  templateUrl: './classe-filtre.component.html',
  styleUrls: ['./classe-filtre.component.scss'],
})
export class ClasseFiltreComponent {
  dataSource!: any;
  displayedColumns = ['CodeClasse', 'NomClasse', 'Actions'];

  isLoading!: boolean;

  IDCLASSES!: number;
  IDNIVEAU!: number;
  IDBRANCHE!: number;
  NumClasse!: number;
  CodeClasse!: string;
  NomClasse!: string;
  IDSALLES!: number;
  IDENSEIGNANT_Principal!: number;
  IDClassesInspection!: number;
  CodeNiveau!: string;
  CodeBranche!: string;
  CodeSalle!: string;

  niveauList!: Niveau[];
  brancheList!: Branche[];
  niveauListSource!: any;
  niveauListDisplayColumns = [
    'NomNiveau',
    'CodeNiveau',
  ];
  niveauIsLoad!: boolean;
  brancheSource!: any;
  brancheListDisplayedCols = [
    'NomBranche',
    'CodeBranche',
  ];
  brancheIsLoad!: boolean;
  classeIsSaving!: boolean;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public _location: Location,
    private brancheService: BrancheService,
    private niveauService: NiveauService,
    private classeService: ClasseService,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {

    this.IDNIVEAU = 0; 
    this.IDBRANCHE = 0;
    this.niveau();
    this.branche();
    //this.loadClasse();
  }

  onNiveauChange(selectedNiveau: number, event: any, CodeNiveau: string) {
    this.IDNIVEAU = selectedNiveau;
    this.CodeNiveau = CodeNiveau;
    this.loadClasse()
  }

  onBrancheChange(selectedBranche: number, event: any, CodeBranche: string) {
    this.IDBRANCHE = selectedBranche;
    this.CodeBranche =  CodeBranche;
    this.loadClasse();
  }

  ajouterClasse() {
    if (this.IDNIVEAU && this.IDBRANCHE) {
      this.router.navigateByUrl(`classe/${this.IDNIVEAU}/${this.IDBRANCHE}`
      );
    } else {
      alert('Veuillez sélectionner un niveau et une branche.');
    }
  }

  onAdClass(){
    this.classeIsSaving = true;
    const msg = "Voulez-vous enregistrer cette la classe " + this.CodeNiveau + "/" + this.CodeBranche;
    const ref = this.globalService.alert(msg, "Ajout", "danger", "Annuler", "OUI");

    ref.afterClosed().subscribe(res => {

      if(res){
        this.classeService.newCreateClasse(this.IDBRANCHE, this.IDNIVEAU).subscribe(data => {
          if(data){
            this.globalService.toastShow("Classe ajoutée avec succes !", "Ajout classe:");
            localStorage.removeItem(constantes.requestCache.classesList);
            this.loadClasse();
          }
          this.classeIsSaving = false;
        });  
      }else{
        this.classeIsSaving = false;
      }

    })
  }

  niveau() {
    this.niveauService.get().subscribe((data) => {
      console.log(data);
      this.niveauList = data;
      this.niveauListSource = new MatTableDataSource(data);
    });
  }

  branche() {
    this.brancheService.get().subscribe(
      (data) => {
        console.log(data);
        this.brancheList = data;
        this.brancheSource = new MatTableDataSource(data);
      }
    );
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadClasse() {
    if (this.IDNIVEAU && this.IDBRANCHE) {
      this.isLoading = true;
      this.classeService.getClasse(this.IDNIVEAU, this.IDBRANCHE, 0).subscribe((data) => {
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  onOpenClasseForm(action: 'view' | 'edit', classe: Classe){
    const ref = this.dialog.open(ClasseFormComponent);
    ref.componentInstance.classeParam = classe;
    ref.componentInstance.action = action
  }

  delete(classe: Classe) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content =
      'Voulez vous supprimer la classe ' + classe.NomClasse + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.classeService
          .deleteclasse(classe.IDCLASSES)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              console.log(error.status);
              return [];
            })
          )
          .subscribe((data) => {
            console.log(data);
            this.router
              .navigateByUrl('/filtre', { skipLocationChange: true })
              .then(() => {
                location.reload();
              });
          });
      }
    });
    console.log(classe);
  }
}
