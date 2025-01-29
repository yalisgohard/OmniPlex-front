import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:3300/api/';
  private document = inject(DOCUMENT);

  user = signal<User | undefined>(undefined);

  constructor() {
    effect(() => {
      console.log('User:', this.user());
    });
  }

  login(credentials: Credentials): Observable<User | undefined> {
    return this.http.post<User>(this.BASE_URL + 'auth/signin/', credentials).pipe(
      tap((result: any) => {
        const token = result['token'];
        this.document.cookie = `token=${token}; path=/; domain=localhost; max-age=86400`;

        const user = Object.assign(new User(), result['user']);
        this.user.set(user);
      }),
      map((result: any) => {
        return this.user();
      })
    )
  }

  getUser(): Observable<User | undefined> {
    return this.http.get<User>(this.BASE_URL + 'user/').pipe(
      tap((result: any) => {
        const user = Object.assign(new User(), result);
        this.user.set(user);
      }),
      map((result: any) => {
        return this.user();
      })
    )
  }

  logout(): void {
    // Remove token from cookies
    this.document.cookie = 'token=; path=/; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    this.user.set(undefined);
  }
}
