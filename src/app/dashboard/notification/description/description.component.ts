import { Component, Input } from '@angular/core';
import { notification } from 'src/app/models/notification.model';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
  @Input() notification!: notification
}
