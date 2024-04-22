import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Classe } from 'src/app/models/classe.model';
import { ClasseService } from 'src/app/services/classe.service';
import { Branche } from 'src/app/models/branche.model';
import { BrancheService } from 'src/app/services/branche.service';
import { Niveau } from 'src/app/models/niveau.model';
import { NiveauService } from 'src/app/services/niveau.service';



@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss']
})
export class FiltreComponent implements OnInit {

  @Input() action!: 'create' | 'edit' | 'view';

 
  IDCLASSES!: number
  IDNIVEAU!: number
  IDBRANCHE!: number
  NumClasse!: number
  CodeClasse!: string
  NomClasse!: string
  IDSALLES!: number
  IDENSEIGNANT_Principal!: number
  IDClassesInspection!: number
  CodeNiveau!: string
  CodeBranche!: string
  CodeSalle!: string


  niveauList!: Niveau[];
 brancheList!: Branche[];

  constructor(
    private classeService:ClasseService,
    private brancheService:BrancheService,
    private niveauService:NiveauService,
    private router:Router
  ){}

  ngOnInit(): void {

    this.niveau();
    this.branche()
    this.classe()

  }

  niveau(){
    this.niveauService.get().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.niveauList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  branche(){
    this.brancheService.get().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.brancheList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  classe() {
    if (this.IDNIVEAU && this.IDBRANCHE) {
      this.classeService.getClasse(this.IDNIVEAU, this.IDBRANCHE,0)
        .pipe(catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        }))
        .subscribe((data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        });
    }
  }
  
  
  onSubmit() {
    console.log('Niveau sélectionné :', this.IDNIVEAU);
    console.log('Branche sélectionnée :', this.IDBRANCHE);
  
    this.router.navigateByUrl(`/classe/ajout/${this.IDNIVEAU}/${this.IDBRANCHE}`);
  }


}
