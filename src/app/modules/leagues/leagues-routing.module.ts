import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaguePlatformComponent } from './leagues-platform.component';
import { LeagueEditComponent } from './leagues/league-edit/league-edit.component';
import { LeaguesComponent } from './leagues/leagues.component';

const routes: Routes = [
  {
    path: '',
    component: LeaguePlatformComponent,
    children: [
      {
        path: 'table',
        component: LeaguesComponent,
      },
      {
        path: 'league/add',
        component: LeagueEditComponent
      },
      {
        path: 'league/edit',
        component: LeagueEditComponent
      },
      {
        path: 'league/edit/:id',
        component: LeagueEditComponent
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
export class LeaguesRoutingModule {}
