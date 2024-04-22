import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionComponent } from './description/description.component';
import { notification } from 'src/app/models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() notification!: notification

  constructor(
    private dialog: MatDialog
  ){}

  onDescription(){
    const ref = this.dialog.open(DescriptionComponent, {
      maxWidth: '650px'
    });
    ref.componentInstance.notification = this.notification
    console.log('click');
  }
}
