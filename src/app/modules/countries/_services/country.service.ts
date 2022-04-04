import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth';
import { map } from 'rxjs/operators';
import { Country } from '../_models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  URL_COUNTRIES = environment.apiUrl + "/countries"

  constructor(
    private http: HttpClient,
    public _authService: AuthService,
  ) { }

  get() {
    let url = this.URL_COUNTRIES;

    return new Promise((resolve, reject) => {
      if (sessionStorage.getItem('countries')) {
        resolve(JSON.parse(sessionStorage.getItem('countries')));
      } else {

        this.http.get(url, this._authService.httpOptions)
          .subscribe((resp: any) => {
            sessionStorage.setItem('countries', JSON.stringify(resp.countries));
            resolve(resp.countries);
          }, error => reject("Error"));
      }
    });
  }

  pagination(page: number, filters: Object) {
    let url = this.URL_COUNTRIES + '?page=' + page;

    Object.keys(filters).forEach(key => {
      if (filters[key] != '')
        url += "&" + key + "=" + filters[key];
    });

    return this.http.get(url, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp.countries;
      }));
  }

  save(country: Country) {
    const url = this.URL_COUNTRIES;

    return this.http.post(url, country, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp;
      })
      );
  }

  update(country: Country) {
    const url = this.URL_COUNTRIES + '/' + country.id;

    return this.http.put(url, country, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp;
      })
      );
  }

  updateValue(id, value, parameter) {
    const url = this.URL_COUNTRIES + '/' + id;

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
