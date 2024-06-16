import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, of, tap } from 'rxjs';
import { Enseigant } from '../models/enseigant.model';
import { GlobalService } from '../services/global.service';
import { environment } from 'src/environnements/environnement';
import { ErrorInterface } from '../models/error.model';
import { constantes } from 'src/environnements/constantes';
import { BalisesCarte } from '../models/baliseCartes.model';
import { DevoirEnseignant } from '../models/devoirs.model';

@Injectable({ providedIn: 'root' })
export class EnseignantService {
  uri = 'ENSEIGNANT';
  API_URL: string = environment.apiUrl;
  uriEnseignant: string = 'ENSEIGNANT_ListeFiltree';
  urImprime = 'ENSEIGNANT_Imprime_Liste';
  uriMatiereClasse ="PlANNING_Get_Repartition_Enseignats"
  ajouteplanning = "PLANNING_Ajoute_Repartition_Enseignant"
  getmatierebyenseignant = "PLANNING_Liste_Matieres_Selon_Enseignant"
  uriEnseignantBymatiere = "PLANNING_Get_Liste_Enseignant_Matiere"
  urisupprimeRepartitionEnseignant = "PLANNING_Supprime_Repartition_Enseignant"
  urigelListeSimplifiee = "ENSEIGNANT_Get_Liste_Simplifiee"
  uridevoir = "DEVOIRS_Get_Devoirs_Selon_Filtre"
  Devoir = "DEVOIRS"
  urigetclasseSelonenseignant = "ENSEIGNANT_Get_Classe"
  urigetmationselonenseignantclasse = "ENSEIGNANT_Get_Matiere_Selon_Classe"

  constructor(private http: HttpClient, private globalService: GlobalService) {}
  get(refresh: boolean = true): Observable<Enseigant[]> {
    /*const enseignantObj = this.globalService.tryRequestFromCache(
      constantes.requestCache.enseignantList
    );
    if (!refresh) {
      return enseignantObj;
    } else {*/
      return this.globalService.setHttpRequest(this.uri, 'GET', {}).pipe(
        tap((enseignants) => {
          console.log(enseignants)
          //localStorage.setItem( constantes.requestCache.enseignantList, JSON.stringify(enseignants));
        })
      );
    //}
  }

  getList(): Observable<Enseigant[]> {
    return this.globalService.setHttpRequest(this.uri, 'GET', {}).pipe(
      tap(res => {
        console.log(res);
      })
    )
  }

  getOne(IDENSEIGNANT: number): Observable<Enseigant> {
    return this.globalService.setHttpRequest(
      this.uri + '/' + IDENSEIGNANT,
      'GET',
      {}
    );
  }

  getLIistSimplifieEnseignant(){
    return this.globalService.setHttpRequest(
      this.urigelListeSimplifiee,
      'GET',
      {}
    );
  }


  update(enseigant: Enseigant): Observable<Enseigant> {
    const BASE_PATH = `${this.uri}/${enseigant.IDENSEIGNANT}`;
    const headers = this.globalService.getHeaders();
    return this.globalService
      .setHttpRequest(BASE_PATH, 'PUT', enseigant, headers)
      .pipe(
        tap(data => {
          localStorage.removeItem(constantes.requestCache.enseignantList)
        })
      );
  }


