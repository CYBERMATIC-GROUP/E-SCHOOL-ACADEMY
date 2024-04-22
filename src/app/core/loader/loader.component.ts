import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() textLoad!: string;
  @Input() colorText = 'text-light'
  @Input() showText: boolean = false;
  ngOnInit(){
    //document.getElementsByTagName('body')[0].style.overflowY
  }

}
