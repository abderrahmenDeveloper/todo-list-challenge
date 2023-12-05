import { Component, Inject, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  snackBarRef = inject(MatSnackBarRef);
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
