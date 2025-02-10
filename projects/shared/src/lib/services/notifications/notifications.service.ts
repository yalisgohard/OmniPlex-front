import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsComponent } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  snackBar = inject(MatSnackBar);

  constructor() { }


  callNotify(data: {
    icon: string;
    message: string;
  }) {
    this.snackBar.openFromComponent(NotificationsComponent, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: data
    });
  }
}
