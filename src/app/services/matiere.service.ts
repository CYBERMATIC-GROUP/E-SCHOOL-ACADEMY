import { Injectable } from '@angular/core';
import { EMPTY, Observable, map, of, tap } from 'rxjs';
//import { Matiere } from '../models/matiere.model';
import { Matiere, MatiereByNiveauBrancheClasse } from '../models/matiere.model';
import { GlobalService } from '../services/global.service';
import { HttpClient } from '@angular/common/http';
import { ConfigurationMatiere } from '../models/config.matiere.model';
import { constantes } from 'src/environnements/constantes';
import { Enseigant } from '../models/enseigant.model';
import { Observation } from '../models/observation.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  uri = "MATIERE";
  configMatiere = "MATIERE_NIVEAU_BRANCHE_Configuration"
  getOnematiere = "MATIERE_NIVEAU_BRANCHE"
  createMatiere = "MATIERE_NIVEAU_BRANCHE_Creation"
  configCreationMatiere = "MATIERE_NIVEAU_BRANCHE"
  MatierByClasse = "NOTES_Get_Matiere_Classe"
  matiereNiveauBrancheCreation = "MATIERE_NIVEAU_BRANCHE_Creation"
  ImpressionRelenote = "NOTES_Imprime_Releve_Note"
  Ajoutmatierebyenseignant ="ENSEIGNANT_Ajoute_Matiere_Enseignee"
  supprimeMatiereenseignant = "ENSEIGNANT_Supprime_Matiere_Enseignee"
  matierefilterbyniveaubrancheclasse="MATIERE_Matire_Selon_Filtre"
  uriobservation = "OBSERVATIONS_Get_Observation_Selon_Matiere"
  urigetmationselonenseignantclasse = "ENSEIGNANT_Get_Matiere_Selon_Classe"

  constructor(
    private http:HttpClient,
    private globalService: GlobalService
  ) { }

  get(refresh: boolean = false): Observable<Matiere[]>{
    const objStorage = localStorage.getItem('matiere');

    if (objStorage && !refresh) {
      const matiere: Matiere[] = JSON.parse(objStorage);
      return of(matiere);
    }
    return this.globalService.setHttpRequest(this.uri, "GET", {}).pipe(
      tap(res => {
        localStorage.setItem('matiere', JSON.stringify(res))
      })
    )
  }

  

  // getListMatiereByNieveuBranche(refresh: boolean = false,nIDNIVEAU: number, nIDBRANCHE: number): Observable<MatiereByNiveauBrancheClasse[]>{
  //   const objStorage = localStorage.getItem(constantes.requestCache.matiereniveaubrancheclasselist);
  //   if (objStorage && !refresh) {
  //     const matiereniveaubrancheclasse: MatiereByNiveauBrancheClasse[] = JSON.parse(objStorage);
  //     return of(matiereniveaubrancheclasse);
  //   }
  //   const url = `${this.configMatiere}/${nIDNIVEAU}/${nIDBRANCHE}`;
  //   return this.globalService.setHttpRequest(url, "GET", {}).pipe(
  //     tap(res => {
  //       localStorage.setItem(constantes.requestCache.matiereniveaubrancheclasselist, JSON.stringify(res))
  //     })
  //   )
  // }

  

  getListMatiereByNieveuBranche(IDNIVEAU: number, nIDBRANCHE: number): Observable<MatiereByNiveauBrancheClasse[]>{
    const url = `${this.configMatiere}/${IDNIVEAU}/${nIDBRANCHE}`;
    return this.globalService.setHttpRequest(url, "GET", {})
  }

getListMatiereByNieveuBrancheClasse(nNiveau:number,nBranche:number,nClasse:number)  {
  const url = `${this.matierefilterbyniveaubrancheclasse}/${nNiveau}/${nBranche}/${nClasse}`
  return this.globalService.setHttpRequest(url,'POST', {}).pipe(
    map(res => res.body)
  )

}


getOneMatiereByNieveuBranche(IDMAT_NIV_BRA:number)  {
  const url = `${this.getOnematiere}/${IDMAT_NIV_BRA}`
  return this.globalService.setHttpRequest(url,'GET', {},Headers);

}

updateMatiereByNiveauBranche(confmatiere: ConfigurationMatiere): Observable<ConfigurationMatiere> {
  const BASE_PATH = `${this.getOnematiere}/${confmatiere.IDMAT_NIV_BRA}`;
  const headers = this.globalService.getHeaders();
  return this.globalService.setHttpRequest(BASE_PATH, "PUT", confmatiere, headers);
}

// createMatiereByNiveauBranche(IDMAT_NIV_BRA:number,matiere: ConfigurationMatiere): Observable<ConfigurationMatiere> {
//   const url = `${this.configCreationMatiere}/${IDMAT_NIV_BRA}`;
//   return this.globalService.setHttpRequest(url, "POST", matiere,Headers);
// }

