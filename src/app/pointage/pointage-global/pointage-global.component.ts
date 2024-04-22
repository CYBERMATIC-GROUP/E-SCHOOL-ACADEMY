import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, finalize, of, tap } from 'rxjs';
import { Presence } from '../pointage.model';
import { PointageService } from '../pointage.service';
import { environment } from 'src/environnements/environnement.prod';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-pointage-global',
  templateUrl: './pointage-global.component.html',
  styleUrls: ['./pointage-global.component.scss']
})
export class PointageGlobalComponent implements AfterViewInit {
  presences$: Observable<Presence[]> = of([]);
  dateBegin!: string;
  dateEnd!: string;
  isPrinting!: boolean

  constructor(
    private pointageService: PointageService,
    private globalService: GlobalService
  ){}

  ngAfterViewInit(): void {
    this.presences$ = this.pointageService.getPresenceFilter(this.dateBegin, this.dateEnd, 1)
  }

  onEmitDate(dateObj: string, type: 'begin' | 'end'){
    if (type == "begin")
      this.dateBegin = dateObj
    else
      this.dateEnd = dateObj
  }

  onSubmit(){
    this.presences$ = this.pointageService.getPresenceFilter(this.dateBegin, this.dateEnd, 1)
  }

  onPrint(){
    this.isPrinting = true
    this.pointageService.printListePresence(this.dateBegin, this.dateEnd, 0, 0).pipe(
      tap(res => {
        this.globalService.printFile(res, "Liste de présences")
      }),
      finalize(() => {
        this.isPrinting = false
      })
    ).subscribe()
  }
}
