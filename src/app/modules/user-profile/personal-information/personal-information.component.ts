import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AuthService, UserModel } from '../../auth';
import { UserProfileService } from '../_services/user-profile.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: UserModel;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;

  documentTypes: Array<any> = [];
  treatments: Array<any> = [];
  genders: Array<any> = [];

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

    this._configurationService.getConfiguration();
    this._configurationService.getStates();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      // id: [this.user.id],
      // photo: [this.user.admin.photo_url],
      document_type: [this.user.admin?.document_type, Validators.required],
      document_number: [this.user.admin?.document_number, Validators.required],
      gender: [this.user.admin?.gender, Validators.required],
      birthday: [this.user.admin?.birthday, Validators.required],
      name: [this.user.admin?.name, Validators.required],
      lastname: [this.user.admin?.lastname, Validators.required],
      phone: [this.user.admin.phone, Validators.required]
    });
  }

  save() {
    this.formGroup.markAllAsTouched();

    if (!this.formGroup.valid) {
      return;
    }

    const formValues = this.formGroup.value;    

    this.userService.isLoadingSubject.next(true);

    this._userProfileService.updatePersonalInformation(formValues).subscribe(resp => {
      this.userService.isLoadingSubject.next(false);
    });
  }

  cancel() {
    this.user = Object.assign({}, this.firstUserState);
    this.loadForm();
  }

  gePhoto() {
    if (!this.user.admin.photo) {
      return 'none';
    }

    return `url('${this.user.admin.photo}')`;
  }

  deletePhoto() {
    this.user.admin.photo = '';
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
            case 'DOCUMENT_TYPES':
              this.documentTypes.push(element);
              break;

            case 'TREATMENT':
              this.treatments.push(element);
              break;

            case 'GENDER':
              this.genders.push(element);
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
