import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgentService } from 'src/app/services/agent.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectAgentModalComponent } from './select-agent-modal/select-agent-modal.component';
import { SelectEnseignantModalComponent } from './select-enseignant-modal/select-enseignant-modal.component';
import { AjoutSalaireModel } from 'src/app/models/ajoutsalaire.model';
import { elementAt } from 'rxjs';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Agent } from 'src/app/models/agent.model';
import { Enseignants } from 'src/app/models/stats.models';
import { Enseigant } from 'src/app/models/enseigant.model';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-avance-salaire',
  templateUrl: './avance-salaire.component.html',
  styleUrls: ['./avance-salaire.component.scss'],
})
export class AvanceSalaireComponent {
  DataSource!: any;
  displayedColumns = [
    'NomPrenom',
    'CodeCompte',
    'MontantAvance',
    'MontantDejaRetire',
    'MoisAvance',
    'Actions',
  ];

  agent!: Agent;
  enseignant!: Enseigant;
  numMoisAvance!: number;
  MontantAvance!: number;
  isloading!: boolean;
  tabMois!: any;
  selectedMois: any;
  elemenetSelected!: any;
  agentSelected!: any;
  IDAGENT!: number;
  IDENSEIGNANT!: number;
  libelle!: string;
  montantRestant!: number;
  nEtat: number = 1;

  constructor(
    private agentService: AgentService,
    private dialog: MatDialog,
    public globalService: GlobalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAvanceSalaire();
    this.agentService.getListMois().subscribe((data) => {
      console.log(data);
      this.tabMois = data;
    });
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('montantInput', { static: false }) montantInput!: ElementRef;

  getAvanceSalaire() {
    this.isloading = true;
    this.agentService.getListeAvanceSalaire(this.nEtat, 0).subscribe((data) => {
      console.log(data);
      this.isloading = false;
      this.DataSource = new MatTableDataSource(data.body);
      this.DataSource.sort = this.sort;
      this.DataSource.paginator = this.paginator;
    });
  }

  viewagentactifs() {
    this.nEtat = 1;
    this.getAvanceSalaire();
  }
  viewagentinactifs() {
    this.nEtat = 2;
    this.getAvanceSalaire();
  }

  selectAgent() {
    const dialog = this.dialog.open(SelectAgentModalComponent);
    dialog.id = 'SelectAgentModalComponent';
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.agent = dialog.componentInstance.agentSelected;
        this.IDAGENT = this.agent.IDAGENT;
        this.IDENSEIGNANT = 0;
        this.libelle = this.agent.Fr_Nom;
        this.agentSelected = dialog.componentInstance.agentSelected;
      }
    });
  }

  selectEnseignant() {
    const dialog = this.dialog.open(SelectEnseignantModalComponent);
    dialog.id = 'SelectEnseignantModalComponent';
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.enseignant = dialog.componentInstance.EnseignantSelected;
        this.IDENSEIGNANT = this.enseignant.IDENSEIGNANT;
        this.IDAGENT = 0;
        this.libelle = this.enseignant.Fr_Nom;
        this.agentSelected = dialog.componentInstance.EnseignantSelected;
      }
    });
  }

  selectMois(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    this.selectedMois = this.tabMois[selectedIndex -1];
    console.log(this.selectedMois);
  }

  ValiderAvance(selectElement: HTMLSelectElement) {
    if ((this.IDAGENT > 0 || this.IDENSEIGNANT > 0) && this.MontantAvance > 0 && (this.selectedMois)) {
      const modelajoutsalaire: AjoutSalaireModel = {
        IDAGENT: this.IDAGENT,
        IDENSEIGNANT: this.IDENSEIGNANT,
        MontantAvance: this.MontantAvance,
        NumMoisAvance: this.selectedMois.Numero,
        MoisAvance: this.selectedMois.Mois,
      };

      const dialog = this.dialog.open(AlertComponent);
      dialog.componentInstance.content =
        'Etes-vous de vouloir validé cette avance ?';
      dialog.componentInstance.type = 'info';
      dialog.afterClosed().subscribe((result) => {
        this.isloading = true;
        if (result) {
          console.log(modelajoutsalaire);
          this.agentService
            .AddAvanceSalaire(modelajoutsalaire)
            .subscribe((data) => {
              console.log(data);
              this.globalService.toastShow('Avance accordé avec succès ','Succès')
              this.isloading = false;
              this.montantInput.nativeElement.value = '';
              selectElement.value = '';
              this.selectedMois = ''
              this.libelle = ''
              this.agentSelected = ''
              this.IDAGENT = 0
              this.IDENSEIGNANT = 0
              this.getAvanceSalaire();
            });
        }
      });
    } else {
      const dialog = this.dialog.open(AlertComponent);
      dialog.componentInstance.content =
        "Vous devez choisir l'agent , selectionner le mois   saisir le montant à avancer";
      dialog.componentInstance.type = 'info';
    }
  }

  SaisieMontant(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.MontantAvance = Number(inputElement.value);
    console.log(this.MontantAvance);
  }

  onClickLine(element: AjoutSalaireModel) {
    this.elemenetSelected = element;
    this.calculateMontantRestant();
    localStorage.setItem(
      'elementSelected',
      JSON.stringify(this.elemenetSelected)
    );
    localStorage.setItem('MontantRestant', JSON.stringify(this.montantRestant));
  }

  retraitEspece() {
    if (this.montantRestant > 0) {
      this.router.navigateByUrl('/retrait-caisse-espece-avance-salaire');
    } else {
      const dialog = this.dialog.open(AlertComponent);
      dialog.componentInstance.content =
        'Le montant avancé ne peut etre inferieur ou égal au montant rétiré';
      dialog.componentInstance.type = 'info';
    }
  }

  calculateMontantRestant() {
    this.montantRestant =
      this.elemenetSelected.MontantAvance -
      this.elemenetSelected.MontantDejaRetire;
    console.log(this.montantRestant);
  }

  delete(element: AjoutSalaireModel) {
    const dialog = this.dialog.open(AlertComponent);
    dialog.componentInstance.content = 'voulez-vous supprimé';
    dialog.componentInstance.type = 'danger';
  }
}
