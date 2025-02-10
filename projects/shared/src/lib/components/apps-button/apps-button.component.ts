import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService, applications } from '@shared';

@Component({
  selector: 'lib-apps-button',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule],
  templateUrl: './apps-button.component.html',
  styleUrl: './apps-button.component.scss'
})
export class AppsButtonComponent {
  @Output() onLogout: EventEmitter<void> = new EventEmitter<void>();
  private authService = inject(AuthService);
  activApp = input<string | null>();

  urlParams:string = 'http://localhost:4200/params' + '?redirect=' + window.location.href;

  Apps: {
    name: string,
    icon: string,
    url: string
  }[] = this.authService.user()?.apps ?? [];

  onLogoutClick() {
    this.onLogout.emit();
    this.authService.logout();
    window.location.href = 'http://localhost:4200/auth?redirect=' + window.location.href;
  }
}
