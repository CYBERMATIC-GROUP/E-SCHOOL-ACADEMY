import { Component, OnInit } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { Visite } from '../models/visite.model';
import { VisiteService } from '../services/visite.service';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { VisitesFormComponent } from '../visites-form/visites-form.component';
import { VisiteurFormComponent } from '../visiteur-view/visiteur-form/visiteur-form.component';
import { Visiteur } from '../models/visiteur.model';

@Component({
  selector: 'app-visites-view',
  templateUrl: './visites-view.component.html',
  styleUrls: ['./visites-view.component.scss']
})
export class VisitesViewComponent implements OnInit {

  visites$!: Observable<Visite[]>;
  displayedColumns = [
    "Motif",
    "Details",
    "Actions"
  ]
  Date!: string;
  DateFin!: string;
  isLoading!: boolean;

  constructor(
    private visiteService: VisiteService,
    public globalService: GlobalService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.setdateDebut();
    this.setdateFin();
    this.visites$ = this.visiteService.get()
  }

  onClickLine(visite: Visite){

  }

  view(visite: Visite){
    const ref = this.dialog.open(VisitesFormComponent)
    ref.componentInstance.action = "view"
    ref.componentInstance.visite = visite
  }
  edit(visite: Visite){
    const ref = this.dialog.open(VisitesFormComponent)
    ref.componentInstance.action = "edit"
    ref.componentInstance.visite = visite
  }

  delete(visite: Visite){
    const ref = this.globalService.alert("Voulez-vous supprimer ce visiteur ?", "Confirmation", "danger", "NON", "OUI")
    ref.afterClosed().subscribe(res => {
      if(res){
        this.isLoading = true
        this.visiteService.delete(visite.IDVisiteurs).pipe(
          tap(res => {
            this.globalService.toastShow("Visiteur supprimé", "Suppresion");
            this.visites$ = this.visiteService.get()
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    }) 
  }

  onDateSelectedDebut(){

  }

  onDateSelectedFin(){

  }

  addVisite(){
    const ref = this.dialog.open(VisitesFormComponent)
    ref.componentInstance.action = "create"
    ref.afterClosed().subscribe(result => {
      const visite: Visite = ref.componentInstance.visite
      if(visite){
        this.visites$ = this.visiteService.get()
      }
    })
  }

  addVisiteur() {
    const ref = this.dialog.open(VisiteurFormComponent, {id: 'dialog-visite-form'})
    ref.componentInstance.action = "create"

    ref.afterClosed().subscribe(result => {
      const visiteur: Visiteur = ref.componentInstance.visiteur
    })
  }

  setdateFin(){
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2); 
    const day = ('0' + today.getDate()).slice(-2);

    this.DateFin = `${year}-${month}-${day}`;
  }

  setdateDebut(){
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const year = sevenDaysAgo.getFullYear();
    const month = ('0' + (sevenDaysAgo.getMonth() + 1)).slice(-2);
    const day = ('0' + sevenDaysAgo.getDate()).slice(-2);

    this.Date = `${year}-${month}-${day}`;
  }
}
