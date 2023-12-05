import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../components/notification/notification.component';

export enum SuccessMessages {
  create = 'Task created successfully',
  delete = 'Task deleted successfully',
  update = 'Task updated successfully',
  updateStatus = 'Task status updated successfully'
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly errorNotificationDuration = 10;
  private readonly successNotificationDuration = 2;

  constructor(private _snackBar: MatSnackBar) {}

  showErrorNotification(error: string): void {
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: this.errorNotificationDuration * 1000,
      data: { message: error }
    });
  }

  showSuccessNotification(type: string): void {
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: this.successNotificationDuration * 1000,
      data: {
        message: SuccessMessages[type as keyof typeof SuccessMessages]
      }
    });
  }
}
