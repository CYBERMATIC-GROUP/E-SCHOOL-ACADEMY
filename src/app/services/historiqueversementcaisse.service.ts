import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, map, of, tap } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { HistoriqueCaisse } from '../models/historiqueVersementCaisse.model';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueversementcaisseService {

  urihistoriqueCaisse = "COMPTA_Get_Historique_Caisse"

  constructor(
    private http:HttpClient,
    private globalService: GlobalService
  ) { }


  //historique versements
  getHistoriqueCaisse(nIDCAISSE: number, sDateDebut: string, sDateFin: string,nModePaiment:number, codeJournal: string, tableauJournal:  { "CodeJournal": string }[] = []): Observable<HistoriqueCaisse[]> {
    const url = `COMPTA_Historique_Versement_Caisse/${nIDCAISSE}/${sDateDebut}/${sDateFin}/${nModePaiment}/${codeJournal}`;

    return this.globalService.setHttpRequest(url, "POST", tableauJournal).pipe(
      map(response => response.body)
    )
  }

  printHistorique(IDCAISSE: number, dateDebut: string, dateFin: string, IDModePaiement: number, codeJournal: string, tableauJournal:  {CodeJournal: string }[] = []){
    const uri = `coMPTA_Imprime_Historique_Versement_Caisse/${IDCAISSE}/${dateDebut}/${dateFin}/${IDModePaiement}/${codeJournal}`;

    return this.globalService.setHttpRequest(uri, "POST", tableauJournal)
  }

  printHistoriqueRetrait(IDCAISSE: number, dateDebut: string, dateFin: string, tableauJournal:  {CodeJournal: string }[]){
    const uri = `COMPTA_Imprime_Retrait_Caisse/${IDCAISSE}/${dateDebut}/${dateFin}/${tableauJournal[0].CodeJournal}`;

    return this.globalService.setHttpRequest(uri, "POST", tableauJournal)
  }

  //historique retraits
  getHistoriqueRetraitsCaisses(nIDCAISSE: number, sDateDebut: string, sDateFin: string, sCodeJournal: string, tableauJournal:  { CodeJournal: string }[] = []){
    const uri = `COMPTA_Historique_Retrait_Caisse/${nIDCAISSE}/${sDateDebut}/${sDateFin}/${sCodeJournal}`;

    return this.globalService.setHttpRequest(uri, "POST", tableauJournal).pipe(
      map(response => response.body)
    )
  }

  //consultation caisses
  getConsultationCaisse(nIDCAISSE: number, sDateDebut: string, sDateFin: string,nModePaiment:number) {
    const url = `COMPTA_Get_Historique_Caisse/${nIDCAISSE}/${sDateDebut}/${sDateFin}/${nModePaiment}`;
    return this.globalService.setHttpRequest(url, "GET", {})
  }

}
