import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { ListeMouvement } from '../models/listemouvement.model';
import { AnnulationMouvement } from '../models/listemouvement.model';

@Injectable({
  providedIn: 'root'
})
export class AnnulationoperationService {

  uri = "COMPTA_Liste_Mouvement";
  uri2 = "COMPTA_Get_Ecriture_Selon_Mouvement"
  uri3 = "Compta_Annulle_Mouvement"
 

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService
  ) { }


  getList(nNumero_Mouvement:number , refresh: boolean = false){
    return this.globalService.setHttpRequest(this.uri + '/' + nNumero_Mouvement, 'POST', {}, Headers)
  }

  get(nNumero_Mouvement:number,refresh: boolean = false){
    return this.globalService.setHttpRequest(this.uri2 + '/' + nNumero_Mouvement , 'GET', {}, Headers)
  }

  AnnuleMouvement(nNumero_Mouvement:number,raisonannulation:AnnulationMouvement){
    return this.globalService.setHttpRequest(this.uri3 + '/' + nNumero_Mouvement, 'POST', raisonannulation, Headers)
  }

}
