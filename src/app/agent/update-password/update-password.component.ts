import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { ModificationMotDePasseAgent } from 'src/app/models/updatePasswordAgent.model';
import { AgentService } from 'src/app/services/agent.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent {

  @ViewChild('password1Input') password1Input!: ElementRef;
  @ViewChild('password2Input') password2Input!: ElementRef;
  passwordMatchStatus: string = '';

  CodeAgent!:string
  Login!:string
  AncienPasse!: number
  NouveaunPasse!: number
  IDAGENT!: number
  image: string = "assets/images/parent.jpg"
  isLoading!: boolean;
  passwordsMatch!: boolean;
  photo$!: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private agentService:AgentService,
    private globalService:GlobalService
  ) {}


  isFormValid(): any {
    return this.AncienPasse && this.NouveaunPasse && this.IDAGENT;
  }


  ngOnInit(): void {
    this.photo$ = this.agentService.getPhoto(this.IDAGENT).pipe(
      map(res => res.Photo),
      tap(res => {
        console.log(res)
      })
    )
    console.log(this.IDAGENT)
  }

  checkPasswordMatch() {
    const password1 = this.password1Input.nativeElement.value;
    const password2 = this.password2Input.nativeElement.value;

    this.passwordsMatch = password1 === password2;
  }

  onSubmitForm(form: NgForm) {
    this.isLoading = true
    const updatepasswoerdagent: ModificationMotDePasseAgent = form.value;
    updatepasswoerdagent.IDAGENT = this.IDAGENT
    console.log(updatepasswoerdagent)
       this.agentService.UpdatePasswoerdAgent(updatepasswoerdagent).subscribe(
         (data) => {
           console.log(data);
           this.isLoading = false
           this.dialog.closeAll()
           this.globalService.toastShow("Votre mot de passe a été modifié  avec succès", "Succès", "success");
          },
         (error) => console.log(error)
       );
   }

  }



