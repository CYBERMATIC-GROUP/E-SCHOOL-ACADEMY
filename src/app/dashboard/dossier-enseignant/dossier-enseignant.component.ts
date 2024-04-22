import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dossier-enseignant',
  templateUrl: './dossier-enseignant.component.html',
  styleUrls: ['./dossier-enseignant.component.scss']
})
export class DossierEnseignantComponent implements OnInit{
  @ViewChild('chartCanvas1') chartCanvas1!: ElementRef;
  @ViewChild('chartCanvas2') chartCanvas2!: ElementRef;

  title!: string;
  typeMenuID!: number;
  chart!: any;

  menus!: {
    desination: string,
    logo: string,
    description: string,
    backColor: string,
    link?: string,
    right?: boolean
  }[];

  ngOnInit(): void {
      this.initMenusForEnseignant()
  }

  ngAfterViewInit(): void {
    const data = [
      { month: 'Septembre', count: 33 },
      { month: 'Octobre', count: 23 },
      { month: 'Novembre', count: 25 },
      { month: 'Décembre', count: 10 },
      { month: 'Janvier', count: 4 },
      { month: 'Février', count: 12 },
      { month: 'Mars', count: 8 },
      { month: 'Avril', count: 1 }
    ];

    this.chart = new Chart(
      this.chartCanvas1.nativeElement,
      {
        type: 'bar',
        data: {
          labels: data.map(row => row.month),
          datasets: [
            {
              label: "Fréquence d'ajout enseignants par mois",
              data: data.map(row => row.count),
              backgroundColor: [
                '#7b4bce'
              ],
            }
          ]
        },
        options: {
        }
      }
    );

    const chart = new Chart(this.chartCanvas2.nativeElement, {
      type: 'scatter',
      data: {
        datasets: [
          {
            data: [
              { x: 0, y: 0, r: 10 }, // Coordonnées du bulbe
              { x: 0, y: 10, r: 200 }, // Premier point
              { x: 5, y: 5, r: 15 }, // Deuxième point
              { x: -5, y: -5, r: 20 },
            ],
            pointBackgroundColor: 'rgba(255, 0, 0, 0.5)', // Couleur de remplissage du bulbe
            pointBorderWidth: 1, // Largeur de la bordure du bulbe
            pointBorderColor: 'rgba(255, 0, 0, 1)', // Couleur de la bordure du bulbe
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            min: -20,
            max: 20,
          },
          y: {
            type: 'linear',
            min: -20,
            max: 20,
          },
        },
      },
    });
  }

  initMenusForEnseignant(){
    this.title = "Dossier des enseignants"
    this.menus = [
      {
        desination: "Dossiers",
        logo: "carte_scolaire_et_dossier.png",
        description: "Gestion des enseignants",
        backColor: "#219ebc",
        link: "enseignant/list",
        right: true
      },
      {
        desination: "Absences",
        logo: "Absences.png",
        description: "",
        backColor: "#606c38"
      },
      {
        desination: "Projets pédagogiques",
        logo: "",
        description: "",
        backColor: "#d6ccc2"
      }
    ]
  }

}
