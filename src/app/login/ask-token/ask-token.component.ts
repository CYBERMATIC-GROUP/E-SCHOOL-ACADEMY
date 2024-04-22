import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ask-token',
  templateUrl: './ask-token.component.html',
  styleUrls: ['./ask-token.component.scss']
})
export class AskTokenComponent implements OnInit {
  token!: string;
  errorMsg!: string;

  constructor(
    public dialog: MatDialog,
    private elementRef: ElementRef
  ){}

  ngOnInit(): void {
    setTimeout(() => {
      this.elementRef.nativeElement.querySelector('#askToken').focus();
    }, 500)
  }

  onSubmit(token: any){
    this.token = token.value;
  }

}
