import { Component, ViewChild } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AjoutAbsenceAgentComponent } from './ajout-absence-agent/ajout-absence-agent.component';
import { Agent, ModelAbsenceAgent } from 'src/app/models/agent.model';
import { ListeAgentComponent } from './liste-agent/liste-agent.component';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { finalize, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-absence-agent',
  templateUrl: './absence-agent.component.html',
  styleUrls: ['./absence-agent.component.scss']
})
export class AbsenceAgentComponent {
  dataSource!: any;

  displayedColumns = [
    'NomPrenom',
    'Date',
    'Matin',
    'ApresMidi',
    'Actions'
  ];
  agentSelected!: ModelAbsenceAgent;
  IDagentSelect!:number
  IDABSENCeS_AGENTS!:number
  IDAGENT!:number
  Date!:string
  MatinOuApresMidi: any;
  isloading!:boolean
  currentDate!:string

  constructor(
    private agentService:AgentService,
    private router:Router,
    private dialog: MatDialog,
    private globalService:GlobalService
  ){
    this.currentDate = new Date().toISOString().split('T')[0]
    this.Date = this.currentDate
 }

  ngOnInit(){
    this.getListAgent()
  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectDate(event: any) {
    console.log(event.target.value);
    this.Date = event.target.value
    this.getListAgent();
  }


  getListAgent(){
    this.isloading = true
    console.log(this.convertToValideDate(this.Date));
    this.agentService.getAbsenceAgent(this.convertToValideDate(this.Date),0).subscribe((data)=>{
      console.log(this.convertToValideDate(this.Date));
      console.log(data);
      this.isloading = false
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

  }


  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  convertToValideDate(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }

  convertToValideDateDMY(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  onClickLine(agentabsence: ModelAbsenceAgent){
    console.log(agentabsence.IDAGENT);
    this.agentSelected = agentabsence;
    this.IDABSENCeS_AGENTS = agentabsence.IDABSENCeS_AGENTS
    this.IDAGENT = agentabsence.IDAGENT
  }

  create(){
    if(this.Date){
      const dialog = this.dialog.open(ListeAgentComponent)
      dialog.componentInstance.Date = this.Date
      dialog.id = 'ListeAgentComponent'
      dialog.afterClosed().subscribe(result => {
        if (result) {
          this.getListAgent()
        }
      })
    }else{
      this.globalService.alert("Veuiller selectionner la date","Informations","info","OK","")
    }
  }

  view(absenceagent:ModelAbsenceAgent){
    const dialog = this.dialog.open(AjoutAbsenceAgentComponent)
    dialog.componentInstance.IDAGENT = absenceagent.IDAGENT
    dialog.componentInstance.Date = this.Date
    dialog.componentInstance.action = "view"
    dialog.id = 'AjoutAbsenceAgentComponent'

  }

  edit(absenceagent:ModelAbsenceAgent){
    const dialog = this.dialog.open(AjoutAbsenceAgentComponent)
    dialog.componentInstance.IDAGENT = absenceagent.IDAGENT
    dialog.componentInstance.Date = this.Date
    dialog.id = 'AjoutAbsenceAgentComponent'
    dialog.componentInstance.action = "edit"
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.getListAgent()
      }
    })
  }

  delete(absenceagent: ModelAbsenceAgent) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer  ' + absenceagent.NomPrenom + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        console.log(absenceagent.IDABSENCeS_AGENTS);
        this.agentService.deleteAbsenceAgent(absenceagent.IDABSENCeS_AGENTS).pipe(
          tap(res => {
            console.log(res);
            this.globalService.toastShow("Absence supprimé avec succès.", "Suppression")
            this.getListAgent()
          }),
          finalize(() => {
          })
        ).subscribe()
      }
    });
  }
}
