import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { paramComboEleve } from '../models/param-combo-eleve.model';
import { environment } from 'src/environnements/environnement.prod';

@Injectable({
  providedIn: 'root'
})
export class ParamEleveComboService {
  url = 'ParametreVersListe';
  constructor(
    private globalService: GlobalService
  ) { }

  getParamCombo(): Observable<paramComboEleve> {
    return this.globalService.setHttpRequest(this.url, "GET")
  }
}
