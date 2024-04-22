import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, interval, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalService } from '../services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private globalService: GlobalService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        if (error instanceof HttpErrorResponse && error.status === 0){
          setTimeout(() => {//waiting before to show to avoid bug for reload page
            this.dialog.closeAll()
            const ref = this.globalService.alert("<h2>Erreur de réseau ou de connexion internet ! </br></h2> <h1>⛔</h1>", "", "danger", "", "Réessayez", true)
            ref.afterClosed().subscribe(res => {
              if(res){
                this.dialog.closeAll();
                location.reload();
              }
                
            })
          }, 2000)
        }

        return throwError(error)
      })
    )
  }
}
