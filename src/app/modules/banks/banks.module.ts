import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BanksRoutingModule } from './banks-routing.module';
import { BanksComponent } from './banks/banks.component';
import { BanksPlatformComponent } from './banks-platform.component';
import { NewEditBankModalComponent } from './components/new-edit-bank-modal/new-edit-bank-modal.component';
import { AccountsComponent } from './accounts/accounts.component';

@NgModule({
  declarations: [
    BanksPlatformComponent,
    BanksComponent,
    AccountsComponent,
    // Modals
    NewEditBankModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BanksRoutingModule,
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
    NewEditBankModalComponent
  ]
})
export class BanksModule {}
