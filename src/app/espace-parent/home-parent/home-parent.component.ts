import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environnements/environnement.prod';
import { Eleve, ListeEleveSimplifie } from 'src/app/models/eleve.model';
import { FraisScolaire } from 'src/app/models/fraispayer.model';
import { Observable, map, pipe, startWith, tap } from 'rxjs';
import { constantes } from 'src/environnements/constantes';
import { GlobalService } from 'src/app/services/global.service';
import { Actualite } from 'src/app/espace-eleve/models/actualite.model';
import { ActualiteService } from 'src/app/espace-eleve/services/actualite.service';
import { Abse, statAbsence } from 'src/app/eleve/models/absence.models';
import { AbsenceService } from 'src/app/eleve/services/absence.service';
import { DevoirEnseignant } from 'src/app/models/devoirs.model';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { EleveService } from 'src/app/services/eleve.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Tuteur } from '../model/response.model';
import { PartageDesDonneesService } from '../Services/partage-des-donnees.service';
@Component({
  selector: 'app-home-parent',
  templateUrl: './home-parent.component.html',
  styleUrls: ['./home-parent.component.scss']
})
export class HomeParentComponent {

  emploiDuTempsIsLoad!: boolean
  routes = environment.routes.Eleve.espaceEleve;
  fraisIsLoad!: boolean;
  absenceIsLoad!: boolean
  eleve!:Eleve
  IDeleve!: number;
  fraisScolaire$!: Observable<FraisScolaire[]>
  statAbsence$!: Observable<Abse>;
  actualites$!: Observable<Actualite[]>;
  devoirIsLoad!: boolean;
  lastNote!: number;
  isLoading!: boolean;
  dataSource: any;
  parent: any;
  Famille!: ListeEleveSimplifie[]
  ElevesAbonnes!: ListeEleveSimplifie[]
  dataSource1: any;


  constructor(
    private eleveService: EleveService,
    private globalService: GlobalService,
    private actualiteService: ActualiteService,
    private absenceService: AbsenceService,
    private partageDesDonneesServices: PartageDesDonneesService
  ) {}

  ngOnInit(): void {
    // this.actualites$ = this.actualiteService.get();
    // const eleveAuth = localStorage.getItem(constantes.auth.parent);
    // if(eleveAuth){
    //   this.eleve = JSON.parse(eleveAuth);
    //   this.IDeleve = this.eleve.IDELEVE

    //   this.fraisScolaire$ = this.eleveService.getFraisScolaire(this.IDeleve, false).pipe(
    //     map(res => res.FraisScolaires)
    //   );


    //   const objCookie = this.cookieService.get(this.absenceService.cookieForStatEleve)
    //   if (objCookie){
    //     this.statAbsence$ = this.absenceService.getStatAbsenceForEleve(this.IDeleve).pipe(
    //       startWith(JSON.parse(objCookie)),
    //       tap(res => {
    //         const stat: statAbsence = res
    //         this.lastNote = Number(stat.Les_Notes[stat.Les_Notes.length - 1].sNote)
    //       }),
    //       map(res => res.ABSE),
    //     )
    //   }else{
    //     this.statAbsence$ = this.absenceService.getStatAbsenceForEleve(this.IDeleve).pipe(
    //       map(res => res.ABSE),
    //     )
    //   }

    // }
    const parentObj = localStorage.getItem(constantes.auth.parent)

    if (parentObj) {
      this.parent = JSON.parse(parentObj)
      console.log(this.parent);
      this.ListEleveAddByParents(this.parent.Tuteur.IDCOMPTE_UTILISATEUER)
    }
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() eleveSelected = new EventEmitter<any>();


  ListEleveAddByParents(parentID: number) {
    this.isLoading = true
    this.eleveService.getListEleveAddByParent(parentID).subscribe(data => {
      console.log(data);
      this.isLoading = false
      this.Famille =  data.Famille
      this.ElevesAbonnes = data.ElevesAbonnes
      console.log(this.ElevesAbonnes);
      
      this.dataSource = new MatTableDataSource(this.Famille);
      this.dataSource1 = new MatTableDataSource(this.ElevesAbonnes);
    })

  }

  setEleveSelected(elt: any) {
    localStorage.setItem('eleveSelected', JSON.stringify(elt));
    console.log(elt);
    
  }
  
  // imprimer() {
  //   console.log(this.IDeleve)
  //   this.eleveService.ImprimerEmploiDuTempEleve(this.IDeleve).subscribe((data) => {
  //     console.log(data);
  //     var anchor = document.createElement('a');
  //     anchor.href = data.body.Etat;
  //     anchor.download = 'Emploi du temps ';
  //     document.body.appendChild(anchor);
  //     //  anchor.click();
  //     let pdfWindow = window.open('', '_blank', 'Liste eleves');
  //     pdfWindow
  //       ? pdfWindow!.document.write(
  //           "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
  //             encodeURI(data.body.Etat) +
  //             "'></iframe></body>"
  //         )
  //       : null;
  //   });
  // }

  convertAmountToPercentage(total: number, rest_amount: number){
     const resPercentage = (rest_amount * 100) / total;
     return resPercentage;
  }

}
