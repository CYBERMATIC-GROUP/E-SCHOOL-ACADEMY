import { Component, Input } from '@angular/core';
import { FraisScolaire } from 'src/app/models/fraispayer.model';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-info-echeance',
  templateUrl: './info-echeance.component.html',
  styleUrls: ['./info-echeance.component.scss']
})
export class InfoEcheanceComponent {
  @Input() frais!: FraisScolaire;

  constructor(
    public globlService: GlobalService
  ){}
}
