import { UsersService } from './../../services/users/users.service';
import { AuthService, NotificationsService, User } from '@shared';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, model, signal, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';


@Component({
  selector: 'app-tableau',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSortModule,
    MatAutocompleteModule,
    MatChipsModule,
  ],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.scss'
})
export class TableauComponent {


  /** */

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentFruit = model('');
  readonly fruits = signal(['Portail']);
  readonly allFruits: string[] = ['Portail', 'Admin', 'Market'];
  readonly filteredFruits = computed(() => {
    const currentFruit = this.currentFruit().toLowerCase();
    return currentFruit
      ? this.allFruits.filter(fruit => fruit.toLowerCase().includes(currentFruit))
      : this.allFruits.slice();
  });
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.update(fruits => [...fruits, value]);
    }

    // Clear the input value
    this.currentFruit.set('');
  }
  remove(fruit: string): void {
    this.fruits.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index < 0) {
        return fruits;
      }

      fruits.splice(index, 1);
      return [...fruits];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.update(fruits => [...fruits, event.option.viewValue]);
    this.currentFruit.set('');
    event.option.deselect();
  }
  /** */

  authService = inject(AuthService);
  usersService = inject(UsersService);
  fb = inject(FormBuilder);
  notif = inject(NotificationsService);

  displayedColumns: string[] = [
    'id',
    'email',
    'first_name',
    'last_name',
    'phone',
    'role',
    'applications',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>([]);

  search = '';

  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor() {
    this.usersService.getUsers().subscribe(users => {
      this.dataSource.data = users.sort((a, b) => a.id - b.id);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isSameUser(email: string): boolean {
    return this.authService.user()?.email === email
  }

  saveUser(user: User) {
    const newUser = Object.assign(new User, user);
    this.usersService.updateUser(newUser).subscribe({
      next: user => {
          const newData = this.dataSource.data.map(u => u.id === user.id ? user : u);
          this.dataSource.data = newData;
          this.notif.callNotify({
            icon: 'check_circle',
            message: 'User updated',
          });
      },
      error: (err) => {
        this.notif.callNotify({
          icon: 'error',
          message: err.error ?? 'Erreur lors de l\'ajout de l\'email',
        });
      }
    })
  }

  deleteUser(id: number) {
    alert('Delete user');
  }

  onSubmit() {
    alert('Submit');
  }
}
