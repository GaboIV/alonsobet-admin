// tslint:disable:no-string-literal
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppToastService } from 'src/app/services/app-toast-service';
import { NewEditCountryModalComponent } from '../components/new-edit-country-modal/new-edit-country-modal.component';
import { Country } from '../_models/country';
import { CountryService } from '../_services/country.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})

export class CountriesComponent implements OnInit {

  EMPTY_MODEL: Country = {
    id: undefined,
    name: '',
    acro_2: "",
    acro_3: "",
    image_link: "",
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
  categories: Country[] = [];
  isLoadingGet = false;

  constructor(
    private _countryService: CountryService,
    private modalService: NgbModal,
    public toastService: AppToastService,
  ) { }

  ngOnInit(): void {
    this.get(this.page);
  }

  get(page: any) {
    const toast = this.toastService.show('Cargando países', 'loading');
    this.isLoadingGet = true;

    this._countryService.pagination(page, this.filters)
      .subscribe(
        resp => {
          this.isLoadingGet = false;
          this.toastService.remove(toast);

          if (resp.data.length > 0) {            
            this.page = resp.current_page;
            this.totalPage = resp.last_page * 10;
            this.categories = resp.data;

            this.toastService.show('Países cargadas', 'success');
          } else {
            this.toastService.show('No se encontraron resultados con los filtros seleccionados', 'empty');
          }
        },
        error => {
          this.isLoadingGet = false;
          this.toastService.remove(toast);
          this.toastService.show('Error cargando países: ' + error.error.message, 'bug');
        }
      );
  }

  newEdit(category: Country) {
    const modalRef = this.modalService.open(NewEditCountryModalComponent);
    modalRef.componentInstance.category = category;

    modalRef.componentInstance.passEntry.subscribe((leagueEntry) => {
      this.get(1);
      modalRef.close();
    });
  }

  updateValue(id, value, model, parameter, parameter_es = '') {
    if (value != model[parameter] && (value != '' || model[parameter] != null)) {
      const toast = this.toastService.show('Enviando información al servidor', 'loading');

      this._countryService.updateValue(id, value, parameter)
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
