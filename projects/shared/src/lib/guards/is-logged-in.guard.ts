import { CanActivateFn, GuardResult } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { User } from '../models/user.model';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);

	if (authService.user() === undefined) {
		const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token=')); 

		if (token) {
			const payload = token.split('.')[1];
			const decodedPayload = atob(payload);
			const expiration = JSON.parse(decodedPayload).exp;

			if (expiration * 1000 < new Date().getTime()) {
				document.cookie = 'token=; path=/; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 GMT';
			} else {
				const user = Object.assign(new User(), JSON.parse(decodedPayload));
				authService.user.set(user);
			}
		}
	}

	if (!authService.user()) {
		window.location.href = 'http://localhost:4200/auth?redirect=' + window.location.href; 
		return false;
	}

	return true;
	
}
