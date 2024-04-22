import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { ConfigEmploi } from './config-emploi.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private globalService: GlobalService
  ) { }

  getConfig(): Observable<ConfigEmploi>{
    return this.globalService.setHttpRequest('PLANNING_Configure_Seance_Enseignes', "GET")
  }
}
