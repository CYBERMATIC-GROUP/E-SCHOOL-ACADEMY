import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Observable, finalize, tap } from 'rxjs';
import { Caisse } from 'src/app/models/caisse.model';
import { CaisseService } from 'src/app/services/caisse.service';
import { GlobalService } from 'src/app/services/global.service';
import { CompteBancaireService } from '../services/compte-bancaire.service';
import isThisHour from 'date-fns/esm/isThisHour/index.js';
import { Agent } from 'src/app/models/agent.model';
import { constantes } from 'src/environnements/constantes';
import { MatTableDataSource } from '@angular/material/table';
import { pendingTransfert, transfertArgent } from '../models/transfert-bancaire-caise.model';
import { InfoComptaAgentComponent } from '../info-compta-agent/info-compta-agent.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalForAllComponent } from './modal-for-all/modal-for-all.component';
import { environment } from 'src/environnements/environnement.prod';

@Component({
  selector: 'app-transfert-intercaisse',
  templateUrl: './transfert-intercaisse.component.html',
  styleUrls: ['./transfert-intercaisse.component.scss']
})
export class TransfertIntercaisseComponent implements OnInit {
  @ViewChild(InfoComptaAgentComponent) infoCompteAgentComponent: InfoComptaAgentComponent | undefined;

  caisseList$!: Observable<Caisse[]>;
  formTransfert!: FormGroup;
  agent!: Agent
  tableTransfertIsLoading!: boolean;
  displayedColumns = [
    "DateCreation",
    "CodeCaisseDestination",
    "Montant",
    "Libelle",
    "Actions"
  ];
  transactions!: pendingTransfert[];
  totalAmount!: number;
  bTableTransfertEntrant!: boolean;
  sendArgentIsloading!: boolean;
  Date!: string
  cancelIsLoading!: boolean;

  constructor(
    private caisseService: CaisseService,
    private formBuilder: FormBuilder,
    public globalService: GlobalService,
    private comptaService: CompteBancaireService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
      const agentObj = localStorage.getItem(constantes.auth.agent)
      if(agentObj){
        this.agent = JSON.parse(agentObj);
        console.log(this.agent)
        this.caisseList$ = this.caisseService.get();
        this.caisseList$.subscribe(data  => {
          console.log(data);
        } )
        this.initForm(this.agent.IDAGENT, this.agent.CaisseAssociee)
      }else{
        this.globalService.alert("Aucun agent trouve", 'Erreur', "danger", "", "") 
      }

      this.getTransfertEntrant()
      this.Init_DateTransfert()
  }

  Init_DateTransfert() {
    const currentDate = new Date();
    this.Date = this.convertToValideDates(currentDate.toISOString().substring(0, 10))
    console.log(this.Date);
    
  }  convertToValideDates(Date: string) {
    const year = Date.split('-')[0];
    const month = Date.split('-')[1];
    const day = Date.split('-')[2];
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }

  initForm(IDAGENT: number, IDCaisseSource: number,  ){
    this.formTransfert =  this.formBuilder.group({
      Montant: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      Libelle: [null, Validators.required],
      IDCaisseSource: [IDCaisseSource, Validators.required],
      IDCaisseDestination: [null, Validators.required],
      IDAGENT: [IDAGENT, Validators.required],
      Date: [null, Validators.required],
      IDCAISSE: [IDCaisseSource, Validators.required],
      LibelleCaisse: [null, Validators.required]
    });

    let currentDate = this.infoCompteAgentComponent?.dateComptable;
    console.log(currentDate)
  }

  getTransfertSortant(bValide: 1 | 0 = 0){
    this.bTableTransfertEntrant = false;
    this.loadTransfertInterCaisse(this.agent.CaisseAssociee, 0, bValide)
  }

  getTransfertEntrant(bValide: 1 | 0 = 0){
    this.bTableTransfertEntrant = true;
    this.loadTransfertInterCaisse(0, this.agent.CaisseAssociee, 0)
  }

