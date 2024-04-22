import { Injectable } from '@angular/core';
import { ListeEleveSimplifie } from 'src/app/models/eleve.model';

@Injectable({
  providedIn: 'root'
})
export class PartageDesDonneesService {
  eleveSelected!: ListeEleveSimplifie;  
  constructor() { }
}
