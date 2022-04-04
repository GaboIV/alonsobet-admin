import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth';
import { map } from 'rxjs/operators';
import { Player } from '../_models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  URL = environment.apiUrl + "/players"

  constructor(
    private http: HttpClient,
    public _authService: AuthService,
  ) { }

  get() {
    let url = this.URL;

    return new Promise((resolve, reject) => {
      if (sessionStorage.getItem('players')) {
        resolve(JSON.parse(sessionStorage.getItem('players')));
      } else {

        this.http.get(url, this._authService.httpOptions)
          .subscribe((resp: any) => {
            sessionStorage.setItem('players', JSON.stringify(resp.players));
            resolve(resp.players);
          }, error => reject("Error"));
      }
    });
  }

  pagination(page: number, filters: Object) {
    let url = this.URL + '?page=' + page;

    Object.keys(filters).forEach(key => {
      if (filters[key] != '')
        url += "&" + key + "=" + filters[key];
    });

    return this.http.get(url, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp;
      }));
  }

  save(player: Player) {
    const url = this.URL;

    return this.http.post(url, player, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp;
      })
    );
  }

  update(player: Player) {
    const url = this.URL + '/' + player.id;

    return this.http.put(url, player, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp;
      })
    );
  }

  updateValue(id, value, parameter) {
    const url = this.URL + '/' + id;

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
