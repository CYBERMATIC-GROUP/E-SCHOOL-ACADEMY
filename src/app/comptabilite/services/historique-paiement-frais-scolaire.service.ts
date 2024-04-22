import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class HistoriquePaiementFraisScolaireService {

  constructor(
    private globalService: GlobalService
  ) { }

  getHistoriqueFraisEleve(IDELEVE: number){
    const uri = `COMPTA_Historique_Paiement_Frais_Scolaire_Eleve/${IDELEVE}`;
    return this.globalService.setHttpRequest(uri, "GET")
  }

  printRecu(IDELEVE: number, IDMOUVEMENT: number){
    const uri = `COMPTA_Imprime_Recu/${IDELEVE}/${IDMOUVEMENT}`;
    return this.globalService.setHttpRequest(uri, "GET");
  }
}
