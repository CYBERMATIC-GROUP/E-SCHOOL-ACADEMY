import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ImageCropComponent } from 'src/app/core/image-crop/image-crop.component';
import { PersonnalisationImageFond } from 'src/app/models/personnalisationimadefond.model';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { EleveService } from 'src/app/services/eleve.service';
import { BalisesCarte } from 'src/app/models/baliseCartes.model';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-image-de-fond',
  templateUrl: './image-de-fond.component.html',
  styleUrls: ['./image-de-fond.component.scss'],
})
export class ImageDeFondComponent {
  titre!: string;
  typeimageSelected!:number
  ParametrePassed!: number;
  image!: string;
  isloadinImageSelected!:boolean
  titrepardefaut: string = "Image par defaut";
  tableauBalises:BalisesCarte[] = []
  isloadingbalises!:boolean
  nombalise!:string
  numparametre!:number
  selectedLabelText!:string
  isloadingupdatebadge!:boolean

  constructor(
    private router: Router, 
    private dialog: MatDialog,
    private enseignantservice:EnseignantService,
    private globalService:GlobalService,
    private elveservice:EleveService
    ) {}

    ngOnInit(): void {
      this.loadBalises()
    }

    loadBalises(){
      this.isloadingbalises = true
      this.elveservice.getCarteDocumentBalisePersonnalisation().subscribe((data)=>{
        console.log(data);
        this.ParametrePassed = data["0"].Parametre
        console.log(this.ParametrePassed);
        this.isloadingbalises = false
        this.tableauBalises = data
        this.reseveImage()
      })
    }

    certificatSelected(event: any) {
      this.ParametrePassed = event.target.value;
      console.log(this.ParametrePassed);
      const selectedOption = event.target.options[event.target.selectedIndex];
      const selectedLabel = selectedOption.text;
      this.selectedLabelText = selectedLabel
      this.reseveImage();
    }
    
    reseveImage(){
      this.isloadinImageSelected = true
      console.log(this.ParametrePassed);
      this.enseignantservice.geteImage(this.ParametrePassed).subscribe((data)=>{
        console.log(data);
        console.log(data.Contenu);
        this.image = data.Contenu
        this.numparametre = data.Parametre
        this.titrepardefaut = "Image de fond Sélectionnée du model bulletin " 
        this.isloadinImageSelected = false
      })
      
    }
    openCropImage() {
      const ref = this.dialog.open(ImageCropComponent, {
        maxWidth: '650px',
      });
      ref.componentInstance.maintainAspetRation = false
      ref.afterClosed().subscribe((result) => {
        if (ref.componentInstance.finalImage) {
          this.image = ref.componentInstance.finalImage;
          console.log(this.image);
          this.titrepardefaut = "Image Sélectionnée"
        }
      });
    }

     valider(){
      this.isloadingupdatebadge = true
       const object:PersonnalisationImageFond = {
         NomBalise: this.selectedLabelText,
         Contenu: this.image,
         Parametre:this.numparametre
       }
       this.enseignantservice.updateImageCarteBadge(object).pipe(
        tap(data => {
          console.log(data);
        this.isloadingupdatebadge = false
        this.globalService.toastShow("Modification effectuée avec succès","Modification")
        }),
        finalize(() => {
          this.isloadingupdatebadge = false
        })
      ).subscribe()
     }
}
