import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EleveService } from 'src/app/services/eleve.service';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-choose-balise',
  templateUrl: './choose-balise.component.html',
  styleUrls: ['./choose-balise.component.scss']
})
export class ChooseBaliseComponent {

  NOMETAB!:string
  NOMELEVE!:string
  PRENOMELEVE!:string
  NOMNIVEAU!:string
  NOMBRANCHE!:string
  CODECLASSE!:string
  NOMCLASSE!:string
  ANNEESCOL!:string
  CIVILITEELEVE!:string
  DATENAISSANCEELEVE!:string
  LIEUNAISSANCEELEVE!:string
  NOMPEREELEVE!:string
  NOMMEREELEVE!:string
  NOMUTEURELEVE!:string
  MOYENNEPERIODE1!:string
  MOYENNEPERIODE2!:string
  MOYENNEPERIODE3!:string
  MOYENNEANNUELLE!:string
  NOMDIRECTEUR!:string
  MATRICULEELEVE!:string
  isloadingpage!:boolean
  cursorPositionBefore: number | undefined;
  cursorPositionAfter: number | undefined;

  BaliseSelected:string = ''
  @Output() baliseEmited = new EventEmitter<{balise: string, lastPosition: number}>()


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private eleveService: EleveService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getBalises()  
  }

  getBalises(){
    this.isloadingpage = true
    this.eleveService.getbalises().subscribe((data)=>{
      console.log(data);
      this.isloadingpage = false
      this.NOMETAB = data["0"].NomBalise
      this.ANNEESCOL = data["1"].NomBalise
      this.NOMDIRECTEUR = data["2"].NomBalise
      this.MATRICULEELEVE = data["3"].NomBalise
      this.NOMELEVE = data["4"].NomBalise
      this.PRENOMELEVE = data["5"].NomBalise
      this.CIVILITEELEVE = data["6"].NomBalise
      this.DATENAISSANCEELEVE = data["7"].NomBalise
      this.LIEUNAISSANCEELEVE = data["8"].NomBalise
      this.CODECLASSE = data["9"].NomBalise
      this.NOMCLASSE = data["10"].NomBalise
      this.NOMNIVEAU = data["11"].NomBalise
      this.NOMBRANCHE = data["12"].NomBalise
      this.NOMPEREELEVE = data["13"].NomBalise
      this.NOMMEREELEVE = data["14"].NomBalise
      this.NOMUTEURELEVE = data["15"].NomBalise
      this.MOYENNEPERIODE1 = data["16"].NomBalise
      this.MOYENNEPERIODE2 = data["17"].NomBalise
      this.MOYENNEPERIODE3 = data["18"].NomBalise
      this.MOYENNEANNUELLE = data["19"].NomBalise
    })
  }

  selectBalise(value:string){
     this.BaliseSelected = value
      // if (this.cursorPositionBefore !== undefined) {
        // this.cursorPositionAfter = this.cursorPositionBefore + this.BaliseSelected.length  
        // this.dialog.closeAll();
        console.log(this.BaliseSelected);
        this.baliseEmited.emit({balise: value, lastPosition:0})
      // }
  }


}
