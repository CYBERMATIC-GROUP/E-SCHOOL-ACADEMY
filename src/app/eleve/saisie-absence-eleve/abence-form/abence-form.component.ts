import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classe } from 'src/app/models/classe.model';
import { AbsenceEleve } from '../../models/absence.models';
import { typeAbsence } from '../../../../environnements/constantes';
import { AbsenceService } from '../../services/absence.service';
import { tap, finalize } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { EmploiDuTemps } from 'src/app/core/models/emploi-du-temps.models';
import { Matiere } from 'src/app/models/matiere.model';

@Component({
  selector: 'app-abence-form',
  templateUrl: './abence-form.component.html',
  styleUrls: ['./abence-form.component.scss']
})
export class AbenceFormComponent implements OnInit {
  @Input() IDELEVE!: number
  @Input() classe!: Classe
  absenceForm!: FormGroup
  absence!: AbsenceEleve
  typeAbsence = typeAbsence
  @Input() dateSelected!:  string
  isLoading!: boolean;
  @Input() emplois!: EmploiDuTemps
  @Input() matiere!: Matiere
  @Input() readonly: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private absenceService: AbsenceService,
    private globalService: GlobalService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.absenceForm = this.formBuilder.group({
      IDABSENCE: [null],
      IDELEVE: [this.IDELEVE],
      IDCLASSES: [this.classe.IDCLASSES],
      IDMATIERES: [null],
      Date: [this.dateSelected],
      NumSeance: [null],
      bAbsenceJustifiee: [false],
      MotifAbsence: [null],
      Observation: [null],
      nTypeAbsence: [typeAbsence.ABSENCE],
      DureeAbsence: [null],
      Discipline: [null],
      TypeAbsence: [null],
      CodeCalasse: [null],
    })

    if(this.absence){
      this.absenceForm.patchValue(this.absence);
      if(this.readonly)
        this.absenceForm.disable();
    }
  }


  onValid(){
    console.log('create');
    
    this.isLoading = true;
    let absence: AbsenceEleve = {
      ...this.absenceForm.value,
      NumSeance: this.emplois?.IndSeance ?? 0,
      NumeroJour: this.emplois?.IndJour ?? 0,
      IDELEVE: this.IDELEVE,
      IDCLASSES: this.classe.IDCLASSES,
      Date: this.dateSelected,
      IDMATIERES: this.matiere ? this.matiere.IDMATIERE : 0
    }

    if(this.absence){
      this.absenceService.createAbsenceEleve(absence).pipe(
        tap(res => {
          this.globalService.toastShow("Absence modifiée avec succès !", "Modification")
          this.dialog.getDialogById('AbenceFormComponent')?.close(true)
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe();
    }else{
      this.absenceService.createAbsenceEleve(absence).pipe(
        tap(res => {
          this.globalService.toastShow("Absence ajoutée avec succès !", "Ajout")
          this.dialog.getDialogById('AbenceFormComponent')?.close(true)
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe();
    }
  }

}