ConfigMatiere(matiere: ConfigurationMatiere,nIDMAT_NIV_BRA:number): Observable<ConfigurationMatiere> {
  const url = `${this.matiereNiveauBrancheCreation}/${nIDMAT_NIV_BRA}`;
  return this.globalService.setHttpRequest(url, "POST", matiere,Headers);
}


  getOne(IDMATIERE: number): Observable<Matiere> {
    return this.globalService.setHttpRequest(this.uri + '/' + IDMATIERE, "GET", {});
  }

  getMatiereByClasse(IDMATIERE: number) {
    return this.globalService.setHttpRequest(this.MatierByClasse + '/' + IDMATIERE, "GET", {},Headers);
  }

  update(matiere: Matiere): Observable<Matiere> {
    const BASE_PATH = `${this.uri}/${matiere.IDMATIERE}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", matiere, headers).pipe(
      tap(data => {
        localStorage.removeItem("matiere")
      })
    );
  }

  delete(IDMATIERE: number): Observable<string> {
    const url = `${this.uri}/${IDMATIERE}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
      tap(data => {
        localStorage.removeItem("matiere")
      })
    );
  }

  create(matiere: Matiere): Observable<Matiere> {
    const BASE_PATH = `${this.uri}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "POST", matiere,headers).pipe(
      tap(data => {
        localStorage.removeItem("matiere")
      })
    );
  }

  impressionrelevenote(nIDCLASSE: number,nNumeroTrimestre:number,bAvecNote:number,tableau:{IDMATIERE:number}[]) {
    const url = `${this.ImpressionRelenote}/${nIDCLASSE}/${nNumeroTrimestre}/${bAvecNote}`;
    return this.globalService.setHttpRequest(url, "POST", tableau,Headers);
  }

  getEnseignantClasseMatiere(nIDClasse: number, nIDMatiere: number){
    const enseignantStorage = localStorage.getItem(constantes.auth.enseignant)
    const agentStorage = localStorage.getItem(constantes.auth.agent)
    //const eleveStorage = localStorage.getItem(constantes.auth.eleve)

    if (agentStorage){
      const uriAgent = `PLANNING_Liste_Matieres_Selon_Classe/${nIDClasse}`
      return this.globalService.setHttpRequest(uriAgent, "GET")
    }
    else if (enseignantStorage && nIDClasse > 0){
      const enseigant: Enseigant = JSON.parse(enseignantStorage)
      console.log(enseigant, nIDClasse);
      const uriEnseignant = `ENSEIGNANT_Get_Matiere_Selon_Classe/${enseigant.IDENSEIGNANT}/${nIDClasse}`;
      return this.globalService.setHttpRequest(uriEnseignant, "GET").pipe(
        tap(res => console.log(res)
        )
      )
    }
    return of([])
  }

  AjoutMatiereByEnseignant(nIDEnseignant:number,nIDMatière:number){
    return this.globalService.setHttpRequest(
      this.Ajoutmatierebyenseignant + '/' +  nIDEnseignant + '/' + nIDMatière ,
      'POST',
      {}
    );
  }

  DeleteMatiereEnseignant(nIDEnseignant:number,nIDMatière:number){
    return this.globalService.setHttpRequest(
      this.supprimeMatiereenseignant + '/' +  nIDEnseignant + '/' + nIDMatière ,
      'POST',
      {}
    );
  }

// Observation
  getObservation(IDMATIERE:number): Observable<Observation[]> {
    return this.globalService.setHttpRequest(this.uriobservation + '/' + IDMATIERE, "GET", {});
  }

  getOneObservation(IDOBSERVATIONS_AUTO: number): Observable<Observation> {
    return this.globalService.setHttpRequest("OBSERVATIONS" + '/' + IDOBSERVATIONS_AUTO, "GET", {});
  }

  createObservation(observation: Observation): Observable<Observation> {
    return this.globalService.setHttpRequest("OBSERVATIONS", "POST", observation)
  }

  updateObservation(observation: Observation): Observable<Observation> {
    const url = `${"OBSERVATIONS"}/${observation.IDOBSERVATIONS_AUTO}`
    return this.globalService.setHttpRequest(url, "PUT", observation)
  }

  deleteObservation(IDOBSERVATIONS_AUTO: number): Observable<string> {
    const url = `${"OBSERVATIONS"}/${IDOBSERVATIONS_AUTO}`;
    return this.globalService.setHttpRequest(url, "DELETE", {})
  }

  gerMatiereForEleve(IDELEVE: number): Observable<Matiere[]> {
    const url = `ELEVE_Get_Matiere/${IDELEVE}`;
    return this.globalService.setHttpRequest(url, "GET")
  }
  
}
