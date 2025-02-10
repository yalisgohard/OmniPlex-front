import { Routes } from '@angular/router';
import { isLoggedInGuard } from '@shared';
import { MarketComponent } from './pages/market/market.component';

export const routes: Routes = [{
    path: '',
    redirectTo: 'market',
    pathMatch: 'full',
  }, {
    path: 'market',
    component: MarketComponent,
    canActivate: [isLoggedInGuard],
}];
