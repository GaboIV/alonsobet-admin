import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountriesComponent } from './table/countries.component';
import { NewEditCountryModalComponent } from './components/new-edit-country-modal/new-edit-country-modal.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesPlatformComponent } from './countries-platform.component';

@NgModule({
  declarations: [
    CountriesComponent,
    CountriesPlatformComponent,
    // Modals
    NewEditCountryModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CountriesRoutingModule,
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
    NewEditCountryModalComponent
  ]
})
export class CountriesModule {}
