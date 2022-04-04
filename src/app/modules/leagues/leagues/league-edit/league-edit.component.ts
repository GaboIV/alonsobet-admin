import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Category } from 'src/app/modules/categories/_models/category';
import { CategoryService } from 'src/app/modules/categories/_services/category.service';
import { Country } from 'src/app/modules/countries/_models/country';
import { CountryService } from 'src/app/modules/countries/_services/country.service';
import { AppToastService } from 'src/app/services/app-toast-service';
import { League } from '../../_models/leagues';
import { LeagueService } from '../../_services/league.service';

@Component({
  selector: 'app-league-edit',
  templateUrl: './league-edit.component.html',
  styleUrls: ['./league-edit.component.scss']
})
export class LeagueEditComponent implements OnInit, OnDestroy {
  @Input() league: League;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  
  previous: League;

  formGroup: FormGroup;

  isLoading = false;
  isLoading$: Observable<boolean>;

  errorMessage = '';

  countries: Country[];
  categories: Category[];

  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private _leagueService: LeagueService,
    public _countryService: CountryService,
    public _categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    public toastService: AppToastService,
  ) { }

  ngOnInit(): void {
    this.loadForm();
    this.getCategories();
    this.getCountries();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      id: [this.league?.id],
      name: [this.league.name, Validators.required],
      name_uk: [this.league.name_uk],
      category_id: [this.league.category_id, Validators.required],
      country_id: [this.league.country_id, Validators.required],
      importance: [this.league.importance],
      match_structure_id: [this.league.match_structure_id]
    });
  }

  getCountries() {
    this._countryService.get()
      .then((resp: any) => {
        this.countries = resp;
      }).catch(e => { console.log(e) });
  }

  getCategories() {
    this._categoryService.get()
      .then((resp: any) => {
        this.categories = resp;
      }).catch(e => { console.log(e) });
  }

  reset() {
    if (!this.previous) {
      return;
    }

    this.league = Object.assign({}, this.previous);
    this.loadForm();
  }

  save() {
    this.isLoading = true;
    const toast = this.toastService.show('Enviando información al servidor:', 'loading');

    if (!this.league.id) {
      return this._leagueService.save(this.formGroup.value)
        .subscribe(
          (resp: any) => {
          this.isLoading = false;
          this.toastService.remove(toast);
          this.toastService.show('Liga creada correctamente', 'success');
          this.returnData(resp);
        },
        error => {
          this.toastService.remove(toast);
          const errorToast = this.toastService.show('Error creando liga: ' + error.error.message, 'bug');
        });
    } else {
      return this._leagueService.update(this.formGroup.value)
        .subscribe(
          (resp: any) => {
          this.isLoading = false;
          this.toastService.remove(toast);
          this.toastService.show('Liga actualizada correctamente', 'success');
          this.returnData(resp);
        },
        error => {
          this.toastService.remove(toast);
          const errorToast = this.toastService.show('Error actualizando liga: ' + error.error.message, 'bug');
        });
    }
  }

  returnData(league: League) {
    this.passEntry.emit(league);
  }

  edit() {

  }

  create() {

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

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
