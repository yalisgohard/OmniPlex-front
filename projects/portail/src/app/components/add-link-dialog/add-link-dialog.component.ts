import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-add-link-dialog',
  imports: [
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose, 
    MatButtonModule, 
    MatProgressSpinnerModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './add-link-dialog.component.html',
  styleUrl: './add-link-dialog.component.scss'
})
export class AddLinkDialogComponent {

}
