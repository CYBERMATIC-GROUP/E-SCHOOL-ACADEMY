import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FiltreComponent } from 'src/app/classe/filtre/filtre.component';
import { Classe } from 'src/app/models/classe.model';
import { AlertComponent } from '../alert/alert.component';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClasseService } from 'src/app/services/classe.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classe-list',
  templateUrl: './classe-list.component.html',
  styleUrls: ['./classe-list.component.scss']
})
export class ClasseListComponent {
  @Input() classeList$!: Observable<Classe[]>;
  displayedColumns = [
    'CodeClasse',
    'NomClasse',
  ];
  @Input() maxHeight: string = '15em';
  @Output() classeEmitted = new EventEmitter<Classe>();
  @Input() firstClasssDefault: boolean = false; //checked first  class by default
  classeSelected!: Classe
  classListFromHtml!: Classe[];

  constructor(
    private classeService:ClasseService
  ) { }


  ngOnInit(): void {
    if(!this.classeList$){
      this.classeList$ = this.classeService.get().pipe(
        tap(res => {
          //make selected first element
          console.log(res);

          this.emitClass(res[0]);//it's just for screen great than from 2
        })
      )
    }
  }

  emitClass(classe: Classe){
    this.classeSelected = classe
    this.classeEmitted.emit(classe)
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    //this.dataSource.filter = value.trim().toLowerCase();
  }

  emitClassFromSelect(event: any, classes: Classe[]){
    console.log(event);
    console.log(classes);
    const classeFound = classes.find(elt => elt.IDCLASSES == event.target.value)
    if(classeFound)
      this.emitClass(classeFound)
  }

}
