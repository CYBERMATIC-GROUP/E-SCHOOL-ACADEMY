import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Presence } from '../pointage.model';

@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.scss']
})
export class ListAgentComponent {
  @Input() presences$!: Observable<Presence[]>
}
