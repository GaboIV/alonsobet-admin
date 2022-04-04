import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesPlatformComponent } from './categories-platform.component';
import { CategoriesComponent } from './table/categories.component';
import { NewEditCategoryModalComponent } from './components/new-edit-category-modal/new-edit-category-modal.component';
import { BetTypesComponent } from './bet-types/bet-types.component';
import { MatchStructuresComponent } from './match-structures/match-structures.component';
import { DeleteMainBetTypeModalComponent } from './match-structures/components/delete-main-bet-type/delete-main-bet-type-modal.component';
import { AddMainBetTypeModalComponent } from './match-structures/components/add-main-bet-type/add-main-bet-type-modal.component';
import { NewEditMatchStructureModalComponent } from './match-structures/new-edit-match-structure-modal/new-edit-match-structure-modal.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    BetTypesComponent,
    CategoriesPlatformComponent,
    MatchStructuresComponent,
    // Modals
    NewEditCategoryModalComponent,
    DeleteMainBetTypeModalComponent,
    AddMainBetTypeModalComponent,
    NewEditMatchStructureModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgbModule
  ],
  entryComponents: [
    // Modals
    NewEditCategoryModalComponent,
    DeleteMainBetTypeModalComponent,
    AddMainBetTypeModalComponent,
    NewEditMatchStructureModalComponent
  ]
})
export class CategoriesModule {}
