import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { AvisPaiement, EtatPaiementTotaux, ParamFilterState, TabIdclasses } from '../models/etat-paiement.model';
import { Observable, map, of, tap } from 'rxjs';
import { echeanceMensuel } from '../models/fraispayer.model';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class EtatPaiementService {

  uri = 'COMPTA_Suivi_Frais_Scolaire'
  Impression = 'COMPTA_Imprime_Etat_Paiement_Frais_scolaires_V2'
  uriEcheancesFraisScolaire = 'COMPTA_Get_liste_Frais_Scolaires';
  uriimprimelisteAvispaiement = "COMPTA_Imprime_Avis_Paiements"

  constructor(
    private globalService: GlobalService
  ) { }

  getByFilter(filterObj: ParamFilterState){
    console.log(filterObj);
    
    return this.globalService.setHttpRequest(this.uri + '/0', "POST", filterObj);
  }

  getByFilterWithTotaux(filterObj: ParamFilterState): Observable<EtatPaiementTotaux>{
    
    return this.globalService.setHttpRequest('COMPTA_Suivi_Frais_Scolaire_V2/1', "POST", filterObj).pipe(
      map(res => res.body)
    )
  }

  getLisEcheancesFraisScolaire(bOcassionel: number = 0, refresh: boolean = false): Observable<echeanceMensuel[]>{
    if(!refresh && !bOcassionel){
      const cache = this.globalService.tryRequestFromCache(constantes.requestCache.echeancesDroitScolaire);
      if(cache)
        return cache;
    }
    console.log(constantes.requestCache.echeancesDroitScolaire + ' getted from server')
    return this.globalService.setHttpRequest(this.uriEcheancesFraisScolaire + '/' + bOcassionel, "GET").pipe(
      tap(res => {
        if(!bOcassionel)
          localStorage.setItem(constantes.requestCache.echeancesDroitScolaire, JSON.stringify(res));
      })
    )
  }


  imprimerListe(data: ParamFilterState){
    return this.globalService.setHttpRequest(
      this.Impression,
      'POST',
      data,
      Headers
    );
  }

  imprimerListeAvispaiement(data: AvisPaiement){
    return this.globalService.setHttpRequest(
      this.uriimprimelisteAvispaiement + '/' + 0 + '/' + 0,
      'POST',
      data,
      Headers
    );
  }

}
