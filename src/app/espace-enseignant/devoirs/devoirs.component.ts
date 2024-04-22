import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { MatiereService } from 'src/app/services/matiere.service';
import { Matiere } from 'src/app/models/matiere.model';
import { ClasseService } from 'src/app/services/classe.service';
import { Classe } from 'src/app/models/classe.model';
import { Enseigant } from 'src/app/models/enseigant.model';
import { DevoirsFormComponent } from './devoirs-form/devoirs-form.component';
import { DevoirEnseignant } from 'src/app/models/devoirs.model';
import { GlobalService } from 'src/app/services/global.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Observable, finalize, tap } from 'rxjs';
import { actionOnForm, constantes } from 'src/environnements/constantes';

@Component({
  selector: 'app-devoirs',
  templateUrl: './devoirs.component.html',
  styleUrls: ['./devoirs.component.scss']
})
export class DevoirsComponent {
  dataSource: any;
  displayedColumns = [
    'Titre',
    //'Sujet',
    'DateCorrection',
    'CLASSE',
    'MATIERE',
    'ENSEIGNANT',
    'Actions',
  ];
  devoirs$!: Observable<DevoirEnseignant[]>
  isLoading!:boolean
  isloadclasse!:boolean
  isloadens!:boolean
  isloadm!:boolean

  matierelist$!: Observable<Matiere[]>
  classelist$!: Observable<Classe[]>
  enseignant!: Enseigant

  IDCLASSE: number = 0
  IDMATIERE: number = 0
  IDENSEIGNANT!: number 
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private enseigantService: EnseignantService,
    private matiereService: MatiereService,
    private classeService: ClasseService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    const enseigantAuth = localStorage.getItem(constantes.auth.enseignant);
    if(enseigantAuth){
      this.enseignant = JSON.parse(enseigantAuth);
      this.loadclasse()
    }
  }
  
  getDevoisenseignant() {
    this.isLoading = true;
    if(this.IDMATIERE, this.IDCLASSE){
      this.devoirs$ = this.enseigantService.getDevoirsEnseignants(this.IDMATIERE, this.IDCLASSE, this.enseignant.IDENSEIGNANT).pipe(
        tap(res => {
          this.dataSource = new MatTableDataSource(res);
        })
      )
    }
  }

  loadmatiere(idclasse: number){
    this.isloadm = true
    this.matierelist$ = this.enseigantService.getmatiereSelonnIDENSCLASSE(this.enseignant.IDENSEIGNANT, idclasse).pipe(
      tap(res => {
        this.IDMATIERE = res[0].IDMATIERE;
        this.getDevoisenseignant();
      })
    )
  }
  loadclasse(){
    this.classelist$ = this.classeService.get().pipe(
      tap(res => {
        this.IDCLASSE = Number(res[0].IDCLASSES);
        this.loadmatiere(this.IDCLASSE)
      })
    )
  }
  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  selectedClasse(event:any){
    this.IDCLASSE = event.target.value
    this.getDevoisenseignant()
  }

  selectedmatiere(event:any){
    this.IDMATIERE = event.target.value
    this.getDevoisenseignant()
  }

  convertToValideDate(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  createDevoir(){

    if(this.IDCLASSE && this.IDMATIERE){
      const navigationExtras = {
        queryParams: {
          IDMATIERE: this.IDMATIERE,
          IDCLASSE: this.IDCLASSE 
        }
      }
      this.router.navigate(['/espace-enseignant/devoirs/form/' + actionOnForm.CREATE + '/0'], navigationExtras)
    }else{
      this.globalService.alert("Veuiller selectionner une classe et une matiere","Informations","info","OK","")
    }
  }

  view(devoir:DevoirEnseignant){
    this.redirectToForm(devoir, actionOnForm.VIEW)
  }

  edit(devoir:DevoirEnseignant){
    this.redirectToForm(devoir, actionOnForm.MODIFIER)
  }
  delete(devoir:DevoirEnseignant){
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer le devoir ' + devoir.Titre + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.enseigantService.deletedevoier(devoir.IDDEVOIRS).pipe(
          tap(data => {
            console.log(data);
            this.globalService.toastShow("Devoir supprimé avec succès.", "suppression")
            this.getDevoisenseignant()
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });
  }

  redirectToForm(devoir: DevoirEnseignant, action: actionOnForm){
    this.router.navigate(['/espace-enseignant/devoirs/form/' + action + "/" + devoir.IDDEVOIRS])
  }
}
