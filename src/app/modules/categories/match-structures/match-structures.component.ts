// tslint:disable:no-string-literal
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppToastService } from 'src/app/services/app-toast-service';
import { BetType } from '../_models/bet-type';
import { Category } from '../_models/category';
import { MatchStructure } from '../_models/match-structure';
import { BetTypeService } from '../_services/bet-type.service';
import { CategoryService } from '../_services/category.service';
import { MatchStructuresService } from '../_services/match-structures.service';
import { AddMainBetTypeModalComponent } from './components/add-main-bet-type/add-main-bet-type-modal.component';
import { DeleteMainBetTypeModalComponent } from './components/delete-main-bet-type/delete-main-bet-type-modal.component';
import { NewEditMatchStructureModalComponent } from './new-edit-match-structure-modal/new-edit-match-structure-modal.component';

@Component({
  selector: 'app-match-structures',
  templateUrl: './match-structures.component.html',
  styleUrls: ['./match-structures.component.scss'],
})

export class MatchStructuresComponent implements OnInit {

  EMPTY_MATCH_STRUCTURE: MatchStructure = {
    id: undefined
  };

  filters = {
    "id": "",
    "category_id": "",
    "division_number": "",
    "division_name_singular": "",
    "division_name_plural": "",
    "annotation_name_singular": "",
    "annotation_name_plural": "",
    "principal": "",
    "halftime": "",
    "type": "",
    "main_bet_types": "",
  };

  page = 1;
  totalPage = 0;
  data = [];
  isLoadingGet = false;
  categories: Category[];
  betTypesArray = [];

  namePlural = "Estructuras de eventos";
  nameSingular = "Estructura de eventos";
  article = "la";

  constructor(
    private modalService: NgbModal,
    public toastService: AppToastService,
    private _categoryService: CategoryService,
    private _matchStructureService: MatchStructuresService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.get(this.page);
  }

  get(page: any) {
    const toast = this.toastService.show('Cargando ' + this.nameSingular.toLowerCase, 'loading');
    this.isLoadingGet = true;

    this._matchStructureService.pagination(page, this.filters)
      .subscribe(
        resp => {
          this.isLoadingGet = false;
          this.toastService.remove(toast);

          if (resp.data.length > 0) {
            this.page = resp.current_page;
            this.totalPage = resp.last_page * 10;
            this.data = resp.data;

            this.toastService.show(this.namePlural + ' cargadas', 'success');
          } else {
            this.toastService.show('No se encontraron resultados con los filtros seleccionados', 'empty');
          }
        },
        error => {
          this.isLoadingGet = false;
          this.toastService.remove(toast);
          this.toastService.show('Error cargando ' + this.nameSingular.toLowerCase + ': ' + error.error.message, 'bug');
        }
      );
  }

  updateValue(id, value, model, parameter, parameter_es = '') {
    if (value != model[parameter] && (value != '' || model[parameter] != null)) {
      const toast = this.toastService.show('Enviando información al servidor', 'loading');

      this._matchStructureService.updateValue(id, value, parameter)
        .subscribe(
          res => {
            if (res.status == 'success') {
              model[parameter] = value;
              this.toastService.remove(toast);
              this.toastService.show(this.nameSingular + ' actualizada correctamente', 'success');
            }
          },
          error => {
            this.toastService.remove(toast);
            this.toastService.show('Error actualizando dato de ' + this.nameSingular + ': ' + error.error.message, 'bug');
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

  moveArrayItemToNewIndex(match_structure_id, arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }

    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);

    arr.forEach(betType => {
      this.betTypesArray.push(betType.id);
    });

    const toast = this.toastService.show('Enviando información al servidor', 'loading');

    this._matchStructureService.updateValue(match_structure_id, this.betTypesArray, 'main_bet_types')
      .subscribe(
        res => {
          if (res.status == 'success') {
            this.toastService.remove(toast);
            this.toastService.show(this.nameSingular + ' actualizada correctamente', 'success');
          }
        },
        error => {
          this.toastService.remove(toast);
          this.toastService.show('Error actualizando dato de ' + this.nameSingular + ': ' + error.error.message, 'bug');
        }
      );

    this.betTypesArray = [];
  };

  deleteMainBetType(matchStructure, main_bet_type) {
    const modalRef = this.modalService.open(DeleteMainBetTypeModalComponent);
    modalRef.componentInstance.matchStructure = matchStructure;
    modalRef.componentInstance.mainBetType = main_bet_type;

    modalRef.componentInstance.passEntry.subscribe((dataReturn) => {
      this.data.find(x => x.id === dataReturn.id).main_bet_types = dataReturn.main_bet_types;
      modalRef.close();
    });
  }

  addMainBetType(matchStructure) {
    const modalRef = this.modalService.open(AddMainBetTypeModalComponent);
    modalRef.componentInstance.matchStructure = matchStructure;

    modalRef.componentInstance.passEntry.subscribe((dataReturn) => {
      this.data.find(x => x.id === dataReturn.id).main_bet_types = dataReturn.main_bet_types;
      modalRef.close();
    });
  }

  newEditMatchStructure(matchStructure: MatchStructure) {
    const modalRef = this.modalService.open(NewEditMatchStructureModalComponent);
    modalRef.componentInstance.matchStructure = matchStructure;

    modalRef.componentInstance.passEntry.subscribe((matchStructureEntry) => {
      this.get(1);
      modalRef.close();
    });
  }
}
