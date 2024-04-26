import { Injectable } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperationsDivers } from '../models/operationsDivers.model';
import { CreateOperationDiversModel } from '../models/modelcreateOperationDivers.model';
import { RetraitEspeceCaisse } from '../comptabilite/models/retraitespececaisse.model';


@Injectable({
  providedIn: 'root'
})
export class OperationsDiversesService {
  uriopretionsdiverses = "OPERATION_DIVERSE_Liste";
  urisuppressionoperationdivers = "OPERATION_DIVERSE_Suppression"
  urivalidationoperationsDivers = "OPERATION_DIVERSE_Valide_OD"
  uri_imprime_OD = "OPERATION_DIVERSE_Imprime_Etat"
  urioperationDiverscreditcompte = "OPERATION_DIVERSE_Credite_Compte"
  uriupdateoperationsDivers = "OPERERATION_DIVERSE_Modification"
  urigetoneOD = "OPERATION_DIVERSE_Get_Detail"
  uriretraitespececaisse = "COMPTA_Retrait_Caisse_Espece"

  constructor(
    private http:HttpClient,
    private globalService: GlobalService
  ) { }

  getOperationDiversListe(sDateDebut: string,sDateFin:string):  Observable<any> {
    return this.globalService.setHttpRequest(this.uriopretionsdiverses + '/' + sDateDebut + '/' + sDateFin, "GET", {});
  }

  PrintOperationDivers(sDateDebut: string,sDateFin:string):  Observable<any> {
    return this.globalService.setHttpRequest(this.uri_imprime_OD + '/' + sDateDebut + '/' + sDateFin, "GET", {});
  }

  deleteOperationDivers(nNumeroMouvement : number){
    return this.globalService.setHttpRequest(this.urisuppressionoperationdivers + '/' + nNumeroMouvement , "DELETE", {});
  }

  ValidationOperationDivers(nNumeroMouvement : number){
    return this.globalService.setHttpRequest(this.urivalidationoperationsDivers + '/' + nNumeroMouvement , "GET", {});
  }

  getOneOperationDivers(nNumeroMouvement : number){
    return this.globalService.setHttpRequest(this.urigetoneOD + '/' + nNumeroMouvement , "GET", {});
  }

  CreateOperationsDivers(operationsDivers : CreateOperationDiversModel){
    return this.globalService.setHttpRequest(this.urioperationDiverscreditcompte  , "POST", operationsDivers);
  }

  UpdateOperationDivers(nNumeroMouvement: number , operationsDivers : CreateOperationDiversModel){
    return this.globalService.setHttpRequest(this.uriupdateoperationsDivers + '/' + nNumeroMouvement , "PUT", operationsDivers);
  }

  // retrait espece caisse
  RetraitEspeceCAISE(retraitespececaisse : RetraitEspeceCaisse){
    return this.globalService.setHttpRequest(this.uriretraitespececaisse  , "POST", retraitespececaisse);
  }
}

