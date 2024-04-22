import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TabClasse } from 'src/app/models/tabclass.model';
import { ClasseService } from 'src/app/services/classe.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { NiveauService } from 'src/app/services/niveau.service';
import { BrancheService } from 'src/app/services/branche.service';
import { Branche } from 'src/app/models/branche.model';
import { Niveau } from 'src/app/models/niveau.model';
import { Classe } from 'src/app/models/classe.model';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-fraisscolaire',
  templateUrl: './fraisscolaire.component.html',
  styleUrls: ['./fraisscolaire.component.scss'],
})
export class FraisscolaireComponent {
  dataSource!: any;
  displayedColumns = [
    'CodeClasse',
    'NomClasse',
    'IDNIVEAU',
    'IDBRANCHE',
    'cocher'
  ];

  IDCLASSES!: number;
  isLoading!: boolean;
  isLoadingvalidate!:boolean
  classeSelected!: Classe;
  niveaueList!: Niveau[];
  brancheList!: Branche[];
  tableau: { IDCLASSES: number }[] = [];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public _location: Location,
    private classeService: ClasseService,
    private niveauService: NiveauService,
    private brancheService: BrancheService,
    private maintenanceService:MaintenanceService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.class();
    this.niveau();
    this.branche();
  }
  branche() {
    this.brancheService.get().subscribe(
      (data) => {
        console.log(data);
        this.brancheList = data;
      }
    );
  }

  niveau() {
    this.niveauService.get().subscribe(
      (data) => {
        console.log(data);
        this.niveaueList = data;
      }
    );
  }

  getNiveau(niveauId: string): string {
    const niveau = this.niveaueList.find((item) => item.IDNIVEAU === niveauId);
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
    this.isLoading = true;
    this.classeService.getClass('0', '0', 0).subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  onClickLine(classe: Classe) {
    console.log(classe.IDCLASSES);
    this.classeSelected = classe;
  }

  read(isChecked: boolean, element: any) {
    if (isChecked) {
      const classeId = element.IDCLASSES;
      this.tableau.push({ IDCLASSES: classeId });
    }
  }

  valider() {
    this.sendNextClass(0);
  }
  sendNextClass(index: number) {
    this.isLoadingvalidate = true
    if (index >= this.tableau.length) {
      this.globalService.reloadComponent("/maintenanceFraisScolaire")
      this.globalService.alert("Maintenance effectuée avec succès","Information","info","OK","",true)
      this.isLoadingvalidate = false
      return;
    } 
    const classId = this.tableau[index].IDCLASSES;
    this.IDCLASSES = classId
    this.maintenanceService.getMaintennaceByClasse([{ IDCLASSES: classId }])
      .subscribe(
        (data) => {
          console.log(data);
          this.sendNextClass(index + 1);
        },
        (error) => {
          console.log(error);
          this.sendNextClass(index + 1);
        }
      );
  }
}
