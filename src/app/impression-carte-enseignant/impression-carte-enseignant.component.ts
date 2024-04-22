import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Classe } from 'src/app/models/classe.model';
import { ClasseService } from 'src/app/services/classe.service';
import { Eleve } from 'src/app/models/eleve.model';
import { EleveService } from 'src/app/services/eleve.service';
import { Enseigant } from 'src/app/models/enseigant.model';
import { EnseignantService } from '../services/enseignant.service';
import { Agent } from '../models/agent.model';
import { AgentService } from '../services/agent.service';
import { ImprimeCarteAgentEnesignantService } from '../services/imprime-carte-agent-enesignant.service';
import { elements } from 'chart.js';


@Component({
  selector: 'app-impression-carte-enseignant',
  templateUrl: './impression-carte-enseignant.component.html',
  styleUrls: ['./impression-carte-enseignant.component.scss']
})
export class ImpressionCarteEnseignantComponent {

  dataSourceEnseignant!: any;
  dataSource!: any;

  displayedColumns1 = ['CodeEnseignant', 'Fr_Nom', 'Fr_Prenom', 'Civilite','cocher'];
  displayedColumns2 = ['Fr_Nom', 'Fr_Prenom', 'Civilite','cocher'];
  displayedColumns3 = ['Fr_Nom','Fr_Prenom','Civilite','Action'];

  isLoading!: boolean;
  isLoadingeleveByclass!: boolean;
  isLoadingeleves!: boolean;

  selectedIDELEVE!: number;
  clickedOnce: boolean = false;

  IDCLASSES: number = 0;
  selectedRowsTable1: any[] = [];
  selectedRowsTable3: any[] = [];
  selectedRowsTable2: any[] = [];

  selectedElementTable1: any;
  selectedElementTable3: any;
  selectedElementTable2: any;

  selectedElement: any;
  selectedEleveId!: number;
  selectedEnseignantID!: number;

  message!: string;
  IDELEVE!: number;
  IDAGENT!: number;
  IDENSEIGNANT!: number;

  classList!: Classe[];

  tableauImpression: {
    ID: number;
    TypeUser: number;
    Type: string;
    Code: string;
    Nom: string;
    Prenom: string;
  }[] = [];




  constructor(
    private router: Router,
    private dialog: MatDialog,
    public _location: Location,
    private classeService: ClasseService,
    private eleveService: EleveService,
    private enseignantService: EnseignantService,
    private AgentService: AgentService,
    private imprimeCarteAgentEnseigant: ImprimeCarteAgentEnesignantService
  ) {}

  ngOnInit(): void {
    this.enseignant();
  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  enseignant() {
    this.isLoading = true;
    this.enseignantService.get().subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        this.dataSourceEnseignant = new MatTableDataSource(data);

      },
      (error) => {
        console.log(error);
      }
    );
  }



  checkLineEnseignant(element: any) {
    const index = this.tableauImpression.findIndex((enseignant) => enseignant.ID === element.IDENSEIGNANT);
    if (index !== -1) {
    } else {
      this.tableauImpression.push({
        ID: element.IDENSEIGNANT,
        TypeUser: 2,
        Type: 'ENSEIGNANT',
        Code: '',
        Nom: '',
        Prenom: '',
      });
      console.log(this.tableauImpression)
    }
  }
  
  isChecked(element: any): boolean {
    return this.tableauImpression.some((enseignant) => enseignant.ID === element.IDENSEIGNANT);
  }


  deleteRow(element: any) {  
    // Remove the corresponding element from the tableauImpression using the ID
    const indexImpression = this.tableauImpression.findIndex((item) => item.ID === element.IDENSEIGNANT);
    if (indexImpression !== -1) {
      this.tableauImpression.splice(indexImpression, 1);
    }
  
    // Remove the row from the dataSource table
    const indexRow = this.dataSource.data.indexOf(element);
    if (indexRow !== -1) {
      this.dataSource.data.splice(indexRow, 1);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    }
  }
  
  
  

  AfficherEnseignants() {
        this.dataSource = new MatTableDataSource(
          this.dataSourceEnseignant.data.filter((enseigant: { IDENSEIGNANT: number }) => {
            const isEleveChecked = this.tableauImpression.some(
              (tableauImpression) => tableauImpression.ID === enseigant.IDENSEIGNANT
            );
            return isEleveChecked;
          })
        );
  }


  ajouterEnseignant() {
    this.dataSource = this.dataSourceEnseignant.data;
    this.tableauImpression = this.dataSourceEnseignant.data.map(
      (element: Enseigant) => ({
        ID: element.IDENSEIGNANT,
        TypeUser: 2,
        Type: 'ENSEIGNANT',
      })
    );
    for (const enseignant of this.tableauImpression) {
      console.log(enseignant.ID);
    }
  }


  applyFilterEnseignant(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSourceEnseignant.filter = value.trim().toLowerCase();
  }


  imprimer() {
    this.isLoadingeleves = true;
    this.message =
      "Patientez un instant, l'impression de votre fichier Pdf est en cours";
    this.imprimeCarteAgentEnseigant
      .imprimerListeCarteAgentEnseignant(this.tableauImpression)
      .subscribe((data) => {
        console.log(this.tableauImpression);
        console.log(data);
        var anchor = document.createElement('a');
        anchor.href = data.body.Etat;
        anchor.download = 'Liste Des Agents/Enseignants ';
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
        this.isLoadingeleves = false;
        this.message = 'chargement de la liste';
      });
  }

}
