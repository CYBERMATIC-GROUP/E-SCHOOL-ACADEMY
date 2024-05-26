import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map, of, tap } from 'rxjs';
import { Eleve, EleveInscription, ImprimeNoteClassement, SMSEnvoie } from '../models/eleve.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';
import { RadiationEleve } from '../models/radiationeleve.model';
import { UpdateDocumentPersonnaliser } from '../models/documentpersonnaliser.model';
import { paramClassement } from '../eleve/classement-releve-note-eleve/models/classement.model';
import { SearchEleveSimplifie } from '../models/eleve.model';
import { header } from '../models/header.model';
import { environment } from 'src/environnements/environnement.prod';
import { Demande_de_payement } from '../espace-parent/model/model.payement';
import { VerifyStatusPayement } from '../espace-parent/model/model.verifysatatus.paiement';
import { ReabonnementModel } from '../espace-parent/model/reabonnement.model';
import { FraisScolairePaiementParent } from '../espace-parent/model/paiementFraisScolaire.model';
@Injectable({
  providedIn: 'root',
})
export class EleveService {
  uri = 'ELEVE';
  urImprime = 'ELEVE_Imprime_Liste';
  uriEleve: string = 'ELEVES_Liste_Filtre';
  uriCarte: string = 'ELEVE_Imprime_Carte_Scolaire';
  EleveEnAttenteInscription = 'ELEVE_EnAttente_Inscription';
  uriPrintDocForStudent = 'ELEVE_Imprime_Document/';
  radiationEleve = 'ELEVE_Supprime';
  listeradiaeleve = "ELEVE_ListeRadia"
  Envoisms= "MESSAGE_Envoi_SMS"
  ListeSimplifieeEnvoisSms="ELEVE_Get_Liste_Simplifiee"
  uriperiodeparameters = "PARAMETRE_Get_Periode"
  uridocumentpersonnaliser = "PARAMETRES_Get_Document_Personnalise"
  uriUpdatedocumentpersonnaliser = "PARAMETRES_Set_Doc_Personalisé"
  urigetbalisesdocumentpersonnaliser = "PARAMETRES_Get_Document_Balises"
  uridocumentbalisesgetpersonnalisationcarte = "PARAMETRES_Get_Document_Balises_Image"
  uriNOTES_Imprime_ClassementsansDetail = "NOTES_Imprime_ClassementsansDetail"
  recherchesimplifiee = "RECHERCHE_Eleve_Simplifie"

  constructor(private http: HttpClient, private globalService: GlobalService) {}

  get(IDELEVE: number, referesh: boolean = false) {
    const store = "ELEVESTORESELECTION";
    //localStorage.;
    const data = { IDELEVE: IDELEVE, EtatEleve: 1 };
    const storageEleve = this.globalService.tryRequestFromCache(store);
    if (storageEleve && IDELEVE == 0 && !referesh) {
      return storageEleve;
    }
    return this.globalService
      .setHttpRequest(this.uriEleve, 'POST', data, Headers)
      .pipe(
        tap((response) => {
          localStorage.setItem(
            store,
            JSON.stringify(response)
          );
        })
      );
  }

  getelevesByClasse(EtatEleve: number, IDCLASSES: number) {
    const data = { EtatEleve: EtatEleve, IDCLASSES: IDCLASSES };
    return this.globalService.setHttpRequest(
      this.uriEleve,
      'POST',
      data,
      Headers
    );
  }

  getDocumentPersonnaliser(SPARAMETRE: number,nGenre:number,bEnHTML:number) {
    return this.globalService.setHttpRequest(
      this.uridocumentpersonnaliser + '/' + SPARAMETRE + '/' + nGenre + '/' + bEnHTML,
      'POST',
      {},
    );
  }

  getCarteDocumentBalisePersonnalisation() {
    return this.globalService.setHttpRequest(
      this.uridocumentbalisesgetpersonnalisationcarte ,
      'GET',
      {},
    );
  }

  getNOTES_Imprime_ClassementsansDetail(data:paramClassement){
    return this.globalService.setHttpRequest(
      this.uriNOTES_Imprime_ClassementsansDetail,
      'POST',
      data,
    ).pipe(map(res => res.body))
  }


