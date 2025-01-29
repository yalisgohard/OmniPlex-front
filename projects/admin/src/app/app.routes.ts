import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { isLoggedInGuard } from '@shared';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [{
        path: 'auth',
        component: AuthComponent
    }, {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }, {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [isLoggedInGuard],
        data: { requiredRoles: ["ADMIN"] }
}];
