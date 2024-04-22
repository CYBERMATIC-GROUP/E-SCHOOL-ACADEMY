import { Component, OnInit } from '@angular/core';
import { PointageService } from '../pointage.service';
import { Observable, of, tap } from 'rxjs';
import { Presence } from '../pointage.model';
import { Enseigant } from 'src/app/models/enseigant.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-pointage-enseignant',
  templateUrl: './pointage-enseignant.component.html',
  styleUrls: ['./pointage-enseignant.component.scss']
})
export class PointageEnseignantComponent implements OnInit {
  presences$!: Observable<Presence[]>
  isAllSelected!: boolean;
  dateBegin!: string;
  dateEnd!: string;
  IDENSEIGNANT: number = 0
  printIsLoading!: boolean;

  constructor(
    private pointageService: PointageService,
    private globalService: GlobalService
  ){}

  ngOnInit(): void {
    this.presences$ = of([])
  }

  ngAfterViewInit(): void {
    this.presences$ = this.pointageService.getPresenceFilter(this.dateBegin, this.dateEnd, 2)
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
    this.presences$ = this.pointageService.getPresenceFilter(this.dateBegin, this.dateEnd, 2)
  }

  onSelect(enseignant: Enseigant){
    console.log(enseignant);

    this.IDENSEIGNANT = enseignant.IDENSEIGNANT
    this.presences$ = this.pointageService.getPresenceFilter(this.dateBegin, this.dateEnd, 2, this.IDENSEIGNANT)
  }

  onPrint(){
    this.printIsLoading = true
    this.pointageService.printListePresence(this.dateBegin, this.dateEnd, 2, this.IDENSEIGNANT).pipe(
      tap(res => {
        console.log(res);
        this.globalService.printFile(res, "Liste de présences")
        this.printIsLoading = false;
      })
    ).subscribe()
  }
}
