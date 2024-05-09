import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../login/login.component';
import { GlobalService } from './global.service';
import { environment } from 'src/environnements/environnement.prod';
import { EMPTY, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AskTokenComponent } from '../login/ask-token/ask-token.component';
import { header } from '../models/header.model';
import { ErrorInterface } from '../models/error.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri = "AgentConnexion/"
  uriDemande_de_connexion = "UTILISATEUR_Demande_Connexion"

  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  loginAgent(connexion: login, head: header) {
    console.log(connexion);
    const headerInit = new HttpHeaders({
      ...head
    })
    const payload = {
      Login: connexion.sLogin,
      MotDePasse: connexion.sMotDePasse
    }
    const uri = this.uri + connexion.sLogin + '/'+connexion.sMotDePasse;
    //return this.globalService.setHttpRequest(uri, "POST", {});
    return this.http.post(environment.apiUrl + uri, payload, { headers: headerInit, observe: 'response' });
  }

  loginEleve(connexion: login, head: header) {
    console.log(connexion);
    const headerInit = new HttpHeaders({
      ...head
    })
    const payload = {
      Login: connexion.sLogin,
      MotDePasse: connexion.sMotDePasse
    }
    const uri = 'ELEVE_Connexion/' + "0000" + '/'+ "0000";
    //return this.globalService.setHttpRequest(uri, "POST", {});
    return this.http.post(environment.apiUrl + uri, payload, { headers: headerInit, observe: 'response' });
  }

  loginEnseignant(connexion: login, head: header) {
    console.log(connexion);
    const headerInit = new HttpHeaders({
      ...head
    })
    const uri = 'ENSEIGNANT_Demande_Connexion/' + connexion.sLogin + '/' + connexion.sMotDePasse;
    const data = {
      sLogin: connexion.sLogin,
      sMotDePasse: connexion.sMotDePasse
    }
    //return this.globalService.setHttpRequest(uri, "POST", {});
    return this.http.post(environment.apiUrl + uri, data, { headers: headerInit, observe: 'response' });
  }
}
