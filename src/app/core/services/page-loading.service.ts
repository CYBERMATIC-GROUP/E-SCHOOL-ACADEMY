import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageLoadingService {
  private pageLoaded = new Subject<void>();

  pageLoaded$ = this.pageLoaded.asObservable();

  setPageLoaded() {
    this.pageLoaded.next();
  }
}
