import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../core/alert/alert.component';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, of, tap } from 'rxjs';
import { environment } from 'src/environnements/environnement.prod';
import { ErrorInterface } from '../models/error.model';
import { header } from '../models/header.model';
import { login } from '../login/login.component';
import { AskTokenComponent } from '../login/ask-token/ask-token.component';
import { ToastrService } from 'ngx-toastr';
import { paramVersList } from '../models/param-vers-list.model';
import { apiUris, constantes } from 'src/environnements/constantes';
import { Location } from '@angular/common';
import { EtablissementService } from './etablissement.service';
import { schoolLogin } from '../models/ecole.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  toastConfig = {
    positionClass: 'toast-center-center',
    timeOut: 3000,
    closeButton: true
  }

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private toastrService: ToastrService,
    private _location: Location
  ) { }

  raiseErrorServer(message: string = ""){
    this.dialog.closeAll();
    const msg = message ?? "Impossible de joindre le serveur !";
    const ref = this.dialog.open(AlertComponent, {maxWidth: "500px"});
    ref.componentInstance.title = "";
    ref.componentInstance.content = msg;
    ref.componentInstance.buttonOKName = "OK";
    ref.componentInstance.buttonCancelName = "";
    /*ref.afterClosed().subscribe(result => {
      this._location.back();
    })*/
    return ref;
  }

  alert(msg: string, title: string, type: "info" | "success" | "danger", btnCamncel: string, btnOk: string, disableClose: boolean = false){

    const ref = this.dialog.open(AlertComponent, {maxWidth: "500px", disableClose: disableClose});
    ref.componentInstance.content = msg;
    ref.componentInstance.type = type;
    ref.componentInstance.buttonCancelName = btnCamncel;
    ref.componentInstance.buttonOKName = btnOk;
    ref.componentInstance.title = title;
    return ref;
  }

  firstLetterToUpper(myString: string): string{
    return myString.charAt(0).toUpperCase() + myString.slice(1);
  }

  convertToValideDate(DateNaissance: string, separateur="") {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${year}${separateur}${month}${separateur}${day}`;
    return formattedDate;
  }

 formatPrix  (prix : number, separateur: string = ' ', device: string = 'XAF') {
   const schoolObj = localStorage.getItem(constantes.auth.school)
   const school: schoolLogin | undefined = schoolObj ? JSON.parse(schoolObj) : undefined;

   let deviceGet = device;
   if(device != '')
    deviceGet = school?.Monnaie ? school.Monnaie : device;

   let  reverse : string[] = prix.toString().split('').reverse();
   let prixFormated:string = '';

   for ( let i:number = 1 ; i <= reverse.length; i++ ) {
      prixFormated += reverse[i-1];

      if (i%3 === 0) {
        prixFormated += separateur;
      }
   }

   let formated = prixFormated.split('').reverse().join('')
   let decimal =  ',00 ' + deviceGet

   if ( formated[0] == separateur) {
   	formated = formated.substring(1)
   }
   return formated + decimal;
  }

  getHeaders(): HttpHeaders | undefined {
    const headerStorage = localStorage.getItem(constantes.auth.header);
    console.log(headerStorage);
    if (headerStorage){
      const headerConfig: header = JSON.parse(headerStorage);
      try {
        let headFormatToUpper: header = {
          CODE_ECOLE: headerConfig.CODE_ECOLE.toUpperCase(),
          ANNEE: headerConfig.ANNEE.toUpperCase(),
          IDENTIFIANT: headerConfig.IDENTIFIANT.toUpperCase(),
          CLE_API: headerConfig.CLE_API.toUpperCase(),
          UTILISATEUER_LOGIN: headerConfig.UTILISATEUER_LOGIN.toUpperCase(),
          UTILISATEUER_TOKEN: headerConfig.UTILISATEUER_TOKEN.toUpperCase() ?? '',
          ACTION: headerConfig.ACTION,
          TYPE_UTILISATEUR: headerConfig.TYPE_UTILISATEUR
        }
        if(headerConfig.DATE_COMPTABLE)
          headFormatToUpper = {...headFormatToUpper, DATE_COMPTABLE: headerConfig.DATE_COMPTABLE}
        return new HttpHeaders({...headFormatToUpper});
      } catch (error) {
        this.logout();
      }

    }else{
      this.logout();
      console.log("Aucune entête trouvée !", "Erreur", "danger", "", "OK");
    }
    return undefined;
  }

  getHeadersParent(): HttpHeaders | undefined {
    const headerStorageparent = localStorage.getItem(constantes.auth.header);
    console.log(headerStorageparent);
    if (headerStorageparent){
      const headerConfigparent: header = JSON.parse(headerStorageparent);
      try {
        let headFormatToUpperParent: header = {
          CODE_ECOLE: headerConfigparent.CODE_ECOLE.toUpperCase(),
          ANNEE: headerConfigparent.ANNEE.toUpperCase(),
          IDENTIFIANT: headerConfigparent.IDENTIFIANT.toUpperCase(),
          CLE_API: headerConfigparent.CLE_API.toUpperCase(),
          UTILISATEUER_LOGIN: headerConfigparent.UTILISATEUER_LOGIN.toUpperCase(),
          UTILISATEUER_TOKEN: headerConfigparent.UTILISATEUER_TOKEN.toUpperCase() ?? '',
          ACTION: headerConfigparent.ACTION,
          TYPE_UTILISATEUR: headerConfigparent.TYPE_UTILISATEUR
        }
        if(headerConfigparent.DATE_COMPTABLE)
        headFormatToUpperParent = {...headFormatToUpperParent, DATE_COMPTABLE: headerConfigparent.DATE_COMPTABLE}
        return new HttpHeaders({...headFormatToUpperParent});
      } catch (error) {
        this.logout();
      }

    }else{
      this.logout();
      console.log("Aucune entête trouvée !", "Erreur", "danger", "", "OK");
    }
    return undefined;
  }

  changeToken(uri: string, method: "POST" | "GET" | "DELETE" | "PUT", data: any = "", header: any = false){
    const tokenDialog = this.dialog.open(AskTokenComponent);
    tokenDialog.componentInstance.errorMsg = "TOKEN INVALIDE, ENTRER UN NOUVEAU TOKEN"

    tokenDialog.afterClosed().subscribe(resultat => {
      const newToken = tokenDialog.componentInstance.token;

      let currentHeaderObj = localStorage.getItem('header');

      if(currentHeaderObj){
        const newHeader: header  = JSON.parse(currentHeaderObj);
        newHeader.UTILISATEUER_TOKEN = newToken;
        newHeader.ACTION = 1;
        localStorage.setItem('header', JSON.stringify(newHeader));

        //after changer we need to set the same request
        this.setHttpRequest(uri, method, data, header).subscribe(dataRes => {
          location.reload();
        });

      }else{
        localStorage.clear();
        this.router.navigate(['/connexion']).then(res => {
          window.location.reload();
        })
      }
    })
  }

  setHttpRequest(uri: string, method: "POST" | "GET" | "DELETE" | "PUT", data: any = "", header: any = false): Observable<any> {

    const baseUri = environment.apiUrl + uri;
    const head = header ? header : this.getHeaders();

    if(head){
      if (method === "GET")
      {
        return this.http.get(baseUri, {headers: this.getHeaders()}).pipe(
          tap(res => {
            this.checkOverflow();
            return res
          }),
          catchError((error: HttpErrorResponse) => {
            const status = error.status;

            if(status == 402){
              this.logout();
            }else{
              const err: ErrorInterface = error.error;
              console.log(err.fault.detail);
              this.raiseErrorServer(err.fault.detail);
            }
            return EMPTY;
          })
        );
      }

      else if (method === "POST")
      {
        return this.http.post(baseUri, data, {headers: this.getHeaders(), observe: 'response'}).pipe(
          tap(res => {
            this.checkOverflow();
            return res
          }),
          catchError((error: HttpErrorResponse) => {
            const status = error.status;
            console.log(status)
            if(status == 402){
              this.logout();
            }else{
              const err: ErrorInterface = error.error;
              console.log(err.fault.detail);
              this.raiseErrorServer(err.fault.detail);
            }
            return EMPTY;
          })
        );
      }

      else if (method === "DELETE")
      {
        return this.http.delete(baseUri, {headers: this.getHeaders()}).pipe(
          tap(res => {
            this.checkOverflow();
            return res
          }),
          catchError((error: HttpErrorResponse) => {
            const status = error.status;

            if(status == 402){
              this.logout();
            }else{
              const err: ErrorInterface = error.error;
              console.log(err.fault.detail);
              this.raiseErrorServer(err.fault.detail);
            }
            return EMPTY;
          })
        );
      }

      else if (method === "PUT")
      {
        return this.http.put(baseUri, data, {headers: this.getHeaders()}).pipe(
          tap(res => {
            this.checkOverflow();
            return res
          }),
          catchError((error: HttpErrorResponse) => {
            const status = error.status;

            if(status == 402){
              this.logout();
            }else{
              const err: ErrorInterface = error.error;
              console.log(err.fault.detail);
              this.raiseErrorServer(err.fault.detail);
            }
            return EMPTY;
          })
        );
      }
    }

    return EMPTY
  }

  reloadComponent(uri: string){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri]);
    });
  }

  toastShow(msg: string, title: string, type: 'success' | 'error' | 'info' = 'success'){
    if(type == 'success'){
      this.toastrService.success(msg, title, this.toastConfig);
    }else if(type == 'error'){
      this.toastrService.error(msg, title, this.toastConfig);
    }else if(type == 'info'){
      this.toastrService.info(msg, title, this.toastConfig);
    }
  }

  ///////PERSONAL FOR THIS PROJECT/////////////////
  initConnectedAgent(){
    const agentObj = localStorage.getItem(constantes.auth.agent);
    if(agentObj){
      return JSON.parse(agentObj);
    }
    return undefined;
  }

  tryRequestFromCache(itemName: string){
    const objtStore = localStorage.getItem(itemName);
    console.log(objtStore);

    if(objtStore){
      console.log(itemName + 'getted form cache');
      this.checkOverflow();
      return of(JSON.parse(objtStore));
    }else{
      return false;
    }
  }

  intParamVersListForCache() {
    return this.setHttpRequest('ParametreVersListe', "GET").pipe(
      tap(data => {
        localStorage.setItem(constantes.requestCache.branchesList, JSON.stringify(data.BRANCHE));

        localStorage.setItem(constantes.requestCache.classesList, JSON.stringify(data.CLASSES));

        localStorage.setItem(constantes.requestCache.cyclesList, JSON.stringify(data.CYCLES));

        localStorage.setItem(constantes.requestCache.languesList, JSON.stringify(data.LANGUE));

        localStorage.setItem(constantes.requestCache.sitesList, JSON.stringify(data.SITE));

        localStorage.setItem(constantes.requestCache.nationalitesList, JSON.stringify(data.NATIONALITE));

        localStorage.setItem(constantes.requestCache.professionList, JSON.stringify(data.PROFESSION));

        localStorage.setItem(constantes.requestCache.situationSocialeList, JSON.stringify(data.SITUATION_SOCIALE));

        localStorage.setItem(constantes.requestCache.statutEleveList, JSON.stringify(data.STATUTELEVE));

        localStorage.setItem(constantes.requestCache.qualiteens, JSON.stringify(data.QUALITEENS));

        localStorage.setItem(constantes.requestCache.isAllParamsListIsSet, '1');

        //load etablissements for cache
        this.setHttpRequest(apiUris.etablissement.etablissementList, "GET").subscribe(etabsRes => {
          localStorage.setItem(constantes.requestCache.etablissementsScolaires, JSON.stringify(etabsRes));
          this.checkOverflow()
          console.log(etabsRes)
        })

        //load agent
        this.setHttpRequest(apiUris.agent, "POST", {IDAGENT: 0}).subscribe(res => {
          console.log(res)
          localStorage.setItem(constantes.requestCache.agentList, JSON.stringify(res.body))
        })

        /*this.setHttpRequest(apiUris.eleve, "POST", { IDELEVE: 0, EtatEleve: 1}).subscribe(res => {
          console.log(res)
          localStorage.setItem(constantes.requestCache.elevesList, JSON.stringify(res.body))
        })*/

        //load enseignant
        this.setHttpRequest(apiUris.enseignant, "GET").subscribe(res => {
          console.log(res)
          localStorage.setItem(constantes.requestCache.enseignantList, JSON.stringify(res.body))
        })

        this.checkOverflow()
      })
    );
  }

  logout(){
    //before to clear info for concted user set header info
    localStorage.removeItem(constantes.auth.agent);
    localStorage.removeItem(constantes.auth.eleve);
    localStorage.removeItem(constantes.auth.enseignant);
    localStorage.removeItem(constantes.auth.parent);
    this.router.navigate(['/connexion'])
  }

  logoutParent(){
    localStorage.removeItem(constantes.auth.parent);
    this.router.navigate(['/connexion-form'])
  }

  ///function calcul total of an column
  totalCol(table: any[], colName: string): number | false {
    let sumCol = 0;
    for (let i = 0; i < table.length; i++) {
      const element = table[i];
      if(element[colName]){
        try {
          sumCol += Number(element[colName])
        } catch (error) {
          console.error('La colonne ' + colName + ' ne doit contenir que des number');
          return false
        }
      }
    }

    return sumCol;
  }

  totalColV2(table: any[], colName: string): number {
    let sumCol = 0;
    for (let i = 0; i < table.length; i++) {
      const element = table[i];
      if(element[colName]){
        try {
          sumCol += Number(element[colName])
        } catch (error) {
          console.error('La colonne ' + colName + ' ne doit contenir que des number');
          return 0
        }
      }
    }

    return sumCol;
  }

  //set color for line selected only for groupe of element that contain same groupeClassConcerned
  setLineColorOnClick(event: Event, groupeClassConcerned: string){
    console.log('classe selected')
    console.log(event.target);

    const targetElement: HTMLElement = event.target as HTMLElement;
    //define classeName: string
    const classeClorStyleLine = "line-selected-color";
     //get all line by globalclass (line) conernerd
    const allLines = document.getElementsByClassName(groupeClassConcerned);
    //for each elt in allline getted:
    for (let i = 0; i < allLines.length; i++) {
      const element = allLines[i];
       //  remove classeName;
       element.classList.remove(classeClorStyleLine);
    }
    //Add classeName to event passed
    targetElement.classList.add(classeClorStyleLine);
  }

  printFile(dataToPrint: string, title: string){
    var anchor = document.createElement('a');
    anchor.href = dataToPrint;
    anchor.download = title;
    document.body.appendChild(anchor);
    //  anchor.click();
    let pdfWindow = window.open('', '_blank', 'Liste eleves');
    pdfWindow
      ? pdfWindow!.document.write(
          "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
            encodeURI(dataToPrint) +
            "'></iframe></body>"
        )
      : null;

    if (pdfWindow === null){
      this.alert("La fenêtre contextuelle a été bloquée. Veuillez autoriser les fenêtres contextuelles pour ouvrir le PDF.", "Attention", "info", "", "OK")
    }
  }

  filterElement(listeToGilter: any[], value: string, keyTofilter: string) {
    if (listeToGilter && listeToGilter.length > 0) {
      const isKeyExist = listeToGilter[0][keyTofilter];
      if (isKeyExist) {
        let result!: any[];
        if (value.length > 0) {
          const regexQuertier = new RegExp('.*' + value + '.*', 'i');
          result = listeToGilter.filter((elt) =>
            regexQuertier.test(elt[keyTofilter])
          );
        } else {
          result = listeToGilter;
        }

        return result;
      } else {
        /*this.alert(
          "Attention la cle de recherche passe n'existe pas pour la liste '" +
            keyTofilter +
            "'",
          'Erreur',
          'danger',
          '',
          'OK'
        );*/
        return [];
      }
    }

    return [];
  }

  getCurrentDateForInput(){
    const currentDate: string = new Date().toISOString().split('T')[0];

    const headerObj = localStorage.getItem(constantes.auth.header)
    if (headerObj){
      const headr: header = JSON.parse(headerObj)
      if (headr.DATE_COMPTABLE){
        let dateStr = headr.DATE_COMPTABLE
        //const formattedDate = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`;
        return dateStr
      }
    }

    return currentDate;
  }

  getCurrentDateForInputWithoutDateComptable(){
    const currentDate: string = new Date().toISOString().split('T')[0];
    return currentDate
  }

  convertToValideDates(Date: string, separateur="") {
    const year = Date.split('-')[0];
    const month = Date.split('-')[1];
    const day = Date.split('-')[2];
    const formattedDate = `${year}${separateur}${month}${separateur}${day}`;
    return formattedDate;
  }

  checkOverflow() {
    const AUTO_HEIGHT = 'auto-height';
    const MAX_HEIGHT = 'max-height';
    const element = document.getElementById('page') as HTMLElement;
    const screenHeight = window.innerHeight;

    if(element?.scrollHeight){
      const isOverflowing = element?.scrollHeight > screenHeight;

      if (isOverflowing) {
        // Ajoutez une classe CSS ou effectuez d'autres actions si nécessaire
        element.classList.add(AUTO_HEIGHT);
        element.classList.remove(MAX_HEIGHT);
      } else {
        element.classList.add(MAX_HEIGHT);
        element.classList.remove(AUTO_HEIGHT);
      }
    }else{
      console.error("No element page setted")
    }

  }

  /**public header for cybermatic */
  getHeaderForEpay(){
    let headFormatToUpper = {
      CODE_ECOLE: "CYB",
      ANNEE: "2022-2023",
      IDENTIFIANT: "CYB",
      CLE_API: "123456",
      UTILISATEUER_LOGIN: "CYB000001",
      UTILISATEUER_TOKEN: "",
      ACTION: "3",
      TYPE_UTILISATEUR: environment.TypeUserConst.CST_TYPE_USER_AGENT,
      RESSOURCE: ""
    }
    return new HttpHeaders({...headFormatToUpper});
  }

  forceInputNumber(event: any) {
    const input = event.target;
    const value = input.value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except

    input.value = value;
  }

  getMinForCookie(min: number = 5): Date{
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 10);

    return expirationDate
  }

}


function HostListener(arg0: string, arg1: string[]): (target: GlobalService, propertyKey: "onInput", descriptor: TypedPropertyDescriptor<(event: any) => void>) => void | TypedPropertyDescriptor<(event: any) => void> {
  throw new Error('Function not implemented.');
}

