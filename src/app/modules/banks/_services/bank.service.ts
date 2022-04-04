import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth';
import { map } from 'rxjs/operators';
import { Bank } from '../_models/bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  URL_BANKS = environment.apiUrl + "/banks"

  constructor(
    private http: HttpClient,
    public _authService: AuthService,
  ) { }

  get() {
    let url = this.URL_BANKS;

    return new Promise((resolve, reject) => {
      if (sessionStorage.getItem('banks')) {
        resolve(JSON.parse(sessionStorage.getItem('banks')));
      } else {

        this.http.get(url, this._authService.httpOptions)
          .subscribe((resp: any) => {
            sessionStorage.setItem('banks', JSON.stringify(resp.banks));
            resolve(resp.banks);
          }, error => reject("Error"));
      }
    });
  }

  pagination(page: number, filters: Object) {
    let url = this.URL_BANKS + '?page=' + page;

    Object.keys(filters).forEach(key => {
      if (filters[key] != '')
        url += "&" + key + "=" + filters[key];
    });

    return this.http.get(url, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp.banks;
      }));
  }

  save(bank: Bank) {
    const url = this.URL_BANKS;

    return this.http.post(url, bank, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp;
      })
    );
  }

  update(bank: Bank) {
    const url = this.URL_BANKS + '/' + bank.id;

    return this.http.put(url, bank, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp;
      })
    );
  }

  updateValue(id, value, parameter) {
    const url = this.URL_BANKS + '/' + id;

    var key = parameter;
    var obj = {};
    obj[key] = value;

    return this.http.put(url, obj, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        const res = resp;
        return res;
      })
    );
  }
}
