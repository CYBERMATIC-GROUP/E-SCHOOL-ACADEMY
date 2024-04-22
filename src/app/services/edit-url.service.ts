import { Injectable } from '@angular/core';
import { environment } from 'src/environnements/environnement.prod';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EditUrlService {
  private apiUrlSubject = new BehaviorSubject<string>(environment.apiUrl);

  apiUrl$ = this.apiUrlSubject.asObservable();

  updateApiUrl(newUrl: string): void {
    environment.apiUrl = newUrl;
    this.apiUrlSubject.next(newUrl);
  }

  getApiUrl(): string {
    return environment.apiUrl;
  }
}
