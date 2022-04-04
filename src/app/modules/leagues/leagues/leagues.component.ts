// tslint:disable:no-string-literal
import { Component, OnInit } from '@angular/core';

import { LeagueService } from '../_services/league.service';
import { League } from '../_models/leagues';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTipicoCodeModalComponent } from './components/add-tipico-code/add-tipico-code-modal.component';
import { DeleteTipicoCodeModalComponent } from './components/delete-tipico-code/delete-tipico-code-modal.component';
import { CountryService } from '../../countries/_services/country.service';
import { Country } from '../../countries/_models/country';
import { CategoryService } from '../../categories/_services/category.service';
import { Category } from '../../categories/_models/category';
import { AppToastService } from 'src/app/services/app-toast-service';
import { LeagueEditComponent } from './league-edit/league-edit.component';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss'],
})
export class LeaguesComponent implements OnInit {

  leagues: League[] = [];
  countries: Country[];
  categories: Category[];
  result: any;
  selectedFile: File;
  showEdit = false;

  EMPTY_LEAGUE: League = {
    id: undefined,
    name: '',
    name_uk: '',
    category_id: 1,
    country_id: 1,
    importance: 0,
    match_structure_id: null
  };

  leagueTemp: League;
  deactivate = 'disabled';

  isLoadingGet = false;

  filters = {
    "id": "",
    "name": "",
    "name_uk": "",
    "category_id": "",
    "country_id": "",
    "match_structure_id": "",
    "status": ""
  };

  page = 1;
  totalPage = 0;

  constructor(
    public _leagueService: LeagueService,
    public _countryService: CountryService,
    public _categoryService: CategoryService,
    private modalService: NgbModal,
    public toastService: AppToastService,
  ) { }

  ngOnInit(): void {
    this.get(this.page);
    this.getCategories();
    this.getCountries();
  }

  get(page: any) {
    const toast = this.toastService.show('Cargando ligas', 'loading');
    this.isLoadingGet = true;

    this._leagueService.get(page, this.filters)
      .subscribe(
        resp => {
          this.isLoadingGet = false;
          this.toastService.remove(toast);

          if (resp.data.length > 0) {            
            this.page = resp.current_page;
            this.totalPage = resp.last_page * 10;
            this.leagues = resp.data;

            this.toastService.show('Ligas cargadas', 'success');
          } else {
            this.toastService.show('No se encontraron resultados con los filtros seleccionados', 'empty');
          }
        },
        error => {
          this.isLoadingGet = false;
          this.toastService.remove(toast);
          this.toastService.show('Error cargando ligas: ' + error.error.message, 'bug');
        }
      );
  }

  sync(league: League) {
    const toast = this.toastService.show('Sincronizando liga: ' + league.name, 'loading');

    this._leagueService.sync(league.id)
      .subscribe(
        result => {
          this.toastService.remove(toast);
          this.toastService.show('Liga ' + league.name + ' sincronizada correctamente', 'success');
        },
        error => {
          this.toastService.remove(toast);

          const errorToast = this.toastService.show('Error sincronizando ' + league.name + ': ' + error.error.message, 'bug');
        }
      );
  }

  addTipicoCode(league: League) {
    const modalRef = this.modalService.open(AddTipicoCodeModalComponent);
    modalRef.componentInstance.league = league;

    modalRef.componentInstance.passEntry.subscribe((leagueEntry) => {
      this.leagues.find(x => x.id === leagueEntry.id).name_uk = leagueEntry.name_uk;
      modalRef.close();
    });
  }

  deleteTipicoCode(league: League, code: String) {
    const modalRef = this.modalService.open(DeleteTipicoCodeModalComponent);
    modalRef.componentInstance.league = league;
    modalRef.componentInstance.code = code;

    modalRef.componentInstance.passEntry.subscribe((leagueEntry) => {
      this.leagues.find(x => x.id === leagueEntry.id).name_uk = leagueEntry.name_uk;
      modalRef.close();
    });
  }

  getCountries() {
    this._countryService.get()
      .then((resp: any) => {
        this.countries = resp;
      }).catch(e => { console.log(e) });
  }

  getCategories() {
    this._categoryService.get()
      .then((resp: any) => {
        this.categories = resp;
      }).catch(e => { console.log(e) });
  }

  newEditLeague(league: League) {
    const modalRef = this.modalService.open(LeagueEditComponent);
    modalRef.componentInstance.league = league;

    modalRef.componentInstance.passEntry.subscribe((leagueEntry) => {
      // this.leagues.unshift(leagueEntry);
      this.get(1);
      modalRef.close();
    });
  }

  updateValue(id, value, league, parameter, parameter_es = '') {
    console.log(value);
    if (value != league[parameter] && (value != '' || league[parameter] != null)) {
      const toast = this.toastService.show('Enviando información al servidor', 'loading');

      this._leagueService.updateValue(id, value, parameter)
        .subscribe(
          res => {
            if (res.status == 'success') {
              league[parameter] = value;   
              this.toastService.remove(toast);
              this.toastService.show('Liga ' + league.name + ' actualizada correctamente', 'success');        
            }
          },
          error => {
            this.toastService.remove(toast);
            this.toastService.show('Error actualizando dato de liga: ' + error.error.message, 'bug');
          }
        );
    }
  }
}
