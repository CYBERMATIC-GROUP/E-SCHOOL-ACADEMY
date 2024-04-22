import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Agent } from '../models/agent.model';
import { AgentService } from '../services/agent.service';
import { MatSort} from '@angular/material/sort';
import { Location } from '@angular/common';
import { AlertComponent } from '../core/alert/alert.component';
import { FiltrerComponent } from './filtrer/filtrer.component';
import { FormGroup } from '@angular/forms';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})

export class AgentComponent implements OnInit, AfterViewInit {
  filterForm!: FormGroup;
  filterFormPreview$!: Observable<Agent>;
  dataSource!: any;
  displayedColumns = [
    'Fr_Nom',
    'Fr_Prenom',
    'Civilite',
    'DateNaissance',
    'Fr_LieuNaissance',
    'Actions'
  ];
  contentTableStyle!: Object;
  isLoading!: boolean;

  @ViewChild(FiltrerComponent) filtrerComponent!: FiltrerComponent;

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private agentService:AgentService,
    private globalService:GlobalService
  
  ) { }

  ngOnInit() {
    this.loadAgent();
    
    const windowHeight = window.screen.height
    const contentTableHeight = (52*windowHeight) / 100;
    this.contentTableStyle = {
      height: `${contentTableHeight}px`,
      'overflow-y': 'scroll'
    }
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

  loadAgent(idAgent: number = 0, refresh: boolean = false) {
    this.isLoading = true;
    this.agentService.getList(idAgent, refresh).subscribe(
      (response) => {
          this.isLoading = false;
          const agents: Agent[] = response;
          this.dataSource = new MatTableDataSource(agents);
      });
  }
  
  openFiltre(){
    const ref = this.dialog.open(FiltrerComponent);

    ref.afterClosed().subscribe(data => {
      this.isLoading = true;
      console.log(ref.componentInstance.resultFiltre);
      this.agentService.filtre(ref.componentInstance.resultFiltre).subscribe(response => {
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(response.body);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    })
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  edit(element: any) {
    const agentId = element.IDAGENT;
    this.router.navigateByUrl(`agent/edit/${agentId}`);
    console.log("ID de l'agent :", agentId);
  }
  

  printAgent(){
    this.isLoading
    this.agentService.imprimerAgent(this.filtrerComponent.resultFiltre).subscribe((data:any) => {
      var anchor = document.createElement('a');
      anchor.href = data.body.Etat;
      anchor.download = 'Liste des agents';
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
      this.isLoading = false;
      //this.message = 'chargement de la liste';
    })
  }
  

  view(element: any) {
    const agentId = element.IDAGENT;
    this.router.navigateByUrl(`agent/view/${agentId}`);
    console.log("ID de l'agent :", agentId);
  }

  delete(agent: Agent) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer l\'agent ' + agent.Fr_Nom + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.agentService.delete(agent.IDAGENT).subscribe((data) => {
          console.log(data);
          this.globalService.reloadComponent('/agent')
          this.globalService.toastShow("Agent supprimé avec succès","")

        });
      }
    });
    console.log(agent);
  }

  onValideFilter(){
    this.isLoading = true;
    this.agentService.filtre(this.filtrerComponent.resultFiltre).subscribe(response => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(response.body);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }


  convertToValideDate(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  
  reloadListe(){
    this.loadAgent(0, true);
  }

  ///ABOUT FILTRE
}