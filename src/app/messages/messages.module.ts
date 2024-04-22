import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageRoutingModule } from './message-routing.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsFormComponent } from './notifications/notifications-form/notifications-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CoreModule } from "../core/core.module";
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        NotificationsComponent,
        NotificationsFormComponent
    ],
    imports: [
        CommonModule,
        MessageRoutingModule,
        MatPaginatorModule,
        MatTableModule,
        CoreModule,
        FormsModule
    ]
})
export class MessagesModule { }
