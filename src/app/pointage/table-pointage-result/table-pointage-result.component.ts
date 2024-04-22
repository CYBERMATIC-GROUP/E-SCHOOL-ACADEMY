import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Presence } from '../pointage.model';

@Component({
  selector: 'app-table-pointage-result',
  templateUrl: './table-pointage-result.component.html',
  styleUrls: ['./table-pointage-result.component.scss']
})
export class TablePointageResultComponent implements OnInit {

  @Input() presences$!: Observable<Presence[]>;
  @Input() title!: string;
  @Input() isEnseignant!: boolean;
  displayedColumns = [
    'Utilisateur',
    'Date',
    'HeureArrivee',
    'HeureDepart',
    'DureePresenceMin',
    'DureeRetardMin',
  ]
  maxHeight: string = '450px';
  applyFilter(event: any){
    /*let val = event.target.value;
    this.presences$ = this.data$.pipe(
      map(presences => presences.filter(elt => ))
    )*/
  }

  ngOnInit(): void {
      if (this.isEnseignant) {
        this.displayedColumns = [
          'Utilisateur',
          'Date',
          'HeureArrivee',
          'HeureDepart',
          'DureePresenceMin',
          'DureeRetardMin',
          'CLASSES',
          'Matiere'
        ]
      }
  }

}
