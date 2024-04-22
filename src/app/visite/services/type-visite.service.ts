import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { Visite } from '../models/visite.model';
import { TypeVisiteur } from '../models/type-visite.model';

@Injectable({
  providedIn: 'root'
})
export class TypeVisiteService {

  uri = "TypeVisiteur";
  
  constructor(
    private globalService: GlobalService
  ){}

  get(): Observable<TypeVisiteur[]>{
    return this.globalService.setHttpRequest(this.uri, "GET")
  }

  getOne(IDTypeVisite: number): Observable<TypeVisiteur>{
    return this.globalService.setHttpRequest(this.uri + '/' + IDTypeVisite, "GET")
  }

  create(type: TypeVisiteur): Observable<TypeVisiteur>{
    return this.globalService.setHttpRequest(this.uri, "POST", type)
  }

  update(type: TypeVisiteur): Observable<TypeVisiteur>{
    return this.globalService.setHttpRequest(this.uri + '/' + type.IDTypeVisiteur, "PUT", type)
  }

  delete(IDTypeVisite: number){
    return this.globalService.setHttpRequest(this.uri + '/' + IDTypeVisite, "DELETE")
  }
}
