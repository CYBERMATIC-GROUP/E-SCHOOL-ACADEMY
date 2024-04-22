import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { DevoirEnseignant } from 'src/app/models/devoirs.model';
import { Eleve } from 'src/app/models/eleve.model';
import { Matiere } from 'src/app/models/matiere.model';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { MatiereService } from 'src/app/services/matiere.service';
import { constantes } from 'src/environnements/constantes';

@Component({
  selector: 'app-devoirs',
  templateUrl: './devoirs.component.html',
  styleUrls: ['./devoirs.component.scss']
})
export class DevoirsComponent implements OnInit, AfterViewInit {
  devoirs$!: Observable<DevoirEnseignant[]>
  eleve!: Eleve
  IDMATIERE!: number;
  dataSource!: any;
  matierelist$!: Observable<Matiere[]>;
  displayedColumns = [
    "Titre",
    "DateCorrection",
    "MATIERE",
    "ENSEIGNANT",
  ]

  constructor(
    private enseignantService: EnseignantService,
    private matiereService: MatiereService,
    private router: Router
  ){}

  ngAfterViewInit(): void {
    const screenW = screen.width
    console.log(screenW);

    const setColumns = () => {
      if(screenW < 750){
        this.displayedColumns = [
          "Titre",
          "MATIERE"
        ]
      }
    }

    setColumns()
  }

  ngOnInit(): void {
    const objEleve = localStorage.getItem(constantes.auth.eleve)
    if(objEleve){
      this.eleve = JSON.parse(objEleve)
      this.loadDevoirs()
    }
  }

  loadDevoirs(){
    this.devoirs$ = this.enseignantService.getDevoirsEnseignants(0, this.eleve.IDCLASSES, 0).pipe(
      tap(res => {
        this.dataSource = new MatTableDataSource(res);
      })  
    )
  }

  selectedmatiere(event: any){

  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  convertToValideDate(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  onClickLine(devoir: DevoirEnseignant){
    this.router.navigate(['/espace-eleve/devoirs-et-cours/devoirs/' + devoir.IDDEVOIRS])
  }
}
