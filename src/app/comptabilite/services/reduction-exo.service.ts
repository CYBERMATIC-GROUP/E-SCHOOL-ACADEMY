import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { reductionExoneration } from '../models/reduction-exo.model';

@Injectable({
  providedIn: 'root'
})
export class ReductionExoService {

  constructor(
    private globalService: GlobalService
  ) { }

  getFraisGestion(nIDELEVE: number): Observable<reductionExoneration[]>{
    const uri = `COMPTA_Gestion_FraisScolaire_Eleve/${nIDELEVE}`;
    return this.globalService.setHttpRequest(uri, "GET")
  }

  editFrais(reduction: reductionExoneration){
    const uri = `Frais_Scolaire_Modifie/${reduction.IDFraisScolaires}`;
    return this.globalService.setHttpRequest(uri, "PUT", reduction)
  }
}
