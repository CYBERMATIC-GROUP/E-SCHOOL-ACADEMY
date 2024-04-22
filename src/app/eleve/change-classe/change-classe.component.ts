import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize, tap } from 'rxjs';
import { Classe } from 'src/app/models/classe.model';
import { Eleve, impressionDocEleveType } from 'src/app/models/eleve.model';
import { ClasseService } from 'src/app/services/classe.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-change-classe',
  templateUrl: './change-classe.component.html',
  styleUrls: ['./change-classe.component.scss']
})
export class ChangeClasseComponent {

  dataSource1!: any;
  classList!: Classe[];
  classeSelected!: Classe;
  displayedColumns1 = ['CodeClasse', 'cocher'];
  isLoading!: boolean;
  eleve!: Eleve
  submitLoading!: boolean
  isModified = false

  constructor(
    private classeService: ClasseService,
    private dialog: MatDialog,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.classe();

  }

  classe() {
    this.isLoading = true
    this.classeService.get().subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false
        this.dataSource1 = new MatTableDataSource(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkLineClass(element: Classe) {
    this.classeSelected = element;
  }


  ClasseList() {
    this.classeService
      .get()
      .subscribe(
        (data) => {
          console.log(data);
          this.classList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }


  onValid(){
    const ref = this.globalService.alert("Voulez-vous tansférer " + this.eleve.Fr_Nom + ' ' + this.eleve.Fr_Prenom + " vers la classe de " +  this.classeSelected.CodeClasse + " ?", "Transfert", "info", "NON", "OUI")

    ref.afterClosed().subscribe(result => {
      if(result){
        this.submitLoading = true
        this.classeService.changeClasse(Number(this.classeSelected.IDCLASSES), this.eleve.IDELEVE).pipe(
          tap(res => {
            this.globalService.toastShow(this.eleve.Fr_Nom + ' ' + this.eleve.Fr_Prenom + " est désormais en classe de " + this.classeSelected.CodeClasse, "Transfert effectué:");
            this.dialog.closeAll()
            this.isModified = true
          }),
          finalize(() => {
            this.submitLoading = false
          })
        ).subscribe();
      }
    })
  }

}
