import { Injectable } from '@angular/core';
import { environment } from 'src/environnements/environnement.prod';
import { EMPTY, Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Agent, ModelAbsenceAgent } from '../models/agent.model';
import { ErrorInterface } from '../models/error.model';
import { GlobalService } from './global.service';
import { constantes } from 'src/environnements/constantes';
import { ModificationMotDePasseAgent } from '../models/updatePasswordAgent.model';


@Injectable({
  providedIn: 'root',
})
export class AgentService {

  BASE_PATH: string = 'AGENT';
  liste:string='AGENT_ListeFiltre'
  Updatepasswordagent:string='AGENT_Modifie_Mot_Passe'
  getlistesimplifie = "AGENT_Get_Liste_Simplifiee"
  uriabsenceagent = "ABSENCES_AGENTS"
  urigenerationmotdepasse = "AGENT_Nouveau_Passe"

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) {}

  getList(IDAGENT: number, refresh: boolean = false): Observable<Agent[]> {
    const data = { IDAGENT: IDAGENT };
    const objStorage = this.globalService.tryRequestFromCache(constantes.requestCache.agentList)

    if (objStorage && !refresh && !IDAGENT) {
      return objStorage;
    } else {
      return this.globalService.setHttpRequest(this.liste, "POST", data, Headers).pipe(
        map(response => response.body),
        tap(agents => {

          //if not one agent set it on storage
          if(!IDAGENT)
            localStorage.setItem(constantes.requestCache.agentList, JSON.stringify(agents));
        }),
      );
    }
  }



  filtre(data: any) { // Ajoutez le paramètre IDAGENT à l'objet data
    console.log(data);

    return this.globalService.setHttpRequest(this.liste, "POST", data,Headers); // Envoyez l'objet data dans la requête POST
  }

  getOne(IDagent: number): Observable<Agent> {
    return this.globalService.setHttpRequest(this.BASE_PATH + '/' + IDagent, "GET", {});
  }

  //Absence Agent
  getAbsenceAgent(sDate:string, nIDAGENT:number){
    return this.globalService.setHttpRequest(this.uriabsenceagent  + '/' + sDate + '/' + nIDAGENT,"GET", {});
  }
  getOneAbsence(sDate:string, nIDAGENT:number){
    return this.globalService.setHttpRequest(this.uriabsenceagent  + '/' + sDate + '/' + nIDAGENT,"GET", {});
  }

  createAbsenceAgent(agentabsennnce: ModelAbsenceAgent): Observable<ModelAbsenceAgent> {
    const uri = `${this.uriabsenceagent}`;
    return this.globalService.setHttpRequest(uri, "POST", agentabsennnce)
  }

  updateAbsenceAgent(agentabsennnce: ModelAbsenceAgent): Observable<ModelAbsenceAgent> {
    return this.globalService.setHttpRequest(this.uriabsenceagent + '/' + agentabsennnce.IDABSENCeS_AGENTS, "PUT", agentabsennnce)
  }
  deleteAbsenceAgent(IDABSENCeS_AGENTS:number){
    return this.globalService.setHttpRequest(this.uriabsenceagent + '/' + IDABSENCeS_AGENTS,"DELETE", {});
  }

  getListeSimplifie(){
    return this.globalService.setHttpRequest(this.getlistesimplifie, "GET", {});
  }


  generatepassword(generatepassword : ModificationMotDePasseAgent){
    return this.globalService.setHttpRequest(this.urigenerationmotdepasse, "POST", generatepassword);
  }



  update(agent: Agent): Observable<Agent> {
    const uri = `${this.BASE_PATH}/${agent.IDAGENT}`;
    return this.globalService.setHttpRequest(uri, "PUT",agent,Headers).pipe(
      tap(data => {

        const agentConnected: Agent | undefined = this.globalService.initConnectedAgent();
        if(agentConnected && agentConnected.IDAGENT == agent.IDAGENT){
          localStorage.setItem(constantes.auth.agent, JSON.stringify(data))
        }
        localStorage.removeItem(constantes.requestCache.agentList);

      })
    );
  }

  delete(IDagent: number): Observable<string> {
    const uri = `${this.BASE_PATH}/${IDagent}`;
    return this.globalService.setHttpRequest(uri, "DELETE",null,Headers).pipe(
      tap(data => {
        console.log(data);
        localStorage.removeItem(constantes.requestCache.agentList)
      })
    )
  }

  create(agent: Agent): Observable<Agent> {
    const uri = `${this.BASE_PATH}`;
    return this.globalService.setHttpRequest(uri, "POST", agent,Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.agentList)
      })
    )
    ;
  }

  imprimerAgent(data: any){
    return this.globalService.setHttpRequest('AGENT_Imprime_liste', "POST", data)
  }

  UpdatePasswoerdAgent(updatepassword:ModificationMotDePasseAgent){
    const uri = `${this.Updatepasswordagent}`;
    return this.globalService.setHttpRequest(uri, "POST", updatepassword,Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.agentList)
      })
    )
    ;
  }

  getPhoto(IDAgent: number): Observable<{Photo: string}>{
    return this.globalService.setHttpRequest(`PHOTO_Agent/${IDAgent}`, "GET").pipe(
      map(res => res)
    )
  }

  getListePrimes(){
    return this.globalService.setHttpRequest('PRIME', "GET", {});
  }

  getListeRetenue(){
    return this.globalService.setHttpRequest('RETENUE', "GET", {});
  }

  getListeFicheByOneAget(IDagent: number): Observable<Agent> {
    return this.globalService.setHttpRequest('AGENT_Get_Fiche' + '/' + IDagent, "GET", {});
  }
}
