import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppToastService } from 'src/app/services/app-toast-service';
import { Category } from '../../_models/category';
import { MatchStructure } from '../../_models/match-structure';
import { CategoryService } from '../../_services/category.service';
import { MatchStructuresService } from '../../_services/match-structures.service';

@Component({
  selector: 'app-new-edit-match-structure-modal',
  templateUrl: './new-edit-match-structure-modal.component.html',
  styleUrls: ['./new-edit-match-structure-modal.component.scss']
})
export class NewEditMatchStructureModalComponent implements OnInit, OnDestroy {
  
  @Input() matchStructure: MatchStructure;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  
  isLoading = false;

  categories: Category[];

  subscriptions: Subscription[] = [];

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _categoryService: CategoryService,
    private _matchStructureService: MatchStructuresService,
    public toastService: AppToastService, 
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.loadForm();
    this.getCategories();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      id: [this.matchStructure?.id],
      annotation_name_plural: [this.matchStructure?.annotation_name_plural],
      annotation_name_singular: [this.matchStructure?.annotation_name_singular],
      category_id: [this.matchStructure?.category_id],
      division_name_plural: [this.matchStructure?.division_name_plural],
      division_name_singular: [this.matchStructure?.division_name_singular],
      division_number: [this.matchStructure?.division_number],
      type: [this.matchStructure?.type]
    });
  }

  getCategories() {
    this._categoryService.get()
      .then((resp: any) => {
        this.categories = resp;
      }).catch(e => { console.log(e) });
  }

  save() {
    this.isLoading = true;
    const toast = this.toastService.show('Enviando información al servidor:', 'loading');

    if (!this.matchStructure.id) {      
      return this._matchStructureService.save(this.formGroup.value)
        .subscribe(
          (resp: any) => {
          this.isLoading = false;
          this.toastService.remove(toast);
          this.toastService.show('Estructura de categoría creada correctamente', 'success');
          this.returnData(resp);
        },
        error => {
          this.toastService.remove(toast);
          const errorToast = this.toastService.show('Error creando estructura de categoría: ' + error.error.message, 'bug');
        });
    } else {
      return this._matchStructureService.update(this.formGroup.value)
        .subscribe(
          (resp: any) => {
          this.isLoading = false;
          this.toastService.remove(toast);
          this.toastService.show('Estructura de categoría actualizada correctamente', 'success');
          this.returnData(resp);
        },
        error => {
          this.toastService.remove(toast);
          const errorToast = this.toastService.show('Error actualizando estructura de categoría: ' + error.error.message, 'bug');
        });
    }
  }

  returnData(matchStructure: MatchStructure) {
    this.passEntry.emit(matchStructure);
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
