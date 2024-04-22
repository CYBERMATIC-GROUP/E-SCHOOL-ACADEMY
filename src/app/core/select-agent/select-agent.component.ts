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
  selector: 'app-select-agent',
  templateUrl: './select-agent.component.html',
  styleUrls: ['./select-agent.component.scss'],
})
export class SelectAgentComponent implements OnChanges {
  dataSource!: any;
  displayedColumns = ['CodeAgent','Fr_Nom', 'Fr_Prenom', 'Civilite'];
  isLoading!: boolean;
  agentSelectedList: Agent[] = [];
  @Input() maxHeight: string = "300px"
  @Input() isManySelection: boolean = false
  @Output() agentListEmitted = new EventEmitter<Agent[]>();
  @Output() agentSelectedEmitted = new EventEmitter<Agent>();
  @Input() isAllSelected!: boolean;
  allAgentsFromRequest: Agent[] = [];
  IDAGENT!:number

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private AgentService: AgentService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.agent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isAllSelected']){
      if(this.isAllSelected){
        this.agentSelectedList = this.allAgentsFromRequest
      }else{
        this.agentSelectedList = []
      }
    }

    console.log(this.allAgentsFromRequest);

  }

  agent() {
    this.isLoading = true;
    this.AgentService.getList(0).subscribe((data) => {
      console.log(data);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(data);
      this.allAgentsFromRequest = data;
    });
  }

  onClickLine(agent: Agent){
    if (this.isManySelection){
      //verify if agent is already in agentSelectedList
      let index = this.agentSelectedList.indexOf(agent)
      if (index >= 0){
        this.agentSelectedList.splice(index, 1)
      }else{
        this.agentSelectedList.push(agent);
      }
      this.agentListEmitted.emit(this.agentSelectedList);
    }else{
      this.agentSelectedList[0] = agent;
      this.agentSelectedEmitted.emit(agent);
    }
  }

  applyFilterAgent(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  checkAgentInList(agent: Agent): boolean{
    return !!this.agentSelectedList.find(elt => elt.IDAGENT == agent.IDAGENT)
  }
}
