import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersPlatformComponent } from './players-platform.component';
import { PlayersComponent } from './players/players.component';

const routes: Routes = [
  {
    path: '',
    component: PlayersPlatformComponent,
    children: [
      {
        path: 'table',
        component: PlayersComponent,
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
export class PlayersRoutingModule {}
