import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Actualite } from 'src/app/espace-eleve/models/actualite.model';
import { ActualiteService } from 'src/app/espace-eleve/services/actualite.service';
import { Enseigant } from 'src/app/models/enseigant.model';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { GlobalService } from 'src/app/services/global.service';
import { constantes } from 'src/environnements/constantes';
import { environment } from 'src/environnements/environnement.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  routes = environment.routes.Enseignant.espaceEnseigant.base;
  emploisDuTempsIsLoading!: boolean
  enseignant!: Enseigant
  actualites$!: Observable<Actualite[]>

  constructor(
    private enseignantService: EnseignantService,
    private globalService: GlobalService,
    private actualiteService: ActualiteService
  ) {}

  ngOnInit(): void {
    this.actualites$ = this.actualiteService.get();

    const enseignantAuth = localStorage.getItem(constantes.auth.enseignant);
    if(enseignantAuth){
      this.enseignant = JSON.parse(enseignantAuth);
    }
  }

  /*imprimer() {
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
  }*/

  convertAmountToPercentage(total: number, rest_amount: number){
     const resPercentage = (rest_amount * 100) / total;
     return resPercentage;
  }
}
