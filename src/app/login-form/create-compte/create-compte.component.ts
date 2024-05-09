import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, find, map, tap, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { CompteService } from 'src/app/services/compte.service';
import { CreateCopmteParent } from 'src/app/models/createcompteparent.model';
import { ValidationCompteComponent } from '../validation-compte/validation-compte.component';
import { AnneeService } from 'src/app/services/annee.service';
import { Annee } from 'src/app/models/annee.model';
import { header } from 'src/app/models/header.model';
import { constantes } from 'src/environnements/constantes';
import { environment } from 'src/environnements/environnement.prod';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-create-compte',
  templateUrl: './create-compte.component.html',
  styleUrls: ['./create-compte.component.scss'],
})
export class CreateCompteComponent {
  @Input() action!: 'create' | 'edit' | 'view';

  isLoading!: boolean;
  openFonctioonByEnseignant: boolean = false;

  IDCOMPTE_UTILISATEUR!: number;
  Nom!: string;
  Prenom!: string;
  email!: string;
  Mobile!: string;
  Mobile2!: string;
  Password!: string;
  AnneeList!: Annee[]
  isloadingAnnee!: boolean
  CODE_ECOLE!: string
  header!: header;
  lastTypeUser!: number;
  typeUserSelected!: number;
  DEFAULT_USER = environment.TypeUserConst.CST_TYPE_USER_PARENT;
  school!: any;
  ANNEE!: string


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private compteService: CompteService,
    private anneeService: AnneeService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
  
  }

  AnneeScolaire(){
    this.isloadingAnnee = true
    this.anneeService.get(this.header).subscribe(data => {
      console.log(data);
      this.AnneeList = data
      this.isloadingAnnee = false
    })
  }

  onBlurCode(event: any){
    const value = event.target.value
    console.log(value);
    
      this.header = {
        CODE_ECOLE: value,
        ANNEE: "",
        IDENTIFIANT: value,
        CLE_API: "",
        UTILISATEUER_LOGIN: "",
        UTILISATEUER_TOKEN: "",
        ACTION: 1,
        TYPE_UTILISATEUR: 1,

      }
      console.log(this.header);
       this.AnneeScolaire()
  }

  selectedAnne(element: any){
    console.log(element.target.value);
    this.header.ANNEE = element.target.value
    console.log(this.header);
  }
  
  initForUpdate(COMPTEID: number) {
    this.compteService.getOnecompteparent(COMPTEID).subscribe((data) => {
      console.log(data);
      this.Nom = data.Nom;
      this.Prenom = data.Prenom;
      this.email = data.email;
      this.Mobile = data.Mobile;
      this.Mobile2 = data.Mobile2;
      this.Password = data.Password;
    });
  }

  onSubmitForm(form: NgForm) {
    this.isLoading = true;
    const compte: CreateCopmteParent = form.value;
    compte.IDCOMPTE_UTILISATEUR = this.IDCOMPTE_UTILISATEUR;
    console.log(compte);

    if (this.action === 'edit') {
      this.compteService
        .updatecompteparent(compte)
        .pipe(
          tap((data) => {
            this.globalService.reloadComponent('/fonction');
            this.dialog.closeAll();
            this.globalService.toastShow('fonction modifié.', 'Modification');
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    } else {      
      this.compteService
        .createcompteparent(compte, this.header)
        .pipe(
          tap((data) => {
            console.log(data);
               const dialog = this.dialog.open(ValidationCompteComponent,{
                disableClose: true
               });
               dialog.componentInstance.Mobile = this.Mobile
               dialog.componentInstance.header = this.header
               dialog.id = 'CreateCompteComponent';
               dialog.afterClosed().subscribe((res) => {
                 if (res) {
                  this.router.navigateByUrl('login-form');
                  localStorage.setItem('Mobilephone', this.Mobile);
                 }
               });
          }),
          catchError((error) => {
            // Gérer les erreurs ici
            if (error instanceof HttpErrorResponse && error.status === 405) {
              const errorMessage = error.error?.fault?.detail || 'Erreur inconnue';
              console.error(errorMessage);
              this.globalService.alert(errorMessage,"Information","danger","OK","")
              return throwError(errorMessage); 
            } else {
              return throwError(error);
            }
          }),
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe()
     
      
    }
  }
}

