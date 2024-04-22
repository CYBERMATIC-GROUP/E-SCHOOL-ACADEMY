import { Component, ViewChild } from '@angular/core';
import { EtablissementService } from '../services/etablissement.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { schoolLogin } from '../models/ecole.model';
import { constantes } from 'src/environnements/constantes';

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.scss']
})
export class EtablissementComponent {

  IDETAB!: String
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
  urlImage: string = "assets/images/logo-social.png";
  IDETABLISEMENT!:string

  isLoading!: boolean;
  schoolLogin!:schoolLogin

  constructor(
    private router:Router,
    private etabService:EtablissementService,
    public dialog: MatDialog,
    public _location:Location
  ) { }

  ngOnInit(): void {

    const schoolLoginAut = localStorage.getItem(constantes.auth.school);
    if(schoolLoginAut){
      this.schoolLogin = JSON.parse(schoolLoginAut);
      console.log(this.schoolLogin)
      this.IDETABLISEMENT = this.schoolLogin.IDETAB
      console.log(this.IDETABLISEMENT)
    }

    this.initForUpdate()

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  initForUpdate() {
    this.isLoading= true;
    this.etabService.getOne(this.IDETABLISEMENT).subscribe((data) => {
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
    this.urlImage = data.Logo
    this.isLoading=false
    });
  }


  edit(IDETABLISEMENT: string){
    this.router.navigateByUrl('etab/edit/' + IDETABLISEMENT);
  }

}
