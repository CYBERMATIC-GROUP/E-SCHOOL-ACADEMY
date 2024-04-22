import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Agent } from 'src/app/models/agent.model';
import { AgentService } from 'src/app/services/agent.service';
import { constantes } from 'src/environnements/constantes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private agentService: AgentService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const token  = localStorage.getItem('agent');
    if (token){
      return true;
    }else{
      localStorage.removeItem(constantes.auth.eleve)
      this.router.navigate(['/connexion']);
      return false;
    }
  }
}
