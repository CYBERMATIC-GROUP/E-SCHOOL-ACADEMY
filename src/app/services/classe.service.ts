import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { Classe } from '../models/classe.model';
import { GlobalService } from '../services/global.service';
import { environment } from 'src/environnements/environnement.prod';
import { ClassSelected } from '../models/class.selected.model';
import { constantes } from 'src/environnements/constantes';
import { Enseigant } from '../models/enseigant.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ClasseService {
  uri = 'CLASSES';
  uriClasse = 'CLASSES_Filtre';
  ClasseStatistique = 'CLASSES_Statistiques';

  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
    private cookieService: CookieService
  ) {}
  getClasseByEnseigantconnected(): Observable<any> | undefined {
    const enseignantStorage = localStorage.getItem(constantes.auth.enseignant);
    if (enseignantStorage) {
      const enseigant: Enseigant = JSON.parse(enseignantStorage);
      const uriEnseignant = `ENSEIGNANT_Get_Classe/${enseigant.IDENSEIGNANT}`;
      return this.globalService.setHttpRequest(uriEnseignant, 'GET', {});
    } else {
      // Ajoutez une valeur de retour par défaut si nécessaire
      return undefined; // ou une autre valeur par défaut selon votre logique
    }
  }
  
  get(refresh: boolean = false): Observable<Classe[]> {
    const enseignantStorage = localStorage.getItem(constantes.auth.enseignant);

    if (enseignantStorage) {
      const enseigant: Enseigant = JSON.parse(enseignantStorage);
      const uriEnseignant = `ENSEIGNANT_Get_Classe/${enseigant.IDENSEIGNANT}`;
      const cookie = this.cookieService.get(uriEnseignant);
      if (cookie) {
        console.log(JSON.parse(cookie));

        return this.globalService.setHttpRequest(uriEnseignant, 'GET').pipe(
          startWith(JSON.parse(cookie)),
          tap((res) => {
            this.cookieService.set(uriEnseignant, JSON.stringify(res));
          })
        );
      }
      return this.globalService.setHttpRequest(uriEnseignant, 'GET').pipe(
        tap((res) => {
          this.cookieService.set(uriEnseignant, JSON.stringify(res));
        })
      );
    } else {
      if (!refresh) {
        const cache = this.globalService.tryRequestFromCache(
          constantes.requestCache.classesList
        );
        if (cache) return cache;
      }
      console.log('classList is getted from server');
      return this.globalService
        .setHttpRequest(this.uri, 'GET', {}, Headers)
        .pipe(
          tap((response) => {
            localStorage.setItem('classes', JSON.stringify(response));
          })
        );
    }
  }

  getClasse(
    nIDNiveau: number,
    nIDBranche: number,
    nIDClasse: number,
    refresh: boolean = false
  ): Observable<Classe[]> {
    const url = `${this.uriClasse}/${nIDNiveau}/${nIDBranche}/${nIDClasse}`;
    if (!nIDNiveau && !nIDBranche && !nIDClasse && !refresh) {
      const objtStore = this.globalService.tryRequestFromCache(
        constantes.requestCache.classesList
      );
      if (objtStore && !refresh && !nIDNiveau && !nIDBranche && !nIDClasse) {
        return objtStore;
      }
    }
    console.log(constantes.requestCache.classesList + ' getted from server !');
    return this.globalService.setHttpRequest(url, 'GET', {}, Headers).pipe(
      tap((res) => {
        //if not a filter request set it on storage
        if (!nIDNiveau && !nIDBranche && !nIDClasse)
          localStorage.setItem(
            constantes.requestCache.classesList,
            JSON.stringify(res)
          );
      })
    );
  }

  getClassState(refresh: boolean = false): Observable<ClassSelected[]> {
    if (!refresh) {
      const objStore = this.globalService.tryRequestFromCache(
        constantes.requestCache.classeWithStat
      );
      if (objStore) return objStore;
    }

    return this.globalService
      .setHttpRequest(this.ClasseStatistique, 'GET', {}, Headers)
      .pipe(
        tap((res) => {
          localStorage.setItem(
            constantes.requestCache.classeWithStat,
            JSON.stringify(res)
          );
        })
      );
  }

  getClass(
    nIDNiveau: string,
    nIDBranche: string,
    nIDClasse: number
  ): Observable<Classe[]> {
    const url = `${this.uriClasse}/${nIDNiveau}/${nIDBranche}/${nIDClasse}`;
    return this.globalService.setHttpRequest(url, 'GET', {}, Headers);
  }

  getOne(idclasse: number): Observable<Classe> {
    return this.globalService.setHttpRequest(
      this.uri + '/' + idclasse,
      'GET',
      {},
      Headers
    );
  }

  update(classe: Classe): Observable<Classe> {
    const BASE_PATH = `${this.uri}/${classe.IDCLASSES}`;
    return this.globalService
      .setHttpRequest(BASE_PATH, 'PUT', classe, Headers)
      .pipe(
        tap((data) => {
          localStorage.removeItem(constantes.requestCache.classesList);
        })
      );
  }

  delete(idclasse: number): Observable<string> {
    const url = `${this.uri}/${idclasse}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, 'DELETE', null, headers);
  }

  deleteclasse(idclasse: string): Observable<string> {
    const url = `${this.uri}/${idclasse}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, 'DELETE', null, headers);
  }

  create(Classe: Classe): Observable<Classe> {
    const BASE_PATH = `${this.uri}`;
    return this.globalService
      .setHttpRequest(BASE_PATH, 'POST', Classe, Headers)
      .pipe(
        tap((data) => {
          localStorage.removeItem(constantes.requestCache.classesList);
        })
      );
  }

  newCreateClasse(IDBRANCHE: number, IDNIVEAU: number) {
    const uri = 'CLASSES_Creation_Automatique/' + IDBRANCHE + '/' + IDNIVEAU;
    return this.globalService.setHttpRequest(uri, 'POST', {});
  }

  impressionEmploiDuTempByClasse(nIDClasse: number) {
    const uri = 'PLANNING_ImprimeEmploiDuTempsClasse/' + nIDClasse;
    return this.globalService.setHttpRequest(uri, 'GET');
  }

  changeClasse(nIDNouvelleClasse: number, nIDELEVE: number) {
    return this.globalService.setHttpRequest(
      `ELEVE_Changement_Classe/${nIDELEVE}/${nIDNouvelleClasse}`,
      'PUT',
      {}
    );
  }

  recalculerMoyennes(idclasse: number, trimestre: number) {
    const uri = `SAISIE_NOTES_MAJ_MOYENNE/${trimestre}/${idclasse}`;
    return this.globalService.setHttpRequest(uri, 'POST', {});
  }
}
