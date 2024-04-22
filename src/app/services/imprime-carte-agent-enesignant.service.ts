import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { CarteAgentEnseignant } from '../models/imprime_carte_agent_enseignant.model';

@Injectable({
  providedIn: 'root',
})
export class ImprimeCarteAgentEnesignantService {
  
  uri = 'IMPRIME_Carte_Agent_Enseignant';

  constructor(private http: HttpClient, private globalService: GlobalService) {}

  imprimerListeCarteAgentEnseignant(
    data: {
      ID: number;
      TypeUser: number;
      Type: string;
      Code: string;
      Nom: string;
      Prenom: string;
    }[] = []
  ) {
    return this.globalService.setHttpRequest(this.uri, 'POST', data, Headers);
  }
}
