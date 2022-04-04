import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth';
import { map } from 'rxjs/operators';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  URL_CATEGORIES = environment.apiUrl + "/categories"
  URL_BET_TYPES = environment.apiUrl + "/bet-types"

  constructor(
    private http: HttpClient,
    public _authService: AuthService,
  ) { }

  get() {
    let url = this.URL_CATEGORIES;

    return new Promise((resolve, reject) => {
      if (sessionStorage.getItem('categories')) {
        resolve(JSON.parse(sessionStorage.getItem('categories')));
      } else {
        this.http.get(url, this._authService.httpOptions)
          .subscribe((resp: any) => {
            sessionStorage.setItem('categories', JSON.stringify(resp.categories));
            resolve(resp.categories);
          }, error => reject("Error"));
      }
    });
  }

  pagination(page: number, filters: Object) {
    let url = this.URL_CATEGORIES + '?page=' + page;

    Object.keys(filters).forEach(key => {
      if (filters[key] != '')
        url += "&" + key + "=" + filters[key];
    });

    return this.http.get(url, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp.categories;
      }));
  }

  save(category: Category) {
    const url = this.URL_CATEGORIES;

    return this.http.post(url, category, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp;
      })
      );
  }

  update(category: Category) {
    const url = this.URL_CATEGORIES + '/' + category.id;

    return this.http.put(url, category, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp;
      })
      );
  }

  updateValue(id, value, parameter) {
    const url = this.URL_CATEGORIES + '/' + id;
    
    var key = parameter;
    var obj = {};
    obj[key] = value;

    return this.http.put( url, obj, this._authService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }
}