  loadTransfertInterCaisse(
    nIDCaisseSource: number,
    nIDCaisseDestination: number,
    bValide: 1 | 0
  ){
    this.tableTransfertIsLoading = true;
    console.log(nIDCaisseSource, nIDCaisseDestination, bValide);
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

  isFormValid(): boolean {
    const formData = this.formTransfert.getRawValue();
  
    // Vérifier si les champs correspondent aux valeurs spécifiques fournies
    const montantValid = formData.Montant !== null && formData.Montant !== '';
    const libelleValid = formData.Libelle !== null && formData.Libelle !== '';
    const libelleCaisseValid = formData.LibelleCaisse !== null && formData.LibelleCaisse !== '';
  
    // Retourner true si l'une des valeurs est invalide
    return !montantValid || !libelleValid || !libelleCaisseValid;
  }
  
  

  onSetTransfert(){
    this.sendArgentIsloading = true;
    this.formTransfert.patchValue({ Date: this.Date });
    const transfert: transfertArgent = this.formTransfert.value; 
    console.log(transfert);
    this.comptaService.setTransfertArgent(transfert).pipe(
      tap(data => {
        console.log(data);
        // this.impressionEtat(data)
        const msg = `Vous avez transferer une somme de ${transfert.Montant} XAF vers le compte de ${this.formTransfert.get('LibelleCaisse')?.value}`
        this.globalService.toastShow("Transfert effectif !", msg);
  
        this.formTransfert.get('LibelleCaisse')?.setValue('')
        this.formTransfert.get('IDCaisseDestination')?.setValue('')
        this.formTransfert.get('Montant')?.setValue('')
        this.formTransfert.get('Libelle')?.setValue('')
        this.sendArgentIsloading = false;
  
        this.getTransfertSortant(0);
      }),
      finalize(() => {
        this.sendArgentIsloading = false;
      })
    ).subscribe();
  }

  openAllTransfert(){
    const ref = this.dialog.open(ModalForAllComponent);
    ref.componentInstance.agent = this.agent;
  }

  handleValue(event: string){
    this.formTransfert.get('Date')?.setValue(event);
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
        this.validTransfert(IDTRANSFERTCAISSE);
      }
    })
  }

  cancelTransfert(IDTRANSFERTCAISSE: number){
    this.cancelIsLoading = true;
    this.comptaService.cancelTransfert(IDTRANSFERTCAISSE).pipe(
      tap(res => {
        this.globalService.toastShow("Transfert annulé avec succès !", "Annulation");
        this.getTransfertSortant();
        this.cancelIsLoading = false;
        const routeCompta = environment.routes.Comptabilite
        const routeIntercaisse = routeCompta.Base + '/' + routeCompta.links.transfertIntercaisseEtBancaire.base + '/' + routeCompta.links.transfertIntercaisseEtBancaire.intercaisse;
        this.globalService.reloadComponent(routeIntercaisse)
      }),
      finalize(() => {
        this.cancelIsLoading = false;
      })
    ).subscribe();
  }

  validTransfert(IDTRANSFERTCAISSE: number){
    this.cancelIsLoading = true;
    this.comptaService.validTransfert(IDTRANSFERTCAISSE).pipe(
      tap(res => {
        console.log(res);
        this.impressionEtat(res)
        const routeCompta = environment.routes.Comptabilite
        const routeIntercaisse = routeCompta.Base + '/' + routeCompta.links.transfertIntercaisseEtBancaire.base + '/' + routeCompta.links.transfertIntercaisseEtBancaire.intercaisse;
        this.globalService.toastShow("Transfert validé avec succès !", "Validation");
        this.globalService.reloadComponent(routeIntercaisse)
        this.getTransfertEntrant();
        this.cancelIsLoading = false;
      }),
      finalize(() => {
        this.cancelIsLoading = false;
      })
    ).subscribe();
  }


  impressionEtat(resData: any) {
    const data = resData;
    console.log(data);
    var anchor = document.createElement('a');
    anchor.href = data.body.Etat;
    anchor.download = 'Liste Des eleves ';
    document.body.appendChild(anchor);
    //  anchor.click();
    let pdfWindow = window.open('', '_blank', 'Liste eleves');
    pdfWindow
      ? pdfWindow!.document.write(
          "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
            encodeURI(data.body.Etat) +
            "'></iframe></body>"
        )
      : null;
  }

}