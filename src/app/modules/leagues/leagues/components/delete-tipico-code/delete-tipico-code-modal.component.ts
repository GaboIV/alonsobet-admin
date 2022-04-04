import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { AppToastService } from 'src/app/services/app-toast-service';
import { League } from '../../../_models/leagues';
import { LeagueService } from '../../../_services/league.service';

@Component({
  selector: 'app-delete-tipico-code-modal',
  templateUrl: './delete-tipico-code-modal.component.html',
  styleUrls: ['./delete-tipico-code-modal.component.scss']
})
export class DeleteTipicoCodeModalComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('input1', { static: false }) inputEl: ElementRef;

  @Input() league: League;
  @Input() code: String;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(
    public toastService: AppToastService,
    private _leagueService: LeagueService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    setTimeout(() => this.inputEl.nativeElement.focus());
  }

  dettachTipicoCode() {
    this.isLoading = true;
    const toast = this.toastService.show('Eliminando código: ' + this.code, 'loading');

    return this._leagueService.dettachTipicoCode(this.league, this.code)
      .subscribe(
        (resp: any) => {
          this.isLoading = false;
          this.toastService.remove(toast);
          this.toastService.show('Códido ' + this.code + ' eliminado correctamente', 'success');
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
