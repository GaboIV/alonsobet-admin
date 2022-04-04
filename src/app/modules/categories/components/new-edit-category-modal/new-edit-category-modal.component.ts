import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppToastService } from 'src/app/services/app-toast-service';
import { Category } from '../../_models/category';
import { CategoryService } from '../../_services/category.service';

@Component({
  selector: 'app-new-edit-category-modal',
  templateUrl: './new-edit-category-modal.component.html',
  styleUrls: ['./new-edit-category-modal.component.scss']
})
export class NewEditCategoryModalComponent implements OnInit, OnDestroy {
  
  @Input() category: Category;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  
  isLoading = false;

  subscriptions: Subscription[] = [];

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _categoryService: CategoryService,
    public toastService: AppToastService, 
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      id: [this.category?.id],
      name: [this.category.name, Validators.required],
      name_id: [this.category.name_id],
      acro_3: [this.category.acro_3, Validators.required],
      importance: [this.category.importance]
    });
  }

  save() {
    this.isLoading = true;
    const toast = this.toastService.show('Enviando información al servidor:', 'loading');

    if (!this.category.id) {
      console.log(this.formGroup.value);
      return this._categoryService.save(this.formGroup.value)
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
      return this._categoryService.update(this.formGroup.value)
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

  returnData(category: Category) {
    this.passEntry.emit(category);
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
