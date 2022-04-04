import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth';
import { map } from 'rxjs/operators';
import { Account } from '../_models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  URL_ACCOUNTS = environment.apiUrl + "/accounts"

  constructor(
    private http: HttpClient,
    public _authService: AuthService,
  ) { }

  get() {
    let url = this.URL_ACCOUNTS;

    return new Promise((resolve, reject) => {
      if (sessionStorage.getItem('accounts')) {
        resolve(JSON.parse(sessionStorage.getItem('accounts')));
      } else {

        this.http.get(url, this._authService.httpOptions)
          .subscribe((resp: any) => {
            sessionStorage.setItem('accounts', JSON.stringify(resp.accounts));
            resolve(resp.accounts);
          }, error => reject("Error"));
      }
    });
  }

  pagination(page: number, filters: Object) {
    let url = this.URL_ACCOUNTS + '?page=' + page;

    Object.keys(filters).forEach(key => {
      if (filters[key] != '')
        url += "&" + key + "=" + filters[key];
    });

    return this.http.get(url, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp.accounts;
      }));
  }

  save(account: Account) {
    const url = this.URL_ACCOUNTS;

    return this.http.post(url, account, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp;
      })
    );
  }

  update(account: Account) {
    const url = this.URL_ACCOUNTS + '/' + account.id;

    return this.http.put(url, account, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp;
      })
    );
  }

  updateValue(id, value, parameter) {
    const url = this.URL_ACCOUNTS + '/' + id;

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
