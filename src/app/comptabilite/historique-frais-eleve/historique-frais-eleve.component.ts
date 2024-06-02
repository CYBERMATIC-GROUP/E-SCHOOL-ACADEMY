import { Component, Input, OnInit } from '@angular/core';
import { HistoriquePaiementFraisScolaireService } from '../services/historique-paiement-frais-scolaire.service';
import { historiqueFraisEleve } from '../models/historique-frais-eleve';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-historique-frais-eleve',
  templateUrl: './historique-frais-eleve.component.html',
  styleUrls: ['./historique-frais-eleve.component.scss']
})
export class HistoriqueFraisEleveComponent implements OnInit {

  historiques$!: Observable<historiqueFraisEleve[]>
  @Input() IDELEVE!: number;
  @Input() nomEleve!: string;
  displayedColumns = [
    "Libelle",
    "DateHeure",
    "TotalCredits"
  ]
  totalCredit!: number;
  totalDebit!: number;
  totalTVA!: number;
  mouvementSelected!: historiqueFraisEleve;
  isPrinting!: boolean;
  printText: string = "Ré-Imprimer le reçu de paiement" ;
  printTextHistorique = "Imprimer l'historique";

  constructor(
    private historiqueFraisService: HistoriquePaiementFraisScolaireService,
    public globalService: GlobalService
  ){}


  ngOnInit(): void {
      this.historiques$ = this.historiqueFraisService.getHistoriqueFraisEleve(this.IDELEVE);
      this.historiques$.subscribe(data => {
        console.log(data);
        
        const totalCredit =  this.globalService.totalCol(data, "TotalCredits");
        this.totalCredit = totalCredit ? totalCredit : 0;
        const totalDebit = this.globalService.totalCol(data, "TotalDebits");
        this.totalDebit = totalDebit ? totalDebit : 0;
        const totalTVA = this.globalService.totalCol(data, "MontantTVA");
        this.totalTVA = totalTVA ? totalTVA : 0;
      })
  }

  onSelect(element: historiqueFraisEleve){
    this.mouvementSelected = element
  }

  onPrint(){
    this.isPrinting = true;
    this.printText = "Impression en cours..."
    this.historiqueFraisService.printRecu(this.IDELEVE, this.mouvementSelected.IDMOUVEMENT).subscribe(data => {
      console.log(data)
      this.isPrinting = false;
      this.globalService.printFile(data.Etat, "Reçu_paiement_"+this.nomEleve)
      this.printText = "Ré-Imprimer le reçu de paiement";
    })
  }


  onPrintHistorique(){
    this.isPrinting = true;
    this.printTextHistorique = "Impression en cours..."
    this.historiqueFraisService.printRecuHistorique(this.IDELEVE, 0).subscribe(data => {
      console.log(data)
      this.isPrinting = false;
      this.globalService.printFile(data.Etat, "Reçu_paiement_"+this.nomEleve)
      this.printTextHistorique = "Imprimer l'historique"
    })
  }

}
