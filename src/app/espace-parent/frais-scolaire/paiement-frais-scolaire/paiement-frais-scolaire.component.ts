import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fonction } from 'src/app/models/fonction.model';
import { MatDialog } from '@angular/material/dialog';
import { FonctionService } from 'src/app/services/fonction.service';
import { GlobalService } from 'src/app/services/global.service';
import { ReabonnementModel } from '../../model/reabonnement.model';
import { ListeEleveSimplifie } from 'src/app/models/eleve.model';
import { EleveService } from 'src/app/services/eleve.service';
import { ServiceListmodel } from '../../model/services.model';
import { constantes } from 'src/environnements/constantes';
import { VerifyStatusPayement } from '../../model/model.verifysatatus.paiement';
import { FraisPayerService } from 'src/app/services/frais-payer.service';
import { FraisScolairePaiementParent } from '../../model/paiementFraisScolaire.model';

@Component({
  selector: 'app-paiement-frais-scolaire',
  templateUrl: './paiement-frais-scolaire.component.html',
  styleUrls: ['./paiement-frais-scolaire.component.scss'],
})
export class PaiementFraisScolaireComponent {
  @Input() action!: 'create' | 'edit' | 'view';
  @Input() isOpenByOther!: boolean;

  isLoading!: boolean;
  isLoadingservice!: boolean;
  selectproduit: any;
  header: any;
  intervalId!: number;
  isLoadingverfy!: boolean;
  textvalidate: string = 'Valider';
  modelreprise!: any;
  Details!: string;
  infopaiement!: string;
  restepayer!: number;
  Montant!: number;
  MobilePayeur!: string;
  IDProduit!: number;
  FraisScolaire!: any;
  eleve!: any;
  parent!: any;
  CodeProduit!: string;
  isLoadingverfyreprise!: boolean;
  modelrepriseVerification!: any
  togglebtnreprise: boolean = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private eleveService: EleveService,
    private globalService: GlobalService,
    private fraisScolaireService: FraisPayerService
  ) {}

  ngOnInit(): void {
    const eleveSelectedString = localStorage.getItem('clickedElement');
    if (eleveSelectedString) {
      this.eleve = JSON.parse(eleveSelectedString);
      console.log(this.eleve);
      this.initDataFraisScolaire(this.eleve.IDELEVE);
    }
    const parentObj = localStorage.getItem(constantes.auth.parent);
    if (parentObj) {
      this.parent = JSON.parse(parentObj);
      this.MobilePayeur = this.parent.Tuteur.Mobile;
    }
  }

  isFormValid(): any {
    return this.CodeProduit;
  }

  initDataFraisScolaire(idEleve: number) {
    this.isLoading = true;
    console.log(idEleve);
    this.fraisScolaireService.getFraisScolaire(idEleve).subscribe((res) => {
      console.log(res);
      this.FraisScolaire = res.FraisScolaires;
      this.isLoading = false;
      console.log(this.FraisScolaire);
    });
  }

  checkProduit(selectproduit: any) {
    console.log(selectproduit);
    this.Details = selectproduit.sLibelleProduit;
    this.Montant = selectproduit.Reste_A_Payer;
    this.IDProduit = selectproduit.IDPRODUIT;
    this.CodeProduit = selectproduit.CodeProduit;
  }

  changeMobile(event: any) {
    console.log(event.target.value);
    this.MobilePayeur = event.target.value;
  }

  changeMontant(event: any) {
    this.Montant = event.target.value;
  }

  verifyStatuspaiement(modelstatus: VerifyStatusPayement) {
    let requestCount = 0;
    this.isLoadingverfy = true;
    setTimeout(() => {
      this.intervalId = setInterval(() => {
        if (requestCount >= 10) {
          clearInterval(this.intervalId);
          this.isLoadingverfy = false;
          this.globalService.toastShow("Délai d'attente dépassé", 'Attention');
          this.textvalidate = 'Reprendre le paiement';
          this.togglebtnreprise = true
          
          return;
        }
        setTimeout(() => {
          this.eleveService.DemandeStatutPayement(modelstatus).subscribe((response) => {
              requestCount++;
              console.log(response);
              if (response.Status == '200' && response.Etat == '2') {
                this.isLoadingverfy = false;
                clearInterval(this.intervalId);
                this.dialog.getDialogById('PaiementFraisScolaireComponent')?.close(true);
              }
              console.log('Nombre de requêtes effectuées : ', requestCount);
            });
        }, 3000); // 3 secondes en millisecondes
      }, 3600); // 36 secondes en millisecondes
    }, 6000); // 6 secondes en millisecondes
  }

  repriseverifyStatuspaiement(modelstatus: VerifyStatusPayement) {
    let requestCount = 0;
    this.isLoadingverfyreprise = true;
    this.intervalId = setInterval(() => {
      if (requestCount >= 10) {
        clearInterval(this.intervalId);
        this.globalService.toastShow("Délai d'attente dépassé", 'Attention');
        this.isLoadingverfyreprise = false;
        return;
      }
      this.eleveService
        .DemandeStatutPayement(modelstatus)
        .subscribe((response) => {
          console.log(response);
          requestCount++;
          if (response.Status == '200' && response.Etat == '2') {
            this.isLoadingverfyreprise = false;
            this.globalService.toastShow('Payement effectué', 'Succès');
            clearInterval(this.intervalId);
            this.dialog
              .getDialogById('PaiementFraisScolaireComponent')
              ?.close(true);
          }
          console.log('Nombre de requêtes effectuées : ', requestCount);
        });
    }, 3000);
  }

  RepriseVerification(){
    this.repriseverifyStatuspaiement(this.modelrepriseVerification)
  }

  Valider() {
    this.isLoadingverfy = true;
    const fraisscolaire: FraisScolairePaiementParent = {
      IDEleve: this.eleve.IDELEVE,
      IDProduit: this.IDProduit,
      CodeProduit: this.CodeProduit,
      MobilePayeur: this.MobilePayeur,
      Montant: this.Montant,
      DetailOperation: this.Details,
    };
    console.log(fraisscolaire);
    this.eleveService
      .DemandePayementFRaisScolaire(fraisscolaire)
      .subscribe((data) => {
        this.isLoadingverfy = false;
        const modelstatus = {
          Code_Etab: data.Code_Etab,
          Montant: this.Montant,
          NumeroOperation: data.NumeroOperation,
          DetailOperation: data.DetailOperation,
          Statut: data.Statut,
          Action: 2,
        };
        this.infopaiement = modelstatus.DetailOperation;
        console.log(modelstatus);
        this.modelrepriseVerification = modelstatus
        this.verifyStatuspaiement(modelstatus);
      });
  }
}
