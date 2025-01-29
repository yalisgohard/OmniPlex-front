import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService, User } from '@shared';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddLinkDialogComponent } from '../../components/add-link-dialog/add-link-dialog.component';

@Component({
  selector: 'app-portail',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, CommonModule],
  templateUrl: './portail.component.html',
  styleUrl: './portail.component.scss'
})
export class PortailComponent {

  private router = inject(Router);
  private dialog = inject(MatDialog);
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }

  navigateTo(app: string) {
    let route: string = '';

    switch (app.toLowerCase()) {
      case 'admin':
        route = 'http://localhost:4201/auth';
        break;
      default:
        return;
    }

    window.location.href = route;
  }

  getIcon(app: string): string {
    switch (app.toLowerCase()) {
      case 'admin':
        return 'shield';
      case 'network':
        return 'webhook';
      case 'cloud':
        return 'cloud';
      case 'watch':
        return 'whatshot';
      case 'market':
        return 'wine_bar';
      default:
        return '';
    }
  }

  addLink() {
    this.dialog.open(AddLinkDialogComponent);
  }
}
