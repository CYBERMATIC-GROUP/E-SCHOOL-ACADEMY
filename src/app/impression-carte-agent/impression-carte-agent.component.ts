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
  selector: 'app-impression-carte-agent',
  templateUrl: './impression-carte-agent.component.html',
  styleUrls: ['./impression-carte-agent.component.scss']
})
export class ImpressionCarteAgentComponent {

  dataSourceAgent!: any;
  dataSource!: any;

  displayedColumns2 = ['Fr_Nom', 'Fr_Prenom', 'Civilite','cocher'];
  displayedColumns3 = ['Fr_Nom','Fr_Prenom','Civilite','Action'];

  isLoading!: boolean;
  isLoadingeleveByclass!: boolean;
  isLoadingeleves!: boolean;

  selectedIDELEVE!: number;

  IDCLASSES: number = 0;
  selectedRowsTable1: any[] = [];
  selectedRowsTable3: any[] = [];
  selectedRowsTable2: any[] = [];

  selectedElementTable1: any;
  selectedElementTable3: any;
  selectedElementTable2: any;


  message!: string;
  IDAGENT!: number;

  clickedOnce: boolean = false;
  showButtons: boolean = false;

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
    private AgentService: AgentService,
    private imprimeCarteAgentEnseigant: ImprimeCarteAgentEnesignantService
  ) {}

  ngOnInit(): void {
    this.agent();
  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  agent() {
    this.isLoadingeleveByclass = true;
    this.AgentService.getList(0,true).subscribe(
      (data) => {
        console.log(data);
        this.isLoadingeleveByclass = false;
        this.dataSourceAgent = new MatTableDataSource(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkLineAgent(element: any) {

    
    const index = this.tableauImpression.findIndex((agent) => agent.ID === element.IDAGENT);
    if (index !== -1) {

    //   this.tableauImpression.splice(index, 1);
    //   this.deleteRow(element)
    //   element.selected = !element.selected;
    // this.showButtons = element.selected;
    
    } else {
      this.tableauImpression.push({
        ID: element.IDAGENT,
        TypeUser: 3,
        Type: 'AGENT',
        Code: '',
        Nom: '',
        Prenom: '',
      });
      console.log(this.tableauImpression)
    }
  }
  
  isCheckede(element: any): boolean {
    return this.tableauImpression.some((agent) => agent.ID === element.IDAGENT);
  }

  deleteRow(element: any) {

     // Uncheck the corresponding checkbox for the element in enseignant table
    // const indexAgent = this.dataSourceAgent.data.indexOf(element);
    // if (indexAgent !== -1) {
    //   this.dataSourceAgent.data[indexAgent].selected = false;
    // }
  
    // Remove the corresponding element from the tableauImpression using the ID
    const indexImpression = this.tableauImpression.findIndex((item) => item.ID === element.IDAGENT);
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
  

  AfficherAgent() {
    
    this.dataSource = new MatTableDataSource(
      this.dataSourceAgent.data.filter((agent: { IDAGENT: number }) => {
        const isEleveChecked = this.tableauImpression.some(
          (tableauImpression) => tableauImpression.ID === agent.IDAGENT
        );
        return isEleveChecked;
      })
    );
  }


  ajouterAgent() {
    this.dataSource = this.dataSourceAgent.data;
    this.tableauImpression = this.dataSourceAgent.data.map(
      (element: Agent) => ({
        ID: element.IDAGENT,
        TypeUser: 3,
        Type: 'AGENT',
      })
    );
    for (const agent of this.tableauImpression) {
      console.log(agent.ID);
    }
  }


  applyFilterAgent(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSourceAgent.filter = value.trim().toLowerCase();
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
