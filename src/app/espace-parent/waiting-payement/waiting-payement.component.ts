import { Component } from '@angular/core';
import { constantes } from 'src/environnements/constantes';
import { Demande_de_payement } from '../model/model.payement';
import { EleveService } from 'src/app/services/eleve.service';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerifyStatusPayement } from '../model/model.verifysatatus.paiement';

@Component({
  selector: 'app-waiting-payement',
  templateUrl: './waiting-payement.component.html',
  styleUrls: ['./waiting-payement.component.scss'],
})
export class WaitingPayementComponent {
  parent: any;
  header: any;
  IDEleve!: number;
  isloadiang!: boolean;
  intervalId: any;

  constructor(
    private eleveService: EleveService,
    private globalService: GlobalService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const parentObj = localStorage.getItem(constantes.auth.parent);
    const header = localStorage.getItem(constantes.auth.header);
    if (parentObj) {
      this.parent = JSON.parse(parentObj);
    }
    if (header) {
      this.header = JSON.parse(header);
    }
    this.waitingpayementparent();
  }

  verifyStatuspaiement(modelstatus: VerifyStatusPayement){
    this.intervalId = setInterval(() => {
      this.eleveService
        .DemandeStatutPayement(modelstatus)
        .subscribe((respose) => {
          if (respose.Statut === 3) {
            this.globalService.toastShow('Payemenet effectue','')
            this.dialog.closeAll();
            this.router.navigate(['/eleve-add-list']);
            this.isloadiang = false;
            clearInterval(this.intervalId);
          }
        });
    }, 2000);
  }

  waitingpayementparent() {
    this.isloadiang = true;
    const modelSend: any = {
      Code_Etab: this.header.CODE_ECOLE,
      Montant: 10,
      NumeroOperation: '',
      DetailOperation: '',
      Statut: '',
      Action: 1,
      IDEleve: this.IDEleve,
      IDTuteur: this.parent.Tuteur.IDCOMPTE_UTILISATEUER,
      IDService: 1,
      MobilePayeur: this.parent.Tuteur.Mobile,
    };
    console.log(modelSend);

    this.eleveService.DemandePayement(modelSend).subscribe((data) => {
      if (data) {
        const modelstatus = {
          Code_Etab: this.header.CODE_ECOLE,
          Montant: 100,
          NumeroOperation: data.NumeroOperation,
          DetailOperation: data.DetailOperation,
          Statut:'',
          Action: 2,
        };
        console.log(modelstatus);
        this.verifyStatuspaiement(modelstatus)
  
      }
    });
  }
}
