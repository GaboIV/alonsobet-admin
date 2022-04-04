import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { LeagueService } from '../../../_services/league.service';

@Component({
  selector: 'app-delete-league-modal',
  templateUrl: './delete-league-modal.component.html',
  styleUrls: ['./delete-league-modal.component.scss']
})
export class DeleteLeagueModalComponent implements OnInit, OnDestroy {

  @Input() id: number;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(
    private _leagueService: LeagueService, 
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  deleteLeague() {
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
