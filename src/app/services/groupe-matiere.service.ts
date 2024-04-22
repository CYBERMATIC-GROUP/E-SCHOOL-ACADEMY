import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { GroupeMatiere } from '../models/groupeMatiere.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';


@Injectable({
  providedIn: 'root'
})
export class GroupeMatiereService {

  uri = "GROUPES_MATIERES";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService
  ) { }

  get(refresh: boolean = false): Observable<GroupeMatiere[]>{
    const objStorage = localStorage.getItem(constantes.requestCache.groupeMatiereList);
    if (objStorage && !refresh) {
      const gmatiere: GroupeMatiere[] = JSON.parse(objStorage);
      return of(gmatiere);
    }
    return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
      tap(response => {
        localStorage.setItem(constantes.requestCache.groupeMatiereList, JSON.stringify(response))
      })
    )
  }

  getOne(IDGROUPESMATIERES: number): Observable<GroupeMatiere> {
    return this.globalService.setHttpRequest(this.uri + '/' + IDGROUPESMATIERES, "GET", {});
  }

  update(groupematiere: GroupeMatiere): Observable<GroupeMatiere> {
    const BASE_PATH = `${this.uri}/${groupematiere.IDGROUPESMATIERES}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", groupematiere, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.groupeMatiereList)
      })
    );
  }
  
  
  delete(IDGROUPESMATIERES: number): Observable<string> {
    const url = `${this.uri}/${IDGROUPESMATIERES}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.groupeMatiereList)
      })
    );
  }
  
  

  create(groupematiere: GroupeMatiere): Observable<GroupeMatiere> {
    const BASE_PATH = `${this.uri}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "POST", groupematiere,headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.groupeMatiereList)
      })
    );
  }
  
}
