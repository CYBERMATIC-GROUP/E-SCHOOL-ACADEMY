import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ImageCropComponent } from 'src/app/core/image-crop/image-crop.component';
import { PersonnalisationImageFond } from 'src/app/models/personnalisationimadefond.model';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { ColorpickerComponent } from './colorpicker/colorpicker.component';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.scss']
})

export class BulletinComponent {
  titre!: string;
  typeimageSelected!:number
  typeimage!: number;
  image: string = "assets/images/11.jpg";
  isloadinImageSelected!:boolean
  titrepardefaut: string = "Image par defaut";
  ColordefinitiveFondTitle!:string
  ColordefinitiveFondgroupMatiere!:string
  Colorresume!:string

  constructor(
    private router: Router, 
    private globalService: GlobalService,
    private dialog: MatDialog,
    private enseignantservice:EnseignantService
    ) {}

    ngOnInit(): void {
  
    }

    openColorPickerDialog(){
      const dialog = this.dialog.open(ColorpickerComponent)
      dialog.afterClosed().subscribe((result)=>{
        if(result){
          this.ColordefinitiveFondTitle = dialog.componentInstance.colorSelected
          console.log(this.ColordefinitiveFondTitle);
        }
      })
    }

    openColorPickerDialogGroupeMatiere(){
      const dialog = this.dialog.open(ColorpickerComponent)
       dialog.afterClosed().subscribe((result)=>{
        if(result){
          this.ColordefinitiveFondgroupMatiere = dialog.componentInstance.colorSelected        
        }
      })

    }

    openColorPickerDialogColorResumer(){
      const dialog = this.dialog.open(ColorpickerComponent)
      dialog.afterClosed().subscribe((result)=>{
        if(result){
          this.Colorresume = dialog.componentInstance.colorSelected        
        }
      })
    }

    reseveImage(){
      this.isloadinImageSelected = true
      console.log(this.typeimage);
      this.enseignantservice.geteImage(this.typeimage).subscribe((data)=>{
        console.log(data);
        this.titrepardefaut = "Image de fond Sélectionnée du model " + this.titre 
        this.isloadinImageSelected = false
        this.image = data.Photo
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
      // const object:PersonnalisationImageFond = {

      //   // NomBalise: 
      //   // Contenu:this.Image
      //   // Parametre: 
       
      // }
    }

}
