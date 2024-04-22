import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { Observable, finalize, tap } from 'rxjs';
import { DocumentPdfComponent } from 'src/app/core/document-pdf/document-pdf.component';
import { ImageCropComponent } from 'src/app/core/image-crop/image-crop.component';
import { Classe } from 'src/app/models/classe.model';
import { DevoirEnseignant } from 'src/app/models/devoirs.model';
import { Enseigant } from 'src/app/models/enseigant.model';
import { Matiere } from 'src/app/models/matiere.model';
import { ClasseService } from 'src/app/services/classe.service';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { GlobalService } from 'src/app/services/global.service';
import { MatiereService } from 'src/app/services/matiere.service';
import { actionOnForm, constantes } from 'src/environnements/constantes';

@Component({
  selector: 'app-cours-form',
  templateUrl: './cours-form.component.html',
  styleUrls: ['./cours-form.component.scss']
})
export class CoursFormComponent {
  content!:string
  IDDEVOIRS!: number
  Titre!: string
  Sujet!: string
  DateCorrection!: string
  Fichiers!: string
  IDCLASSE!: number
  IDMATIERE!: number
  IDENSEIGNANT!: number
  Consigne!: string
  CLASSE!: string
  MATIERE!: string
  ENSEIGNANT!: string
  Date!:string
  image!: string
  isLoading!:boolean
  isLoadingclasse!:boolean
  isloadingenseignat!:boolean
  enseignant!: Enseigant
  matierelist$!: Observable<Matiere[]>
  classelist$!: Observable<Classe[]>
  enseignantlist!:Enseigant[]

  pdfContent: string | ArrayBuffer | null = null;
  isSaving!: boolean;
  action!: actionOnForm
  actionOnForm = actionOnForm
  pdfBase64Data!: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private enseigantService: EnseignantService,
    private route: ActivatedRoute,
    private classeService: ClasseService,
    private globalService: GlobalService
  ) {}


  ngOnInit(): void {
    this.loadclasse()
    this.IDDEVOIRS = this.route.snapshot.params['id']
    this.action = this.route.snapshot.params['action']

    this.route.queryParams.subscribe(params => {
      if(params['IDMATIERE'] && params['IDCLASSE']){
        this.IDCLASSE = params['IDCLASSE']
        this.IDMATIERE = params['IDMATIERE']
      }
    })

    const enseignantObj = localStorage.getItem(constantes.auth.enseignant)
    if(enseignantObj)
      this.enseignant = JSON.parse(enseignantObj)

    if(this.IDDEVOIRS && this.IDDEVOIRS > 0){
      this.initForUpdate(this.IDDEVOIRS)
    }
  }

  @ViewChild('quillEditor') quillEditor?: QuillEditorComponent;
  initForUpdate(DEVOIRID:number) {
    this.isLoading = true
    this.enseigantService.getOneDevoirsEnseignants(DEVOIRID).subscribe((data) => {
      console.log(data);
      this.isLoading = false
      this.IDDEVOIRS = data.IDDEVOIRS
      this.Titre = data.Titre
      this.Sujet = data.Sujet
      this.DateCorrection = data.DateCorrection
      this.Fichiers = data.Fichiers
      this.image = data.Fichiers
      this.IDCLASSE = data.IDCLASSE
      this.IDMATIERE = data.IDMATIERE
      this.IDENSEIGNANT = data.IDENSEIGNANT
      this.Consigne = data.Consigne
      this.CLASSE = data.CLASSE
      this.MATIERE = data.Matiere
      this.ENSEIGNANT = data.ENSEIGNANT
    });
  }

  onContentChange(newContent: string) {
    this.content = newContent;
    this.Sujet = this.content
  }

  loadmatiere(idClasse: number){
    this.matierelist$ = this.enseigantService.getmatiereSelonnIDENSCLASSE(this.enseignant.IDENSEIGNANT, idClasse)
  }
  loadclasse(){
    this.classelist$ = this.classeService.get().pipe(
      tap(res => {
        this.loadmatiere(Number(res[0].IDCLASSES))
      })
    )
  }

selectedClasse(event:any){
  this.IDCLASSE = event.target.value
}

selectedmatiere(event:any){
  this.IDMATIERE = event.target.value
}

convertToValideDates(Date: string) {
  const year = Date.split('-')[0];
  const month = Date.split('-')[1];
  const day = Date.split('-')[2];
  const formattedDate = `${year}${month}${day}`;
  return formattedDate;
}

SelectDate(event:any){
  this.Date = this.convertToValideDates(event.target.value);
}

onFileSelected(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const pdf = reader.result as string;
    this.Fichiers = pdf;
  };
}



onSubmitForm(form: NgForm) {
  const devoir: DevoirEnseignant = form.value;
  devoir.IDDEVOIRS = this.IDDEVOIRS
  devoir.IDCLASSE = this.IDCLASSE
  devoir.IDENSEIGNANT = this.enseignant.IDENSEIGNANT
  devoir.IDMATIERE = this.IDMATIERE
  devoir.IDCLASSE = this.IDCLASSE
  devoir.Fichiers = this.image
  devoir.Sujet = this.Sujet
  devoir.DateCorrection = this.Date
  this.isSaving = true;

  if (this.action === actionOnForm.MODIFIER){
    this.enseigantService.updateDevoir(devoir).pipe(
      tap(res => {
        this.dialog.getDialogById('DevoirsFormComponent')?.close(true)
        this.globalService.toastShow('Devoir modifié avec succès !', "Modification")
        this.router.navigate(['/espace-enseignant/devoirs'])
      }),
      finalize(() => {
        this.isSaving = false;
      })
    ).subscribe()
  } else {
    this.enseigantService.createDevoir(devoir).pipe(
      tap(res => {
        this.dialog.getDialogById('DevoirsFormComponent')?.close(true)
        this.globalService.toastShow('Devoir ajouté avec succès !', "Ajout")
        this.router.navigate(['/espace-enseignant/devoirs'])
      }),
      finalize(() => {
        this.isSaving = false;
      })
    ).subscribe()
  }
}
}
