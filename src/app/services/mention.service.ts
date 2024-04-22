import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { constantes } from 'src/environnements/constantes';
import { Observable, tap } from 'rxjs';
import { Mentions } from '../models/mentions.model';
import { ObjectEnvoie, Objectifs } from '../models/objectif.model';

@Injectable({
  providedIn: 'root'
})
export class MentionService {

  uri = "MENTIONS";
  uriobjectif = "OBJECTIFS_Get_Objectif"
  uricreateUpdateobjectif = "OBJECTIFS_Creation_Modification"

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService
  ) { }

  get(refresh: boolean = false): Observable<Mentions[]>{
    const objStorage = this.globalService.tryRequestFromCache(constantes.requestCache.mentionnslist);
  
    if (objStorage && !refresh) {
      return objStorage
    }
    return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
      tap(response => {
        localStorage.setItem(constantes.requestCache.mentionnslist, JSON.stringify(response))
      })
    )
  }
  getOne(IDMENTIONS: number): Observable<Mentions> {
    return this.globalService.setHttpRequest(this.uri + '/' + IDMENTIONS, "GET", {},Headers);
  }
  update(mentions: Mentions): Observable<Mentions> {
    const BASE_PATH = `${this.uri}/${mentions.IDMENTIONS}`;
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", mentions, Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.mentionnslist)
      })
    );
  }
  delete(IDMENTIONS: number): Observable<string> {
    const url = `${this.uri}/${IDMENTIONS}`;
    return this.globalService.setHttpRequest(url, "DELETE", null, Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.mentionnslist)
      })
    );
  }
  create(mentions: Mentions): Observable<Mentions> {
    const BASE_PATH = `${this.uri}`;
    return this.globalService.setHttpRequest(BASE_PATH, "POST", mentions,Headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.mentionnslist)
      })
    );
  }

  //objectifs
  getobjectifs(data:ObjectEnvoie){
    return this.globalService.setHttpRequest(this.uriobjectif, "POST",data)
  }
  
  updateobjectifs(objectifs: Objectifs): Observable<Objectifs> {
    return this.globalService.setHttpRequest(this.uricreateUpdateobjectif, "POST", objectifs)
  }
  deleteobjectifs(IDLES_OBEJECTIS: number): Observable<string> {
    const url = `${this.uriobjectif}/${IDLES_OBEJECTIS}`;
    return this.globalService.setHttpRequest(url, "DELETE", {})
  }
  createojectif(objectif: Objectifs): Observable<Objectifs> {
    const BASE_PATH = `${this.uricreateUpdateobjectif}`;
    return this.globalService.setHttpRequest(BASE_PATH, "POST", objectif)
  }

  getOneObjectif(objectif: Objectifs){
    return this.globalService.setHttpRequest(this.uriobjectif, "POST",objectif,);
  }


}
