import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppToastService } from 'src/app/services/app-toast-service';
import { Bank } from '../../_models/bank';
import { BankService } from '../../_services/bank.service';

@Component({
  selector: 'app-new-edit-bank-modal',
  templateUrl: './new-edit-bank-modal.component.html',
  styleUrls: ['./new-edit-bank-modal.component.scss']
})
export class NewEditBankModalComponent implements OnInit, OnDestroy {
  
  @Input() bank: Bank;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  
  isLoading = false;

  subscriptions: Subscription[] = [];

  formGroup: FormGroup;

  namePlural = "Bancos";
  nameSingular = "Banco";
  article = "el";

  constructor(
    private fb: FormBuilder,
    private _bankService: BankService,
    public toastService: AppToastService, 
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      id: [this.bank?.id],
      name: [this.bank.name, Validators.required],
      initial: [this.bank.initial]
    });
  }

  save() {
    this.isLoading = true;
    const toast = this.toastService.show('Enviando información al servidor:', 'loading');

    if (!this.bank.id) {
      console.log(this.formGroup.value);
      return this._bankService.save(this.formGroup.value)
        .subscribe(
          (resp: any) => {
          this.isLoading = false;
          this.toastService.remove(toast);
          this.toastService.show(this.nameSingular + ' creada correctamente', 'success');
          this.returnData(resp);
        },
        error => {
          this.toastService.remove(toast);
          const errorToast = this.toastService.show('Error creando ' + this.nameSingular.toLowerCase() + ': ' + error.error.message, 'bug');
        });
    } else {
      return this._bankService.update(this.formGroup.value)
        .subscribe(
          (resp: any) => {
          this.isLoading = false;
          this.toastService.remove(toast);
          this.toastService.show(this.nameSingular + ' actualizada correctamente', 'success');
          this.returnData(resp);
        },
        error => {
          this.toastService.remove(toast);
          const errorToast = this.toastService.show('Error actualizando ' + this.nameSingular.toLowerCase() + ': ' + error.error.message, 'bug');
        });
    }
  }

  returnData(bank: Bank) {
    this.passEntry.emit(bank);
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
