import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BetTypesComponent } from './bet-types/bet-types.component';
import { CategoriesPlatformComponent } from './categories-platform.component';
import { MatchStructuresComponent } from './match-structures/match-structures.component';
import { CategoriesComponent } from './table/categories.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPlatformComponent,
    children: [
      {
        path: 'table',
        component: CategoriesComponent,
      },
      {
        path: 'bet-types',
        component: BetTypesComponent,
      },
      {
        path: 'match-structures',
        component: MatchStructuresComponent,
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
export class CategoriesRoutingModule {}
