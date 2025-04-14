import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@shared';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);

  users: User[] = [];

  constructor() { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3300/api/admin/getAllUsers').pipe(
      tap(users => {
        this.users = users;
      }),
      map(users => {
        return users;
      })
    );
  }

  updateUser(user: User): Observable<User> {
    if (!user.id) throw new Error('User id is required');
    const userToUpdate = Object.assign({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      role: user.role,
      allowed_apps: user.allowed_apps,
      profile_picture: user.profile_picture,
    }, user);
    return this.http.put<User>(`http://localhost:3300/api/admin/user/${user.id}`, userToUpdate).pipe(
      map(() => user)
    );
  }
}
