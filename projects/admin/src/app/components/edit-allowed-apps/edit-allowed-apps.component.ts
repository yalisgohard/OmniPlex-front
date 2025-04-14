import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-allowed-apps',
  imports: [
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      MatButtonModule,
      MatProgressSpinnerModule,
      CommonModule,
      MatIconModule,
      MatFormFieldModule,
      MatChipsModule,
      MatAutocompleteModule,
      FormsModule,
],
  templateUrl: './edit-allowed-apps.component.html',
  styleUrl: './edit-allowed-apps.component.scss'
})
export class EditAllowedAppsComponent {

  DIALOG_DATA = inject(MAT_DIALOG_DATA);

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentApp = model('');
  readonly apps = signal([] as string[]);
  readonly allApps: string[] = ['Portail', 'Admin', 'Market', 'Take', 'Network', 'Cloud', 'Watch'];
  readonly filteredApps = computed(() => {
    const currentApp = this.currentApp().toLowerCase();
    return currentApp
    ? this.allApps.filter(fruit => fruit.toLowerCase().includes(currentApp))
    : this.allApps.slice();
  });

  constructor() {
    this.apps.set(this.DIALOG_DATA.user.allowed_apps);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.apps.update(apps => [...apps, value]);
    }
    this.currentApp.set('');
  }

  remove(fruit: string): void {
    this.apps.update(apps => {
      const index = apps.indexOf(fruit);
      if (index < 0) {
        return apps;
      }

      apps.splice(index, 1);
      return [...apps];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.apps.update(apps => [...apps, event.option.viewValue]);
    this.currentApp.set('');
    event.option.deselect();
  }
}
