import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agent } from 'src/app/models/agent.model';
import { constantes } from 'src/environnements/constantes';
import { environment } from 'src/environnements/environnement.prod';


@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.scss']
})
export class ParametreComponent implements OnInit {
  routes = environment.routes
  agent!: Agent

  constructor(
    private router: Router
  ){}

  ngOnInit(){
    let obj = localStorage.getItem(constantes.auth.agent)
    if(obj){
      this.agent = JSON.parse(obj);
    }else{
      this.router.navigate(['/']);
    }
  }
}
