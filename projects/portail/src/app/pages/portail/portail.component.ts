import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddLinkDialogComponent } from '../../components/add-link-dialog/add-link-dialog.component';
import { AuthService } from '@shared';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-portail',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './portail.component.html',
  styleUrl: './portail.component.scss'
})
export class PortailComponent {

  private router = inject(Router);
  private dialog = inject(MatDialog);
  authService = inject(AuthService);

  Apps: {
    name: string,
    icon: string,
    url: string
  }[] = this.authService.user()?.apps ?? [];

  logout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }

  addLink() {
    this.dialog.open(AddLinkDialogComponent);
  }
}
