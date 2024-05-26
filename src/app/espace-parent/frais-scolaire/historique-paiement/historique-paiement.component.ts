import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FraisPayerService } from 'src/app/services/frais-payer.service';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-historique-paiement',
  templateUrl: './historique-paiement.component.html',
  styleUrls: ['./historique-paiement.component.scss']
})
export class HistoriquePaiementComponent {
  IDEleve!: number;
  dataSourceFraisSColaire: any;
  infoEleve: any;
  eleve: any;

  constructor(
    private route: ActivatedRoute,
    public GlobalService: GlobalService,
    private fraisScolaireService : FraisPayerService,

  ){}

  ngOnInit(): void {

    const eleveSelectedString = localStorage.getItem('clickedElement');
    if(eleveSelectedString){
      this.eleve = JSON.parse(eleveSelectedString);
      console.log(this.eleve);
      this.initDataFraisScolaire(this.eleve.IDELEVE)
    }
  }

  initDataFraisScolaire(idEleve: number) {
    console.log(idEleve);
      this.fraisScolaireService.getHistoriquePaiementByEleve(idEleve).subscribe(res  => {
        console.log(res);
        this.infoEleve = res
        this.dataSourceFraisSColaire = res.tabDétailProduits
      })
  }

  convertToValideDates(Date: string) {
    const year = Date.split('-')[0];
    const month = Date.split('-')[1];
    const day = Date.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

}
