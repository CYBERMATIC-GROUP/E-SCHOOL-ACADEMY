import { Component } from '@angular/core';
import { Visiteur } from '../models/visiteur.model';
import { Observable, finalize, tap } from 'rxjs';
import { VisiteurService } from '../services/visiteur.service';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { VisiteurFormComponent } from './visiteur-form/visiteur-form.component';

@Component({
  selector: 'app-visiteur-view',
  templateUrl: './visiteur-view.component.html',
  styleUrls: ['./visiteur-view.component.scss']
})
export class VisiteurViewComponent {
  visiteurs$!: Observable<Visiteur[]>;
  displayedColumns = [
    "NomPrenom",
    "Mobile",
    "Actions"
  ]
  Date!: string;
  DateFin!: string;
  isLoading!: boolean;

  constructor(
    private visiteurService: VisiteurService,
    public globalService: GlobalService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.visiteurs$ = this.visiteurService.get()
  }


  view(visiteur: Visiteur){
    const ref = this.dialog.open(VisiteurFormComponent)
    ref.componentInstance.action = "view"
    ref.componentInstance.visiteur = visiteur
  }
  edit(visiteur: Visiteur){
    const ref = this.dialog.open(VisiteurFormComponent)
    ref.componentInstance.action = "edit"
    ref.componentInstance.visiteur = visiteur
  }
  delete(visiteur: Visiteur){
    const ref = this.globalService.alert("Voulez-vous supprimer ce visiteur ?", "Confirmation", "danger", "NON", "OUI")
    ref.afterClosed().subscribe(res => {
      if(res){
        this.isLoading = true
        this.visiteurService.delete(visiteur.IDVisiteurs).pipe(
          tap(res => {
            this.globalService.toastShow("Visiteur supprimé", "Suppresion")
            this.visiteurs$ = this.visiteurService.get()
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    })
  }

  addVisiteur() {
    const ref = this.dialog.open(VisiteurFormComponent, {id: 'dialog-visite-form'})
    ref.componentInstance.action = "create"
  }
}
