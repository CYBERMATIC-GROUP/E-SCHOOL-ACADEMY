import { Component, Input } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-colorpicker',
  templateUrl: './colorpicker.component.html',
  styleUrls: ['./colorpicker.component.scss'],
})
export class ColorpickerComponent {
  selectedColor!: string;
  colorSelected!:string
  colorSelectedPicker: string = '#000000'; 

  constructor(
    private gloabalService:GlobalService
  ){}

  colorsprincipales: string[] = [
    '#FF0000',
    '#FFA500',
    '#FFFF00',
    '#008000',
    '#0000FF',
    '#4B0082',
    '#800080',
  ];
  colorsSecondaires: string[] = [
    '#000000', // Rouge-Orange
    '#FF9500', // Orangé-Jaune
    '#DFFF66', // Jaune-Vert clair
    '#00E58E', // Vert clair-Bleu
    '#004ECF', // Bleu-Violet clair
    '#47528C', // Violet clair-Rouge foncé
    '#722452', // Rouge foncé-Rose
    '#FFA07A', // Saumon
    '#ffffff', // Rouge-Orangé
    '#FF1493', // Rose profond
    '#48D1CC', // Turquoise moyen
    '#E6E6FA', // Lavande
    '#B0C4DE', // Bleu acier clair
    '#32CD32', // Vert lime
    '#8A2BE2', // Bleu violet
    '#FF6347', // Tomate
    '#00FA9A', // Vert printemps
    '#FFD700', // Or
    '#9400D3', // Violet foncé
    '#8B4513', // Brun selle
    '#2F4F4F', // Gris ardoise
  ];
  

  selectColor(selectedColor: string): void {
    this.colorSelected = selectedColor
    this.gloabalService.toastShow("Couleur selectionnée avec succès","succès")
    console.log(this.colorSelected);
  }
}
