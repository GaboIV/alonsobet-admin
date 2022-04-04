// tslint:disable:no-string-literal
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppToastService } from 'src/app/services/app-toast-service';
import { BetType } from '../_models/bet-type';
import { Category } from '../_models/category';
import { BetTypeService } from '../_services/bet-type.service';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-bet-types',
  templateUrl: './bet-types.component.html',
  styleUrls: ['./bet-types.component.scss'],
})

export class BetTypesComponent implements OnInit {

  filters = {
    "id": "",
    "name": "",
    "description": "",
    "adding": "",
    "index": "",
    "option": "",
    "importance": "",
    "category_id": ""
  };

  page = 1;
  totalPage = 0;
  data: BetType[] = [];
  isLoadingGet = false;
  categories: Category[];

  constructor(
    private _categoryService: CategoryService,
    private _betTypeService: BetTypeService,
    public toastService: AppToastService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.get(this.page);
  }

  get(page: any) {
    const toast = this.toastService.show('Cargando ligas', 'loading');
    this.isLoadingGet = true;

    this._betTypeService.pagination(page, this.filters)
      .subscribe(
        resp => {
          this.isLoadingGet = false;
          this.toastService.remove(toast);

          if (resp.data.length > 0) {
            this.page = resp.current_page;
            this.totalPage = resp.last_page * 10;
            this.data = resp.data;

            this.toastService.show('Tipos de apuestas cargadas', 'success');
          } else {
            this.toastService.show('No se encontraron resultados con los filtros seleccionados', 'empty');
          }
        },
        error => {
          this.isLoadingGet = false;
          this.toastService.remove(toast);
          this.toastService.show('Error cargando tipos de apuestas: ' + error.error.message, 'bug');
        }
      );
  }

  updateValue(id, value, model, parameter, parameter_es = '') {
    if (value != model[parameter] && (value != '' || model[parameter] != null)) {
      const toast = this.toastService.show('Enviando información al servidor', 'loading');

      this._betTypeService.updateValue(id, value, parameter)
        .subscribe(
          res => {
            if (res.status == 'success') {
              model[parameter] = value;
              this.toastService.remove(toast);
              this.toastService.show('Tipo de apuesta ' + model.name + ' actualizada correctamente', 'success');
            }
          },
          error => {
            this.toastService.remove(toast);
            this.toastService.show('Error actualizando dato de tipo de apuesta: ' + error.error.message, 'bug');
          }
        );
    }
  }

  getCategories() {
    this._categoryService.get()
      .then((resp: any) => {
        this.categories = resp;
      }).catch(e => { console.log(e) });
  }
}
