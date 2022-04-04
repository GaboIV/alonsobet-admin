import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AuthService, UserModel } from '../../auth';
import { UserProfileService } from '../_services/user-profile.service';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.scss']
})
export class AccountInformationComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: UserModel;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;

  timezones: Array<any> = [];
  languages: Array<any> = [];

  constructor(
    private userService: AuthService, 
    private _configurationService: ConfigurationService, 
    private _userProfileService: UserProfileService,
    private fb: FormBuilder
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
      nick: [this.user.nick, Validators.required],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      language: [this.user.admin?.language],
      timezone: [this.user.admin?.timezone]
    });
  }

  save() {
    this.formGroup.markAllAsTouched();

    if (!this.formGroup.valid) {
      return;
    }

    const formValues = this.formGroup.value;    

    this.userService.isLoadingSubject.next(true);

    this._userProfileService.updateAccountInformation(formValues).subscribe(resp => {
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
    this._configurationService.getConfiguration()
      .then((resp: any) => {
        resp.forEach(element => {
          switch (element.group) {
            case 'TIMEZONE':
              this.timezones.push(element);
              break;

            case 'LANGUAGE':
              this.languages.push(element);
              break;

            default:
              break;
          }
        });
      }).catch(e => {
        console.log(e)
      });
  }
}
