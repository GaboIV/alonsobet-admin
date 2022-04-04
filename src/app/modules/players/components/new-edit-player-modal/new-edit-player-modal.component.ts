import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppToastService } from 'src/app/services/app-toast-service';
import { Player } from '../../_models/player';
import { PlayerService } from '../../_services/player.service';

@Component({
  selector: 'app-new-edit-player-modal',
  templateUrl: './new-edit-player-modal.component.html',
  styleUrls: ['./new-edit-player-modal.component.scss']
})
export class NewEditPlayerModalComponent implements OnInit, OnDestroy {

  @Input() model: Player;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  isLoading = false;

  subscriptions: Subscription[] = [];

  formGroup: FormGroup;

  namePlural = "Jugadores";
  nameSingular = "jugador";
  article = "el";

  constructor(
    private fb: FormBuilder,
    private _playerService: PlayerService,
    public toastService: AppToastService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      id: [this.model?.id],
      user_id: [this.model.user_id, Validators.required],
      name: [this.model.name, Validators.required],
      lastname: [this.model.lastname, Validators.required],
      document_type: [this.model.document_type, Validators.required],
      document_number: [this.model.document_number, Validators.required],
      birthday: [this.model?.birthday],
      gender: [this.model?.gender],
      country_id: [this.model?.country_id],
      state_id: [this.model?.state_id],
      city_id: [this.model?.city_id],
      parish_id: [this.model?.parish_id],
      address: [this.model?.address],
      phone: [this.model?.phone],
      treatment: [this.model?.treatment],
      language_id: [this.model?.language_id],
      timezone: [this.model?.timezone],
      format_quot: [this.model?.format_quot],
      offer: [this.model?.offer],
      ip: [this.model?.ip],
      browser: [this.model?.browser],
      available: [this.model?.available],
      risk: [this.model?.risk],
      total: [this.model?.total]
    });
  }

  save() {
    this.isLoading = true;
    const toast = this.toastService.show('Enviando información al servidor:', 'loading');

    if (!this.model.id) {
      console.log(this.formGroup.value);
      return this._playerService.save(this.formGroup.value)
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
      return this._playerService.update(this.formGroup.value)
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

  returnData(player: Player) {
    this.passEntry.emit(player);
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
