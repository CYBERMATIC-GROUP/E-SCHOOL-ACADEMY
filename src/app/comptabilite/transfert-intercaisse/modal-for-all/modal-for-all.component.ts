import { Component, Input, OnInit } from '@angular/core';
import { CompteBancaireService } from '../../services/compte-bancaire.service';
import { Agent } from 'src/app/models/agent.model';
import { CaisseService } from 'src/app/services/caisse.service';
import { pendingTransfert } from '../../models/transfert-bancaire-caise.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-modal-for-all',
  templateUrl: './modal-for-all.component.html',
  styleUrls: ['./modal-for-all.component.scss']
})
export class ModalForAllComponent implements OnInit {
  @Input() typeTransfert: "entrant" | "sortant" = "sortant";
  @Input() agent!: Agent;
  bTableTransfertEntrant!: boolean;
  tableTransfertIsLoading!: boolean;
  transactions!: pendingTransfert[];
  totalAmount!: number;
  cancelIsLoading!: boolean;
  displayedColumns1 = [
    "DateCreation",
    "CodeCaisseDestination",
    "Montant",
    "Libelle",
    "Actions"
  ];
  displayedColumns2 = [
    "DateCreation",
    "CodeCaisseDestination",
    "Montant",
    "Libelle",
    "Actions"
  ];

  constructor(
    private comptaService: CompteBancaireService,
    private caisseService: CaisseService,
    public globalService: GlobalService
  ){}

  ngOnInit(): void {
    this.getTransfertEntrant();
  }

  getTransfertSortant(bValide: 1 | 0 = 0){
    this.bTableTransfertEntrant = false;
    this.loadTransfertInterCaisse(this.agent.CaisseAssociee, 0, 2)
  }

  getTransfertEntrant(bValide: 1 | 0 = 0){
    this.bTableTransfertEntrant = true;
    this.loadTransfertInterCaisse(0, this.agent.CaisseAssociee, 2)
  }

  loadTransfertInterCaisse(
    nIDCaisseSource: number,
    nIDCaisseDestination: number,
    bValide: 1 | 0 | 2
  ){
    this.tableTransfertIsLoading = true;
    this.caisseService.getPaadingTransfert(nIDCaisseSource, nIDCaisseDestination, bValide).subscribe(res => {
      const data = res.body
      console.log(data);
      
      this.transactions = data;
      this.totalAmount = this.transactions.map(t => t.Montant).reduce((acc, value) => acc + value, 0);
      this.tableTransfertIsLoading = false;
      if(this.transactions.length == 0){
        const typeMsg = this.bTableTransfertEntrant ? "entrant" : "sortant"
        this.globalService.toastShow("La liste des transferts " + typeMsg + "s est vide", `Transfert ${typeMsg}`, "info");
      }
    })
  }

  askDeleteTransfert(IDTRANSFERTCAISSE: number){
    const ref = this.globalService.alert("Voulez-vous supprimer ce transfert", "Confirmation de suppression", "danger", "Annuler", "Oui");

    ref.afterClosed().subscribe(result => {
      if(result){
        this.cancelTransfert(IDTRANSFERTCAISSE);
      }
    })
  }
  
  askValidTransfert(IDTRANSFERTCAISSE: number){
    const ref = this.globalService.alert("Voulez-vous valider ce transfert", "Confirmation", "info", "Annuler", "Oui");

    ref.afterClosed().subscribe(result => {
      if(result){
        this.cancelTransfert(IDTRANSFERTCAISSE);
      }
    })
  }

  cancelTransfert(IDTRANSFERTCAISSE: number){
    this.cancelIsLoading = true;
    this.comptaService.cancelTransfert(IDTRANSFERTCAISSE).subscribe(res => {
      this.globalService.toastShow("Transfert annulé avec succès !", "Annulation");
      this.getTransfertSortant();
      this.cancelIsLoading = false;
    })
  }

  validTransfert(IDTRANSFERTCAISSE: number){
    this.cancelIsLoading = true;
    this.comptaService.validTransfert(IDTRANSFERTCAISSE).subscribe(res => {
      this.globalService.toastShow("Transfert validé avec succès !", "Validation");
      this.getTransfertEntrant();
      this.cancelIsLoading = false;
    })
  }

}
