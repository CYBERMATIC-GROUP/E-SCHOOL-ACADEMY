import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  
  uri = 'MAINTENANCE_Frais_Scolaire_Par_Classe';
  uris = 'MAINTENANCE_FraisScolaires';
  urimaintenanceexonerationdossierfrais = "MAINTENANCE_MAJ_Exoneration_Dossier_Vers_Fraiscolaires";
  urimaintenanceexonerationfraisdossier = "MAINTENANCE_MAJ_Reduction_Frais_Scolaires_Vers_Dossier"

  constructor(private http: HttpClient, private globalService: GlobalService) {}


  getMaintennaceByClasse(tableau: { IDCLASSES: number }[]) {
    const classIds = tableau.map((element) => element.IDCLASSES);
    const url = `${this.uri}/${classIds.join(',')}`;
    return this.globalService.setHttpRequest(url,'GET',{},Headers);
  }


  getMaintenanceClasse(tableau: { IDCLASSES: number }[]) {
    return this.globalService.setHttpRequest(this.uris, 'GET', {}, Headers);
  }

  getMaintenanceExonerationDossierFraisScolaire() {
    return this.globalService.setHttpRequest(this.urimaintenanceexonerationdossierfrais, 'GET', {}, Headers);
  }

  getMaintenanceExonerationDFraisScolaireDossier() {
    return this.globalService.setHttpRequest(this.urimaintenanceexonerationfraisdossier, 'GET', {}, Headers);
  }


}
