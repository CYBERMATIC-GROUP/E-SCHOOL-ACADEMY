import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { AnnulationoperationService } from 'src/app/services/annulationoperation.service';
import { ListeMouvement } from 'src/app/models/listemouvement.model';
import { ModalMotifComponent } from './modal-motif/modal-motif.component';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Caisse } from 'src/app/models/caisse.model';
import { CaisseService } from 'src/app/services/caisse.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { GlobalService } from 'src/app/services/global.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';

@Component({
  selector: 'app-annulation-operation',
  templateUrl: './annulation-operation.component.html',
  styleUrls: ['./annulation-operation.component.scss']
})
export class AnnulationOperationComponent {

  dataSource1!: any;
  dataSource2!: any;

  displayedColumns1 = [
    'IDMOUVEMENT',
    'DateHeure',
    'IDCAISSE',
    'Libelle',
  ];

  displayedColumns2 = [
    'CodeCompte',
    'LibelleEcriture',
    'MontantDebit',
    'MontantCredit'
  ];

  isLoading!: boolean
  isLoadingListe!:boolean
  mouvementSelected!: ListeMouvement;
  IDMOUVEMENT!: number;
  isloadbtnAnnuleOperation!:boolean
  numeroMouvement: number = 0;

  caisseListe!:Caisse[]
  numero!: number;

  constructor(

    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private caisseService:CaisseService,
    private dataSharingService:DataSharingService,
    private annulationOperationService:AnnulationoperationService,
    private globalService:GlobalService
  
  ) { }


  ngOnInit(): void {
     this.loadCaisse()
     this.ListeMouvement()
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  loadCaisse(){
    this.caisseService.get().subscribe((data)=>{
      this.caisseListe = data
    })
  }

  getCaisseLibelle(caisseID: number): string {
    const caisse = this.caisseListe.find(
      (item) => item.IDCAISSE === caisseID
    );
    return caisse ? caisse.LibelleCaisse : '';
  }

  valider(): void {
    if (this.numeroMouvement !== undefined) {
      console.log('Numéro du mouvement saisi :', this.numeroMouvement);
      this.numero = this.numeroMouvement
      console.log(this.numero)
      this.dataSharingService.numeromouvement = this.numero
      this.ListeMouvement()
    } else {
      console.log('Aucun numéro de mouvement saisi.');
    }
  }

  ListeMouvement() {
    this.isLoadingListe = true
     this.annulationOperationService.getList(this.numeroMouvement).subscribe((data)=>{
      console.log(this.numeroMouvement)
      console.log(data)
      this.isLoadingListe = false
      this.dataSource1 = new MatTableDataSource(data.body);
      this.dataSource1.sort = this.sort;
      this.dataSource1.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  onClickLine(listemouvement: ListeMouvement){
    this.IDMOUVEMENT = listemouvement.IDMOUVEMENT
    console.log(this.IDMOUVEMENT)
    this.mouvementSelected = listemouvement;
    this.ListeOneMouvement()
  }

  openModal(){
    if(this.IDMOUVEMENT > 0){
      const dialog = this.dialog.open(ModalMotifComponent)
      dialog.componentInstance.IDMOUVEMENT = this.IDMOUVEMENT
      dialog.afterClosed().subscribe((result) => {
        if(!result){
          this.globalService.reloadComponent("liste-mouvement")
          this.globalService.toastShow("Votre operation a été annulé  avec succès", "Succès", "success");
        }
       })
    }else{
      const dialog = this.dialog.open(AlertComponent)
      dialog.componentInstance.content = "Veuillez cliqué sur une ligne du tableau pour selectionner un mouvement  à  annulé"
    
    }
 
  }

  ListeOneMouvement() {
    this.isLoading = true
    this.annulationOperationService.get(this.IDMOUVEMENT).subscribe((data)=>{
      console.log(data)
      console.log(this.IDMOUVEMENT)
      this.isLoading = false
      this.dataSource2 = new MatTableDataSource(data);
      this.dataSource2.sort = this.sort;
      this.dataSource2.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }



  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource1.filter = value.trim().toLowerCase();
  }

  formatPrix(prix: number, separateur: string = ' ', device: string = 'XAF') {
    let reverse: string[] = prix.toString().split('').reverse();
    let prixFormated: string = '';

    for (let i: number = 1; i <= reverse.length; i++) {
      prixFormated += reverse[i - 1];

      if (i % 3 === 0) {
        prixFormated += separateur;
      }
    }

    let formated = prixFormated.split('').reverse().join('');
    let decimal = ',00 ' + device;

    if (formated[0] == separateur) {
      formated = formated.substring(1);
    }
    return formated + decimal;
  }
  

  convertToValideDateH(DateNaissance: string) {
    const parsedDate = parseISO(DateNaissance);
    const formattedDate = format(parsedDate, 'dd MMMM yyyy, HH:mm', {
      locale: fr,
    });
    return formattedDate;
  }




  reloadpage(){
    location.reload()
  }
}
