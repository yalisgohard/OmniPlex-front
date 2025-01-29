import { Routes } from '@angular/router';
import { PortailComponent } from './pages/portail/portail.component';
import { AuthComponent } from './pages/auth/auth.component';
import { isLoggedInGuard } from '@shared';

export const routes: Routes = [{
        path: '',
        redirectTo: 'portail',
        pathMatch: 'full',
    }, {
        path: 'portail',
        title: `OmniPlex - Portail`,
        component: PortailComponent,
        canActivate: [isLoggedInGuard],
    }, {
        path: 'auth',
        component: AuthComponent,
}];
