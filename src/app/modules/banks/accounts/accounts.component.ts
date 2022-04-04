// tslint:disable:no-string-literal
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppToastService } from 'src/app/services/app-toast-service';
import { NewEditBankModalComponent } from '../components/new-edit-bank-modal/new-edit-bank-modal.component';
import { Account } from '../_models/account';
import { Bank } from '../_models/bank';
import { AccountService } from '../_services/account.service';
import { BankService } from '../_services/bank.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})

export class AccountsComponent implements OnInit {

  EMPTY_MODEL: Account = {
    id: undefined
  };

  filters = {
    "id": "",
    "name": "",
    "number": "",
    "document": "",
    "email": "",
    "type": "",
    "bank_id": "",
    "bank": "",
  };

  page = 1;
  totalPage = 0;
  banks: Bank[] = [];
  isLoadingGet = false;

  namePlural = "Cuentas";
  nameSingular = "cuenta";
  article = "la";

  constructor(
    private _bankService: BankService,
    private _accountService: AccountService,
    private modalService: NgbModal,
    public toastService: AppToastService,
  ) { }

  ngOnInit(): void {
    this.get(this.page);
  }

  get(page: any) {
    const toast = this.toastService.show('Cargando ' + this.namePlural.toLowerCase(), 'loading');
    this.isLoadingGet = true;

    this._accountService.pagination(page, this.filters)
      .subscribe(
        resp => {
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

  newEdit(account: Account) {
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

      this._bankService.updateValue(id, value, parameter)
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
