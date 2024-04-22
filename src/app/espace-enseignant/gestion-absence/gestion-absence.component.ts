import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap, finalize, map } from 'rxjs';
import { EmploiDuTemps, responseEmploiDuTemps } from 'src/app/core/models/emploi-du-temps.models';
import { EmploiDuTempsService } from 'src/app/core/services/emploi-du-temps.service';
import { AbsenceEleve } from 'src/app/eleve/models/absence.models';
import { AbenceFormComponent } from 'src/app/eleve/saisie-absence-eleve/abence-form/abence-form.component';
import { objEmploisDuTemps } from 'src/app/eleve/saisie-absence-eleve/table-emploi-du-temps/table-emploi-du-temps.component';
import { AbsenceService } from 'src/app/eleve/services/absence.service';
import { Classe } from 'src/app/models/classe.model';
import { Eleve } from 'src/app/models/eleve.model';
import { Enseigant } from 'src/app/models/enseigant.model';
import { Matiere } from 'src/app/models/matiere.model';
import { Enseignants } from 'src/app/models/stats.models';
import { ClasseService } from 'src/app/services/classe.service';
import { EleveService } from 'src/app/services/eleve.service';
import { GlobalService } from 'src/app/services/global.service';
import { MatiereService } from 'src/app/services/matiere.service';
import { constantes, indiceDays } from 'src/environnements/constantes';

