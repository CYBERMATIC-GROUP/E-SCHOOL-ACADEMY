import { AfterViewInit, Component } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Presence } from '../pointage.model';
import { PointageService } from '../pointage.service';
import { environment } from 'src/environnements/environnement.prod';
import { Agent } from 'src/app/models/agent.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-pointage-agent',
  templateUrl: './pointage-agent.component.html',
  styleUrls: ['./pointage-agent.component.scss']
})
export class PointageAgentComponent implements AfterViewInit {
  presences$!: Observable<Presence[]>
  isAllSelected!: boolean;
  dateBegin!: string;
  dateEnd!: string;
  IDAGENT: number = 0
  printIsLoading!: boolean;

  constructor(
    private pointageService: PointageService,
    private globalService: GlobalService
  ){}

  ngOnInit(): void {
    this.presences$ = of([])
  }

  ngAfterViewInit(): void {
    this.presences$ = this.pointageService.getPresenceFilter(this.dateBegin, this.dateEnd, 1)
  }

  onEmitDate(dateObj: string, type: 'begin' | 'end'){
    if(type == 'begin')
      this.dateBegin = dateObj;
    else
      this.dateEnd = dateObj;
  }

  onSlectedAll(){
    this.isAllSelected = !this.isAllSelected
  }

  onSubmit(){
    this.presences$ = this.pointageService.getPresenceFilter(this.dateBegin, this.dateEnd, 1)
  }

  onSelect(agent: Agent){
    this.IDAGENT = agent.IDAGENT
    this.presences$ = this.pointageService.getPresenceFilter(this.dateBegin, this.dateEnd, 1, this.IDAGENT)
  }

  onPrint(){
    this.printIsLoading = true
    this.pointageService.printListePresence(this.dateBegin, this.dateEnd, 1, this.IDAGENT).pipe(
      tap(res => {
        console.log(res);
        this.globalService.printFile(res, "Liste de présences")
        this.printIsLoading = false;
      })
    ).subscribe()
  }
}
