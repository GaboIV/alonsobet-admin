import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from, of, Subscription } from 'rxjs';
import { catchError, delay, finalize, first, tap } from 'rxjs/operators';
import { League } from '../../../_models/leagues';
import { LeagueService } from '../../../_services/league.service';

@Component({
  selector: 'app-fetch-leagues-modal',
  templateUrl: './fetch-leagues-modal.component.html',
  styleUrls: ['./fetch-leagues-modal.component.scss']
})
export class FetchLeaguesModalComponent implements OnInit, OnDestroy {
  @Input() ids: number[];
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

  fetchSelected() {
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
