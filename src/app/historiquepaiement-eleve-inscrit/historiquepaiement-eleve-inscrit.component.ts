import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FraisPayerService } from 'src/app/services/frais-payer.service';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-historiquepaiement-eleve-inscrit',
  templateUrl: './historiquepaiement-eleve-inscrit.component.html',
  styleUrls: ['./historiquepaiement-eleve-inscrit.component.scss'],
})
export class HistoriquepaiementEleveInscritComponent {
  dataSourceFraisSColaire!: any[];

  constructor(
    private route: ActivatedRoute,
    public GlobalService: GlobalService,
    private fraisScolaireService: FraisPayerService
  ) {}

  ngOnInit(): void {
    const idEleve = this.route.snapshot.params['ideleve'];
    console.log(idEleve);
    if (idEleve) {
      this.initDataFraisScolaire(idEleve);
    }
  }

  initDataFraisScolaire(idEleve: number) {
    console.log(idEleve);
    this.fraisScolaireService
      .getHistoriquePaiementByEleve(idEleve)
      .subscribe((res) => {
        console.log(res);
        this.dataSourceFraisSColaire = res.tabDetailProduits;
        console.log(this.dataSourceFraisSColaire);
      });
  }

  convertToValideDates(Date: string) {
    const year = Date.split('-')[0];
    const month = Date.split('-')[1];
    const day = Date.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}
