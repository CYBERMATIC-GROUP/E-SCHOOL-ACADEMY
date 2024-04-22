import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environnements/environnement.prod';
import { EleveService } from '../services/eleve.service';
import { Eleve } from 'src/app/models/eleve.model';
import { FraisScolaire } from 'src/app/models/fraispayer.model';
import { Observable, map, pipe, startWith, tap } from 'rxjs';
import { constantes } from 'src/environnements/constantes';
import { GlobalService } from 'src/app/services/global.service';
import { Actualite } from '../models/actualite.model';
import { ActualiteService } from '../services/actualite.service';
import { Abse, statAbsence } from 'src/app/eleve/models/absence.models';
import { AbsenceService } from 'src/app/eleve/services/absence.service';
import { DevoirEnseignant } from 'src/app/models/devoirs.model';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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


  constructor(
    private eleveService: EleveService,
    private globalService: GlobalService,
    private actualiteService: ActualiteService,
    private absenceService: AbsenceService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.actualites$ = this.actualiteService.get();
    const eleveAuth = localStorage.getItem(constantes.auth.eleve);
    if(eleveAuth){
      this.eleve = JSON.parse(eleveAuth);
      this.IDeleve = this.eleve.IDELEVE

      this.fraisScolaire$ = this.eleveService.getFraisScolaire(this.IDeleve, false).pipe(
        map(res => res.FraisScolaires)
      );


      const objCookie = this.cookieService.get(this.absenceService.cookieForStatEleve)
      if (objCookie){
        this.statAbsence$ = this.absenceService.getStatAbsenceForEleve(this.IDeleve).pipe(
          startWith(JSON.parse(objCookie)),
          tap(res => {
            const stat: statAbsence = res
            this.lastNote = Number(stat.Les_Notes[stat.Les_Notes.length - 1].sNote)
          }),
          map(res => res.ABSE),
        )
      }else{
        this.statAbsence$ = this.absenceService.getStatAbsenceForEleve(this.IDeleve).pipe(
          map(res => res.ABSE),
        )
      }

    }
  }

  imprimer() {
    console.log(this.IDeleve)
    this.eleveService.ImprimerEmploiDuTempEleve(this.IDeleve).subscribe((data) => {
      console.log(data);
      var anchor = document.createElement('a');
      anchor.href = data.body.Etat;
      anchor.download = 'Emploi du temps ';
      document.body.appendChild(anchor);
      //  anchor.click();
      let pdfWindow = window.open('', '_blank', 'Liste eleves');
      pdfWindow
        ? pdfWindow!.document.write(
            "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
              encodeURI(data.body.Etat) +
              "'></iframe></body>"
          )
        : null;
    });
  }

  convertAmountToPercentage(total: number, rest_amount: number){
     const resPercentage = (rest_amount * 100) / total;
     return resPercentage;
  }
}
