import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable, tap } from 'rxjs';
import { notification } from '../models/notification.model';
import { storeData } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class NotifiactionService {

  constructor(
    private globalService: GlobalService
  ) { }

  getNotifs(): Observable<notification[]>{
    const uri = "MESSAGE_Get_Notification/0/0/";
    return this.globalService.setHttpRequest(uri, "GET").pipe(
      tap(res => {
         localStorage.setItem(storeData.notifications, JSON.stringify(res))
      })
    )
  }
}
