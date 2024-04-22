import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { constantes } from 'src/environnements/constantes';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'school-new';

  constructor(
    private router: Router,
    private globalService: GlobalService
  ){}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Changement de route détecté :', event.url);
        this.handleRouteChange();
      }
    });
  }

  private handleRouteChange(){
    let lastChange: number = Number(localStorage.getItem(constantes.auth.lastAction)) ?? 0;

    const currentTimestamp = new Date().getTime();

    const timeDifferenceMinutes = (currentTimestamp - lastChange) / (1000 * 60);
    console.log(timeDifferenceMinutes > 5);
    
    if (timeDifferenceMinutes >= 5) {
      //execute if 5 min without change route 
      //localStorage.removeItem(constantes.auth.agent);
      //this.router.navigate(['/connexion'])
      console.log('5min');
      
    }

    localStorage.setItem(constantes.auth.lastAction, currentTimestamp.toString()) 
  }
}
