import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthServicePortail } from './../../services/auth/auth.service';

@Component({
  selector: 'app-portail',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './portail.component.html',
  styleUrl: './portail.component.scss'
})
export class PortailComponent {

  private router = inject(Router);
  authService = inject(AuthServicePortail);

  logout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }

  navigateTo(app: string) {
    let route: string = '';

    switch (app) {
      case 'admin':
        route = 'http://localhost:4201/auth';
        break;
      default:
        return;
    }

    window.location.href = route;
  }
}
