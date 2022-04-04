import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth';
import { map } from 'rxjs/operators';
import { MatchStructure } from '../_models/match-structure';

@Injectable({
  providedIn: 'root'
})
export class MatchStructuresService {
  URL_MATCH_STRUCTURES = environment.apiUrl + "/match-structures"

  constructor(
    private http: HttpClient,
    public _authService: AuthService,
  ) { }

  pagination(page: number, filters: Object) {
    let url = this.URL_MATCH_STRUCTURES + '?page=' + page;

    Object.keys(filters).forEach(key => {
      if (filters[key] != '')
        url += "&" + key + "=" + filters[key];
    });

    return this.http.get(url, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp.match_structures;
      }));
  }

  save(matchStructure: MatchStructure) {
    const url = this.URL_MATCH_STRUCTURES;

    return this.http.post(url, matchStructure, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp;
      })
      );
  }

  update(matchStructure: MatchStructure) {
    const url = this.URL_MATCH_STRUCTURES + '/' + matchStructure.id;

    return this.http.put(url, matchStructure, this._authService.httpOptions)
      .pipe(map((resp: any) => {
        return resp;
      })
      );
  }

  updateValue(id, value, parameter) {
    const url = this.URL_MATCH_STRUCTURES + '/' + id;
    
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

  attachMainBetType(matchStructure: any, mainBetType: any) {
    const url = this.URL_MATCH_STRUCTURES + "/" + matchStructure.id + "/add-main-bet-type";

    return this.http.patch( url, { main_bet_type: mainBetType }, this._authService.httpOptions  )
    .pipe(map ( (resp: any) => {
      return resp;
    }));
  }

  dettachMainBetType(matchStructure: any, mainBetType: any) {
    const url = this.URL_MATCH_STRUCTURES + "/" + matchStructure.id + "/delete-main-bet-type";

    return this.http.patch( url, { main_bet_type: mainBetType }, this._authService.httpOptions  )
    .pipe(map ( (resp: any) => {
      return resp;
    }));
  }
}
