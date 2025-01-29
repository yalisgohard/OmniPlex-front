import { Component, inject } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [MatProgressBarModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  private router = inject(Router);

  constructor() {
    this.login()
  }

  login() {
    const token = document.cookie.split(';').find((cookie) => cookie.includes('token'));
    if (token) {
      this.router.navigate(['dashboard']);
    }else {
      window.location.href = 'http://localhost:4200/auth';
    }
  }
}
