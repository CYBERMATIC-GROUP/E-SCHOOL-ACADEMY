import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-certificat',
  templateUrl: './certificat.component.html',
  styleUrls: ['./certificat.component.scss']
})
export class CertificatComponent {
  stringtype1: string = 'Certificat de Scolarité';
  stringtype2: string = 'Certificat de Fréquentation';
  stringtype3: string = 'Certificat d\'Inscription';
  type4:number = 0
  titre!: string;
  typeglobal!: number;
  stringtypeglobal!: string;
  typegarcons: number = 1;
  typefille: number = 2;




  constructor(private router: Router, private globalService: GlobalService) {}
  certificatSelected(event: any) {
    this.stringtypeglobal = event.option.value  
    if (this.stringtype1 == this.stringtypeglobal) {
      this.titre = 'Certificat de Scolarité';
      this.typeglobal = 1
    }if (this.stringtype2 == this.stringtypeglobal) {
      this.titre = 'Certificat de Fréquentation';
      this.typeglobal = 2
    } else if(this.stringtype3 == this.stringtypeglobal) {
      this.titre = "Certificat d'Inscription";
      this.typeglobal = 3
    }
  }
  selectedTypeCertificat() {
    this.globalService.alert(
      'Veuiller selectionner le modèle de certificat',
      'Information',
      'info',
      'OK',
      ''
    );
  }

  goTopersonalisationgarcons() {
    if (this.typeglobal) {
      this.router.navigateByUrl(
        'personalisation-certificat' +
          '/' +
          this.typeglobal +
          '/' +
          this.typegarcons
      );
    } else {
      this.selectedTypeCertificat();
    }
  }
  goTopersonalisationfille() {
    if (this.typeglobal) {
      this.router.navigateByUrl(
        'personalisation-certificat' +
          '/' +
          this.typeglobal +
          '/' +
          this.typefille
      );
    } else {
      this.selectedTypeCertificat();
    }
  }

  goTopersonalisationfilleGarcons() {
    if (this.typeglobal) {
      this.router.navigateByUrl(
        'personalisation-certificat' +
          '/' +
          this.typeglobal +
          '/' +
          0
      );
    } else {
      this.selectedTypeCertificat();
    }
  }

  clearBalise(){
    this.stringtype1 = '';
    this.stringtype2 = ''
    this.stringtype3 = ''
  }
}
