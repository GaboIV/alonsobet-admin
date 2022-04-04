import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { BanksPlatformComponent } from './banks-platform.component';
import { BanksComponent } from './banks/banks.component';

const routes: Routes = [
  {
    path: '',
    component: BanksPlatformComponent,
    children: [
      {
        path: 'table',
        component: BanksComponent,
      },
      {
        path: 'accounts',
        component: AccountsComponent,
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
export class BanksRoutingModule {}
