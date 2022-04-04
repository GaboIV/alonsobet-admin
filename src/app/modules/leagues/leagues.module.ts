import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaguesComponent } from './leagues/leagues.component';
import { LeaguePlatformComponent } from './leagues-platform.component';
import { LeaguesRoutingModule } from './leagues-routing.module';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddTipicoCodeModalComponent } from './leagues/components/add-tipico-code/add-tipico-code-modal.component';
import { DeleteTipicoCodeModalComponent } from './leagues/components/delete-tipico-code/delete-tipico-code-modal.component';
import { LeagueEditComponent } from './leagues/league-edit/league-edit.component';

@NgModule({
  declarations: [
    LeaguesComponent,
    LeaguePlatformComponent,
    // Modals
    AddTipicoCodeModalComponent,
    DeleteTipicoCodeModalComponent,
    LeagueEditComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    LeaguesRoutingModule,
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
    AddTipicoCodeModalComponent,
    DeleteTipicoCodeModalComponent,
    LeagueEditComponent
  ]
})
export class LeaguesModule {}
