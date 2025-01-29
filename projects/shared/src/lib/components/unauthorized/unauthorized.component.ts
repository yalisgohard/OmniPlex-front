import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'lib-unauthorized',
  imports: [
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose, 
    MatButtonModule, 
    MatProgressSpinnerModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {

  value: number = 0;
  countdown: number = 5;
  step: number = 10 / this.countdown;

  ngOnInit() {
    setInterval(() => {
      this.value = this.value + this.step;
    }, 100);

    setTimeout(() => {
      this.redirect();
    }, this.countdown * 1000);
  }

  redirect() {
    window.location.href = 'http://localhost:4200/';
  }

  getCountdown() {
    return this.countdown - Math.floor(this.countdown * this.value / 100);
  }
}
