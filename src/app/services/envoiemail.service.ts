import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { EnvoiMail } from '../models/envoiemail.model';
import { environment } from 'src/environnements/environnement';

@Injectable({
  providedIn: 'root'
})
export class EnvoiemailService {

  uri = environment.apiUrl;

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService) { }

    EnvoieMail(envoiemail: EnvoiMail): Observable<any>{  
      const uri = `ESCHOOL_Envoie_Mail`;
      return this.http.put(this.uri + uri, envoiemail, {headers: this.globalService.getHeaderForEpay()})
    }
  
    //  EnvoieMail(envoiemail: EnvoiMail): Observable<EnvoiMail> {
    //   const BASE_PATH = `${this.uri}`;
    //   const headers = this.globalService.getHeaders();
    //   return this.globalService.setHttpRequest(BASE_PATH, "PUT", envoiemail , Headers);
    // }

}
