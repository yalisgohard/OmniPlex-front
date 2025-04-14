import { UsersService } from './../../services/users/users.service';
import { AuthService, NotificationsService, User } from '@shared';
import { Component, inject, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { EditAllowedAppsComponent } from '../edit-allowed-apps/edit-allowed-apps.component';


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

  authService = inject(AuthService);
  usersService = inject(UsersService);
  notif = inject(NotificationsService);
  dialog = inject(MatDialog);


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

  editAllowedApps(user: User) {
    const dialogRef = this.dialog.open(EditAllowedAppsComponent, {
      data: {
        user: user
      },
    });
    dialogRef.afterClosed().subscribe(apps => {
      if (apps) {
        user.allowed_apps = apps;
      }
    });
  }

  onSubmit() {
    alert('Submit');
  }
}
