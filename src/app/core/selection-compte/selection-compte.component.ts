import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, startWith, tap } from 'rxjs';
import { Compte } from 'src/app/models/compte.model';
import { GlobalService } from 'src/app/services/global.service';
import { CompteService } from '../../services/compte.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-selection-compte',
  templateUrl: './selection-compte.component.html',
  styleUrls: ['./selection-compte.component.scss']
})
export class SelectionCompteComponent implements OnInit {
  CodeCompte!: string;
  compteValue!: string;
  comptes$!: Observable<Compte[]>
  compteAssocie!: string;
  @Output() compteSelected!: Compte;
  @Output() compteEmited = new EventEmitter<Compte>()
  classes: {id: number, name: string}[] = [
    {id: 1, name: "les comptes de capitaux"},
    {id: 2, name: "les comptes d'immobilisations"},
    {id: 3, name: "les stocks et en-cours"},
    {id: 401, name: "les comptes fournisseurs"},
    {id: 411, name: "les comptes Clients"},
    {id: 5, name: "les comptes financiers"},
    {id: 6, name: "les comptes de charge"},
    {id: 7, name: "les comptes de produit"},
    {id: 8, name: "les comptes de speciaux"},

  ]
  selectedClass: number = 6; // Initialisez avec l'ID de la classe que vous voulez afficher par défaut
  dataSource!: any
  displayedColumns = [
    "CodeCompte",
    "LibelleCompte"
  ]

  constructor(
    public globalService: GlobalService,
    private compteService: CompteService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.loadCompte(this.selectedClass);
  }

  onClassSelected(event: any){
    const idClasse = event.target.value;
    this.selectedClass = idClasse;
    this.loadCompte(idClasse);
  }

  compteSaisie(event: any): void {
    this.CodeCompte = event.target.value;
  }

  onChooseCompte(compte: Compte){
    this.compteSelected = compte    
  }

  loadCompte(classe: number){
    this.comptes$ = this.compteService.getListCompteBanque(classe, false).pipe(
      tap(res => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res)
      })
    );
  }

  onValid(){
    if(this.compteSelected){
      this.CodeCompte = this.compteSelected.CodeCompte
      this.compteAssocie = this.compteSelected.LibelleCompte
      this.dialog.getDialogById('SelectionCompteComponent')?.close(true)
    }else{
      console.log('selectionner un compte');
    }
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
