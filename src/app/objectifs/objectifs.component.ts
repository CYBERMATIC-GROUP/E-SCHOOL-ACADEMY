import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from '../services/global.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MentionService } from '../services/mention.service';
import { ObjectifFormComponent } from './objectif-form/objectif-form.component';
import { AlertComponent } from '../core/alert/alert.component';
import { finalize, tap } from 'rxjs';
import { ObjectEnvoie, Objectifs } from '../models/objectif.model';
import { NiveauService } from '../services/niveau.service';
import { BrancheService } from '../services/branche.service';
import { Niveau } from '../models/niveau.model';
import { Branche } from '../models/branche.model';
import { MatiereService } from '../services/matiere.service';

@Component({
  selector: 'app-objectifs',
  templateUrl: './objectifs.component.html',
  styleUrls: ['./objectifs.component.scss'],
})
export class ObjectifsComponent {
  dataSource!: any;
  displayedColumns = [
    'NIVEAU',
    'BRANCHE',
    'MATIERE',
    'EnseigneeP1',
    'EnseigneeP2',
    'EnseigneeP3',
    'Annee',
    'Libelle',
    'Actions',
  ];
  
  IDNIVEAU!: number;
  IDBRANCHE!: number;
  Niveau!: any;
  IDMATIERE!: number;
  isLoading!: boolean;
  matiere!: string;
  niveauList!: Niveau[];
  brancheList!: Branche[];
  matiereList!: any[];
  branche!:any
  tableauContientDesElements!: boolean;
  isvisibletable!:boolean 
  isloadbranche!:boolean
  isloadniveau!:boolean
  modelobject!:ObjectEnvoie

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private globalService: GlobalService,
    private mentionservice: MentionService,
    private niveauService: NiveauService,
    private brancheService: BrancheService,
    private matiereService: MatiereService
  ) {}
  ngOnInit(): void {
    this.loadbranche();
    this.loadniveau();
  }
  
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
//get list objectifis selon niveau et branche
  getObjectifs() {
    this.isLoading = true;
      this.mentionservice.getobjectifs(this.modelobject).subscribe((data) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data.body)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      this.isLoading = false;
      if (data.body.length === 0) {
        this.isvisibletable = false
        this.tableauContientDesElements = true;
      }
      if (data.body.length > 0) {
        this.isvisibletable = true
        this.tableauContientDesElements = false;

      }
    });
  }
//load niveau et matiere selon idniveau et get list objectif selon idniveau a l'initialisation
  loadniveau() {
    this.isloadniveau = true
    this.niveauService.get().subscribe((data) => {
      console.log(data);
      this.isloadniveau = false
      this.niveauList = data;
      this.Niveau = data['0'].IDNIVEAU;
      this.IDNIVEAU = this.Niveau
      const object: ObjectEnvoie = {
        IDNIVEAU: this.Niveau,
        IDBRANCHE: this.branche,
        IDMATIERE: 0,
      };
      this.modelobject = object
      this.getObjectifs();
      this.loadmatiere();
    });
  }
  //load branche et matiere selon idniveau et get list objectif selon idbranche a l'initialisation
  loadbranche() {
    this.isloadbranche = true
    this.brancheService.get().subscribe((data) => {
      console.log(data);
      this.isloadbranche = false
      this.brancheList = data;
      this.branche = data["0"].IDBRANCHE
      this.IDBRANCHE = this.branche
      this.loadmatiere()
    });
  }
  // load list  matiere selon idniveau et idbranche
  loadmatiere() {
    this.matiereService
      .getListMatiereByNieveuBranche(this.IDNIVEAU, this.IDBRANCHE)
      .subscribe((data) => {
        console.log(data);
        this.matiereList = data;
      });
  }
  //list objectifs selon idniveau selectionner
  selectNiveauID(event: any) {
    this.IDNIVEAU = event.target.value;
    this.Niveau = this.IDNIVEAU
    const object: ObjectEnvoie = {
      IDNIVEAU: this.IDNIVEAU,
      IDBRANCHE: 0,
      IDMATIERE: 0,
    };
    this.modelobject = object
    this.getObjectifs();
    this.loadmatiere();
  }
   //list objectifs selon idbranche selectionner
  selectBrancheID(event: any) {
    this.IDBRANCHE = event.target.value;
    this,this.branche = this.IDBRANCHE
    const object: ObjectEnvoie = {
      IDNIVEAU: this.IDNIVEAU,
      IDBRANCHE: this.IDBRANCHE,
      IDMATIERE: 0,
    };
    this.modelobject = object
    this.getObjectifs();
    this.loadmatiere();
  }

  //list objectifs selon idmatiere selectionner
  selectMatiereID(event: any) {
    this.IDMATIERE = event.target.value;
    console.log(this.IDMATIERE);
    const object: ObjectEnvoie = {
      IDNIVEAU: this.IDNIVEAU,
      IDBRANCHE: this.IDBRANCHE,
      IDMATIERE: this.IDMATIERE,
    };
    this.modelobject = object
    this.getObjectifs();
  }

  //dialog de creation d'un objectif selon idniveau et branche
  create() {
    const dialog = this.dialog.open(ObjectifFormComponent);
    dialog.componentInstance.action = 'create';
    dialog.componentInstance.IDBRANCHE = this.branche
    dialog.componentInstance.IDNIVEAU = this.Niveau
    dialog.id = 'ObjectifFormComponent'
    dialog.afterClosed().subscribe(result => {
      if (result) {
        console.log(this.modelobject);
        this.getObjectifs()
      }
    })
  }
  //dialog de update d'un objectif selon  idniveau et branche
  edit(objectif: Objectifs) {
    const dialog = this.dialog.open(ObjectifFormComponent);
    dialog.componentInstance.IDLES_OBEJECTIS = objectif.IDLES_OBEJECTIS;
    dialog.componentInstance.objectifmodel = objectif;
    dialog.componentInstance.IDBRANCHE = this.branche
    dialog.componentInstance.IDNIVEAU = this.Niveau
    dialog.componentInstance.action = 'edit';
    dialog.id = 'ObjectifFormComponent'
    dialog.afterClosed().subscribe(result => {
      if (result) {
        console.log(this.modelobject);
        this.getObjectifs()
      }
    })
  }
//fiche d'un objectif
  view(objectif: Objectifs) {
    const dialog = this.dialog.open(ObjectifFormComponent);
    dialog.componentInstance.IDLES_OBEJECTIS = objectif.IDLES_OBEJECTIS;
    dialog.componentInstance.objectifmodel = objectif;
    dialog.componentInstance.IDBRANCHE = this.branche
    dialog.componentInstance.IDNIVEAU = this.Niveau
    dialog.componentInstance.action = 'view';
  }
//Suppression d'un objectif
  delete(objectifs: Objectifs) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.content =
      'Voulez vous supprimer cet objectif ' + objectifs.Libelle + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.mentionservice
          .deleteobjectifs(objectifs.IDLES_OBEJECTIS)
          .pipe(
            tap((res) => {
              console.log(res);
              this.globalService.toastShow(
                'Objectif supprimé avec succès.',
                'Suppression:'
              );
            }),
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe();
      }
    });
  }
  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
