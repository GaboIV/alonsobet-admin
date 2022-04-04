import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getConfiguration() {
    let url = environment.apiUrl + '/config';

    return new Promise((resolve, reject) => {
      if (sessionStorage.getItem('configuration')) {
        resolve(JSON.parse(sessionStorage.getItem('configuration')));
      } else {
        this.http.get(url)
          .subscribe(resp => {
            sessionStorage.setItem('configuration', JSON.stringify(resp));
            resolve(resp);
          }, error => reject("Error"));
      }
    });
  }

  getStates() {
    let url = environment.apiUrl + '/config/states';

    return new Promise((resolve, reject) => {
      if (sessionStorage.getItem('states')) {
        resolve(JSON.parse(sessionStorage.getItem('states')));
      } else {

        this.http.get(url)
          .subscribe(resp => {
            sessionStorage.setItem('states', JSON.stringify(resp));
            resolve(resp);
          }, error => reject("Error"));
      }
    });
  }

  getCitiesByStateId(stateId: number) {
    let url = environment.apiUrl + '/config/states/' + stateId + '/cities';

    return new Promise((resolve, reject) => {
      if (sessionStorage.getItem('cities-' + stateId)) {
        resolve(JSON.parse(sessionStorage.getItem('cities-' + stateId)));
      } else {

        this.http.get(url)
          .subscribe(resp => {
            sessionStorage.setItem('cities-' + stateId, JSON.stringify(resp));
            resolve(resp);
          }, error => reject("Error"));
      }
    });
  }

  getParishesByCityId(cityId: number) {
    let url = environment.apiUrl + '/config/cities/' + cityId + '/parishes';

    return new Promise((resolve, reject) => {
      if (sessionStorage.getItem('parishes-' + cityId)) {
        resolve(JSON.parse(sessionStorage.getItem('parishes-' + cityId)));
      } else {

        this.http.get(url)
          .subscribe(resp => {
            sessionStorage.setItem('parishes-' + cityId, JSON.stringify(resp));
            resolve(resp);
          }, error => reject("Error"));
      }
    });
  }
}
