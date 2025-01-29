import { AuthService, User } from '@shared';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-tableau',
  imports: [CommonModule],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.scss'
})
export class TableauComponent {

  authService = inject(AuthService);

  columns: [] = [];

  constructor() {
    Object.keys(this.authService.user() ?? {}).forEach(key => {
      this.columns.push(key as never);
    });
  }
}
