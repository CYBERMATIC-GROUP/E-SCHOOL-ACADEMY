import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nationalite } from 'src/app/models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfigurationMatiere } from 'src/app/models/config.matiere.model';
import { MatiereService } from 'src/app/services/matiere.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { GroupeMatiere } from 'src/app/models/groupeMatiere.model';
import { GroupeMatiereService } from 'src/app/services/groupe-matiere.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-config-matiere-form',
  templateUrl: './config-matiere-form.component.html',
  styleUrls: ['./config-matiere-form.component.scss']
})
export class ConfigMatiereFormComponent implements OnInit {

  @Input() action!: 'create' | 'edit' | 'view';

  IDMAT_NIV_BRA: number = 0
  IDMATIERE!: number
  IDNIVEAU: number = 0
  IDBRANCHE: number = 0
  EnseigneeOui: boolean = true
  EnseigneeEnGroupe: boolean = false
  Essentielle: boolean = false
  nbreHeureSemaine: number = 2
  nbreHeureMaxiJour: number = 2
  nbreMinimumSuccessif: number = 0
  Coefficient: number = 1
  IDGROUPESMATIERES: number = 0
  EnseigneePeriode1: boolean = true
  EnseigneePeriode2: boolean = true
  EnseigneePeriode3: boolean = true
  NbreCredits: number = 4
  MoyenneMinValidation: number = 10
  VolumeHoraireCoursTheoriques: number = 0
  VolumeHoraireTravauxPratiques: number = 0
  VolumeHoraireTravauxDiriges: number = 0
  VolumeHoraireEvaluations: number = 0
  VolumeHoraireEtudiant: number = 0
  VolumeHoraireStage: number = 0
  VolumeHoraireTotal: number = 0
  ObjectifMatiere: string = ''
  IDMatieresDuGroupement: string = ''
  IDMatieresDuGroupement_Defaut: boolean = false
  CoefBorneMax: number = 1
  CodeMatiere: string = ''
  NomMatiere: string = ''
  LibelleGroupeMatiere: string = ''
  isLoading!: boolean;
  nIDMAT_NIV_BRA: number = 0
  isSaving!: boolean;
  Groupematiere!:GroupeMatiere[]
  IDNIVEAUMatiere!: number;
  IDBRANCHEMatiere!: number;
  isLoadingpage!:boolean
  // action!: string = 'view';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private matiereService: MatiereService,
    private dataSharingService:DataSharingService,
    private goupeMatiereService:GroupeMatiereService,
    private globalService:GlobalService

  ) {}


  ngOnInit(): void {

    if(this.IDMAT_NIV_BRA){
      console.log(this.IDMAT_NIV_BRA)
      this.initFormMatiere(this.IDMAT_NIV_BRA)
    }
    const IDBRANCHEMatiere = this.dataSharingService.IDBRANCHEMatiere
    const IDNIVEAUMatiere = this.dataSharingService.IDNIVEAUMatiere

    this.IDNIVEAUMatiere = IDNIVEAUMatiere
    this.IDBRANCHEMatiere = IDBRANCHEMatiere

    console.log(this.action)

    console.log(this.IDMATIERE)
    console.log(this.IDBRANCHEMatiere)
    console.log(this.IDNIVEAUMatiere)
    this.loadgroupe()
  }

  loadgroupe(){
    this.goupeMatiereService.get().subscribe((data)=>{
      console.log(data)
      this.Groupematiere = data
    })
  }


  initFormMatiere(matiereID:number){
    this.isLoadingpage = true
    this.matiereService.getOneMatiereByNieveuBranche(matiereID).subscribe((data)=>{
      console.log(data)
      this.isLoadingpage = false
      this.EnseigneeOui = data.EnseigneeOui
      this.EnseigneeEnGroupe = data.EnseigneeEnGroupe
      this.Essentielle = data.Essentielle
      this.nbreHeureSemaine = data.nbreHeureSemaine
      this.nbreHeureMaxiJour = data.nbreHeureMaxiJour
      this.nbreMinimumSuccessif = data.nbreMinimumSuccessif
      this.Coefficient = data.Coefficient
      this.IDGROUPESMATIERES = data.IDGROUPESMATIERES
      this.EnseigneePeriode1 = data.EnseigneePeriode1
      this.EnseigneePeriode2 = data.EnseigneePeriode2
      this.EnseigneePeriode3 = data.EnseigneePeriode3
      this.NbreCredits = data.NbreCredits
      this.MoyenneMinValidation = data.MoyenneMinValidation
      this.VolumeHoraireCoursTheoriques = data.VolumeHoraireCoursTheoriques
      this.VolumeHoraireTravauxPratiques = data.VolumeHoraireTravauxPratiques
      this.VolumeHoraireTravauxDiriges = data.VolumeHoraireTravauxDiriges
      this.VolumeHoraireEvaluations = data.VolumeHoraireEvaluations
      this.VolumeHoraireEtudiant = data.VolumeHoraireEtudiant
      this.VolumeHoraireStage = data.VolumeHoraireStage
      this.VolumeHoraireTotal = data.VolumeHoraireTotal
      this.ObjectifMatiere = data.ObjectifMatiere
      this.IDMatieresDuGroupement = data.IDMatieresDuGroupement
      this.IDMatieresDuGroupement_Defaut = data.IDMatieresDuGroupement_Defaut
      this.CoefBorneMax = data.CoefBorneMax
      this.CodeMatiere = data.CodeMatiere
      this.NomMatiere = data.NomMatiere
      this.LibelleGroupeMatiere = data.LibelleGroupeMatiere
      console.log(this.NomMatiere)
    },(error)=>{
      console.log(error)
    })
  }

  onSubmitForm(form: NgForm) {
    const matiere: ConfigurationMatiere = form.value;
    const matiereconfig : ConfigurationMatiere = form.value
    matiere.IDMAT_NIV_BRA = this.IDMAT_NIV_BRA;
    matiereconfig.IDBRANCHE = this.IDBRANCHEMatiere
    matiereconfig.IDNIVEAU = this.IDNIVEAUMatiere
    matiereconfig.IDMATIERE = this.IDMATIERE

    if (this.action === 'edit') {
      this.isLoading = true
      this.matiereService
        .updateMatiereByNiveauBranche(matiere).pipe(
          tap(data => {
            console.log(data);
            this.isLoading = false;
            this.globalService.toastShow("Votre matière a été modifié  avec succès", "Succès", "success");
            this.isSaving = true;
            this.dialog.getDialogById('configMatiereForm')?.close(true)
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
    } else {
      matiereconfig.EnseigneeOui = this.EnseigneeOui = true
      console.log(matiereconfig.EnseigneeOui)
      this.isLoading = true
      this.matiereService.ConfigMatiere(matiereconfig,this.nIDMAT_NIV_BRA).pipe(
        tap(data => {
          console.log(data);
          this.isLoading = false;
          this.globalService.toastShow("Votre matière a été ajouté  avec succès", "Succès", "success");
          this.isSaving = true
          this.dialog.getDialogById('configMatiereForm')?.close(true)
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }
}
