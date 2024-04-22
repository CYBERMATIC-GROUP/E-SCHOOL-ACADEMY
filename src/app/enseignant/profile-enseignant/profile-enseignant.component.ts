import { Component } from '@angular/core';
import { NationaliteService } from 'src/app/services/nationalite.service';
import { Nationalite } from 'src/app/models/nationalite.model';
import { Enseigant } from 'src/app/models/enseigant.model';
import { constantes } from 'src/environnements/constantes';
import { EnseignantService } from 'src/app/services/enseignant.service';


@Component({
  selector: 'app-profile-enseignant',
  templateUrl: './profile-enseignant.component.html',
  styleUrls: ['./profile-enseignant.component.scss']
})
export class ProfileEnseignantComponent {

  enseignant!:Enseigant
  photo: string = "assets/images/businessman_318-188871.avif"
  DateNaissance!: string;
  nationaliteList!: Nationalite[];
  IDNATIONALITE!: string;
IDNationalite!: number;

  constructor(
    private nationaliteService:NationaliteService,
    private enseignantService:EnseignantService
 ){}


  ngOnInit(): void {
    this.nationalite()
    this.enseignantService.getOne(1).subscribe((data)=>{
      this.enseignant = data
      console.log(this.enseignant)
      this.DateNaissance = this.convertToValideDate(this.enseignant.DateNaissance)
      console.log(this.DateNaissance)

    })

    // const enseigantAuth = localStorage.getItem(constantes.requestCache.enseignantList);
    // if(enseigantAuth){
    //   this.enseignant = JSON.parse(enseigantAuth); 
    //   console.log(this.enseignant)
    //   this.DateNaissance = this.convertToValideDate(this.enseignant.DateNaissance)
    //   this.IDNATIONALITE = this.getNationaliteLibelle(this.enseignant.IDNationalite)
    //   console.log(this.IDNATIONALITE)
    // }

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
