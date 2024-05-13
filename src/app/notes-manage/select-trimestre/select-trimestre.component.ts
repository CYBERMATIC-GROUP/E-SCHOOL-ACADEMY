import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-select-trimestre',
  templateUrl: './select-trimestre.component.html',
  styleUrls: ['./select-trimestre.component.scss']
})
export class SelectTrimestreComponent {

  Trimestre!: number 


  constructor(private dialog : MatDialog){}

  isFormValid(): any {
    return this.Trimestre;
  }

  ngOnInit(): void {

  }

  selectTrimestre(event : any){
    this.Trimestre  = Number(event.target.value)
    console.log(this.Trimestre);
  }

  Valider(){
    this.dialog.getDialogById('SelectTrimestreComponent')?.close(true)
  }

}
