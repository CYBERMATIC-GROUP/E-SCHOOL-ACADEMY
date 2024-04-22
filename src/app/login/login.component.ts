import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Annee } from '../models/annee.model';
import { AnneeService } from '../services/annee.service';
import { MatDialog } from '@angular/material/dialog';
import { AskTokenComponent } from './ask-token/ask-token.component';
import { GlobalService } from '../services/global.service';
import { header } from '../models/header.model';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environnements/environnement.prod';
import { ErrorInterface } from '../models/error.model';
import { AgentService } from '../services/agent.service';
import { EleveService } from '../services/eleve.service';
import { EnseignantService } from '../services/enseignant.service';
import { constantes, versionApp } from 'src/environnements/constantes';
import { Eleve } from '../models/eleve.model';
import { schoolLogin } from '../models/ecole.model';
import { Enseigant } from '../models/enseigant.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  firstCodeTyping!: string;
  dataSource!: any;
  loginForm!: FormGroup;
  loginFormPreview$!: Observable<login>;
  agent!: any;
  annees!: Annee[];
  suggestAnnee!: Annee[];
  isLoading!: boolean;
  header!: header;
  lastTypeUser!: number;
  typeUserObj = environment.TypeUserConst;
  DEFAULT_USER = environment.TypeUserConst.CST_TYPE_USER_AGENT;
  //selected agent by default
  typeUserSelected!: number;
  showPassword!: boolean;
  yearsIsLoading!: boolean;
  version = versionApp
  canIWrite!: boolean;
  school!: schoolLogin

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private anneeService: AnneeService,
    private dialog: MatDialog,
    private globalService: GlobalService,
    private router: Router,
    private route: ActivatedRoute,
    private agentService: AgentService,
    private eleveService: EleveService,
    private enseignantService: EnseignantService
  ){}

  ngOnInit(){
    this.verifAnRedirectConnectedUser();
    const objHeader = localStorage.getItem('header');
    const lastTypeUserStorage = localStorage.getItem(constantes.auth.lastTypeUser)
    if(lastTypeUserStorage){
      this.lastTypeUser = Number(lastTypeUserStorage)
      this.typeUserSelected = this.lastTypeUser
    }else{
      this.typeUserSelected = this.DEFAULT_USER
      console.log(this.typeUserSelected);
      
    }

    if(objHeader){
      this.header = JSON.parse(objHeader);
      console.log(this.header);
      
    }

    this.initFormLogin();

    const objSchool = localStorage.getItem(constantes.auth.school);
    if(objSchool){
      this.school = JSON.parse(objSchool)
    }

  }

  private verifAnRedirectConnectedUser(){
    if(localStorage.getItem(constantes.auth.eleve)){
      this.router.navigate(['/' + environment.routes.Eleve.espaceEleve.base])
    }
    else if (localStorage.getItem(constantes.auth.agent)){
      this.router.navigate(['/'])
    }
    else if (localStorage.getItem(constantes.auth.enseignant)){
      this.router.navigate(['/' + environment.routes.Enseignant.espaceEnseigant.base])
    }
  }

  inputCode(){
    if(this.loginForm.value.CODE_ECOLE){
      this.canIWrite = true;
    }else{
      this.canIWrite = false;
    }
  }

  initAnnee(ignoreCompare: boolean = false){
    const codeEcole = this.loginForm.value.CODE_ECOLE;

    if((codeEcole && codeEcole != this.firstCodeTyping) || (ignoreCompare == true)){
      this.yearsIsLoading = true;
      this.firstCodeTyping = codeEcole
      this.annees = []
      //we just need codeecole to get years
      this.anneeService.get(this.header).subscribe(data => {
        console.log(data)
        this.yearsIsLoading = false;
        this.annees = this.suggestAnnee = data;
        if(this.header){
          this.loginForm.get('Annee1Annee2')?.setValue(this.header.ANNEE);
        }
      })
    }
  }

  initFormLogin(){
    this.loginForm = this.formBuilder.group({
      sLogin: [null, [Validators.required]],
      sMotDePasse: [null, [Validators.required]],
      CODE_ECOLE: [null, [Validators.required]],
      Annee1Annee2: [null, Validators.required]
    });

    this.loginFormPreview$ = this.loginForm.valueChanges;

    //try to init code ecole
    if(this.header){
      //this.initAnnee(true);
      this.loginForm.get('CODE_ECOLE')?.setValue(this.header.CODE_ECOLE);
      this.loginForm.get('UTILISATEUER_LOGIN')?.setValue(this.header.UTILISATEUER_LOGIN);
      this.loginForm.get('ANNEE')?.setValue(this.header.ANNEE);
      this.loginForm.get('sMotDePasse')?.setValue('');
      this.loginForm.get('sLogin')?.setValue(this.header.UTILISATEUER_LOGIN);
      this.canIWrite = true;

      this.initAnnee(true)
    }
    const codeParam = this.route.snapshot.params['code']
    if(codeParam){
      this.loginForm.get('CODE_ECOLE')?.setValue(codeParam);
      this.initAnnee(true)
    }
  }

  onInputAnnee(event: any){
    const eltInput = event.target.value;
    if (eltInput.length > 0){

      const regex = new RegExp(eltInput + '.*', 'i');
      this.suggestAnnee = this.annees.filter(elt => regex.test(elt.Annee1Annee2));

    }else{

      this.suggestAnnee = this.annees;

    }
  }

  onBlurCode(){
    const objHeader = localStorage.getItem('header');

    if(objHeader){
      const header: header = JSON.parse(objHeader);
      this.header = header
      //this.initAnnee();

      if(this.loginForm.value.CODE_ECOLE != header.CODE_ECOLE){
        //modif header.CODE_ECOLE
        this.header.CODE_ECOLE = this.loginForm.value.CODE_ECOLE;
        this.loginForm.get('Annee1Annee2')?.setValue('');
        //this.annees = [];
        this.loginForm.get('sLogin')?.setValue('');
        //this.initAnnee();
      }
    }else{
      this.header = {
        CODE_ECOLE: this.loginForm.value.CODE_ECOLE,
        ANNEE: "",
        IDENTIFIANT: this.loginForm.value.CODE_ECOLE,
        CLE_API: "",
        UTILISATEUER_LOGIN: "",
        UTILISATEUER_TOKEN: "",
        ACTION: 1,
        TYPE_UTILISATEUR: this.typeUserSelected,

      }
      //this.initAnnee();
    }

    this.initAnnee()
  }

  getCurrentToken(): string{
    const obj = localStorage.getItem('header');
    if(obj){
      return JSON.parse(obj).UTILISATEUER_TOKEN;
    }

    return ""
  }

  askToken(){
    const ref = this.dialog.open(AskTokenComponent, {disableClose: true});
    ref.afterClosed().subscribe(result => {
      console.log(result)
      if(!result){
        this.isLoading = false;
      }
    })
    return ref
  }

  onSelectTypeUser(type: number){
    this.typeUserSelected = type
  }

  makeLoadSomeListInBack(){
    this.agentService.getList(0, true).subscribe();
    this.eleveService.get(0, true).subscribe();
    this.enseignantService.get(true).subscribe();
  }

  onLogin(){
    this.isLoading = true;
    const connexionStore = localStorage.getItem('header');
    let currentHeader!: any;
    const conn: login = this.loginForm.value;
    currentHeader = {
      ...currentHeader,
      CODE_ECOLE: conn.CODE_ECOLE.toLocaleUpperCase(),
      ANNEE: conn.Annee1Annee2,
      IDENTIFIANT: conn.CODE_ECOLE.toLocaleUpperCase(),
      CLE_API: "XZZ",
      UTILISATEUER_LOGIN: conn.sLogin.toLocaleUpperCase(),
      ACTION: 1
    };
    this.header = {
      ...this.header,
      ANNEE: conn.Annee1Annee2,
      UTILISATEUER_LOGIN: conn.sLogin,
      ACTION: 1,
      TYPE_UTILISATEUR: this.typeUserSelected
    }
    //localStorage.setItem('header', currentHeader);
    if(this.typeUserSelected == this.typeUserObj.CST_TYPE_USER_AGENT){
      this.loginAgent(conn);
    }
    else if(this.typeUserSelected == this.typeUserObj.CST_TYPE_USER_ELEVE){
      this.loginEleve(conn)
    }
    else if(this.typeUserSelected == this.typeUserObj.CST_TYPE_USER_ENSEIGNANT){
      this.loginEnseignant(conn)
    }
  }

  loginEleve(conn: login){
    this.loginService.loginEleve(conn, this.header).subscribe((response: HttpResponse<any>) => {
      console.log(response);
      const eleve: Eleve = response.body.Eleve
      localStorage.setItem(constantes.auth.eleve, JSON.stringify(eleve));
      localStorage.setItem(constantes.auth.lastTypeUser, this.typeUserObj.CST_TYPE_USER_ELEVE.toString())
      this.isLoading = false;
      localStorage.setItem(constantes.auth.header, JSON.stringify({...this.header, ACTION: 2, DATE_COMPTABLE: this.globalService.getCurrentDateForInput()}));
      localStorage.setItem(constantes.auth.school, JSON.stringify(response.body.Etable))
      this.router.navigate(['/' + environment.routes.Eleve.espaceEleve.base]);
      this.globalService.toastShow("Vous êtes connecté en tant qu'élève : " + eleve.Fr_Nom + " " + eleve.Fr_Prenom, "Connexion")
    }, (error) => {
      const code = error.status;
      this.catchError(code, error);
    })
  }

  loginAgent(conn: login){
    console.log(this.header);
    this.loginService.loginAgent(conn, this.header).subscribe((response: HttpResponse<any>) => {
      // Récupérer les informations de l'en-tête
      console.log(response);
      const headers = response.headers;
      //clear data before
      localStorage.clear();
      //set header in store
      localStorage.setItem(constantes.auth.header, JSON.stringify({...this.header, ACTION: 2,  DATE_COMPTABLE: this.globalService.getCurrentDateForInputWithoutDateComptable()}));
      localStorage.setItem(constantes.auth.agent, JSON.stringify(response.body.Personnel));
      localStorage.setItem(constantes.auth.school, JSON.stringify(response.body.Etable));
      localStorage.setItem(constantes.auth.lastTypeUser, this.typeUserObj.CST_TYPE_USER_AGENT.toString())
      //get necessary list en fonds
      this.makeLoadSomeListInBack();

      window.location.href = document.baseURI + "dashboard";
      // ... Autres traitements de la réponse
    }, (error) => {
      const code = error.status;
      this.catchError(code, error);
      //this.isLoading = false;
    });
  }


  loginEnseignant(conn: login){
    console.log(this.header);
    this.loginService.loginEnseignant(conn, this.header).subscribe((response: HttpResponse<any>) => {
      // Récupérer les informations de l'en-tête
      console.log(response);
      const headers = response.headers;
      //clear data before
      localStorage.clear();
      //set header in store
      const enseignant: Enseigant = response.body.Personnel;
      localStorage.setItem(constantes.auth.header, JSON.stringify({...this.header, ACTION: 2}));
      localStorage.setItem(constantes.auth.enseignant, JSON.stringify(enseignant));
      localStorage.setItem(constantes.auth.school, JSON.stringify(response.body.Etable));
      localStorage.setItem(constantes.auth.lastTypeUser, this.typeUserObj.CST_TYPE_USER_ENSEIGNANT.toString())

      this.router.navigate(['/' + environment.routes.Enseignant.espaceEnseigant.base])
      const objSchool = localStorage.getItem(constantes.auth.school);
      if(objSchool){
        this.school = JSON.parse(objSchool)
      }
      this.globalService.toastShow("Vous êtes connecté en tant qu'enseignant : " + enseignant.Fr_Nom + " " + enseignant.Fr_Prenom + " pour le compte de l'école '" + this.school?.NomEtab + "'", "Connexion")
    }, (error) => {
      const code = error.status;
      this.catchError(code, error);
      //this.isLoading = false;
    });
  }


  catchError(code: string, error: any){
    //A ce niveau l'erreur personnalise est decte
    if(code == environment.errorCode.token){
      const er: ErrorInterface = error.error;
      const ref = this.dialog.open(AskTokenComponent, {disableClose: true});
      ref.componentInstance.errorMsg = er.fault.detail;
      ref.afterClosed().subscribe(res => {
        console.log(res)
        console.log('resultat')
        if(res){
          this.header.UTILISATEUER_TOKEN = ref.componentInstance.token;
          this.onLogin();
        }else{
          this.isLoading = false;
        }
      })
    }else{
      this.globalService.alert(error.error.fault.detail, "Erreur", "danger", "", "OK");
      this.isLoading = false
    }
  }
}

export interface login{
  sLogin: string;
  sMotDePasse: string;
  Annee1Annee2: string;
  CODE_ECOLE: string;
}
