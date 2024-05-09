import { Component } from '@angular/core';
import { Agent } from 'src/app/models/agent.model';
import { NationaliteService } from 'src/app/services/nationalite.service';
import { Nationalite } from 'src/app/models/nationalite.model';
import { UpdatePasswordComponent } from 'src/app/agent/update-password/update-password.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, tap } from 'rxjs';
import { AgentService } from 'src/app/services/agent.service';
import { constantes } from 'src/environnements/constantes';

@Component({
  selector: 'app-profile-parent',
  templateUrl: './profile-parent.component.html',
  styleUrls: ['./profile-parent.component.scss']
})
export class ProfileParentComponent {

  agent!:Agent
  photo: string = "assets/images/businessman_318-188871.avif"
  DateNaissance!: string;
  nationaliteList!: Nationalite[];
  IDNATIONALITE!: number;
  photo$!: Observable<string>;
  isloadingnationalite!:boolean
  parent: any;

  constructor(
    private nationaliteService:NationaliteService,
    private dialog: MatDialog,
    private agentService: AgentService
 ){}


  ngOnInit(): void {
    this.nationalite()
    const agentAuth = localStorage.getItem(constantes.auth.agent);
    if(agentAuth){
      this.agent = JSON.parse(agentAuth);
      console.log(this.agent)
      this.DateNaissance = this.convertToValideDate(this.agent.DateNaissance)
      this.IDNATIONALITE = this.agent.IDNationalite
      console.log(this.IDNATIONALITE)
      this.photo$ = this.agentService.getPhoto(this.agent.IDAGENT).pipe(
        map(res => res.Photo)
      )
    }

    const parentObj = localStorage.getItem(constantes.auth.parent)
    if (parentObj) {
      this.parent = JSON.parse(parentObj)
    }
    console.log(this.parent);
  }

  nationalite() {
    this.isloadingnationalite = true
    this.nationaliteService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.nationaliteList = data;
          this.isloadingnationalite = false
        },
        (error) => {
          console.log(error);
        }
      );
  }


  convertToValideDate(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  onOpenUpdatePassword(){
    const dialog = this.dialog.open(UpdatePasswordComponent);
    dialog.componentInstance.CodeAgent = this.agent.CodeAgent
    dialog.componentInstance.Login = this.agent.Login
    dialog.componentInstance.IDAGENT = this.agent.IDAGENT
  }
}
