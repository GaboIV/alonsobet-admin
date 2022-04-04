import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'banks',
        loadChildren: () =>
          import('../modules/banks/banks.module').then(
            (m) => m.BanksModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('../modules/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'countries',
        loadChildren: () =>
          import('../modules/countries/countries.module').then(
            (m) => m.CountriesModule
          ),
      },
      {
        path: 'leagues',
        loadChildren: () =>
          import('../modules/leagues/leagues.module').then(
            (m) => m.LeaguesModule
          ),
      },
      {
        path: 'players',
        loadChildren: () =>
          import('../modules/players/players.module').then(
            (m) => m.PlayersModule
          ),
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
