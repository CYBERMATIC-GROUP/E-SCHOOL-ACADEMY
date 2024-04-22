import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { Grade } from '../models/grade.model';
import { GlobalService } from '../services/global.service';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  uri = "GRADE";

  constructor(
    private http:HttpClient,    
    private globalService: GlobalService
  ) { }

  get(refresh: boolean = false): Observable<Grade[]>{
    const objStorage = localStorage.getItem(constantes.requestCache.gradeList);
    if (objStorage && !refresh) {
      const GRADES: Grade[] = JSON.parse(objStorage);
      return of(GRADES);
    }
    return this.globalService.setHttpRequest(this.uri, "GET", {},Headers).pipe(
      tap(response => {
        localStorage.setItem(constantes.requestCache.gradeList, JSON.stringify(response))
      })
    )
  }

  getOne(idegrade: number): Observable<Grade> {
    return this.globalService.setHttpRequest(this.uri + '/' + idegrade, "GET", {});
  }

  update(grade: Grade): Observable<Grade> {
    const BASE_PATH = `${this.uri}/${grade.IDGRADE}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "PUT", grade, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.gradeList)
      })
    );
  }
  
  
  delete(IDGRADE: number): Observable<string> {
    const url = `${this.uri}/${IDGRADE}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(url, "DELETE", null, headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.gradeList)
      })
    );
  }
  
  

  create(grade: Grade): Observable<Grade> {
    const BASE_PATH = `${this.uri}`;
    const headers = this.globalService.getHeaders();
    return this.globalService.setHttpRequest(BASE_PATH, "POST", grade,headers).pipe(
      tap(data => {
        localStorage.removeItem(constantes.requestCache.gradeList)
      })
    );;
  }

}