@Component({
  selector: 'app-gestion-absence',
  templateUrl: './gestion-absence.component.html',
  styleUrls: ['./gestion-absence.component.scss']
})
export class GestionAbsenceComponent {
  dataSource1!: any;
  dataSourceElevesByClass!: any;
  dataSourceAbsence!: any;
  displayedColumns1 = ['CodeClasse','cochers'];
  displayedColumns2 = ['CodeEleve', 'Fr_Nom', 'Fr_Prenom','cocher'];
  displayedColumns3 = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi','Vendredi','Samedi','Dimanche'];
  selectedRow: any;
  isLoading!: boolean;
  isLoadingeleveByclass!: boolean;
  isLoadingeleves!: boolean;
  selectedIDELEVE!: number;
  IDCLASSES!: number;
  message!: string;
  IDELEVE!: number;
  classList!:Classe[]
  selectedDate!: string;
  semaineEnFrancais: string[] = [];
  absence!: AbsenceEleve;
  absenceSaveSubmit!: boolean;
  absenceDeleteSubmit!: boolean;
  classeSelected!: Classe;
  dataEmploiDuTemps$!: Observable<objEmploisDuTemps[]>;
  absences$!: Observable<AbsenceEleve[]>
  absenceSelected!: AbsenceEleve | undefined
  emploiSelected!: EmploiDuTemps | undefined
  dataSource$!: Observable<responseEmploiDuTemps>
  enseignant!: Enseigant
  matiereSelected!: Matiere
  matieres$!: Observable<Matiere[]>

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public _location: Location,
    private classeService: ClasseService,
    private eleveService: EleveService,
    private globalService: GlobalService,
    private emploiDuTempsService: EmploiDuTempsService,
    private absenceService: AbsenceService,
    private route: ActivatedRoute,
    private emploisDuTempsService: EmploiDuTempsService,
    private toastr: ToastrService,
    private matiereService: MatiereService
  ) {}

  ngOnInit(): void {
    const enseignantObj = localStorage.getItem(constantes.auth.enseignant);
    if(enseignantObj){
      this.enseignant = JSON.parse(enseignantObj);
    }
    this.selectedDate = this.globalService.getCurrentDateForInputWithoutDateComptable()
    
  }

  getNumeroJour(): number {
    const dateFormat = new Date(this.selectedDate);
    // Obtenez le numéro du jour (0 pour Dimanche, 1 pour Lundi, ..., 6 pour Samedi)
    let numeroJour = dateFormat.getDay();
    if (numeroJour == 0)
      numeroJour = 7
    return numeroJour;
  }


  loadEmploisDuTemps(classeSelected: Classe){
    this.dataSource$ = this.emploiDuTempsService.getEmploisDutemps(Number(classeSelected.IDCLASSES), this.matiereSelected?.IDMATIERE ?? 0, this.getNumeroJour(), 0, this.enseignant.IDENSEIGNANT, 0, 0)
  }

  onChangeDate(event: any){
    this.selectedDate = event.target.value;
    const convertDate = this.globalService.convertToValideDates(this.selectedDate, "")
    this.loadEmploisDuTemps(this.classeSelected)
    this.loadAbsence()
  }

  SelectedEleve(element: Eleve){
    const IDELEVE = element.IDELEVE
    this.IDELEVE = IDELEVE
    const convertDate = this.globalService.convertToValideDates(this.selectedDate, "")
    //this.absences$ = this.absenceService.getAbsence(IDELEVE, convertDate)
    this.loadAbsence();
  }

  onEmitEmploi(emploi: EmploiDuTemps){
    this.emploiSelected = emploi
  }

  onValidAbsence(){
    if(this.emploiSelected?.IDLIG_EMPLOI){
      const ref = this.dialog.open(AbenceFormComponent)
      ref.componentInstance.classe = this.classeSelected;
      ref.componentInstance.IDELEVE = this.IDELEVE
      ref.componentInstance.emplois = this.emploiSelected
      ref.componentInstance.matiere = this.matiereSelected
      ref.componentInstance.dateSelected = this.globalService.convertToValideDates(this.selectedDate, "")
      ref.id = 'AbenceFormComponent'
      if(this.absenceSelected)
        ref.componentInstance.absence = this.absenceSelected

      ref.afterClosed().subscribe(result => {
        if(result){
          const convertDate = this.globalService.convertToValideDates(this.selectedDate, "")
          //this.absences$ = this.absenceService.getAbsence(this.IDELEVE, convertDate)
          this.emploiSelected = undefined
          this.absenceSelected = undefined
          this.loadAbsence()
        }
      })
    }else{
      this.globalService.toastShow("Aucun emploi du temps sélectionnée !", "Info", "info")
    }
  }

  onRemoveAbsence(){
    if(this.absenceSelected?.IDABSENCE){
      const ref = this.globalService.alert("Voulez-vous supprimer cette absence ? ", "Confirmation", "danger", "NON", "OUI")
      ref.afterClosed().subscribe(result => {
        if(result && this.absenceSelected?.IDABSENCE){
          this.absenceDeleteSubmit = true;
          this.absenceService.deleteAbsenceEleve(this.absenceSelected.IDABSENCE).pipe(
            tap(res => {
              this.globalService.toastShow("Absence supprimée avec succès", "Suppression")
              const convertDate = this.globalService.convertToValideDates(this.selectedDate, "")
              this.absences$ = this.absenceService.getAbsence(this.IDELEVE, convertDate, true);
              this.emploiSelected = undefined
              this.absenceSelected = undefined
            }),
            finalize(() => {
              this.absenceDeleteSubmit = false
            })
          ).subscribe()
        }
      })
    }
    else{
      this.globalService.toastShow("Aucune absence disponible pour cette date", "Info", "info")
    }
  }

  loadEleve(IDCLASSE: number) {
    this.isLoadingeleveByclass = true
    this.eleveService.getelevesByClasse(1, IDCLASSE).pipe(
      map(res => res.body),
      tap((res: Eleve[]) => {
        this.dataSourceElevesByClass = new MatTableDataSource(res);
        this.SelectedEleve(res[0])
      }),
      finalize(() => {
        this.isLoadingeleveByclass = false
      })
    ).subscribe()
  }

  onEmitClass(classe: Classe){
    this.classeSelected = classe
    this.loadEleve(Number(classe.IDCLASSES))
    //this.loadEmploi()
    this.loadEmploisDuTemps(this.classeSelected)
    this.matieres$ = this.matiereService.getEnseignantClasseMatiere(Number(this.classeSelected.IDCLASSES), 0)
  }

  applyFilterEleve(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSourceElevesByClass.filter = value.trim().toLowerCase();
  }

  /*private loadEmploi(){
    console.log(this.classeSelected);

    if(this.classeSelected){
      this.dataEmploiDuTemps$ = this.emploiDuTempsService.getEmploisDutemps(Number(this.classeSelected.IDCLASSES), 0, 0, 0, 0, 0, 1).pipe(
        map(response => {
          const res = response.tabEmploiDuTemps
          console.log(response)

          let emploisDutemps: objEmploisDuTemps[] = []

          response.Seance.forEach(seance => {
            const ind = seance.NumeroSeance
            emploisDutemps.push({
              indiceSeance: ind,
              heure: response.Seance.find(elt => elt.NumeroSeance == ind)?.HeureSeance,
              lundi: this.getMatiere(res, indiceDays.LUNDI, ind),
              mardi: this.getMatiere(res, indiceDays.MARDI, ind),
              mercredi: this.getMatiere(res, indiceDays.MERCREDI, ind),
              jeudi: this.getMatiere(res, indiceDays.JEUDI, ind),
              vendredi: this.getMatiere(res, indiceDays.VENDREDI, ind),
              samedi: this.getMatiere(res, indiceDays.SAMEDI, ind),
              dimanche: this.getMatiere(res, indiceDays.DIMANCHE, ind)
            })
          });
          console.log(emploisDutemps);
          return emploisDutemps
        })
      )
    }
  }*/

  private getMatiere(emplois: EmploiDuTemps[], indiceJour: indiceDays, indiceSeance: number): EmploiDuTemps | undefined{
    const emploi = emplois.find(elt => elt.IndSeance == indiceSeance && elt.IndJour == indiceJour)
    return emploi
  }

  onEmitAbsence(absence: {absence: AbsenceEleve, emplois: EmploiDuTemps}){
    this.absenceSelected = absence.absence;
    this.emploiSelected = absence.emplois;
    this.onValidAbsence();
  }

  onEmitMatiere(matiere: Matiere){
    this.matiereSelected = matiere;
    this.loadAbsence();
    this.loadEmploisDuTemps(this.classeSelected)
  }

  loadAbsence(){
    if(this.IDELEVE && this.selectedDate && this.matiereSelected){
      const convertDate = this.globalService.convertToValideDates(this.selectedDate, "")
      this.absences$ = this.absenceService.getAbsenceByEnseignant(this.enseignant.IDENSEIGNANT, this.IDELEVE, this.matiereSelected.IDMATIERE, convertDate);
    }else{
      this.toastr.info("Veuillez sélectionner la date et la matière !", "")
    }
  }


}
