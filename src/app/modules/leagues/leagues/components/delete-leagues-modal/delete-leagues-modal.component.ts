import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { LeagueService } from '../../../_services/league.service';

@Component({
  selector: 'app-delete-leagues-modal',
  templateUrl: './delete-leagues-modal.component.html',
  styleUrls: ['./delete-leagues-modal.component.scss']
})
export class DeleteLeaguesModalComponent implements OnInit, OnDestroy {
  @Input() ids: number[];
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(
    private _leagueService: LeagueService, 
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  deleteLeagues() {
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
