import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { Visite } from '../models/visite.model';

@Injectable({
  providedIn: 'root'
})
export class VisiteService {

  uri = "Visites"
  constructor(
    private globalService: GlobalService
  ) { }

  get(nTypeVisite: number = 0, DateDebut: string = "0", DateFin: string = "0"): Observable<Visite[]>{
    const uri = `${this.uri}/${nTypeVisite}/${DateDebut}/${DateFin}`;
    return this.globalService.setHttpRequest(uri, "GET")
  }

  getOne(IDVisite: number): Observable<Visite>{
    return this.globalService.setHttpRequest(this.uri + '/' + IDVisite, "GET")
  }

  create(visite: Visite): Observable<Visite>{
    return this.globalService.setHttpRequest(this.uri, "POST", visite)
  }

  update(visite: Visite): Observable<Visite>{
    return this.globalService.setHttpRequest(this.uri + '/' + visite.IDVisites, "PUT", visite)
  }

  delete(IDVisite: number){
    return this.globalService.setHttpRequest(this.uri + '/' + IDVisite, "DELETE")
  }
}
