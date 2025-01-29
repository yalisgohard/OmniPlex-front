import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'lib-apps-button',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, MatMenuModule],
  templateUrl: './apps-button.component.html',
  styleUrl: './apps-button.component.scss'
})
export class AppsButtonComponent {
  @Output() onLogout: EventEmitter<void> = new EventEmitter<void>();

  onLogoutClick() {
    this.onLogout.emit();
  }
}
