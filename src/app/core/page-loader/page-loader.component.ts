import { Component } from '@angular/core';
import { PageLoadingService } from '../services/page-loading.service';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss']
})
export class PageLoaderComponent {
  loading = false;

  constructor(
    private pageLoadingService: PageLoadingService
  ) {}

  ngOnInit() {
    this.pageLoadingService.pageLoaded$.subscribe(() => {
      this.loading = false; // Page est prête, donc arrêtez le chargement
    });
  }
}
