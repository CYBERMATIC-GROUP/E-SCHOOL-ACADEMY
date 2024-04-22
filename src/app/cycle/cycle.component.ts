import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../core/alert/alert.component';
import { Cycle } from '../models/cycle.model';
import { CycleService } from '../services/cycle.service';
import { CycleFormComponent } from './cycle-form/cycle-form.component';
import { GlobalService } from '../services/global.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.scss']
})
export class CycleComponent {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;



  dataSource!: any;
  displayedColumns = [

    'Libelle',
    // 'NumOrdre',
    'Actions',
  ];
  isLoading!: boolean
  cycles$!: Observable<Cycle[]>

  constructor(
    private _formBuilder: FormBuilder,
    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private cycleService:CycleService,
    private globalService: GlobalService

  ) { }


  ngOnInit(): void {
    this.cycle();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  cycle() {
    this.cycles$ = this.cycleService.get()
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }


  edit(cycle: Cycle) {
    const ref = this.dialog.open(CycleFormComponent);
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDCYCLES = cycle.IDCYCLES;
     ref.afterClosed().subscribe(res => {
        if(ref.componentInstance.complet){
          this.cycles$ = this.cycleService.get()
        }
      })
  }


  view(cycle: Cycle) {
    const refview = this.dialog.open(CycleFormComponent);
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDCYCLES = cycle.IDCYCLES;

  }

  create() {
    const refview = this.dialog.open(CycleFormComponent)
     refview.componentInstance.action = 'create';
     refview.afterClosed().subscribe(res => {
      if(refview.componentInstance.complet){
        this.cycles$ = this.cycleService.get()
      }
    })
  }


  delete(cycle: Cycle) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer le cycle ' + cycle.Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.cycleService.delete(cycle.IDCYCLES).pipe(
          tap(data => {
            this.cycles$ = this.cycleService.get()
            this.globalService.reloadComponent("/cycle")
            this.globalService.toastShow("Cycle supprimé avec succès.", "suppression")
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()

      }
    });
  }
}
