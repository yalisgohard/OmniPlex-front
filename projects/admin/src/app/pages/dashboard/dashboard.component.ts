import { Component, inject } from '@angular/core';
import { AppsButtonComponent } from '@shared';
import { AuthServiceAdmin } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
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

  private authService = inject(AuthServiceAdmin);
  private router = inject(Router);
  
  logout() {
    this.authService.logout();
    window.location.href = 'http://localhost:4200/auth?redirect=' + window.location.href;
  }

}
