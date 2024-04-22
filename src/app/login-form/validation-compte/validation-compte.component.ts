import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { CompteService } from 'src/app/services/compte.service';
import { ValidateCompte } from 'src/app/models/createcompteparent.model';
import { header } from 'src/app/models/header.model';

@Component({
  selector: 'app-validation-compte',
  templateUrl: './validation-compte.component.html',
  styleUrls: ['./validation-compte.component.scss']
})
export class ValidationCompteComponent {

  isLoading!: boolean;
  header!: header
  Mobile!: string;
  Code!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private compteService: CompteService,
    private globalService: GlobalService
  ) {}


  onSubmitForm(form: NgForm) {
    this.isLoading = true;
    console.log(this.header);
    const compte: ValidateCompte = form.value;
    console.log(compte);
      this.compteService
        .validationcompteparent(compte, this.header)
        .pipe(
          tap((data) => {
            console.log(data);
            this.dialog.closeAll()
            this.globalService.toastShow('Compte créé et validé avec succès','validation du compte')
          }),
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe();
    }
  }