  updateDocumentPersonnaliser(updatedocument: UpdateDocumentPersonnaliser) {
    const BASE_PATH = `${this.uriUpdatedocumentpersonnaliser}`;
    return this.globalService.setHttpRequest(BASE_PATH, 'POST', updatedocument)
  }

  GetParametresPeriode(nNumeTrimestre: number) {
    return this.globalService.setHttpRequest(
      this.uriperiodeparameters + '/' + nNumeTrimestre,
      'POST',
      {},
    ).pipe(map(res => res.body));
  }

  getelevesByClasseSelected(IDELEVE:number,IDCLASSES: string) {
    const data = {IDCLASSES: IDCLASSES,IDELEVE:IDELEVE };
    return this.globalService.setHttpRequest(
      this.uriEleve,
      'POST',
      data,
      Headers
    );
  }

  ListeSimplifieEnvoisSms(IDELEVE:number,IDCLASSES: string) {
    const data = {IDCLASSES: IDCLASSES,IDELEVE:IDELEVE };
    return this.globalService.setHttpRequest(
      this.ListeSimplifieeEnvoisSms,
      'POST',
      data,
    ).pipe(
      map(res => res.body)
    )
  }

  geteleves(IDCLASSES: number) {
    const data = { IDCLASSES: IDCLASSES };
    return this.globalService.setHttpRequest(
      this.uriEleve,
      'POST',
      data,
      Headers
    );
  }

  getOne(IDELEVE: number) {
    return this.globalService.setHttpRequest(
      this.uri + '/' + IDELEVE,
      'GET',
      {}
    );
  }

  getbalises() {
    return this.globalService.setHttpRequest(
      this.urigetbalisesdocumentpersonnaliser,
      'GET',
      {}
    );
  }

  getEleveEnAttenteInscription() {
    return this.globalService.setHttpRequest(
      this.EleveEnAttenteInscription,
      'GET',
      {},
      Headers
    );
  }

  update(eleve: Eleve): Observable<Eleve> {
    const BASE_PATH = `${this.uri}/${eleve.IDELEVE}`;
    const headers = this.globalService.getHeaders();
    return this.globalService
      .setHttpRequest(BASE_PATH, 'PUT', eleve, headers)
      .pipe(
        tap((data) => {
          localStorage.removeItem(constantes.requestCache.elevesList);
        })
      );
  }

