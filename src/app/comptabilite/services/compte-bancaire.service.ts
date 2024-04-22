import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { CompteBancaire, compteModel, retraitCaisseEspece } from '../models/compte-banque.model';
import { retrait, transfertArgent } from '../models/transfert-bancaire-caise.model';
import { TypeCompte } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class CompteBancaireService {

  constructor(
    private globalService: GlobalService
  ) { }

  getCompteBanque(): Observable<CompteBancaire[]>{
    const uri = "COMPTA_Get_Compte_Banque";
    return this.globalService.setHttpRequest(uri, "GET")
  }

  setRetrait(retrait: retrait){
    const uri = "COMPTA_Retrait_Banque_Espece"
    return this.globalService.setHttpRequest(uri, "POST", retrait)
  }

  setVersement(retrait: retrait){
    const uri = "COMPTA_Versement_Banque_Espece"
    return this.globalService.setHttpRequest(uri, "POST", retrait)
  }

  getTransfertgetInterCaisse(
    nIDAgentSource: number, 
    nIDAgentDestination: number, 
    nIDCaisseSource: number, 
    nIDCaisseDestination: number,
    bValide: number
    ){
    const uri = `COMPTA_Transfert_Inter_Caisse/${nIDAgentSource}/${nIDAgentDestination}/${nIDCaisseSource}/${nIDCaisseDestination}/${bValide}`

    return this.globalService.setHttpRequest(uri, "POST", {})
  }

  setTransfertArgent(transfert: transfertArgent){
    const uri = "COMPTA_Transfert_Argent";
    return this.globalService.setHttpRequest(uri, "POST", transfert);
  }

  cancelTransfert(IDTRANSFERTCAISSE: number){
    const uri = `COMPTA_Annulle_Transfert/${IDTRANSFERTCAISSE}`
    return this.globalService.setHttpRequest(uri, "GET")
  }

  validTransfert(IDTRANSFERTCAISSE: number){
    const uri = `COMPTA_Validation_Transfert/${IDTRANSFERTCAISSE}`;
    return this.globalService.setHttpRequest(uri, "POST", {});
  }

  setRetraitCaisseEspece(retrait: retraitCaisseEspece){
    const uri = "COMPTA_Reglement_Charges"
    return this.globalService.setHttpRequest(uri, "POST", retrait)
  }

  getComptes(nClasse: TypeCompte): Observable<compteModel[]>{
    const uri = `COMPTE_Liste_Compte_Simplisiee/${nClasse}`;

    return this.globalService.setHttpRequest(uri, "GET")
  }
}
