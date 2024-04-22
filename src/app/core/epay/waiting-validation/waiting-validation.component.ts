import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EpayService } from '../../services/epay.service';
import { MatDialog } from '@angular/material/dialog';
import { map, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environnements/environnement.prod';
import { momoFrais } from 'src/environnements/constantes';

@Component({
  selector: 'app-waiting-validation',
  templateUrl: './waiting-validation.component.html',
  styleUrls: ['./waiting-validation.component.scss']
})
export class WaitingValidationComponent {
  @Input() message!: string;
  @Input() isMtn!: boolean;
  @Input() IDSOUSCRIPTION!: number;
  retour!: string;
  isLoader!: boolean;
  title!: string;
  @Input() IDTransaction!: string;
  intervalID!: any;
  settimeoutIntervalID: any;
  //is set to determine if action is already finished, becose our request is asynchrone
  //to avoid to duplicate good response after validation we stop it
  operationTerminate!: boolean;

  constructor(
    private epayService: EpayService,
    private globalService: GlobalService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setIntervalVerification();
  }

  onBack(){
    this.dialog.closeAll();
    clearInterval(this.intervalID)
    clearInterval(this.settimeoutIntervalID)
  }

  onVerification(){
    this.isLoader = true;

    return this.epayService.verifPay(this.IDTransaction).pipe(
      tap(verif => {
        console.log(verif);

        if(verif && verif.Etat == 2){
          if(!this.operationTerminate){
            this.operationTerminate = true;
            this.globalService.toastShow("Paiement effectué avec succès", "Frais d'activation :");
            this.dialog.closeAll();

            const redirectionUrl = environment.routes.services.validationSchool

            this.router.navigate([redirectionUrl])
            this.isLoader = false;
          }
          clearInterval(this.intervalID)
          clearInterval(this.settimeoutIntervalID)
        }
      }),
      map(verif => verif.Etat)
    )
  }

  onContinue(){
  }

  setIntervalVerification(){
    this.onVerification().subscribe();

    this.intervalID = setInterval(() => {
      console.log('verif interval')
      this.onVerification().subscribe();
    }, 2000);

    //function to call if transaction non finish
    const transacNonFinish = () => {
      clearInterval(this.intervalID);
      const msg = 'Transaction non finalisée. Si vous venez de valider la transaction, prière de procéder à la vérification manuelle.';
      const ref = this.globalService.alert(msg, 'Transaction initialisée', "danger", 'Annuler', 'Verification manuelle');
      
      ref.afterClosed().subscribe(result => {
        if(result){
          this.onVerification().subscribe(etat => {
            console.log(etat)
            if(etat != 2){
              transacNonFinish();
            }
          })
        }
      });
    }

    //after 1min 30 s we verify if operation not terminated the we can execute transacNonFinish
    this.settimeoutIntervalID = setTimeout(() => {
        this.isLoader = false;
        if(!this.operationTerminate)
          transacNonFinish();

    }, 1000*90);
  }
}
