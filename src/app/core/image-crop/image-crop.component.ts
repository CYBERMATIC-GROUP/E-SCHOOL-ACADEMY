import { Component, Input } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss']
})
export class ImageCropComponent {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  dataLoad: boolean = true
  finalImage!: string;
  @Input() maintainAspetRation: boolean = true
  momentImage!: string

  constructor(
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl ?? '');
    console.log(event);
    const reader = new FileReader();



    // Démarrez la lecture du Blob en tant que base64.
    const blob = event.blob
    if(blob){
      this.dataLoad = true
      reader.readAsDataURL(blob)
      reader.onload = () => {
        this.momentImage = reader.result as string;
        this.dataLoad = false;
      };
    }
  }
  imageLoaded(image: LoadedImage) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  onValid(){
    this.finalImage = this.momentImage
    this.dialog.closeAll()
  }
}
