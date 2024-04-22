import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { ModificationMotDePasseAgent } from 'src/app/models/updatePasswordAgent.model';
import { AgentService } from 'src/app/services/agent.service';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-generatenewpassword',
  templateUrl: './generatenewpassword.component.html',
  styleUrls: ['./generatenewpassword.component.scss']
})
export class GeneratenewpasswordComponent {

  CodeAgent!:string
  Login!:string
  AncienPasse!: number
  NouveaunPasse!: number
  IDAGENT!: number
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
    return this.NouveaunPasse;
  }


  ngOnInit(): void {
    console.log(this.IDAGENT)
  }

  onSubmitForm(form: NgForm) {
    this.isLoading = true
    const updatepasswoerdagent: ModificationMotDePasseAgent = form.value;
    updatepasswoerdagent.IDAGENT = this.IDAGENT
    updatepasswoerdagent.AncienPasse = 0
    console.log(updatepasswoerdagent)
       this.agentService.generatepassword(updatepasswoerdagent).subscribe(
         (data) => {
           console.log(data);
           this.isLoading = false
           this.dialog.closeAll()
           this.globalService.toastShow("Votre mot de passe a été generé  avec succès", "Succès", "success");
          },
         (error) => console.log(error)
       );
   }

}
