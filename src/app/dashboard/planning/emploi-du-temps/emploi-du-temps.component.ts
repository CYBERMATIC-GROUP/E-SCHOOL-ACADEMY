import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, finalize, map, tap } from 'rxjs';
import { Classe } from 'src/app/models/classe.model';
import { Matiere } from 'src/app/models/matiere.model';
import { MatiereService } from 'src/app/services/matiere.service';
import { TableauEmlpoiDuTempsComponent, objEmploisDuTemps } from './tableau-emlpoi-du-temps/tableau-emlpoi-du-temps.component';
import { EmploiDuTempsService, emploiCreateOrSave } from 'src/app/core/services/emploi-du-temps.service';
import { EmploiDuTemps, GroupeEmploiDuTemps, responseEmploiDuTemps } from 'src/app/core/models/emploi-du-temps.models';
import { indiceDays } from 'src/environnements/constantes';
import { GlobalService } from 'src/app/services/global.service';
import { ClasseService } from 'src/app/services/classe.service';

@Component({
  selector: 'app-emploi-du-temps',
  templateUrl: './emploi-du-temps.component.html',
  styleUrls: ['./emploi-du-temps.component.scss']
})
export class EmploiDuTempsComponent implements OnInit  {
  matieres$!: Observable<Matiere[]>;
  matiereChosed!: Matiere;
  classeChosed!: Classe;
  @ViewChild(TableauEmlpoiDuTempsComponent) tableComponent!: TableauEmlpoiDuTempsComponent;
  emploiChosed!: EmploiDuTemps
  dataEmploiDuTemps$!: Observable<objEmploisDuTemps[]>;
  groupeEmploiDuTemps$!: Observable<GroupeEmploiDuTemps[]>;
  groupeEmploiSelected: number = 1
  emploiIsSubmit!: boolean
  emploiIsDeleted!: boolean
  genIsLoad!: boolean;
  printIsLoad!: boolean;

  constructor(
    private matiereService: MatiereService,
    private emploiDuTempsService: EmploiDuTempsService,
    private globalService: GlobalService,
    private classeService: ClasseService
  ){}

  ngOnInit(): void {
    this.groupeEmploiDuTemps$ = this.emploiDuTempsService.getGroupeEmploisDutemps()
    this.groupeEmploiDuTemps$.subscribe()
  }

  onChangeClasse(classe: Classe){
    this.classeChosed = classe
    console.log(this.classeChosed);
    this.matieres$ = this.matiereService.getEnseignantClasseMatiere(Number(classe.IDCLASSES), 0)
    this.loadEmploi()
  }

  onPrint(){
    if(this.classeChosed){
      this.printIsLoad = true

      this.classeService.impressionEmploiDuTempByClasse(Number(this.classeChosed.IDCLASSES)).pipe(
        tap(res => {
          this.globalService.printFile(res.Etat, "Emploi du temps classe " + this.classeChosed.CodeClasse)
        }),
        finalize(() => {
          this.printIsLoad = false;
        })
      ).subscribe()
    }else{
      this.globalService.toastShow("Aucune classe sélectionnée !", "info")
    }
  }

  onGenerate(){

  }

  private loadEmploi(){
    if(this.groupeEmploiSelected && this.classeChosed){
      this.dataEmploiDuTemps$ = this.emploiDuTempsService.getEmploisDutemps(Number(this.classeChosed.IDCLASSES), 0, 0, 0, 0, 0, this.groupeEmploiSelected).pipe(
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
  }

  onChoseMatiere(matiere: Matiere){
    this.matiereChosed = matiere
    console.log(matiere);
  }

  onValidMatiere(){
    if(this.groupeEmploiSelected && this.matiereChosed && this.classeChosed){
      this.tableComponent.updateEmplois(this.emploiChosed.IndJour, 'Insertion en cours...', this.emploiChosed.IDLIG_EMPLOI)

      const emploiData: emploiCreateOrSave = {
        IDMATIERE: this.matiereChosed.IDMATIERE,
        IDCLASSES: Number(this.classeChosed.IDCLASSES),
        IndJour: this.emploiChosed?.IndJour,
        IndSeance: this.emploiChosed?.IndSeance,
        IDEMPLOIDUTEMPS: 1,
        IDLIG_EMPLOI: this.emploiChosed?.IDLIG_EMPLOI ?? 0
      }
      this.emploiIsSubmit = true;
      this.emploiDuTempsService.saveOrUpdateEmploiDuTemps(emploiData).pipe(
        tap(res => {
          console.log(res)
          const idCreated = res.body
          this.globalService.toastShow("Matière  ajouté avec succès !", "Mise à jour emploi du temps : ", "success");
          //update element on table with new id
          this.tableComponent.updateEmplois(this.emploiChosed.IndJour, this.matiereChosed.Fr_NomMatiere, idCreated)
          //update emploi chosed with new id
          this.emploiChosed.IDLIG_EMPLOI = idCreated
        }),
        finalize(() => {
          this.emploiIsSubmit = false
        })
      ).subscribe()
    }
  }

  onEmitEmploi(obj: EmploiDuTemps){
    this.emploiChosed = obj
  }

  private getMatiere(emplois: EmploiDuTemps[], indiceJour: indiceDays, indiceSeance: number): EmploiDuTemps | undefined{
    const emploi = emplois.find(elt => elt.IndSeance == indiceSeance && elt.IndJour == indiceJour)
    return emploi
  }

  onChangeGroupeEmploi(event: any){
    this.groupeEmploiSelected = event.target.value    
    this.loadEmploi()
  }

  onRemove(){
    if (this.emploiChosed?.IDLIG_EMPLOI && this.emploiChosed.IDLIG_EMPLOI > 0){
      this.emploiIsDeleted = true
      this.emploiDuTempsService.deleteEmploiDutemps(this.emploiChosed.IDLIG_EMPLOI).pipe(
        tap(res => {
          this.globalService.toastShow("Matière retirée avec succès !", "Suppression");
          console.log(res);

          this.tableComponent.updateEmplois(this.emploiChosed.IndJour, '', 0)
        }),
        finalize(() => {
          this.emploiIsDeleted = false
        })
      ).subscribe()
    }
  }
}
