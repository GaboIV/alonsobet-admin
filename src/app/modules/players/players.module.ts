import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewEditPlayerModalComponent } from './components/new-edit-player-modal/new-edit-player-modal.component';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players/players.component';
import { PlayersPlatformComponent } from './players-platform.component';

@NgModule({
  declarations: [
    PlayersPlatformComponent,
    PlayersComponent,
    // Modals
    NewEditPlayerModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PlayersRoutingModule,
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
    NewEditPlayerModalComponent
  ]
})
export class PlayersModule {}
