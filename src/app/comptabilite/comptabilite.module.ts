import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriqueVersementCaisseComponent } from './historique-versement-caisse/historique-versement-caisse.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComptabiliteRoutingModule } from './comptabilite-routing.module';
import { HistoriqueRetraitsCaissesComponent } from './historique-retraits-caisses/historique-retraits-caisses.component';
import { AnnulationOperationComponent } from './annulation-operation/annulation-operation.component';
import { ModalMotifComponent } from './annulation-operation/modal-motif/modal-motif.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TransfertIntercaisseComponent } from './transfert-intercaisse/transfert-intercaisse.component';
import { VersementBancaireComponent } from './versement-bancaire/versement-bancaire.component';
import { RetraitBancaireComponent } from './retrait-bancaire/retrait-bancaire.component';
import { MenuTransfertComponent } from './menu-transfert/menu-transfert.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { InfoComptaAgentComponent } from './info-compta-agent/info-compta-agent.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { ModalForAllComponent } from './transfert-intercaisse/modal-for-all/modal-for-all.component';
import { RetraitCaisseEspeceComponent } from './retrait-caisse-espece/retrait-caisse-espece.component';
import { HistoriqueFraisEleveComponent } from './historique-frais-eleve/historique-frais-eleve.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RetraitEspaceCaisseComponent } from './retrait-espace-caisse/retrait-espace-caisse.component';
import { RapportJournalierComponent } from '../dashboard/comptabilite/outils-du-promoteur/outils-du-promoteur/rapport-journalier/rapport-journalier.component';
@NgModule({
  declarations: [
    HistoriqueVersementCaisseComponent,
    HistoriqueRetraitsCaissesComponent,
    AnnulationOperationComponent,
    ModalMotifComponent,
    TransfertIntercaisseComponent,
    VersementBancaireComponent,
    RetraitBancaireComponent,
    MenuTransfertComponent,
    ModalForAllComponent,
    RetraitCaisseEspeceComponent,
    HistoriqueFraisEleveComponent,
    RetraitEspaceCaisseComponent,
    RapportJournalierComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    CoreModule,
    MatExpansionModule,
    FormsModule,
    ComptabiliteRoutingModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatChipsModule,
    MatButtonModule,
    MatAutocompleteModule
  ]
})
export class ComptabiliteModule { }
