import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-parent',
  templateUrl: './alert-parent.component.html',
  styleUrls: ['./alert-parent.component.scss']
})
export class AlertParentComponent {

  @Input() title: string = "Alerte !"
  @Input() content!: string;
  type!: "danger" | "info" | "success";
  @Input() buttonOKName: string = "Oui";
  @Input() buttonCancelName: string = "Non";
  styleAlert!: Object;
  @Input() backgroundColor!: string
  @Input() textColor!: string

  ngOnInit(): void {
    if(!this.backgroundColor){
      this.styleAlert = {
        'Message--green': this.type == "success",
        'Message--red': this.type == "danger",
        'Message': this.type == "info",
        'Message--orange': !this.type,
      }
    }
  }
}
