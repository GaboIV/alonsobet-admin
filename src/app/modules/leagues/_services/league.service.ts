import { Inject, Injectable } from '@angular/core';
import { TableService } from '../../../_metronic/shared/crud-table';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { League } from '../_models/leagues';
import { AuthService } from '../../auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  URL_LEAGUES = environment.apiUrl + "/leagues"

  constructor(
    private http: HttpClient,
    public _authService: AuthService,
  ) { }

  get(page: number, filters: Object) {
    let url = this.URL_LEAGUES + '?page=' + page;

    Object.keys(filters).forEach(key => {
      if (filters[key] != '')
        url += "&" + key + "=" + filters[key];
    });

    return this.http.get( url, this._authService.httpOptions )
    .pipe(map((resp: any) => {
      return resp;
    }));
  }

  sync(id) {
    const url = this.URL_LEAGUES + "/" + id + "/sync";

    return this.http.post( url, {}, this._authService.httpOptions  )
    .pipe(map ( (resp: any) => {
      return resp;
    }));
  }

  attachTipicoCode(league: League, code: String) {
    const url = this.URL_LEAGUES + "/" + league.id + "/attach";

    return this.http.patch( url, { code: code }, this._authService.httpOptions  )
    .pipe(map ( (resp: any) => {
      return resp;
    }));
  }

  dettachTipicoCode(league: League, code: String) {
    const url = this.URL_LEAGUES + "/" + league.id + "/dettach";

    return this.http.patch( url, { code: code }, this._authService.httpOptions  )
    .pipe(map ( (resp: any) => {
      return resp;
    }));
  }

  save(league: League) {
    const url = this.URL_LEAGUES;

    return this.http.post( url, league, this._authService.httpOptions )
      .pipe(map( (resp: any) => {
        return resp;
      })
    );
  }

  update(league: League) {
    const url = this.URL_LEAGUES + '/' + league.id;

    return this.http.put( url, league, this._authService.httpOptions )
      .pipe(map( (resp: any) => {
        return resp;
      })
    );
  }

  updateValue(id, value, parameter) {
    const url = this.URL_LEAGUES + '/' + id;
    
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
