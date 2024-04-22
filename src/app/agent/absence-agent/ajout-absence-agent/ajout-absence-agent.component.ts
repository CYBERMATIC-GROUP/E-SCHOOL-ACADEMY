import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { ModelAbsenceAgent } from 'src/app/models/agent.model';
import { AgentService } from 'src/app/services/agent.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-ajout-absence-agent',
  templateUrl: './ajout-absence-agent.component.html',
  styleUrls: ['./ajout-absence-agent.component.scss'],
})
export class AjoutAbsenceAgentComponent {
  @Input() action!: 'create' | 'edit' | 'view';

  IDABSENCeS_AGENTS!: number;
  IDAGENT!: number;
  Date!: string;
  ApresMidi!: boolean;
  Matin!: boolean;
  NomPrenom!: string;
  MatinOuApresMidi!: number;
  isloading!:boolean
  isloadingfiche!:boolean
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private globalService: GlobalService,
    private agentService: AgentService
  ) {}
  ngOnInit(): void {
    console.log(this.IDAGENT);
    console.log(this.Date);
    this.initForUpdate();
  }
  convertToValideDate(DateNaissance: string) {
    const year = DateNaissance.split('-')[0];
    const month = DateNaissance.split('-')[1];
    const day = DateNaissance.split('-')[2];
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }
  initForUpdate() {
    this.isloadingfiche = true
    this.agentService
      .getOneAbsence(this.convertToValideDate(this.Date), this.IDAGENT)
      .subscribe((data) => {
        console.log(data);
        this.isloadingfiche = false
        this.IDAGENT = data['0'].IDAGENT;
        this.IDABSENCeS_AGENTS = data['0'].IDABSENCeS_AGENTS;
        this.Date = data['0'].Date;
        this.NomPrenom = data['0'].NomPrenom;
        this.Matin = data['0'].Matin;
        this.ApresMidi = data['0'].ApresMidi;
        this.MatinOuApresMidi = data['0'].MatinOuApresMidi;
      });
  }

  selectDate(event: any) {
    this.Date = event.target.value
    console.log(this.Date);
    
  }

  matinselected(event:any){
    console.log(event.target.checked);
    this.Matin = event.target.checked
    this.ApresMidi = false
    this.MatinOuApresMidi = 1
  }

  SoirSelected(event:any){
    console.log(event.target.checked);
    this.ApresMidi = event.target.checked
    this.Matin = false
    this.MatinOuApresMidi = 2
  }

  onSubmitForm(form: NgForm) {
    const objectsendAbsence: ModelAbsenceAgent = form.value;
    objectsendAbsence.IDAGENT = this.IDAGENT;
    objectsendAbsence.ApresMidi = this.ApresMidi;
    objectsendAbsence.Date = this.convertToValideDate(this.Date)
    objectsendAbsence.Matin = this.Matin;
    objectsendAbsence.IDABSENCeS_AGENTS = this.IDABSENCeS_AGENTS
    objectsendAbsence.MatinOuApresMidi = this.MatinOuApresMidi
    console.log(objectsendAbsence);

    if(!this.Matin && !this.ApresMidi){
      this.isloading = true      
      this.agentService.deleteAbsenceAgent(this.IDABSENCeS_AGENTS).pipe(
        tap(data => {
          console.log(data);
          this.isloading = false
          this.dialog.getDialogById('AjoutAbsenceAgentComponent')?.close(true)
          this.globalService.toastShow("Absence retirée avec succès","")
        }),
        finalize(() => {
          this.isloading = false
        })
      ).subscribe()
    } else if (this.action === 'edit' && (this.Matin || this.ApresMidi )) {
      this.isloading = true
      this.agentService
        .updateAbsenceAgent(objectsendAbsence).pipe(
          tap(data => {
            console.log(data);
            this.isloading = false
            this.dialog.getDialogById('AjoutAbsenceAgentComponent')?.close(true)
            this.globalService.toastShow("Modification effectuée avec succès","")
          }),
          finalize(() => {
            this.isloading = false
          })
        ).subscribe()
    } else {
      this.isloading = true
      this.agentService
        .createAbsenceAgent(objectsendAbsence).pipe(
          tap(data => {
            console.log(data);
            this.isloading = false
            this.dialog.getDialogById('AjoutAbsenceAgentComponent')?.close(true)
            this.globalService.toastShow("Ajout absence effectué avec succès","")
          }),
          finalize(() => {
            this.isloading = false
          })
        ).subscribe()
    }
  }
}
