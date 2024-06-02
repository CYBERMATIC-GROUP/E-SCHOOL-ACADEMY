import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { TabProduitsExonere, reductionExoneration } from '../models/reduction-exo.model';

@Injectable({
  providedIn: 'root'
})
export class ReductionExoService {

  constructor(
    private globalService: GlobalService
  ) { }

  getFraisGestion(nIDELEVE: number){
    const uri = `COMPTA_Gestion_FraisScolaire_Eleve/${nIDELEVE}`;
    return this.globalService.setHttpRequest(uri, "GET")
  }

  editFrais(reduction: TabProduitsExonere){
    const uri = `Frais_Scolaire_Modifie_V2/${reduction.IDELEVE}`;
    return this.globalService.setHttpRequest(uri, "PUT", reduction)
  }
}
