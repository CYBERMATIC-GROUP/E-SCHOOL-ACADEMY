import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {


  IDNIVEAU!: number;
  IDBRANCHE!: number;

  //configuration des matieres
  IDMAT_NIV_BRA!:number
  IDNIVEAUMatiere!:number
  IDBRANCHEMatiere!:number

  //numero mouvement
  numeromouvement!:number
  
}
