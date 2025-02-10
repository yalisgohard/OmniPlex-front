import { IApp } from './../../models/user.model';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { EApps, User } from '../../models/user.model';
import { applications } from '@shared';

export interface CredentialsSignin {
  email: string;
  password: string;
}

export interface CredentialsSignup {
  first_name: string;
  last_name: string;
  phone: string;
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

  readonly user = signal<User | undefined>(undefined);

  constructor() {
    effect(() => {
      console.log('user', this.user());
    });
  }

  setUser(dataUser: User | undefined): void {
    const user = Object.assign(new User(), dataUser);
    // quand on récupère les applications autorisées,
    // on les associe aux applications disponibles dans le fichier applications.ts
    user.apps = [...applications].filter(app => user.allowed_apps?.includes(app.name as EApps));
    const currentdomain = `http://${window.location.href.split('/')[2]}/`;
    user.apps = user.apps.filter(app => app.url !== currentdomain);
    this.user.set(user);
  }

  signin(credentials: CredentialsSignin): Observable<User | undefined> {
    return this.http.post<User>(this.BASE_URL + 'auth/signin/', credentials).pipe(
      tap((result: any) => {
        const token = result['token'];
        this.document.cookie = `token=${token}; path=/; domain=localhost; max-age=86400`;
        this.setUser(result['user']);
      }),
      map((result: any) => {
        return this.user();
      })
    )
  }

  signup(credentials: CredentialsSignup): Observable<User | undefined> {
    return this.http.post<User>(this.BASE_URL + 'auth/signup/', credentials).pipe(
      tap((result: any) => {
        const token = result['token'];
        this.document.cookie = `token=${token}; path=/; domain=localhost; max-age=86400`;
        this.setUser(result['user']);
      }),
      map((result: any) => {
        return this.user();
      })
    )
  }

  getUser(): Observable<User | undefined> {
    return this.http.get<User>(this.BASE_URL + 'user/').pipe(
      tap((result: any) => {
        const token = result['token'];
        this.document.cookie = `token=${token}; path=/; domain=localhost; max-age=86400`;
        this.setUser(result['user']);
      }),
      map((result: any) => {
        return this.user();
      })
    )
  }

  updateUser(user: User): Observable<User | undefined> {
    return this.http.put<User>(this.BASE_URL + 'user/', user).pipe(
      tap((result: any) => {
        const token = result['token'];
        this.document.cookie = `token=${token}; path=/; domain=localhost; max-age=86400`;
        this.setUser(result['user']);
      }),
      map((result: any) => {
        return this.user();
      })
    )
  }

  logout(): void {
    this.document.cookie = 'token=; path=/; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    this.user.set(undefined);
  }
}
