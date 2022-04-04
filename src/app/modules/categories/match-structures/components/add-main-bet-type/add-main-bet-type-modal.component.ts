import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppToastService } from 'src/app/services/app-toast-service';
import { BetTypeService } from '../../../_services/bet-type.service';
import { MatchStructuresService } from '../../../_services/match-structures.service';

@Component({
  selector: 'app-add-main-bet-type-modal',
  templateUrl: './add-main-bet-type-modal.component.html',
  styleUrls: ['./add-main-bet-type-modal.component.scss']
})
export class AddMainBetTypeModalComponent implements OnInit, OnDestroy {

  @Input() matchStructure: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  mainBetType: String = "";
  betTypes = [];
  category_id = null;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(
    private _matchStructureService: MatchStructuresService,
    private _betTypeService: BetTypeService,
    public toastService: AppToastService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.category_id = this.matchStructure.category_id;
    this.getBetTypesByCategory(this.category_id);
  }

  attachMainBetType() {
    this.isLoading = true;
    const toast = this.toastService.show('Agregado tipo de apuesta', 'loading');

    return this._matchStructureService.attachMainBetType(this.matchStructure, this.mainBetType)
      .subscribe(
        (resp: any) => {
          this.isLoading = false;
          this.toastService.remove(toast);
          this.toastService.show('Tipo de apuesta agregado correctamente', 'success');
          this.returnData(resp.match_structure);
        },
        error => {
          this.toastService.remove(toast);
          const errorToast = this.toastService.show('Error agregado tipo de apuesta a la estructura de deportes: ' + error.error.message, 'bug');
        });
  }

  getBetTypesByCategory(category_id) {
    this._betTypeService.getBetTypesByCategory(category_id)
      .then((resp: any) => {
        this.betTypes = resp;

        if (this.betTypes.length > 0) {
          this.mainBetType = this.betTypes[0].id;
        }

        this.betTypes.forEach(element => {
          if (element.description != '') {
            element.name = element.description;
          }
        });
      }).catch(e => { console.log(e) });
  }

  returnData(matchStructure: any) {
    this.passEntry.emit(matchStructure);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
