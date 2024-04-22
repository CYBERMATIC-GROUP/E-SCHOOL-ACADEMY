import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../core/alert/alert.component';
import { EditUrlService } from '../services/edit-url.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit-url',
  templateUrl: './edit-url.component.html',
  styleUrls: ['./edit-url.component.scss']
})
export class EditUrlComponent {
  newUrl: string = '';
  url: string = 'script/updateUrl.php'
  constructor(private http: HttpClient) {}

  UpdateUrl(): void {
    if (this.newUrl.trim() !== '') {
      console.log(this.newUrl);
      // Utilisez une requête HTTP pour appeler le script PHP
      this.http.post(this.url, { newUrl: this.newUrl }).subscribe(() => {
        console.log('URL mise à jour avec succès.');
      });
    }
  }
}
