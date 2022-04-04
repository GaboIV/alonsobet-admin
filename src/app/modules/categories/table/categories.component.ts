// tslint:disable:no-string-literal
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppToastService } from 'src/app/services/app-toast-service';
import { NewEditCategoryModalComponent } from '../components/new-edit-category-modal/new-edit-category-modal.component';
import { Category } from '../_models/category';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})

export class CategoriesComponent implements OnInit {

  EMPTY_MODEL: Category = {
    id: undefined,
    name: '',
    data: null, 
    acro_3: "",
    image: "",
    importance: 0,
    name_id: ""
  };

  filters = {
    "id": "",
    "name": "",
    "acro_3": "",
    "importance": "",
    "name_id": ""
  };

  page = 1;
  totalPage = 0;
  categories: Category[] = [];
  isLoadingGet = false;

  constructor(
    private _categoryService: CategoryService,
    private modalService: NgbModal,
    public toastService: AppToastService,
  ) { }

  ngOnInit(): void {
    this.get(this.page);
  }

  get(page: any) {
    const toast = this.toastService.show('Cargando ligas', 'loading');
    this.isLoadingGet = true;

    this._categoryService.pagination(page, this.filters)
      .subscribe(
        resp => {
          this.isLoadingGet = false;
          this.toastService.remove(toast);

          if (resp.data.length > 0) {            
            this.page = resp.current_page;
            this.totalPage = resp.last_page * 10;
            this.categories = resp.data;

            this.toastService.show('Categorías cargadas', 'success');
          } else {
            this.toastService.show('No se encontraron resultados con los filtros seleccionados', 'empty');
          }
        },
        error => {
          this.isLoadingGet = false;
          this.toastService.remove(toast);
          this.toastService.show('Error cargando categorías: ' + error.error.message, 'bug');
        }
      );
  }

  newEdit(category: Category) {
    const modalRef = this.modalService.open(NewEditCategoryModalComponent);
    modalRef.componentInstance.category = category;

    modalRef.componentInstance.passEntry.subscribe((leagueEntry) => {
      this.get(1);
      modalRef.close();
    });
  }

  updateValue(id, value, model, parameter, parameter_es = '') {
    if (value != model[parameter] && (value != '' || model[parameter] != null)) {
      const toast = this.toastService.show('Enviando información al servidor', 'loading');

      this._categoryService.updateValue(id, value, parameter)
        .subscribe(
          res => {
            if (res.status == 'success') {
              model[parameter] = value;   
              this.toastService.remove(toast);
              this.toastService.show('Categoría ' + model.name + ' actualizada correctamente', 'success');        
            }
          },
          error => {
            this.toastService.remove(toast);
            this.toastService.show('Error actualizando dato de categoría: ' + error.error.message, 'bug');
          }
        );
    }
  }
}
