// tslint:disable:no-string-literal
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppToastService } from 'src/app/services/app-toast-service';
import { Player } from '../_models/player';
import { PlayerService } from '../_services/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})

export class PlayersComponent implements OnInit {

  EMPTY_MODEL: Player = {
    id: undefined,
    user_id: undefined,
    document_type: "V",
    document_number: "",
    name: "",
    lastname: ""
  };

  filters = {
    id: "",
    user_id: "",
    document_type: "",
    document_number: "",
    name: "",
    lastname: "",
    birthday: "",
    gender: "",
    country_id: "",
    state_id: "",
    city_id: "",
    parish_id: "",
    address: "",
    phone: "",
    treatment: "",
    language_id: "",
    timezone: "",
    format_quot: "",
    offer: "",
    ip: "",
    browser: ""
  };

  page = 1;
  totalPage = 0;
  banks: Player[] = [];
  isLoadingGet = false;

  namePlural = "Juegadores";
  nameSingular = "Jugador";
  article = "el";

  constructor(
    private _playerService: PlayerService,
    private modalService: NgbModal,
    public toastService: AppToastService,
  ) { }

  ngOnInit(): void {
    this.get(this.page);
  }

  get(page: any) {
    const toast = this.toastService.show('Cargando ' + this.namePlural.toLowerCase(), 'loading');
    this.isLoadingGet = true;

    this._playerService.pagination(page, this.filters)
      .subscribe(
        resp => {
          console.log(resp);
          this.isLoadingGet = false;
          this.toastService.remove(toast);

          if (resp.data.length > 0) {            
            this.page = resp.current_page;
            this.totalPage = resp.last_page * 10;
            this.banks = resp.data;

            this.toastService.show(this.namePlural + ' cargadas', 'success');
          } else {
            this.toastService.show('No se encontraron resultados con los filtros seleccionados', 'empty');
          }
        },
        error => {
          this.isLoadingGet = false;
          this.toastService.remove(toast);
          this.toastService.show('Error cargando ' + this.nameSingular.toLowerCase() + ': ' + error.error.message, 'bug');
        }
      );
  }

  newEdit(player: Player) {
    // const modalRef = this.modalService.open(NewEditBankModalComponent);
    // modalRef.componentInstance.bank = bank;

    // modalRef.componentInstance.passEntry.subscribe((resultEntry) => {
    //   this.get(1);
    //   modalRef.close();
    // });
  }

  updateValue(id, value, model, parameter, parameter_es = '') {
    if (value != model[parameter] && (value != '' || model[parameter] != null)) {
      const toast = this.toastService.show('Enviando información al servidor', 'loading');

      this._playerService.updateValue(id, value, parameter)
        .subscribe(
          res => {
            if (res.status == 'success') {
              model[parameter] = value;   
              this.toastService.remove(toast);
              this.toastService.show(this.nameSingular + ' actualizado correctamente', 'success');      
            }
          },
          error => {
            this.toastService.remove(toast);
            this.toastService.show('Error actualizando dato de ' + this.nameSingular + ': ' + error.error.message, 'bug');
          }
        );
    }
  }
}