  delete(IDELEVE: number): Observable<string> {
    const url = `${this.uri}/${IDELEVE}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, 'DELETE', null, headers);
  }

  create(eleve: EleveInscription) {
    const BASE_PATH = `${this.uri}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, 'POST', eleve).pipe(
      tap((data) => {
        localStorage.removeItem(constantes.requestCache.elevesList);
      })
    );
  }

   sendsms(data:SMSEnvoie[]=[]) {
     return this.globalService.setHttpRequest(this.Envoisms, 'POST', data)
   }

  FilterClassementEleve(nIDNiveau:number,nIDBranche:number,nIDClasse:number,Civilite: number){
    const data = {IDNIVEAU:nIDNiveau,IDBRANCHE:nIDBranche,IDCLASSES:nIDClasse,Civilite:Civilite}
    return this.globalService.setHttpRequest(this.uriEleve,'POST',data);
  }


  Recuperation(
    IDNIVEAU: number,
    IDBRANCHE: number,
    IDCLASSES: number,
    IDCYCLES: number,
    IDNATIONALITE: number,
    IDCENTRE_EXAMEN: number,
    IDSITE: number,
    IDSTATUTELEVE: number,
    EtatSanitaire: number,
    Civilite: number,
    EtatEleve: string,
    Fr_Nom: string,
    Fr_Prenom: string,
    Redoublant: boolean,
    NouveauDansAnneeCourante: boolean
  ) {
    const data = {
      IDNIVEAU: IDNIVEAU,
      IDBRANCHE: IDBRANCHE,
      IDCLASSES: IDCLASSES,
      IDCYCLES: IDCYCLES,
      IDNATIONALITE: IDNATIONALITE,
      IDCENTRE_EXAMEN: IDCENTRE_EXAMEN,
      IDSITE: IDSITE,
      IDSTATUTELEVE: IDSTATUTELEVE,
      EtatSanitaire: EtatSanitaire,
      Civilite: Civilite,
      EtatEleve: EtatEleve,
      Fr_Nom: Fr_Nom,
      Fr_Prenom: Fr_Prenom,
      Redoublant: Redoublant,
      NouveauDansAnneeCourante: NouveauDansAnneeCourante,
    };
    return this.globalService.setHttpRequest(
      this.uriEleve,
      'POST',
      data,
      Headers
    );
  }

  RecuperationbyName(Fr_Nom: string, Fr_Prenom: string, IDCLASSES: number) {
    const data = {
      Fr_Nom: Fr_Nom,
      Fr_Prenom: Fr_Prenom,
      IDCLASSES: IDCLASSES,
    };
    return this.globalService.setHttpRequest(
      this.uriEleve,
      'POST',
      data,
      Headers
    );
  }

  imprimerListeEleve(
    IDNIVEAU: number,
    IDBRANCHE: number,
    IDCLASSES: number,
    IDCYCLES: number,
    IDNATIONALITE: number,
    IDCENTRE_EXAMEN: number,
    IDSITE: number,
    IDSTATUTELEVE: number,
    EtatSanitaire: number,
    Civilite: number,
    EtatEleve: string,
    Fr_Nom: string,
    Fr_Prenom: string,
    Redoublant: boolean,
    NouveauDansAnneeCourante: boolean
  ): Observable<Eleve> {
    const data = {
      IDNIVEAU: IDNIVEAU,
      IDBRANCHE: IDBRANCHE,
      IDCLASSES: IDCLASSES,
      IDCYCLES: IDCYCLES,
      IDNATIONALITE: IDNATIONALITE,
      IDCENTRE_EXAMEN: IDCENTRE_EXAMEN,
      IDSITE: IDSITE,
      IDSTATUTELEVE: IDSTATUTELEVE,
      EtatSanitaire: EtatSanitaire,
      Civilite: Civilite,
      EtatEleve: EtatEleve,
      Fr_Nom: Fr_Nom,
      Fr_Prenom: Fr_Prenom,
      Redoublant: Redoublant,
      NouveauDansAnneeCourante: NouveauDansAnneeCourante,
    };
    return this.globalService.setHttpRequest(
      this.urImprime,
      'POST',
      data,
      Headers
    );
  }

  inscrireEleve(eleve: EleveInscription) {
    return this.globalService
      .setHttpRequest('ELEVE_Inscription/0', 'POST', eleve)
      .pipe(
        tap((data) => {
          localStorage.removeItem(constantes.requestCache.elevesList);
        })
      );
  }

  reinscrireEleve(eleve: EleveInscription) {
    return this.globalService
      .setHttpRequest('ELEVE_Inscription/' + eleve.IDELEVE, 'POST', eleve)
      .pipe(
        tap((data) => {
          localStorage.removeItem(constantes.requestCache.elevesList);
        })
      );
  }

  imprimerelevecarte(data: { IDELEVE: number }[]) {
    return this.globalService.setHttpRequest(
      this.uriCarte,
      'POST',
      data,
      Headers
    );
  }

  impressionDocumentEleve(type: number, data: { IDELEVE: number }[]) {
    return this.globalService.setHttpRequest(
      this.uriPrintDocForStudent + type,
      'POST',
      data
    );
  }

  RadiationEleve(nIDELEVE: number, nEtatEleve: number, MotifRadiation: RadiationEleve) {
    return this.globalService.setHttpRequest(
      this.radiationEleve + '/' + nIDELEVE + '/' + nEtatEleve,
      'PUT',
      MotifRadiation,
      Headers
    );
  }

  printEleveBulletin(data: {IDELEVE:number}[], nIDCLASSE: number, nNumeroTrimestre: number){
    const uri = `ELEVE_Imprime_Bulletin_Note/${nIDCLASSE}/${nNumeroTrimestre}`;
    return this.globalService.setHttpRequest(uri, "POST", data)
  }

  printBulletinV2(data: {IDELEVE:number}[], nIDCLASSE: number, nNumeroTrimestre: number, nNumeroSequence: number, bAnnuel: boolean){
    const uri = `ELEVE_Imprime_Bulletin_Note_V2/${nIDCLASSE}/${nNumeroTrimestre}/${nNumeroSequence}/${bAnnuel}`;
    return this.globalService.setHttpRequest(uri, "POST", data)
  }


  // RepriseEleve(nIDELEVE: number, nEtatEleve: number) {
  //   return this.globalService.setHttpRequest(
  //     this.radiationEleve + '/' + nIDELEVE + '/' + nEtatEleve,
  //     'PUT',
  //     {},
  //     Headers
  //   );
  // }

  // getListEleveRadia() {
  //   return this.globalService.setHttpRequest(
  //     this.listeradiaeleve,
  //     'GET',
  //     {}
  //   );
  // }

  RepriseEleve(nIDELEVE: number, nEtatEleve: number) {
    return this.globalService.setHttpRequest(
      this.radiationEleve + '/' + nIDELEVE + '/' + nEtatEleve,
      'PUT',
      {}
    );
  }

  getListEleveRadia() {
    return this.globalService.setHttpRequest(
      this.listeradiaeleve,
      'GET',
      {}
    );
  }


  getPhoto(IDELEVE: number): Observable<{Photo: string}>{
    return this.globalService.setHttpRequest(`PHOTO_Eleve/${IDELEVE}`, "GET")
  }

  getPhotoEleveParent(IDELEVE: number){
    return this.globalService.setHttpRequest(`PHOTO_Eleve/${IDELEVE}`, "GET")
  }

  updatephotoEleveParent(IDELEVE: number, photo: any){
    return this.globalService.setHttpRequest(`PHOTO_Modifie_Photo_Eleve/${IDELEVE}`,"PUT",photo)
  }

  //Partie parent
  RechercheSimplifiee(eleve: SearchEleveSimplifie) {
    console.log(eleve);
    const BASE_PATH = `${this.recherchesimplifiee}`;
    const headers = this.globalService.getHeadersParent();
    return this.http.post(environment.apiUrl + BASE_PATH, eleve, { headers: headers });
  }

  AddEleveByParent(nIDEleve: number) {
    console.log(nIDEleve);
    const BASE_PATH = `UTILISATEUR_Ajoute_Eleve/${nIDEleve}`;
    const headers = this.globalService.getHeadersParent();
    return this.http.get(environment.apiUrl + BASE_PATH , { headers: headers });
  }

  getListEleveAddByParent(nIDTUTEUER: number): Observable<any> {
    console.log(nIDTUTEUER);
    const BASE_PATH = `UTILISATEUR_Get_Abonnes_Famille/${nIDTUTEUER}`;
    const headers = this.globalService.getHeadersParent();
    return this.http.get(environment.apiUrl + BASE_PATH , { headers: headers });
  }


    delteEleveByParent(nIDEleve: number) {
    console.log(nIDEleve);
    const BASE_PATH = `UTILISATEUR_Supprime_Eleve/${nIDEleve}`;
    const headers = this.globalService.getHeadersParent();
    console.log(environment.apiUrl + BASE_PATH);
    return this.http.delete(environment.apiUrl + BASE_PATH , { headers: headers });
  }

  DemandePayement(demande: ReabonnementModel): Observable<any> {
    const headers = this.globalService.getHeadersParent();
    return this.http.post(environment.apiUrl + 'UTILISATEUR_Demande_Paiement', demande, { headers: headers });
  }

  DemandeStatutPayement(demandestatut: VerifyStatusPayement): Observable<any>  {
    const headers = this.globalService.getHeadersParent();
    return this.http.post(environment.apiUrl + 'MOBILE_MONEY_Get_Statut_Opération', demandestatut, { headers: headers });
  }

  DemandeStatutPayementFraisScolaire(demandestatut: VerifyStatusPayement): Observable<any>  {
    const headers = this.globalService.getHeadersParent();
    return this.http.post(environment.apiUrl + 'MOBILE_MONEY_Verifie_Statut_Transaction', demandestatut, { headers: headers });
  }

  getListService(): Observable<any> {
    const BASE_PATH = 'UTILISATEUR_Liste_Services';
    const headers = this.globalService.getHeadersParent();
    return this.http.get(environment.apiUrl + BASE_PATH , { headers: headers });
  }


  // Frais Scolaire paiement
  DemandePayementFRaisScolaire(demande: FraisScolairePaiementParent): Observable<any> {
    const headers = this.globalService.getHeadersParent();
    return this.http.post(environment.apiUrl + 'MOBILE_MONEY_Paiement_Frais_Scolaire', demande, { headers: headers });
  }

}
