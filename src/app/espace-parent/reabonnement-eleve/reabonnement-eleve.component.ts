import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fonction } from 'src/app/models/fonction.model';
import { MatDialog } from '@angular/material/dialog';
import { FonctionService } from 'src/app/services/fonction.service';
import { GlobalService } from 'src/app/services/global.service';
import { ReabonnementModel } from '../model/reabonnement.model';
import { ListeEleveSimplifie } from 'src/app/models/eleve.model';
import { EleveService } from 'src/app/services/eleve.service';
import { ServiceListmodel } from '../model/services.model';
import { constantes } from 'src/environnements/constantes';
import { VerifyStatusPayement } from '../model/model.verifysatatus.paiement';

@Component({
  selector: 'app-reabonnement-eleve',
  templateUrl: './reabonnement-eleve.component.html',
  styleUrls: ['./reabonnement-eleve.component.scss'],
})
export class ReabonnementEleveComponent {
  @Input() action!: 'create' | 'edit' | 'view';
  @Input() isOpenByOther!: boolean;

  Code_Etab!: string;
  NumeroOperation: string = '';
  DetailOperation: string = '';
  IDTuteur!: number;
  Reference!: string;
  Statut!: string;
  Action: number = 1;
  Montant!: number;
  Details!: string;
  IDEleve!: number;
  IDService!: number;
  MobilePayeur!: string;
  info!: string
  isbtnreprise: boolean = true 
  isLoadingverfyreprise!: boolean

  isLoading!: boolean;
  isLoadingservice!: boolean;
  Service!: ServiceListmodel[];
  objetreceveByparent!: ListeEleveSimplifie;
  selectedService: any;
  header: any;
  intervalId!: number;
  isLoadingverfy!: boolean
  textvalidate: string = "Valider" 
  modelreprise!: any
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private eleveService: EleveService,
    private fonctionService: FonctionService,
    private globalService: GlobalService
  ) {}

  isFormValid(): any {
    return this.Reference;
  }

  ngOnInit(): void {
    console.log(this.objetreceveByparent);
    console.log(this.IDTuteur, this.MobilePayeur);
    const header = localStorage.getItem(constantes.auth.header);
    if (header) {
      this.header = JSON.parse(header);
    }
    this.getServocesList();
  }
  getServocesList() {
    this.isLoadingservice = true;
    this.eleveService.getListService().subscribe((data) => {
      console.log(data);
      this.Service = data;
      this.isLoadingservice = false;
    });
  }

  checkService(selectedService: ServiceListmodel) {
    console.log(selectedService);
    this.Details = selectedService.Details;
    this.IDService = selectedService.IDServices;
    this.Montant = selectedService.Montant;
    this.Reference = selectedService.NomService;
  }

  changeMobile(event: any){
    console.log(event.target.value);
    this.MobilePayeur = event.target.value
  }

  changeMontant(event: any){
    this.Montant = event.target.value
  }

  verifyStatuspaiement(modelstatus: VerifyStatusPayement) {
    let requestCount = 0; // Variable pour suivre le nombre de requêtes
    this.isLoadingverfy = true;
    // Faire une pause de 6 secondes avant de commencer la boucle
    setTimeout(() => {
      // Démarre la boucle d'intervalles
      this.intervalId = setInterval(() => {
        // Vérifie si le nombre de requêtes a atteint 10
        if (requestCount >= 10) {
          clearInterval(this.intervalId); // Arrête l'intervalle
          this.isLoadingverfy = false;
          this.globalService.toastShow("Délai d'attente dépassé", "Attention");
          this.textvalidate = "Reprendre le paiement"
          this.isbtnreprise = false
          return; // Sort de la fonction
        }
        // Exécute une nouvelle requête toutes les 3 secondes
        setTimeout(() => {
          // Effectue la requête
          this.eleveService.DemandeStatutPayement(modelstatus).subscribe((response) => {
            requestCount++; // Incrémente le nombre de requêtes à chaque appel
            console.log(response);
            if ((response.Status  == '200') &&  (response.Etat  == '2')) {
              this.isLoadingverfy = false;
              clearInterval(this.intervalId); // Arrête l'intervalle
              this.dialog.getDialogById('ReabonnementEleveComponent')?.close(true)
            }
  
            // Affiche le nombre de requêtes effectuées après chaque requête
            console.log("Nombre de requêtes effectuées : ", requestCount);
          });
        }, 3000); // 3 secondes en millisecondes
      }, 3600); // 36 secondes en millisecondes
    }, 6000); // 6 secondes en millisecondes
  }
  
  repriseverifyStatuspaiement(modelstatus: VerifyStatusPayement) {
    let requestCount = 0; // Variable pour suivre le nombre de requêtes
    this.isLoadingverfyreprise = true;

    this.intervalId = setInterval(() => {
        // Vérifie si le nombre de requêtes a atteint 10
        if (requestCount >= 10) {
            clearInterval(this.intervalId); // Arrête l'intervalle
            this.globalService.toastShow("Délai d'attente dépassé", "Attention");
            this.isLoadingverfyreprise = false;
            return; // Sort de la fonction
        }
        this.eleveService.DemandeStatutPayement(modelstatus).subscribe((response) => {
            console.log(response);
            requestCount++; // Incrémente le nombre de requêtes à chaque appel

            if ((response.Status  == '200') && (response.Etat  == '2')) {
                this.isLoadingverfyreprise = false;
                this.globalService.toastShow('Payement effectué', 'Succès');
                clearInterval(this.intervalId); // Arrête l'intervalle
                this.dialog.getDialogById('ReabonnementEleveComponent')?.close(true)
              }

            // Affiche le nombre de requêtes effectuées
            console.log("Nombre de requêtes effectuées : ", requestCount);
        });
    }, 3000);
}

  

  
  RepriseOperation(){
    this.repriseverifyStatuspaiement(this.modelreprise)
  }

  Valider() {
    this.isLoadingverfy = true;
    const reabonnement: ReabonnementModel = {
      Code_Etab: this.header.CODE_ECOLE,
      Details: this.Details,
      Montant: this.Montant,
      Reference: this.Reference,
      IDService: this.IDService,
      NumeroOperation: '',
      DetailOperation: '',
      IDTuteur: this.IDTuteur,
      Statut: '',
      Action: 1,
      IDEleve: this.objetreceveByparent.IDELEVE,
      MobilePayeur: this.MobilePayeur,
    };
    console.log(reabonnement);
    
    this.eleveService.DemandePayement(reabonnement).subscribe((data) => {
      console.log(data);
      this.isLoadingverfy = false;
      if (data) {
        const modelstatus = {
          Code_Etab: this.header.CODE_ECOLE,
          Montant: this.Montant,
          NumeroOperation: data.NumeroOperation,
          DetailOperation: data.DetailOperation,
          Statut: data.Statut,
          Action: 2,
        };
        this.modelreprise = modelstatus
        this.info = data.DetailOperation
        this.verifyStatuspaiement(modelstatus);
      }
    });
  }
}
