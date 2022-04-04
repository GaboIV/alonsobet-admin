import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesPlatformComponent } from './countries-platform.component';
import { CountriesComponent } from './table/countries.component';

const routes: Routes = [
  {
    path: '',
    component: CountriesPlatformComponent,
    children: [
      {
        path: 'table',
        component: CountriesComponent,
      },
      { path: '', redirectTo: 'table', pathMatch: 'full' },
      { path: '**', redirectTo: 'table', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
