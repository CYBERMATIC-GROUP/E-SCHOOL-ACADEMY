import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Eleve } from 'src/app/models/eleve.model';
import { EleveService } from 'src/app/services/eleve.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Nationalite } from 'src/app/models/nationalite.model';
import { Classe } from 'src/app/models/classe.model';
import { ClasseService } from 'src/app/services/classe.service';
import { Observable, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-reinscription',
  templateUrl: './reinscription.component.html',
  styleUrls: ['./reinscription.component.scss']
})
export class ReinscriptionComponent {

  IDELEVE!: number;
  IDNIVEAU!: number;
  IDBRANCHE!: number;
  IDCLASSES!: number;
  CodeEleve!: string;
  Courriel!: string;
  Fr_Nom!: string;
  Fr_Prenom!: string;
  classes$!: Observable<Classe[]>;
  dataSource!: any;
  displayedColumns = [
    'CodeEleve',
    'Fr_Nom',
    'Fr_Prenom',
    'Civilite',
    'CodeClasse'
  ];
  isLoading!: boolean;

  classeList!: Classe[];
  nationaliteList!: Nationalite[];
  suggestClasse!: Classe[];
  message!: string;
  filteredClasse!: Classe[];
  reinscription!: string;
  eleveSelected: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public _location: Location,
    private eleveService: EleveService,
    private classeService: ClasseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.classes$ = this.classeService.get().pipe(
      tap(res => {
        console.log(res)
        this.classeList = res;
      })
    )
    this.reinscription = this.route.snapshot.params['reinscription'];
    if(!this.reinscription){
      this.displayedColumns.push('Actions');
    }
    this.eleve();
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  convertToValideDate(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  eleve() {
    this.isLoading = true;
    this.eleveService
      .getEleveEnAttenteInscription().subscribe((data) => {
          console.log(data);
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      });
  }

  loadListeEleve(IDCLASSES: number) {
    this.isLoading = true;
    this.eleveService.RecuperationbyName('', '', IDCLASSES).pipe(
      tap(res => {
        this.dataSource = new MatTableDataSource(res.body);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();
  }


  onSelectionClasse(event: any) {
    console.log(event.target.value);
    this.IDCLASSES = event.target.value;
    this.loadListeEleve(this.IDCLASSES);
  }


  //filtrer  la liste des classes
  onInputClasse(event: any) {
    const value = event.target.value;
    this.filteredClasse = this.classeList.filter((classe) => {
      return classe.NomClasse.toLowerCase().includes(value.toLowerCase());
    });
  }
  //Faire apparaitre la liste des classes quand on clique pour la premiere fois
  listeclasse(event: any) {
    const value = event.target.value;

    if (!value) {
      this.filteredClasse = this.classeList;
    } else {
      this.filteredClasse = this.classeList.filter((classe) => {
        return classe.NomClasse.toLowerCase().includes(value.toLowerCase());
      });
    }
  }

  onAfficherClick() {
    this.isLoading = true
    this.onSelectionNom(this.Fr_Nom);
    this.loadListeEleve(0);
  }

  onSelectionNom(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.Fr_Nom = parametre;
    this.loadListeEleve(0);
  }

  onSelectionprenom(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.Fr_Prenom = parametre;
    this.loadListeEleve(0);
  }

  //filtrer une colone par rapport au nom
  applyFilterNom(filterValue: any) {
    const value = filterValue.target.value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any) => {
      const columnName = 'Fr_Nom';
      const columnValue = data[columnName];
      return columnValue && columnValue.toLowerCase().includes(value);
    };

    this.dataSource.filter = value;
  }

  applyFilterpreNom(filterValue: any) {
    const value = filterValue.target.value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any) => {
      const columnName = 'Fr_Prenom';
      const columnValue = data[columnName];
      return columnValue && columnValue.toLowerCase().includes(value);
    };
    this.dataSource.filter = value;
  }

  //filtrer le tableau par rapport a la colone codeEleve
  applyFilter(filterValue: any, columnName: string) {
    const value = filterValue.target.value.trim().toLowerCase();
    if (!columnName || !this.displayedColumns.includes(columnName)) {
      return;
    }
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const columnValue = data[columnName];
      return columnValue && columnValue.toLowerCase().includes(filter);
    };
    this.dataSource.filter = value;
  }


  view(IDELEVE: string) {
    this.router.navigateByUrl('eleve/inscription/view/' + IDELEVE);
  }

  onClickLine(eleve: Eleve){
    console.log(eleve.IDELEVE);
    this.eleveSelected = eleve;
  }

  view1() {
    if (this.eleveSelected) {
      this.router.navigateByUrl('/eleve/reinscrire/' + this.eleveSelected.IDELEVE)
    } else {
      const ref = this.dialog.open(AlertComponent);
      ref.componentInstance.type = 'danger';
      ref.componentInstance.content = "Vous devez sélectionner un élève !";
    }
  }
}
