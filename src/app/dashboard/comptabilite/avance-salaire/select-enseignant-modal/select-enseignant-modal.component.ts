import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Enseigant } from 'src/app/models/enseigant.model';
import { Enseignants } from 'src/app/models/stats.models';

@Component({
  selector: 'app-select-enseignant-modal',
  templateUrl: './select-enseignant-modal.component.html',
  styleUrls: ['./select-enseignant-modal.component.scss']
})
export class SelectEnseignantModalComponent {
  dataSource!: any;
  displayedColumns = [
    'CodeEnseignant',
    'Fr_Nom',
    'Fr_Prenom',
    'Civilite'
   ];
  IDENSEIGNANT!: number;
  isLoading!: boolean;
  EnseignantSelected!:Enseigant;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private enseignantService: EnseignantService,
    ) {}

    ngOnInit(): void {
      this.enseignant();
    }

    enseignant() {
      this.isLoading = true;
      this.enseignantService.get().subscribe(
        (data) => {
          console.log(data);
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(data);
        }
      );
    }

    onClickLine(enseignant: Enseigant){
      console.log(enseignant.IDENSEIGNANT);
      this.EnseignantSelected = enseignant;
      if (this.EnseignantSelected) {
        this.dialog.getDialogById('SelectEnseignantModalComponent')?.close(true)
      }
    }

    applyFilterEnseignant(filterValue: any) {
      const value = filterValue.target.value;
      this.dataSource.filter = value.trim().toLowerCase();
    }
}
