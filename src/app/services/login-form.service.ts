import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { environment } from 'src/environnements/environnement.prod';
import { EMPTY, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AskTokenComponent } from '../login/ask-token/ask-token.component';
import { header } from '../models/header.model';
import { ErrorInterface } from '../models/error.model';
import { LoginFormComponent, login } from '../login-form/login-form.component';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {

  uri = "AgentConnexion/"

  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  loginEleve(connexion: login, head: header) {
    console.log(connexion);
    const headerInit = new HttpHeaders({
      ...head
    })
    const payload = {
      Login: connexion.Login,
      MotDePasse: connexion.MotDePasse
    }
    const uri = 'UTILISATEUR_Demande_Connexion/' + connexion.Login + '/'+connexion.MotDePasse;
    return this.http.post(environment.apiUrl + uri, payload, { headers: headerInit, observe: 'response' });
  }

  loginParent(connexion: login,head: header) {
    console.log(connexion);
     const headerInit = new HttpHeaders({
       ...head
     })
    const uriparent = 'UTILISATEUR_Demande_Connexion';
    const data = {
      Login: connexion.Login,
      MotDePasse: connexion.MotDePasse
    }
    return this.http.post(environment.apiUrl + uriparent, data,{ headers: headerInit, observe: 'response' });
  }
}
