import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import {
  EmploiDuTemps,
  responseEmploiDuTemps,
} from 'src/app/core/models/emploi-du-temps.models';
import { Seance } from 'src/app/dashboard/planning/config-emploi-du-temps/config-emploi.model';
import { SeanceWithoutEnseigneBool } from '../../dashboard/planning/config-emploi-du-temps/config-emploi.model';
import { EmploiDuTempsService } from 'src/app/core/services/emploi-du-temps.service';

@Component({
  selector: 'app-emploi-du-temps',
  templateUrl: './emploi-du-temps.component.html',
  styleUrls: ['./emploi-du-temps.component.scss'],
})
export class EmploiDuTempsComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  panelOpenState = false;
  @Input() visitor!: 'enseignant' | 'eleve' | 'agent' | 'parent';
  dataSource: EmploiDuTemps[] = [];
  seances: any[] = [];
  indiceJours = [
    { name: 'Lundi', id: 1 },
    { name: 'Mardi', id: 2 },
    { name: 'Mercredi', id: 3 },
    { name: 'Jeudi', id: 4 },
    { name: 'Vendredi', id: 5 },
    { name: 'Samedi', id: 6 },
    { name: 'Dimanche', id: 7 },
  ];
  eleve: any;
  isloadingEmploiDuTemps!: boolean
indice: any;

  constructor(
    private route: ActivatedRoute,
    private emploidutempsService: EmploiDuTempsService
  ) {}

  ngOnInit(): void {
    const eleveSelectedString = localStorage.getItem('clickedElement');
    if (eleveSelectedString !== null) {
      this.isloadingEmploiDuTemps = true
      console.log(eleveSelectedString);
      this.eleve = JSON.parse(eleveSelectedString);
      console.log(this.eleve);
      
      this.emploidutempsService.getEmploisDutemps(this.eleve.IDCLASSE, 0, 0, 0, 0, 0).subscribe((data) => {
        console.log(data);
        this.isloadingEmploiDuTemps = false
        this.seances = data.Seance
        this.dataSource = data.tabEmploiDuTemps
      });
    } else {
      console.log(
        "Aucune valeur n'a été trouvée dans le stockage local pour la clé 'eleveSelected'."
      );
    }
 
  }
  getSeanceByIndice(numSeance: number): Seance | undefined{
    return this.seances.find(elt => elt.NumeroSeance == numSeance)
  }

  filterByIndiceJour(ind: number): EmploiDuTemps[] {
    return this.dataSource.filter((elt) => elt.IndJour == ind);
  }

}
