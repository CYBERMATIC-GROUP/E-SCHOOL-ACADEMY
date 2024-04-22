import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Niveau } from '../models/niveau.model';
import { GlobalService } from '../services/global.service';
import { MentionsFormComponent } from './mentions-form/mentions-form.component';
import { MentionService } from '../services/mention.service';
import { AlertComponent } from '../core/alert/alert.component';
import { finalize, tap } from 'rxjs';
import { Mentions } from '../models/mentions.model';

@Component({
  selector: 'app-metions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.scss']
})
export class MetionsComponent {
  dataSource!: any;
  displayedColumns = [
    'Mention',
    'MoyenneMinimale',
    'TypeMention',
    'Couleur',
    'Actions',
  ];
  isLoading!: boolean
  constructor(
    private router:Router,
    private dialog: MatDialog,
    private globalService: GlobalService,
    private mentionService: MentionService

  ) { }
  ngOnInit(): void {
    this.mention();
  }
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  mention() {
    this.isLoading = true
    this.mentionService.get().subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
  edit(mention: Mentions) {
    const ref = this.dialog.open(MentionsFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDMENTIONS = mention.IDMENTIONS;
  }

  view(mention: Mentions) {
    const refview = this.dialog.open(MentionsFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDMENTIONS = mention.IDMENTIONS;
  }
  create() {
    const refview = this.dialog.open(MentionsFormComponent);
     refview.componentInstance.action = 'create';
  }
  delete(mentions: Mentions) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content = 'Voulez vous supprimer la mention ' + (mentions.TypeMention === 1 ? 'recompense' : 'Sanction') + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true
        this.mentionService.delete(mentions.IDMENTIONS).pipe(
          tap(res => {
            console.log(res);
            this.globalService.toastShow("Mention supprimée avec succès.", "Suppression:")
            this.globalService.reloadComponent('/mentions')
          }),
          finalize(() => {
            this.isLoading = false
          })
        ).subscribe()
      }
    });

  }


}
