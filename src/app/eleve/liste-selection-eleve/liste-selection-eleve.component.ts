import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
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
import { NationaliteService } from '../../services/nationalite.service';
import { Classe } from 'src/app/models/classe.model';
import { ClasseService } from 'src/app/services/classe.service';
import { buffer, debounceTime, fromEvent, map } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-liste-selection-eleve',
  templateUrl: './liste-selection-eleve.component.html',
  styleUrls: ['./liste-selection-eleve.component.scss']
})
export class ListeSelectionEleveComponent implements OnInit {
  IDELEVE!: number;
  DateEntree!: string;
  DateSortie!: string;
  IDNIVEAU!: number;
  IDBRANCHE!: number;
  IDCLASSES!: number;
  CodeEleve!: string;
  DateNaissance!: string;
  Fr_Nom!: string;
  Fr_Prenom!: string;
  @Input() openByFrais: boolean = false;
  dataSource!: any;
  displayedColumns = [
    'CodeEleve',
    'Fr_Nom',
    'Fr_Prenom',
    'Civilite',
    'IDNationalite',
    'CodeClasse'
  ];
  isLoading!: boolean;
  isloadClasse!:boolean

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
    private nationaliteService: NationaliteService,
    private classeService: ClasseService,
    private route: ActivatedRoute,
    private el: ElementRef,
    private globalService: GlobalService
  ) {}

  @HostListener('window:DOMContentLoaded', ['$event'])
  ngOnInit(): void {
    //const doubleClickElement = this.el.nativeElement.querySelector('.double-click-element');
    
    /*fromEvent(doubleClickElement, 'click').pipe(
      buffer(fromEvent(doubleClickElement, 'click').pipe(debounceTime(300))),
      map((clickArray) => clickArray.length)
    ).subscribe((clickCount) => {
      if(clickCount == 2) {
        this.handleDoubleClick()
      }
    })*/

    this.reinscription = this.route.snapshot.params['reinscription'];

    if(!this.reinscription && !this.openByFrais){
      this.displayedColumns.push('Actions');
    }

    this.eleve();
    this.nationalite();
    this.classe();

  }

  handleDoubleClick(){
    
  }

  nationalite() {
    this.nationaliteService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.nationaliteList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  classe() {
    this.classeService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.classeList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getNationaliteLibelle(nationaliteId: number): string {
    const nationalite = this.nationaliteList.find(
      (item) => item.IDNATIONALITE === nationaliteId
    );
    return nationalite ? nationalite.Libelle : '';
  }

  getclasseList(claaseID: string) {
    const classe = this.classeList.find((item) => item.IDCLASSES === claaseID);
    return classe ? classe.NomClasse : '';
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
      .get(0, false).subscribe((data) => {
          console.log(data);
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(data.body);
          this.dataSource.paginator = this.paginator
      });
  }

  loadListeEleve() {
    this.isloadClasse = true
    this.eleveService
      .RecuperationbyName(
   
        this.Fr_Nom,
        this.Fr_Prenom,
        this.IDCLASSES
   
      )
      .subscribe(
        (response) => {
          console.log(response);
          console.log(this.Fr_Nom);
          console.log(this.Fr_Prenom)
          this.isloadClasse = false
          this.dataSource = new MatTableDataSource(response.body);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onSelectionClasse(event: any) {
    console.log(event.option.value);
    const selectClasseName = event.option.value;
    const selectClasse = this.classeList.find(
      (classe) => classe.NomClasse === selectClasseName
    );
    if (selectClasse) {
      const idClasse = parseInt(selectClasse.IDCLASSES, 10);
      console.log(idClasse);
      this.IDCLASSES = idClasse;
      this.isLoading = true;
      this.loadListeEleve();
    }
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
    // this.onSelectionprenom(this.Fr_Prenom);
    this.loadListeEleve();
  }

  onSelectionNom(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.Fr_Nom = parametre;
    this.loadListeEleve();
  }

  onSelectionprenom(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.Fr_Prenom = parametre;
    this.loadListeEleve();
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


  //filtrer une colone par rapport au prenom
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


  view(eleve: Eleve) {
    if(this.openByFrais){
      this.eleveSelected = eleve;
      this.view1();
    }else{
      this.globalService.reloadComponent('eleve/view/' + eleve.IDELEVE)
    }
    this.dialog.closeAll()
  }

  onClickLine(eleve: Eleve){
    console.log(eleve.IDELEVE);
    this.eleveSelected = eleve;
  }

  view1() {
    if (this.eleveSelected) {
      this.router.navigateByUrl('/frais/' + this.eleveSelected.IDELEVE, { state: {
        sIDELEVE: this.eleveSelected.IDELEVE,
        CodeEleve: this.eleveSelected.CodeEleve,
        Fr_Nom: this.eleveSelected.Fr_Nom,
        Fr_Prenom: this.eleveSelected.Fr_Prenom,
        Civilite: this.eleveSelected.Civilite,
        IDNationalite: this.eleveSelected.IDNationalite,
        CodeClasse: this.eleveSelected.CodeClasse
      }}).then(() => {
      });
    } else {
      const ref = this.dialog.open(AlertComponent);
      ref.componentInstance.type = 'danger';
      ref.componentInstance.content = "Vous devez sélectionner un élève !";
    }
  }
  


}
