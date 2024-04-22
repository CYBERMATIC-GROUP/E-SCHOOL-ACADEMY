import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Classe } from 'src/app/models/classe.model';
import { Eleve } from 'src/app/models/eleve.model';
import { Matiere } from 'src/app/models/matiere.model';
import { ClasseService } from 'src/app/services/classe.service';
import { MatiereService } from 'src/app/services/matiere.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'src/app/notes-manage/services/notes.service';
import { ReleveGlobalService } from '../../releve-global-notes/releve-global.service';
import { ReleveGlobal } from 'src/app/releve-global-notes/releve-global.model';

@Component({
  selector: 'app-releve-notes',
  templateUrl: './releve-notes.component.html',
  styleUrls: ['./releve-notes.component.scss']
})
export class ReleveNotesComponent implements OnInit {
  matiereChosed!: Matiere;
  numeroTrimestre!: number
  studentClasse$!: Observable<Classe | undefined>;
  matiereList$!: Observable<Matiere[]>
  eleve!: Eleve;
  notesIsloading!: boolean;
  releveGlobalNote$!: Observable<ReleveGlobal>;

  constructor(
    private classeService: ClasseService,
    private matiereService: MatiereService,
    private router: Router,
    private releveService: ReleveGlobalService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const eleveAuth = localStorage.getItem('eleve-auth');
    if(eleveAuth){
      this.eleve = JSON.parse(eleveAuth);
      this.studentClasse$ = this.classeService.get().pipe(
        map(res => res.find(elt => Number(elt.IDCLASSES) == this.eleve.IDCLASSES)),
        tap(classe => {

        })
      )

      this.matiereList$ = this.route.data.pipe(
        map(res => res['matieres']),
        tap(res => console.log(res))
      )

    }else{
      this.router.navigate(['/'])
    }

  }

  onChoseMatiere(matiere: Matiere){
    this.matiereChosed = matiere
    this.loadReleve();
  }

  loadReleve(){
    if(this.numeroTrimestre && this.matiereChosed){
      this.studentClasse$.subscribe(data => {
        this.notesIsloading = true;
        this.releveGlobalNote$ = this.releveService.getReleveGlobalNotes(Number(data?.IDCLASSES), this.matiereChosed.IDMATIERE, 1)
      })
    }
  }

  onChangeTrimestre(event: any){
    this.numeroTrimestre = event.target.value;
    this.loadReleve();
  }

  printReleve(){
    /*this.printIsLoad = true;
    if(this.matiereChosed){
      this.releveService.printReleveGlobalNotes(Number(this.classeChosed.IDCLASSES), this.numeroTrimestre, [{IDMATIERE: this.matiereChosed.IDMATIERE}]).pipe(
        tap(res => {
          this.globalService.printFile(res.body.Etat, "Relevé global de notes");
        }),
        finalize(() => {
          this.printIsLoad = false;
        })
      ).subscribe()
    }*/
  }

}
