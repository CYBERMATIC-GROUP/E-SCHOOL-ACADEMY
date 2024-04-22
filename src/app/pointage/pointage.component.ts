import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { FormGroup } from '@angular/forms';
import { PointageService } from './pointage.service';
import { Pointage, Presence } from './pointage.model';
import { DatePipe } from '@angular/common';
import { Observable, finalize, tap } from 'rxjs';
import { constantes } from 'src/environnements/constantes';
import { schoolLogin } from '../models/ecole.model';
import { Ecoleervice } from '../services/ecole.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../core/alert/alert.component';

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.scss']
})
export class PointageComponent implements AfterViewInit, OnInit {
  @ViewChild('inputElt') inputElt!: HTMLInputElement;
  currentHour!: Date
  currentDate!: Date
  form!: FormGroup
  code!: string;
  isLoading!: boolean;
  logoEcole!: string | null;
  school!: schoolLogin;
  msgAlert!: string;
  backgroundColor!: string;
  textColor!: string;
  presences$!: Observable<Presence[]>

  constructor(
    private globalService: GlobalService,
    private pointageService: PointageService,
    private datePipe: DatePipe,
    private schoolService: Ecoleervice,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.presences$ = this.pointageService.getLastPointage().pipe(
      tap(res => {
        console.log(res);

      })
    )
    const school = localStorage.getItem(constantes.auth.school);
    setInterval(() => {
      this.currentHour = new Date();
      this.currentDate = new Date();
    }, 1000);

    if(school){
      this.logoEcole = localStorage.getItem('logostore')
      this.school = JSON.parse(school);

      if (!this.logoEcole){
        this.schoolService.getLogo().pipe(
          tap(res => {
            this.logoEcole = res.Photo
            localStorage.setItem('logostore', res.Photo)
          })
        ).subscribe()
      }
    }
  }

  ngAfterViewInit(): void {
    this.setFocus()
  }

  setFocus(){
    let dom = document.getElementById('exampleInputEmail1')
    dom = dom as HTMLInputElement
    console.log(dom);
    dom.focus()
  }

  onInput(event: any){
    console.log(event);

    event.preventDefault();
    /*const input = this.el.nativeElement as HTMLInputElement;
    input.value += event.key.toUpperCase();
    console.log(input.value);*/
    console.log(event.target.value.toUpperCase())
  }

  onSubmit(){
    const currentDate = new Date();
    const formattedDateTime = this.datePipe.transform(currentDate, 'yyyyMMddHHmm')?.toString();
    if (formattedDateTime){
      let pointage: Pointage = {
        IDUtilisateur: this.code,
        DateHeure: formattedDateTime,
        Reponse: '',
        Couleur: ''
      }
      this.isLoading = true;
      this.pointageService.savePointage(pointage).pipe(
        tap(res => {
          this.backgroundColor = res.Couleur
          this.textColor = 'black'
          this.msgAlert = `<h3>${res.Reponse}</h3>`
          this.presences$ = this.pointageService.getLastPointage()
          setTimeout(() => {
            this.msgAlert = ''
          }, 13000)
          this.code = ''
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
    else{
      this.globalService.toastShow("Aucune donnée en date et heure trouvée", "Erreur", "error")
    }

  }

}
