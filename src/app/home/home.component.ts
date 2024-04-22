import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Agent } from '../models/agent.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ContactInfoComponent } from './contact-info/contact-info.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private globalService: GlobalService,
    private router: Router,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    const agentObj = localStorage.getItem('agent');
    if(agentObj){
      this.router.navigate(['/dashboard'])
    }
  }

  openContact(){
    this.dialog.open(ContactInfoComponent)
  }

}
