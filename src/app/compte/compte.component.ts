import { Component,OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { AlertComponent } from '../core/alert/alert.component';
import { Compte } from '../models/compte.model';
import { CompteService } from '../services/compte.service';
import { finalize, tap } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit{

  dataSource!: any;

  displayedColumns = [
    'CodeCompte',
    'LibelleCompte',
    'SoldeDebit',
    'SoldeCredit',
    'Actions'
  ];
  isLoading!: boolean
  action!: string;
  IDCOMPTE!: number;

  constructor(
    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private compteService:CompteService,
    private globalService: GlobalService
  ) { }


ngOnInit(): void {

  this.compte()

}

@ViewChild(MatSort, { static: true }) sort!: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator

compte(){
this.isLoading = true
  this.compteService.get().subscribe((data)=>{
    console.log(data)
    this.isLoading = false
    const compte: Compte[] = data.body;
    this.dataSource = new MatTableDataSource(compte)
    this.dataSource.sort = this.sort
  })
}


ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}


applyFilter(filterValue: any) {
  const value = filterValue.target.value;
  this.dataSource.filter = value.trim().toLowerCase();
}

formatPrix  (prix : number, separateur: string = ' ', device: string = 'XAF') {

  let  reverse : string[] = prix.toString().split('').reverse();
  let prixFormated:string = '';

  for ( let i:number = 1 ; i <= reverse.length; i++ ) {
     prixFormated += reverse[i-1];

     if (i%3 === 0) {
       prixFormated += separateur;
     }
  }

  let formated = prixFormated.split('').reverse().join('')
  let decimal =  ',00 ' + device

  if ( formated[0] == separateur) {
    formated = formated.substring(1)
  }
  return formated + decimal;

 }


view(IDCOMPTE:number){
  this.router.navigateByUrl('/compte/view/' + IDCOMPTE)
}

edit(IDCOMPTE:number){
  this,this.router.navigateByUrl('/compte/edit/' + IDCOMPTE)
}


delete(compte:Compte){
  const alert = this.dialog.open(AlertComponent,{
  })
  alert.componentInstance.content = "voulez-vous supprimer le compte " + compte.LibelleCompte + " ?"
  alert.afterClosed().subscribe((result)=>{
  if(result){
    this.isLoading = true;
    this.compteService.delete(compte.IDCOMPTE).pipe(
      tap(res => {
        this.globalService.toastShow("Compte supprimé avec succès.", "Suppression")
        this.globalService.reloadComponent('/compte/list')
      }),
      finalize(() => {
        this.isLoading = false
      })
    ).subscribe()
  }
})
}
}
