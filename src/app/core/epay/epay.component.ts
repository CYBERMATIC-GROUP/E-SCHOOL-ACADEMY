import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EpayService } from '../services/epay.service';
import { MatDialog } from '@angular/material/dialog';
import { WaitingValidationComponent } from './waiting-validation/waiting-validation.component';
import { GlobalService } from 'src/app/services/global.service';
import { Ecoleervice } from 'src/app/services/ecole.service';
import { tap } from 'rxjs';
import { momoFrais } from 'src/environnements/constantes';

@Component({
  selector: 'app-epay',
  templateUrl: './epay.component.html',
  styleUrls: ['./epay.component.scss']
})
export class EpayComponent {
  Matricule!: string;
  isLoading!: boolean;
  telNumber!: string;
  CodeEcole!: string;
  typeService!: string;
  canSubmit!: boolean;
  numberInvalid!: boolean;
  IDECOLE!: number;
  message!: string
  showError!: boolean;
  IDTRANSACTION!: string;
  isMtn!: boolean
  Montant!: number;
  mtnFraisCalculate!: number;
  airtelFraisCalculate!: number;
  //paiement set
  

  constructor(
    private route: ActivatedRoute,
    private epayService: EpayService,
    public globalService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    private ecoleService: Ecoleervice
  ){}

  ngOnInit(): void {
    this.telNumber = this.route.snapshot.params['mobile'];
    this.typeService = this.route.snapshot.params['typeService'];
    this.CodeEcole = this.route.snapshot.params['CodeEcole'];
    this.IDECOLE = this.route.snapshot.params['IDECOLE'];

    this.ecoleService.getFraisCreationScolaire().pipe(
      tap(res => {
        this.Montant = res.Montant;
        this.mtnFraisCalculate = (this.Montant * momoFrais.mtn) / 100;
        this.airtelFraisCalculate = (this.Montant * momoFrais.airtel) / 100;
      })
    ).subscribe()
    this.initData();
  }

  initData(){
    const identifiant = this.route.snapshot.params['identifiant'];
    /*this.transactionService.getTransactionByIdentifiant(identifiant).subscribe((data) => {
      this.dataTrans = data;
      console.log(data);
      this.Matricule = this.dataTrans.matriculeClient;
      this.typeService = this.dataTrans.montant;
      this.cookie.set('retour', this.dataTrans.retour);
      this.isLoading = false;
    }, (error) => {
      console.log(error);
      this.isLoading = false;
      this.transactionService.raiseServeurError();
    })*/
  }

  onSubmitpayement(form: NgForm, reseau: "mtn" | "airtel"){
    /*let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : true
    };
    form.value.bank = reseau === 'airtel' ? "AIRTEL MONEY" : "MTN MOBILE MONEY";
    this.isShowed = true;
    const modalRef = this.modalService.open(PayementComponent, ngbModalOptions);
    //modalRef.componentInstance.formPreview = form.value;
    modalRef.componentInstance.reseau = reseau;
    modalRef.componentInstance.dataTrans = this.dataTrans;*/
  }

  onInputNumToDebit(event: any){
    const tel = event.target.value;
    this.telNumber = tel;

    const regex = /^((05)|(04)|(06))[0-9]{7}$/;
    const mtnRegex = /^(06)[0-9]{7}$/ 

    if(tel.length > 0 && regex.test(tel)){
      this.canSubmit = true;
      this.showError = false;
      if(mtnRegex.test(tel))
        this.isMtn = true;
      else
        this.isMtn =false;
    }else{
      this.canSubmit = false;
      this.showError = true;
    }
  }

  onValid(){
    this.isLoading = true;
    this.epayService.setPay(this.telNumber, this.IDECOLE, this.Montant).subscribe(data => {
      console.log(data)
      this.isLoading = false;
      if(data && data.Status == 1){
        this.verif(data, this.IDECOLE);
      }else{
        this.globalService.alert('Erreur reseau !', 'Ereur', "danger", '', 'OK'); 
      }

    })
  }

  verif(data: any, idsouscription: number){

    const ref = this.dialog.open(WaitingValidationComponent)
    ref.componentInstance.IDTransaction = data.IDTransaction;
    ref.componentInstance.message = data.sMessage;
    ref.componentInstance.isMtn = this.isMtn;
    //const ref = this.globalService.alert(this.message, 'Transaction initialisée', "success", '', 'Verification manuelle');

      /*ref.afterClosed().subscribe(resultat => {
        this.globalService.toastShow('Verication en cours...', 'Verification');

        this.epayService.verifPay(data.IDTransaction).subscribe(verif => {
          console.log(verif);

          if(verif && verif.Etat == 2){
            this.globalService.toastShow('Versement anticip', 'Succes');
            this.router.navigate(['/details-souscription/' + idsouscription])
          }else{
            this.message = "Transaction non finalisee";
            this.verif(data, idsouscription);
          }
        });

      })*/

  }
}
