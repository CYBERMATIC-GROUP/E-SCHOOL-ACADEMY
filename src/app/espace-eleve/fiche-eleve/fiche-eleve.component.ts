import { Component, OnInit } from '@angular/core';
import { Eleve } from 'src/app/models/eleve.model';
import { NationaliteService } from 'src/app/services/nationalite.service';
import { Nationalite } from 'src/app/models/nationalite.model';
import { EleveService } from 'src/app/services/eleve.service';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-fiche-eleve',
  templateUrl: './fiche-eleve.component.html',
  styleUrls: ['./fiche-eleve.component.scss']
})
export class FicheEleveComponent implements OnInit {

  eleve!:Eleve
  photo: string = "assets/images/businessman_318-188871.avif"
  DateNaissance!: string;
  nationaliteList!: Nationalite[];
  photoIsLoading!:boolean;


  constructor(
    private nationaliteService:NationaliteService,
    private elveService: EleveService
 ){}

  ngOnInit(): void {

    this.nationalite()

    const eleveAuth = localStorage.getItem('eleve-auth');
    if(eleveAuth){
      this.eleve = JSON.parse(eleveAuth);
      console.log(this.eleve)
      this.DateNaissance = this.convertToValideDate(this.eleve.DateNaissance)
      this.photoIsLoading = true;
      this.elveService.getPhoto(this.eleve.IDELEVE).pipe(
        tap(res => {
          if(res.Photo != "")
            this.photo = res.Photo
        }),
        finalize(() => {
          this.photoIsLoading = false
        })
      ).subscribe();
    }
  }

  nationalite() {
    this.nationaliteService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.nationaliteList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getNationaliteLibelle(nationaliteId: number): string {
    const nationalite = this.nationaliteList.find(
      (item) => item.IDNATIONALITE === nationaliteId
    );
    console.log(nationalite)
    return nationalite ? nationalite.Libelle : '';
  }

  convertToValideDate(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

}
