import { EnvoiMail } from 'src/app/models/envoiemail.model';
import { EnvoiemailService } from 'src/app/services/envoiemail.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { GradeService } from 'src/app/services/grade.service';
import { GlobalService } from 'src/app/services/global.service'


@Component({
  selector: 'app-envoiemessage-accueil',
  templateUrl: './envoiemessage-accueil.component.html',
  styleUrls: ['./envoiemessage-accueil.component.scss']
})
export class EnvoiemessageAccueilComponent {

  Email_Sujet!: string
  Email_Exepediteur!: string
  Email_Message!: string
  NOMPrenom!: string

  message : string = "Votre message est en cours d'envoie..."

  Mobile!: string
isloading: any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private envoiemailService:EnvoiemailService,
    private globalService:GlobalService
  ) {}

  isFormValid(): any {
    return this.Email_Exepediteur && this.Mobile && this.Email_Sujet && this.Email_Message && this.NOMPrenom;
  }


  onSubmitForm(form: NgForm) {

    this.isloading = true

    const envoiemail: EnvoiMail = form.value;

    console.log(envoiemail)
      this.envoiemailService.EnvoieMail(envoiemail).subscribe(
        (data) => {
          console.log(data);
          this.isloading = false
          this.globalService.toastShow("Votre message a été envoyé avec succès", "Succès", "success");
        },
        (error) => {
          console.log(error)
          this.isloading = false
        }
      );
    }

}
