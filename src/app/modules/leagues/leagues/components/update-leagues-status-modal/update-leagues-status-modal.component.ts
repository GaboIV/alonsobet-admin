import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, first, tap } from 'rxjs/operators';
import { League } from '../../../_models/leagues';
import { LeagueService } from '../../../_services/league.service';

@Component({
  selector: 'app-update-leagues-status-modal',
  templateUrl: './update-leagues-status-modal.component.html',
  styleUrls: ['./update-leagues-status-modal.component.scss']
})
export class UpdateLeaguesStatusModalComponent implements OnInit, OnDestroy {
  @Input() ids: number[];
  status = 2;
  leagues: League[] = [];
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(
    private _leagueService: LeagueService, 
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.loadLeagues();
  }

  loadLeagues() {

  }

  updateLeaguesStatus() {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
