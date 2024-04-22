import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environnements/environnement.prod';
import { HistoriqueVersementCaisseComponent } from './historique-versement-caisse/historique-versement-caisse.component';
import { HistoriqueRetraitsCaissesComponent } from './historique-retraits-caisses/historique-retraits-caisses.component';
import { TransfertIntercaisseComponent } from './transfert-intercaisse/transfert-intercaisse.component';
import { VersementBancaireComponent } from './versement-bancaire/versement-bancaire.component';
import { RetraitBancaireComponent } from './retrait-bancaire/retrait-bancaire.component';
import { MenuTransfertComponent } from './menu-transfert/menu-transfert.component';
import { RetraitCaisseEspeceComponent } from './retrait-caisse-espece/retrait-caisse-espece.component';

const transfert = environment.routes.Comptabilite.links.transfertIntercaisseEtBancaire
const comptabilete = environment.routes.Comptabilite

const routes: Routes = [
  {path: environment.routes.Comptabilite.links.historiqueVersementCaisse, component: HistoriqueVersementCaisseComponent},
  {path: environment.routes.Comptabilite.links.historiqueRetraitsCaisse, component: HistoriqueRetraitsCaissesComponent},

  {path: transfert.base + '/' + transfert.intercaisse, component: TransfertIntercaisseComponent},

  {path: transfert.base, component: MenuTransfertComponent},

  {path: transfert.base + '/' + transfert.versementBancaire, component: VersementBancaireComponent},

  {path: transfert.base + '/' + transfert.retraitsBancaire, component: RetraitBancaireComponent},

  {path: comptabilete.links.retraitCaisseEspece, component: RetraitCaisseEspeceComponent},

  {path: 'frais-occasionel', loadChildren: () => import('./frais-occasionel/frais-occasionel.module').then(m => m.FraisOccasionelModule)},

  {path: 'frais-occasionel/:eleveID', loadChildren: () => import('./frais-occasionel/frais-occasionel.module').then(m => m.FraisOccasionelModule)},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ComptabiliteRoutingModule { }
