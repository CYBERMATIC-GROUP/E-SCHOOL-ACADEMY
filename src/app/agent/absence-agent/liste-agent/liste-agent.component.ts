import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Agent, ModelAbsenceAgent } from 'src/app/models/agent.model'; 
import { AgentService } from 'src/app/services/agent.service';
import { MatSort } from '@angular/material/sort';
import { AjoutAbsenceAgentComponent } from '../ajout-absence-agent/ajout-absence-agent.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-liste-agent',
  templateUrl: './liste-agent.component.html',
  styleUrls: ['./liste-agent.component.scss']
})
export class ListeAgentComponent {
  dataSource!: any;
  displayedColumns = [
    'Fr_Nom',
    'Fr_Prenom',
    'Civilite',
    'DateNaissance',
    'Fr_LieuNaissance'
    ];
    IDAGENT!:number
    Date!:string
    NomPrenomAgent!:string
    agentSelected!: Agent;
    isloading!: boolean;

  constructor(
    private agentService:AgentService,
    private dialog:MatDialog,
    private globalserivce: GlobalService
  ){}
  ngOnInit() {
    this.getAgent()
  }
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getAgent(){
    this.agentService.getList(0).subscribe((data)=> {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  onClickLine(agent: Agent){
    console.log(agent.IDAGENT);
    this.agentSelected = agent;
    this.IDAGENT = agent.IDAGENT
    this.NomPrenomAgent = agent.Fr_Nom + ' ' + agent.Fr_Prenom
  }
  convertToValideDateDMY(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  createAbsenceAgentSelected(){
    if(this.IDAGENT > 0){
      const dialog = this.dialog.open(AjoutAbsenceAgentComponent)
      dialog.componentInstance.IDAGENT = this.IDAGENT
      dialog.componentInstance.NomPrenom = this.NomPrenomAgent
      dialog.componentInstance.Date = this.Date
      dialog.componentInstance.action = "create"
      dialog.id = 'AjoutAbsenceAgentComponent'
      dialog.afterClosed().subscribe(result => {
        if (result) {
          this.dialog.getDialogById('ListeAgentComponent')?.close(true)
        }
      })
    }else{
      this.globalserivce.alert("Cliquer sur une ligne pour selectionner un agent avant de continuer","INFORMATION","info","OK","")
    }
  }

}
