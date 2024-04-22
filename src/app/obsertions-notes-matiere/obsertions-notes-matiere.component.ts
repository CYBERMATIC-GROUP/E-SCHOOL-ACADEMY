import { Component, ViewChild } from '@angular/core';
import { MatiereService } from '../services/matiere.service';
import { Observation } from '../models/observation.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from '../services/global.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ObservationNotesMatiereFormComponent } from './observation-notes-matiere-form/observation-notes-matiere-form.component';
import { Matiere } from '../models/matiere.model';
import { AlertComponent } from '../core/alert/alert.component';
import { finalize, tap } from 'rxjs';


@Component({
  selector: 'app-obsertions-notes-matiere',
  templateUrl: './obsertions-notes-matiere.component.html',
  styleUrls: ['./obsertions-notes-matiere.component.scss']
})
export class ObsertionsNotesMatiereComponent {
  dataSource!: any;
  displayedColumns = [
    'noteMinimale',
    'Observation',
    'Couleur',
    'Actions'
  ];
  isLoading!: boolean
  matiereListe!:Matiere[]
  IDMATIERE:number = 0
  matiere!:string
  constructor(
    private router:Router,
    private dialog: MatDialog,
    private globalService: GlobalService,
    private matiereService:MatiereService

  ) { }
  ngOnInit(): void {
    this.loadmatiere()
  }
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getObservation() {
    this.isLoading = true
    this.matiereService.getObservation(this.IDMATIERE).subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },)
  }

  loadmatiere(){
    this.matiereService.get().subscribe((data)=>{
      console.log(data);
      this.matiereListe = data
      this.IDMATIERE = data["0"].IDMATIERE
      this.getObservation()
    })
  }

  selectMatiere(event:any){
    this.IDMATIERE = event.target.value
    console.log(this.IDMATIERE);
    this.getObservation()
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  // create(){
  //   const dialog = this.dialog.open(ObservationNotesMatiereFormComponent)
  //   dialog.componentInstance.action = "create"
  // }

  // edit(observation:Observation){
  //   const dialog = this.dialog.open(ObservationNotesMatiereFormComponent)
  //   dialog.componentInstance.IDOBSERVATIONS_AUTO = observation.IDOBSERVATIONS_AUTO
  //   dialog.componentInstance.action = "edit"
  // }

  view(observation:Observation){
    const dialog = this.dialog.open(ObservationNotesMatiereFormComponent)
    dialog.componentInstance.IDOBSERVATIONS_AUTO = observation.IDOBSERVATIONS_AUTO
    dialog.componentInstance.action = "view"
  }

  delete(obsertion: Observation) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer cette observation ' + obsertion.Observation + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true
        this.matiereService.deleteObservation(obsertion.IDOBSERVATIONS_AUTO).pipe(
          tap(res => {
            console.log(res);
            this.globalService.toastShow("Observation supprimée avec succès.", "Suppression:")
            this.getObservation()
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });

  }
}
