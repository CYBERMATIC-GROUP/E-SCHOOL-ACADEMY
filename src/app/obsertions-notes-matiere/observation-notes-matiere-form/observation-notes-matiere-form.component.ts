import { Component,Input,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Observation } from 'src/app/models/observation.model';
import { MatiereService } from 'src/app/services/matiere.service';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { finalize, tap } from 'rxjs';
import { Matiere } from 'src/app/models/matiere.model';
import { ColorpickerComponent } from 'src/app/dashboard/parametre/personalisation-document/bulletin/colorpicker/colorpicker.component';


@Component({
  selector: 'app-observation-notes-matiere-form',
  templateUrl: './observation-notes-matiere-form.component.html',
  styleUrls: ['./observation-notes-matiere-form.component.scss']
})
export class ObservationNotesMatiereFormComponent {

  @Input() action !: "create" | "edit" | "view"
  IDOBSERVATIONS_AUTO!: number
  IDMATIERE!: number
  noteMinimale!: number
  Observation!: string
  Couleur!: string
  matiereList!:Matiere[]

  ColordefinitiveFondgroupMatiere!:string
  isLoading!:boolean
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private matiereService:MatiereService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    if (this.IDOBSERVATIONS_AUTO) {
      this.initForUpdate(this.IDOBSERVATIONS_AUTO)
   }
   console.log(this.IDOBSERVATIONS_AUTO);
   console.log(this.IDMATIERE);
   
   this.loadmatiere()
  }

  loadmatiere(){
    this.matiereService.get().subscribe((data)=>{
      console.log(data);
      this.matiereList = data
    })
  }

  selectMatiereID(event:any){
    this.IDMATIERE = event.target.value
    console.log(this.IDMATIERE);
  }

  initForUpdate(observationID: number) {
    this.isLoading = true
    this.matiereService.getOneObservation(observationID).subscribe((data) => {
      console.log(data);
      this.isLoading = false
      this.IDOBSERVATIONS_AUTO = data.IDOBSERVATIONS_AUTO
      this.IDMATIERE = data.IDMATIERE
      this.noteMinimale = data.noteMinimale
      this.Observation = data.Observation
      this.Couleur =  data.Couleur
      this.ColordefinitiveFondgroupMatiere = this.Couleur
    });
  }

  openColorPickerDialogGroupeMatiere() {
    const dialog = this.dialog.open(ColorpickerComponent);
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.ColordefinitiveFondgroupMatiere =
          dialog.componentInstance.colorSelected;
      }
    });
  }

  onSubmitForm(form: NgForm) {
    const observation: Observation = form.value;
    observation.IDOBSERVATIONS_AUTO = this.IDOBSERVATIONS_AUTO
    observation.Couleur = this.ColordefinitiveFondgroupMatiere
    observation.IDMATIERE = this.IDMATIERE
    this.isLoading = true;
    console.log(observation);
    if (this.action === 'edit') {
      this.matiereService.updateObservation(observation).pipe(
        tap(res => {
          console.log(res);
          this.globalService.toastShow('Observation modifiée avec succès !', "Modification")
          this.dialog.getDialogById('ObservationNotesMatiereFormComponent')?.close(true)
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe()
    } else {
      this.matiereService.createObservation(observation).pipe(
        tap(res => {
          console.log(res);
          this.globalService.toastShow('Observation ajoutée avec succès !', "Ajout")
          this.dialog.getDialogById('ObservationNotesMatiereFormComponent')?.close(true)
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe()
    }
  }
}



