import { Component } from '@angular/core';
import { TypeVisiteur } from '../models/type-visite.model';
import { Observable, finalize, tap } from 'rxjs';
import { TypeVisiteService } from '../services/type-visite.service';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { TypeVisitesFormComponent } from './type-visites-form/type-visites-form.component';

@Component({
  selector: 'app-type-visites-view',
  templateUrl: './type-visites-view.component.html',
  styleUrls: ['./type-visites-view.component.scss']
})
export class TypeVisitesViewComponent {
  typeVisiteurs$!: Observable<TypeVisiteur[]>;
  displayedColumns = [
    "Libelle",
    "Actions"
  ]
  isLoading!: boolean;

  constructor(
    private typeService: TypeVisiteService,
    public globalService: GlobalService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.typeVisiteurs$ = this.typeService.get()
  }


  view(type: TypeVisiteur){
    const ref = this.dialog.open(TypeVisitesFormComponent)
    ref.componentInstance.action = "view"
    ref.componentInstance.type = type

    ref.afterClosed().subscribe(result => {
      if(ref.componentInstance.type){
        this.typeVisiteurs$ = this.typeService.get()
      }
    })
  }
  edit(type: TypeVisiteur){
    const ref = this.dialog.open(TypeVisitesFormComponent)
    ref.componentInstance.action = "edit"
    ref.componentInstance.type = type

    ref.afterClosed().subscribe(result => {
      if(ref.componentInstance.type){
        this.typeVisiteurs$ = this.typeService.get()
      }
    })
  }
  
  delete(type: TypeVisiteur){
    const ref = this.globalService.alert("Voulez-vous supprimer ce type de visiteur ?", "Confirmation", "danger", "NON", "OUI")
    ref.afterClosed().subscribe(res => {
      if(res){
        this.isLoading = true
        this.typeService.delete(type.IDTypeVisiteur).pipe(
          tap(res => {
            this.globalService.toastShow("Type de visiteur supprimé", "Suppresion")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    })
  }

  addType(){
    const ref = this.dialog.open(TypeVisitesFormComponent);
    ref.componentInstance.action = "create"
  }
}
