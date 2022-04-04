import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { AppToastService } from 'src/app/services/app-toast-service';
import { League } from '../../../_models/leagues';
import { LeagueService } from '../../../_services/league.service';

@Component({
  selector: 'app-add-tipico-code-modal',
  templateUrl: './add-tipico-code-modal.component.html',
  styleUrls: ['./add-tipico-code-modal.component.scss']
})
export class AddTipicoCodeModalComponent implements OnInit, OnDestroy {

  @Input() league: League;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  code: String = "";
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(
    private _leagueService: LeagueService,
    public toastService: AppToastService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void { }

  attachTipicoCode() {
    this.isLoading = true;
    const toast = this.toastService.show('Agregado código: ' + this.code, 'loading');

    return this._leagueService.attachTipicoCode(this.league, this.code)
      .subscribe(
        (resp: any) => {
          this.isLoading = false;
          this.toastService.remove(toast);
          this.toastService.show('Códido ' + this.code + ' agregado correctamente', 'success');
          this.returnData(resp.league);
        },
        error => {
          this.toastService.remove(toast);
          const errorToast = this.toastService.show('Error agregando código a liga ' + this.league.name + ': ' + error.error.message, 'bug');
        });
  }

  returnData(league: League) {
    this.passEntry.emit(league);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
