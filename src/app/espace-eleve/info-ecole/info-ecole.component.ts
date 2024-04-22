import { Component, OnInit } from '@angular/core';
import { Ecole } from 'src/app/models/ecole.model';


@Component({
  selector: 'app-info-ecole',
  templateUrl: './info-ecole.component.html',
  styleUrls: ['./info-ecole.component.scss']
})
export class InfoEcoleComponent implements OnInit {

  ecoleInfo!:Ecole

  ngOnInit(): void {
    const HeaderEcole = localStorage.getItem('header');
    if(HeaderEcole){
      this.ecoleInfo = JSON.parse(HeaderEcole); 
      console.log(this.ecoleInfo)
    }
  }

}
