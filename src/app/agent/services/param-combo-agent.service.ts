import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { paramComboAgent } from '../models/param-combo-agent.model';

@Injectable({
  providedIn: 'root'
})
export class ParamComboAgentService {

  constructor(
    private globalService: GlobalService
  ) { }

  getParamAgent(): Observable<paramComboAgent>{
    return this.globalService.setHttpRequest('ParametreVersListe_Agent', "GET")
  }
}
