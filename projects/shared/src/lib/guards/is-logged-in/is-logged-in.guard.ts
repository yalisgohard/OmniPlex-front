import { CanActivateFn, GuardResult, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UnauthorizedComponent } from '../../components/unauthorized/unauthorized.component';
import { MatDialog } from '@angular/material/dialog';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const dialog = inject(MatDialog);

	if (authService.user() === undefined) {
    // TODO : Refactor this to use a call api for more security
		const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));

		if (token) {
			const payload = token.split('.')[1];
			const decodedPayload = atob(payload);
			const expiration = JSON.parse(decodedPayload).exp;

			if (expiration * 1000 < new Date().getTime()) {
				document.cookie = 'token=; path=/; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 GMT';
			} else {
				const user = Object.assign(new User(), JSON.parse(decodedPayload).user);
				authService.setUser(user);
			}
		}
	}

	if (!authService.user()) {
		window.location.href = 'http://localhost:4200/auth?redirect=' + window.location.href;
		return false;
	}

	const requiredRoles = route.data['requiredRoles'] as [string];
    const userRole = authService.user()?.role as string;

	if (requiredRoles && !requiredRoles.includes(userRole)) {
		dialog.open(UnauthorizedComponent, { disableClose: true });
		return false;
	}

	return true;

}
