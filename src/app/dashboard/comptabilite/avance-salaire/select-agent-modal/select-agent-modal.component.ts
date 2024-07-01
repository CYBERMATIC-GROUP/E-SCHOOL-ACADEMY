import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AgentService } from 'src/app/services/agent.service';
import { Agent } from 'src/app/models/agent.model';
import { GlobalService } from 'src/app/services/global.service';
import { Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-select-agent-modal',
  templateUrl: './select-agent-modal.component.html',
  styleUrls: ['./select-agent-modal.component.scss']
})
export class SelectAgentModalComponent {
  dataSource!: any;
  displayedColumns = ['CodeAgent','Fr_Nom', 'Fr_Prenom', 'Civilite'];
  isLoading!: boolean;
  IDAGENT!:number
  agentSelected!: Agent

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private AgentService: AgentService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.agent();
  }


  agent() {
    this.isLoading = true;
    this.AgentService.getList(0).subscribe((data) => {
      console.log(data);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(data);
    });
  }

  onClickLine(agent: Agent){
    this.agentSelected = agent;
    if (this.agentSelected) {
      this.dialog.getDialogById('SelectAgentModalComponent')?.close(true)
    }
  }

  applyFilterAgent(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
