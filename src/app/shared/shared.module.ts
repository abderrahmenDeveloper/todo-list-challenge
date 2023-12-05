import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '@app/shared/modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from '@app/shared/components/notification/notification.component';

@NgModule({
  declarations: [DialogComponent, NotificationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [MaterialModule, HttpClientModule, ReactiveFormsModule],
  providers: [DatePipe]
})
export class SharedModule {}
