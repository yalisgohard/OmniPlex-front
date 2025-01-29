import { Component, inject } from '@angular/core';
import { AuthService, AppsButtonComponent } from '@shared';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { TableauComponent } from "../../components/tableau/tableau.component";

@Component({
  selector: 'app-dashboard',
  imports: [AppsButtonComponent, MatGridListModule, MatCardModule, TableauComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private authService = inject(AuthService);
  
  logout() {
    this.authService.logout();
    window.location.href = 'http://localhost:4200/auth?redirect=' + window.location.href;
  }

}
