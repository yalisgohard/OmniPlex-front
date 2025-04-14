import { Routes } from '@angular/router';
import { isLoggedInGuard } from '@shared';
import { TakeComponent } from './pages/take/take.component';

export const routes: Routes = [{
    path: '',
    redirectTo: 'take',
    pathMatch: 'full',
  }, {
    path: 'take',
    component: TakeComponent,
    canActivate: [isLoggedInGuard],
}];
