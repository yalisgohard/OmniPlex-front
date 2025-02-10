import { Component } from '@angular/core';
import { AppsButtonComponent } from '@shared';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { TableauComponent } from "../../components/tableau/tableau.component";
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { WhitelistComponent } from "../../components/whitelist/whitelist.component";


@Component({
  selector: 'app-dashboard',
  imports: [
    AppsButtonComponent,
    MatGridListModule,
    MatCardModule,
    TableauComponent,
    MatTabsModule,
    MatIconModule,
    WhitelistComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
