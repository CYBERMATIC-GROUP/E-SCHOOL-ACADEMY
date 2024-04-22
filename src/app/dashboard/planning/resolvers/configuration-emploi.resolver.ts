import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs";
import { ConfigService as ConfigEmploiDuTempService } from "../config-emploi-du-temps/config.service";
import { ConfigEmploi } from "../config-emploi-du-temps/config-emploi.model";

@Injectable()
export class ConfigEmploiResolver implements Resolve<ConfigEmploi> {
  constructor(
    private configEmploiService: ConfigEmploiDuTempService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ConfigEmploi>  {
    return this.configEmploiService.getConfig()
  }
}
