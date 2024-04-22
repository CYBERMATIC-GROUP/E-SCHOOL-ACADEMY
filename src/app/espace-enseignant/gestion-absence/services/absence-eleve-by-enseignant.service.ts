import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class AbsenceEleveByEnseignantService {

  constructor(
    private globalService: GlobalService
  ) { }

}
