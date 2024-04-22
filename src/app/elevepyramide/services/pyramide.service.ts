import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { PyramideEleve } from '../models/pyaramide.model';

@Injectable({
  providedIn: 'root'
})
export class PyramideService {
  uriGetPyramideAges ="STATISTIQUES_Get_Pyramide_Ages"

  constructor(
    private globalService: GlobalService
  ) { }

  getPyramideage( tableauClasseAffiche: { IDCLASSES: number }[]): Observable<PyramideEleve>{
    const BASE_PATH = `${this.uriGetPyramideAges}`;
    return this.globalService.setHttpRequest(BASE_PATH, "POST", tableauClasseAffiche).pipe(
      map(res => res.body)
    )
  }
}
