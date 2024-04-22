import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Fonction } from 'src/app/models/fonction.model';
import { MatDialog } from '@angular/material/dialog';
import { Matiere } from 'src/app/models/matiere.model';
import { MatiereService } from '../../services/matiere.service';
import { GlobalService } from 'src/app/services/global.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ObservationNotesMatiereFormComponent } from 'src/app/obsertions-notes-matiere/observation-notes-matiere-form/observation-notes-matiere-form.component';
import { Observation } from 'src/app/models/observation.model';
import { matiere } from 'src/environnements/constantes';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { GroupeMatiereService } from 'src/app/services/groupe-matiere.service';
import { GroupeMatiere } from 'src/app/models/groupeMatiere.model';


@Component({
  selector: 'app-matiere-form',
  templateUrl: './matiere-form.component.html',
  styleUrls: ['./matiere-form.component.scss']
})
export class MatiereFormComponent {
  dataSource!: any;
  displayedColumns = [
    'noteMinimale',
    'Observation',
    'Couleur',
    'Actions'
  ];
  isLoading!: boolean
  @Input() action !: "create" | "edit" | "view"
  IDMATIERE!: number
  IndBulletin!: number
  Fr_CodeMatiere!: string
  Fr_NomMatiere!: string
  JourSansCours!: number
  EstUnGroupement!: boolean
  isloadingObservation!:boolean
  isLoadingpage!:boolean
  MatieresDuGroupement!: string
  matiereList!:Matiere[]
  groupematiereList!:GroupeMatiere[]

  
  isFormValid(): any {
    return this.Fr_CodeMatiere && this.Fr_NomMatiere;
  }
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private MatiereService:MatiereService,
    private globalService:GlobalService,
    private groupematiereService:GroupeMatiereService
  ) {}

  ngOnInit(): void { 
    if (this.IDMATIERE) {
      this.initForUpdate(this.IDMATIERE)
   }
   console.log(this.IDMATIERE);
    this.getObservation()
    this.loadgroupeMatiere()
  }

  loadmatiere(){
    this.MatiereService.get().subscribe((data)=>{
      console.log(data);
      this.matiereList = data
      console.log(this.matiereList);
      
    })
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  initForUpdate(MATIEREID: number) {
    this.isLoadingpage = true
    this.MatiereService.getOne(MATIEREID).subscribe((data) => {
      console.log(data);
      this.isLoadingpage = false
      this.Fr_CodeMatiere = data.Fr_CodeMatiere
      this.Fr_NomMatiere = data.Fr_NomMatiere
      this.EstUnGroupement = data.EstUnGroupement
      this.IndBulletin = data.IndBulletin
      this.JourSansCours = data.JourSansCours
      this.MatieresDuGroupement = data.MatieresDuGroupement
    });
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  loadgroupeMatiere(){
    this.groupematiereService.get().subscribe((data) => {
      console.log(data);
      this.groupematiereList = data
    })
  }

  onSubmitForm(form: NgForm) {
    const m: Matiere = form.value;
    m.IDMATIERE = this.IDMATIERE
    this.isLoadingpage = true
    console.log(m);
    if (this.action === 'edit') {
      this.MatiereService.update(m).pipe(
        tap(data => {
          this.dialog.getDialogById('MatiereFormComponent')?.close(true)
          this.globalService.toastShow("matière modifié.", "Modification")
        }),
        finalize(() => {
          this.isLoadingpage = false
        })
      ).subscribe()
    } else {
      this.MatiereService.create(m).pipe(
        tap(data => {
          console.log(data);
          this.dialog.getDialogById('MatiereFormComponent')?.close(true)
          this.globalService.toastShow("Nouvelle matière Ajouté.", "Ajout")
        }),
        finalize(() => {
          this.isLoadingpage = false
        })
      ).subscribe()
    }
  }

  // Gestion des obserations ici

  getObservation() {
    this.isloadingObservation = true
    this.MatiereService.getObservation(this.IDMATIERE).subscribe((data)=>{
      console.log(data)
      this.isloadingObservation = false
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },)
  }

  create(){
    const dialog = this.dialog.open(ObservationNotesMatiereFormComponent)
    dialog.componentInstance.action = "create"
    dialog.componentInstance.IDMATIERE = this.IDMATIERE
    dialog.id = 'ObservationNotesMatiereFormComponent'
    dialog.afterClosed().subscribe((result)=>{
      if (result) {
        this.getObservation()
      }
    })
  }

  edit(observation:Observation){
    const dialog = this.dialog.open(ObservationNotesMatiereFormComponent)
    dialog.componentInstance.IDOBSERVATIONS_AUTO = observation.IDOBSERVATIONS_AUTO
    dialog.componentInstance.action = "edit"
    dialog.componentInstance.IDMATIERE = this.IDMATIERE
    dialog.id = 'ObservationNotesMatiereFormComponent'
    dialog.afterClosed().subscribe((result)=>{
      if (result) {
        this.getObservation()
      }
    })
  }

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
        this.MatiereService.deleteObservation(obsertion.IDOBSERVATIONS_AUTO).pipe(
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
// END
}
