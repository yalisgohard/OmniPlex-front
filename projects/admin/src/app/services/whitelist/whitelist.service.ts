import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

export interface IWhitelist {
  id: number;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class WhitelistService {

  http = inject(HttpClient);
  BASE_URL = 'http://localhost:3300/api/';

  readonly whitelist: BehaviorSubject<IWhitelist[] | undefined>
    = new BehaviorSubject<IWhitelist[] | undefined>(undefined);

  getWhitelist(): Observable<IWhitelist[]> {
    return this.http.get<IWhitelist[]>(this.BASE_URL + 'whitelist/').pipe(
      tap(whitelist => this.whitelist.next(whitelist)),
      map(whitelist => whitelist)
    );
  }

  addEmail(email: string): Observable<IWhitelist[]> {
    return this.http.post<IWhitelist>(this.BASE_URL + 'whitelist/', { email }).pipe(
      tap(email => {
        const newWhitelist = this.whitelist.value ? [...this.whitelist.value, email] : [email];
        this.whitelist.next(newWhitelist);
      }),
      map(email => this.whitelist.value || [])
    );
  }

  removeEmail(id: number): Observable<IWhitelist[]> {
    return this.http.delete(this.BASE_URL + 'whitelist/' + id).pipe(
      tap(() => {
        const newWhitelist = this.whitelist.value?.filter(email => email.id !== id);
        this.whitelist.next(newWhitelist);
      }),
      map(() => this.whitelist.value || [])
    );
  }
}