  delete(IDENSEIGNANT: number): Observable<string> {
    const url = `${this.uri}/${IDENSEIGNANT}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, 'DELETE', null, headers);
  }


  deleteRepartitionEnseignant(nIDENS_CLASSE: number): Observable<string> {
    const url = `${this.urisupprimeRepartitionEnseignant}/${nIDENS_CLASSE}`;
    return this.globalService.setHttpRequest(url, 'GET', {}, Headers)
  }


  create(Enseigant: Enseigant): Observable<Enseigant> {
    const BASE_PATH = `${this.uri}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, 'POST', Enseigant).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.enseignantList)
      })
    );
  }
  Recuperation(
    IDENSEIGNANT: number,
    civilite: number,
    nationalite: number,
    qualite: number,
    idservice: number,
    IDniveau: number,
    IDbranche: number
  ) {
    const data = {
      IDENSEIGNANT: IDENSEIGNANT,
      Civilite: civilite,
      IDNationalite: nationalite,
      qualite: qualite,
      idservice: idservice,
      IDniveau: IDniveau,
      IDbranche: IDbranche,
    };
    return this.globalService.setHttpRequest(
      this.uriEnseignant,
      'POST',
      data,
      Headers
    );
  }
  imprimerListeEnseignant(
    IDENSEIGNANT: number,
    civilite: number,
    nationalite: number,
    qualite: number,
    idservice: number,
    IDbranche: number
  ): Observable<Enseigant> {
    const data = {
      IDENSEIGNANT: IDENSEIGNANT,
      Civilite: civilite,
      IDNationalite: nationalite,
      qualite: qualite,
      idservice: idservice,
      IDbranche: IDbranche,
    };
    return this.globalService.setHttpRequest(
      this.urImprime,
      'POST',
      data,
      Headers
    );
  }

  getEnsMatiereClasse(nIDClasse: string){
    return this.globalService.setHttpRequest(
      this.uriMatiereClasse + '/' + nIDClasse ,
      'GET',
      {}
    );
  }

  AjoutPlanning(nIDClasse: string,nIDMatière:number,nIDEnseignant:number,nIDENS_CLASSE:number){
    return this.globalService.setHttpRequest(
      this.ajouteplanning + '/' + nIDClasse + '/' + nIDMatière + '/' + nIDEnseignant + '/' + nIDENS_CLASSE ,
      'GET',
      {}
    );
  }

  getMatierebyEnsignant(nIDEnseignant: number){
    return this.globalService.setHttpRequest(
      this.getmatierebyenseignant + '/' + nIDEnseignant ,
      'GET',
      {}
    );
  }


  getEnseignantbyMatiere(nIDMatière: number){
    return this.globalService.setHttpRequest(
      this.uriEnseignantBymatiere + '/' + nIDMatière ,
      'GET',
      {}
    );
  }


  getePhoto(idEnseignant: number): Observable<{Photo: string}>{
    return this.globalService.setHttpRequest(`PHOTO_Enseignant/${idEnseignant}`, "GET").pipe(
      tap(res => res)
    )
  }

  geteImage(typeparametre: number){
    return this.globalService.setHttpRequest(`PARAMETRES_Get_Badge_Image_Fond/${typeparametre}`, "GET").pipe(
      tap(res => res)
    )
  }

  updateImageCarteBadge(data: BalisesCarte){
    return this.globalService.setHttpRequest('PARAMETRES_MAJ_Image_Fond', "POST",data).pipe(
      tap(res => res)
    )
  }


  //devoirs
  getDevoirsEnseignants(nIDMatiere:number,nIDClasse:number,nIDEnseignant:number): Observable<DevoirEnseignant[]>{
    const url = `${this.uridevoir}/${nIDMatiere}/${nIDClasse}/${nIDEnseignant}`
    console.log(url);
    return this.globalService.setHttpRequest(url, 'GET', {});
  }

  getmatiereSelonnIDENSCLASSE(nIDEnseignant:number,nClasse:number){
    const url = `${this.urigetmationselonenseignantclasse}/${nIDEnseignant}/${nClasse}`
    console.log(url);
    return this.globalService.setHttpRequest(url, 'GET', {});
  }

  updateDevoir(devoir: DevoirEnseignant): Observable<DevoirEnseignant> {
    const BASE_PATH = `${this.Devoir}/${devoir.IDDEVOIRS}`;
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", devoir);
  }

  createDevoir(data: DevoirEnseignant){
    return this.globalService.setHttpRequest('DEVOIRS', "POST",data)
  }


  deletedevoier(IDDEVOIRS: number): Observable<string> {
    const url = `${'DEVOIRS'}/${IDDEVOIRS}`;
    return this.globalService.setHttpRequest(url, 'DELETE', {}, Headers)
  }


  getOneDevoirsEnseignants(IDDEVOIRS:number){
    const url = `${'DEVOIRS'}/${IDDEVOIRS}`
    return this.globalService.setHttpRequest(url, 'GET', {});
  }

  getclasseSelonEnseignant(nIDEnseignant:number){
    const url = `${this.urigetclasseSelonenseignant}/${nIDEnseignant}`
    return this.globalService.setHttpRequest(url, 'GET', {});
  }
}
