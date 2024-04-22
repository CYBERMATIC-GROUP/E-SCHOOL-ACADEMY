import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { configModelForTable } from '../config-emploi-du-temps.component';

@Component({
  selector: 'app-table-config-emploi',
  templateUrl: './table-config-emploi.component.html',
  styleUrls: ['./table-config-emploi.component.scss']
})
export class TableConfigEmploiComponent {
  @Input() dataEmploiDuTemps$!: Observable<configModelForTable[]>
  displayedColumns = [
    "heure",
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
    'dimanche'
  ]

  onClick(config: configModelForTable, event: any){

  }
}
