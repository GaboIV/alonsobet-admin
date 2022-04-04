import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AuthService, UserModel } from '../../auth';
import { UserProfileService } from '../_services/user-profile.service';

@Component({
  selector: 'app-personal-address',
  templateUrl: './personal-address.component.html',
  styleUrls: ['./personal-address.component.scss']
})
export class PersonalAddressComponent implements OnInit {

  formGroup: FormGroup;
  user: UserModel;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;

  states: Array<any> = [];
  cities: Array<any> = [];
  parishes: Array<any> = [];

  constructor(
    private userService: AuthService,
    private _userProfileService: UserProfileService,
    private fb: FormBuilder,
    private _configurationService: ConfigurationService
  ) {
    this.isLoading$ = this.userService.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    const sb = this.userService.currentUserSubject.asObservable().pipe(
      first(user => !!user)
    ).subscribe(user => {
      this.user = Object.assign({}, user);
      this.firstUserState = Object.assign({}, user);
      this.loadForm();
    });

    this.subscriptions.push(sb);

    this.getConfig();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      state_id: [this.user.admin?.state_id, Validators.required],
      city_id: [this.user.admin?.city_id, Validators.required],
      parish_id: [this.user.admin?.parish_id, Validators.required],
      address: [this.user.admin?.address, Validators.required]
    });
  }

  save() {
    this.formGroup.markAllAsTouched();

    if (!this.formGroup.valid) {
      return;
    }

    const formValues = this.formGroup.value;

    this.userService.isLoadingSubject.next(true);

    this._userProfileService.updatePersonalAdress(formValues).subscribe(resp => {
      this.userService.isLoadingSubject.next(false);
    });
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  getConfig() {
    this._configurationService.getStates()
      .then((resp: any) => {
        this.states = resp;

        if (this.formGroup.value.state_id != null) {
          this.getCities(this.formGroup.value.state_id);
        }
      }).catch(e => {
        console.log(e)
      });
  }

  getCities(state_id) {
    this._configurationService.getCitiesByStateId(state_id)
      .then((resp: any) => {
        this.cities = resp;

        if (this.formGroup.value.parish_id != null) {
          this.getParishes(this.formGroup.value.city_id);
        }
      }).catch(e => {
        console.log(e)
      });
  }

  getParishes(city_id) {
    this._configurationService.getParishesByCityId(city_id)
      .then((resp: any) => {
        this.parishes = resp;
      }).catch(e => {
        console.log(e)
      });
  }

  changeState() {
    const state_id = this.formGroup.value.state_id;

    this._configurationService.getCitiesByStateId(state_id)
      .then((resp: any) => {
        this.cities = resp;
        this.formGroup.value.city_id = this.cities[0].id;

        this._configurationService.getParishesByCityId(this.cities[0].id)
          .then((resp: any) => {
            this.parishes = resp;
            this.formGroup.value.parish_id = this.parishes[0].id;
          }).catch(e => {
            console.log(e)
          });
      }).catch(e => {
        console.log(e)
      });
  }

  changeCity() {
    const city_id = this.formGroup.value.city_id;

    this._configurationService.getParishesByCityId(city_id)
      .then((resp: any) => {
        this.parishes = resp;
        this.formGroup.value.parish_id = this.parishes[0].id;
      }).catch(e => {
        console.log(e)
      });
  }
}
