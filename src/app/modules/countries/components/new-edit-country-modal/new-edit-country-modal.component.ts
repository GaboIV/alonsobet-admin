import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppToastService } from 'src/app/services/app-toast-service';
import { Country } from '../../_models/country';
import { CountryService } from '../../_services/country.service';

@Component({
  selector: 'app-new-edit-country-modal',
  templateUrl: './new-edit-country-modal.component.html',
  styleUrls: ['./new-edit-country-modal.component.scss']
})
export class NewEditCountryModalComponent implements OnInit, OnDestroy {
  
  @Input() country: Country;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  
  isLoading = false;

  subscriptions: Subscription[] = [];

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _countryService: CountryService,
    public toastService: AppToastService, 
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      id: [this.country?.id],
      name: [this.country.name, Validators.required],
      name_id: [this.country.name_id],
      acro_3: [this.country.acro_3, Validators.required],
      importance: [this.country.importance]
    });
  }

  save() {
    this.isLoading = true;
    const toast = this.toastService.show('Enviando información al servidor:', 'loading');

    if (!this.country.id) {
      console.log(this.formGroup.value);
      return this._countryService.save(this.formGroup.value)
        .subscribe(
          (resp: any) => {
          this.isLoading = false;
          this.toastService.remove(toast);
          this.toastService.show('Categoría creada correctamente', 'success');
          this.returnData(resp);
        },
        error => {
          this.toastService.remove(toast);
          const errorToast = this.toastService.show('Error creando liga: ' + error.error.message, 'bug');
        });
    } else {
      return this._countryService.update(this.formGroup.value)
        .subscribe(
          (resp: any) => {
          this.isLoading = false;
          this.toastService.remove(toast);
          this.toastService.show('Categoría actualizada correctamente', 'success');
          this.returnData(resp);
        },
        error => {
          this.toastService.remove(toast);
          const errorToast = this.toastService.show('Error actualizando liga: ' + error.error.message, 'bug');
        });
    }
  }

  returnData(country: Country) {
    this.passEntry.emit(country);
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
