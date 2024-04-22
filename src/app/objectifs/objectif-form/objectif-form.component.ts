import { Component,Input,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Observation } from 'src/app/models/observation.model';
import { MatiereService } from 'src/app/services/matiere.service';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { finalize, tap } from 'rxjs';
import { MentionService } from 'src/app/services/mention.service';
import { Objectifs } from 'src/app/models/objectif.model';
import { Matiere, MatiereByNiveauBrancheClasse } from 'src/app/models/matiere.model';
import { NiveauService } from 'src/app/services/niveau.service';
import { BrancheService } from 'src/app/services/branche.service';
import { Niveau } from 'src/app/models/niveau.model';
import { Branche } from 'src/app/models/branche.model';
import { EleveService } from 'src/app/services/eleve.service';


@Component({
  selector: 'app-objectif-form',
  templateUrl: './objectif-form.component.html',
  styleUrls: ['./objectif-form.component.scss']
})
export class ObjectifFormComponent {
  IDLES_OBEJECTIS: number = 0
  Libelle_AN!: string
  Libelle!: string
  Annee!: number
  Periode!: number
  IDNIVEAU!: number
  IDBRANCHE!: number
  IDMATIERE!: number
  EnseigneeP1!: boolean
  EnseigneeP2!: boolean
  EnseigneeP3!: boolean
  NIVEAU!: string
  BRANCHE!: string
  MATIERE!: string
  isLoading!:boolean
  isloadingmatiere!:boolean

  @Input() action !: "create" | "edit" | "view"

  matiereList!:any[]
  niveauList!:Niveau[]
  brancheList!:Branche[]
  objectifmodel!:Objectifs

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private mentionService:MentionService,
    private globalService: GlobalService,
    private matiereService:MatiereService,
    private niveauService: NiveauService,
    private brancheService: BrancheService,
    private eleveService: EleveService
  ) {}

  ngOnInit(): void {
    if (this.IDLES_OBEJECTIS) {
      this.initForUpdate()
   }
   console.log(this.IDLES_OBEJECTIS);
   this.loadbranche()
   this.loadniveau()
   this.loadmatiere()
  }

  loadperiode(){
    this.eleveService.GetParametresPeriode(1).subscribe((data)=>{
      console.log(data);
      
    })
  }
  loadniveau(){
    this.niveauService.get().subscribe((data)=>{
      console.log(data);
      this.niveauList = data
    })
  }

  loadbranche(){
    this.brancheService.get().subscribe((data)=>{
      console.log(data);
      this.brancheList = data
    })
  }

  loadmatiere(){
    this.isloadingmatiere = true
    this.matiereService.getListMatiereByNieveuBranche(this.IDNIVEAU,this.IDBRANCHE).subscribe((data)=>{
      console.log(data);
      this.isloadingmatiere = false
      this.matiereList = data      
    })
  }
  initForUpdate() {
    this.isLoading = true
    this.mentionService.getOneObjectif(this.objectifmodel).subscribe((data) => {
      console.log(data);
      this.isLoading = false
      this.IDLES_OBEJECTIS = data.body.IDLES_OBEJECTIS
      this.Libelle_AN = data.body["0"].Libelle_AN
      this.Libelle = data.body["0"].Libelle
      this.Annee = data.body["0"].Annee
      this.Periode = data.body["0"].Periode
      this.IDNIVEAU = data.body["0"].IDNIVEAU
      this.IDBRANCHE = data.body["0"].IDBRANCHE
      this.IDMATIERE = data.body["0"].IDMATIERE
      this.EnseigneeP1 = data.body["0"].EnseigneeP1
      this.EnseigneeP2 = data.body["0"].EnseigneeP2
      this.EnseigneeP3 = data.body["0"].EnseigneeP3
    });
  }
  selectMatiereID(event:any){
    this.IDMATIERE = event.target.value
    console.log(this.IDMATIERE);
  }
  selectNiveauID(event:any){
    this.IDNIVEAU = event.target.value
    console.log(this.IDNIVEAU);
    this.loadmatiere()
  }
  selectBrancheID(event:any){
    this.IDBRANCHE = event.target.value
    console.log(this.IDBRANCHE);
    this.loadmatiere()
  }
  selectPeriode(event:any){
    this.Periode = event.target.value
    console.log(this.Periode);
  }

  onSubmitForm(form: NgForm) {
    const objectif: Objectifs = form.value;
    objectif.IDLES_OBEJECTIS = this.IDLES_OBEJECTIS
    objectif.IDBRANCHE = this.IDBRANCHE
    objectif.IDNIVEAU = this.IDNIVEAU
    this.isLoading = true;
    console.log(objectif);
    if (this.action === 'edit'){
      this.mentionService.updateobjectifs(objectif).pipe(
        tap(res => {
          console.log(res);
          this.dialog.getDialogById('ObjectifFormComponent')?.close(true)
          this.globalService.toastShow('objectif modifiée avec succès !', "Modification")
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe()
    } else {
      this.mentionService.createojectif(objectif).pipe(
        tap(res => {
          console.log(res);
          this.dialog.getDialogById('ObjectifFormComponent')?.close(true)
          this.globalService.toastShow('objectif ajoutée avec succès !', "Ajout")
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe()
    }
  }

}
