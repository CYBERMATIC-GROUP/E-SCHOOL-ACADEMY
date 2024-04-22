import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigEmploi, Seance, TabJour, TabPouse, TabSeance } from './config-emploi.model';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-config-emploi-du-temps',
  templateUrl: './config-emploi-du-temps.component.html',
  styleUrls: ['./config-emploi-du-temps.component.scss']
})
export class ConfigEmploiDuTempsComponent implements OnInit {

  dataSource$!: Observable<configModelForTable[]>
  weekDays = [
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
    'dimanche',
  ]
  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.dataSource$ = this.route.data.pipe(
      map(res => res['configEmploi']),
      map((config: ConfigEmploi) => {

        let finalTable: configModelForTable[] = []

        config.tabSeance.forEach(seance => {
          const tab: configModelForTable = {
            seance: seance,
            lundi: {
              tabjour: config.tabJours.find(elt => elt.NumeroJour == 1),
              seance: config.tabJours.find(elt => elt.NumeroJour == 1)?.Seances.find(elt => elt.NumeroSeance == seance.NumeroSeance)
            },
            mardi: {
              tabjour: config.tabJours.find(elt => elt.NumeroJour == 2),
              seance: config.tabJours.find(elt => elt.NumeroJour == 2)?.Seances.find(elt => elt.NumeroSeance == seance.NumeroSeance)
            },
            mercredi: {
              tabjour: config.tabJours.find(elt => elt.NumeroJour == 3),
              seance: config.tabJours.find(elt => elt.NumeroJour == 3)?.Seances.find(elt => elt.NumeroSeance == seance.NumeroSeance)
            },
            jeudi: {
              tabjour: config.tabJours.find(elt => elt.NumeroJour == 4),
              seance: config.tabJours.find(elt => elt.NumeroJour == 4)?.Seances.find(elt => elt.NumeroSeance == seance.NumeroSeance)
            },
            vendredi: {
              tabjour: config.tabJours.find(elt => elt.NumeroJour == 5),
              seance: config.tabJours.find(elt => elt.NumeroJour == 5)?.Seances.find(elt => elt.NumeroSeance == seance.NumeroSeance)
            },
            samedi: {
              tabjour: config.tabJours.find(elt => elt.NumeroJour == 6),
              seance: config.tabJours.find(elt => elt.NumeroJour == 6)?.Seances.find(elt => elt.NumeroSeance == seance.NumeroSeance)
            },
            dimanche: {
              tabjour: config.tabJours.find(elt => elt.NumeroJour == 7),
              seance: config.tabJours.find(elt => elt.NumeroJour == 7)?.Seances.find(elt => elt.NumeroSeance == seance.NumeroSeance)
            },
            pousse: config.tabPouse.find(elt => elt.NumeroSeance == seance.NumeroSeance)
          }
          finalTable.push(tab)
        });

        return finalTable

      })
    )

    this.dataSource$.pipe(
      tap(res => {
        console.log(res);

      })
    ).subscribe()
  }
}

export interface configModelForTable{
  seance?: Seance,
  lundi?: {
    tabjour?: TabJour,
    seance?: TabSeance
  },
  mardi?: {
    tabjour?: TabJour,
    seance?: TabSeance
  },
  mercredi?: {
    tabjour?: TabJour,
    seance?: TabSeance
  },
  jeudi?: {
    tabjour?: TabJour,
    seance?: TabSeance
  },
  vendredi?: {
    tabjour?: TabJour,
    seance?: TabSeance
  },
  samedi?: {
    tabjour?: TabJour,
    seance?: TabSeance
  },
  dimanche?: {
    tabjour?: TabJour,
    seance?: TabSeance
  },
  pousse?: TabPouse
}
