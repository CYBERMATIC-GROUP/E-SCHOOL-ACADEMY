import { Component, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Etablissement } from 'src/app/models/etablissement.model';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { Location } from '@angular/common';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-etablissement-form',
  templateUrl: './etablissement-form.component.html',
  styleUrls: ['./etablissement-form.component.scss']
})
export class EtablissementFormComponent {

  IDETAB!: number
  CodeEtab!: string
  Telephone!: string
  SiteInternet!: string
  Courriel!: string
  Licence!: string
  Fr_NomEtab!: string
  Fr_Adresse1!: string
  Fr_Ville!: string
  Fr_Departement!: string
  Pays!: string
  Logo!:string

  isFormValid(): any {
    return this.CodeEtab && this.Telephone && this.Courriel && this.Fr_Adresse1 && this.Fr_NomEtab && this.Fr_Departement;
  }

  isLoading!:boolean;
  isLoading2!: boolean
  imageSrc: string = "../assets/images/logo-social.png";
  message: string = "";

selectedFile!: File;

action!: "edit" | "view";

constructor(
  private http: HttpClient,
  private router: Router,
  private route: ActivatedRoute,
  private dialog: MatDialog,
  private etabService:EtablissementService,
  public _location : Location,
  private globalService: GlobalService
) {}


ngOnInit(): void {

  const EtabID = this.route.snapshot.params['EtabID'];
  this.action = this.route.snapshot.params['action'];

  if (EtabID){
    this.IDETAB = EtabID
    this.initForUpdate(EtabID);

  }
}


initForUpdate(EtabID: string) {
  this.isLoading = true;
  this.etabService.getOne(EtabID).subscribe((data) => {
    console.log(data);
    this.CodeEtab = data.CodeEtab
    this.Telephone = data.Telephone
    this.SiteInternet = data.SiteInternet
    this.Courriel = data.Courriel
    this.Licence = data.Licence
    this.Fr_NomEtab = data.Fr_NomEtab
    this.Fr_Adresse1 = data.Fr_Adresse1
    this.Fr_Ville = data.Fr_Ville
    this.Fr_Departement = data.Fr_Departement
    this.Pays = data.Pays
    this.imageSrc = data.Logo

    this.isLoading =false

  });
}


onFileSelected(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.imageSrc = reader.result as string;
  };
}

onSubmitSociete(form: NgForm) {

  const etab: Etablissement = form.value;

  console.log(this.imageSrc);
  etab.IDETAB = this.IDETAB


  if(this.imageSrc == "../assets/images/imageVide.png" ){
    this.imageSrc = ""
  }else{
    etab.Logo = this.imageSrc
  }

  if (this.action === 'edit') {
    this.isLoading2 = true
    this.message= "Modification de l'établissement en cours"
    this.etabService.update(etab).pipe(
      tap(res => {
        this.globalService.toastShow("Ecole modifiée avec succès !", "Modification")
      }),
      finalize(() => {
        this.isLoading2 = false
      })
    ).subscribe()

  } else {
    this.etabService.create(etab).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data)
      this.router.navigateByUrl("/societe/list")
      location.reload()
    }, error => console.log(error))
  }

}



}
