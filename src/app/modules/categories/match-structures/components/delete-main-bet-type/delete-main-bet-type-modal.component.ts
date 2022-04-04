import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppToastService } from 'src/app/services/app-toast-service';
import { MatchStructuresService } from '../../../_services/match-structures.service';

@Component({
  selector: 'app-delete-main-bet-type-modal',
  templateUrl: './delete-main-bet-type-modal.component.html',
  styleUrls: ['./delete-main-bet-type-modal.component.scss']
})
export class DeleteMainBetTypeModalComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('input1', { static: false }) inputEl: ElementRef;

  @Input() matchStructure: any;
  @Input() mainBetType: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  nameBetType = "";

  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(
    public toastService: AppToastService,
    private _matchStructureService: MatchStructuresService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.mainBetType?.description != '') {
      this.nameBetType = this.mainBetType.description;
    } else {
      this.nameBetType = this.mainBetType.name;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.inputEl.nativeElement.focus());
  }

  dettachMainBetType() {
    this.isLoading = true;
    const toast = this.toastService.show('Eliminando tipo de apuesta: ' + this.nameBetType, 'loading');

    return this._matchStructureService.dettachMainBetType(this.matchStructure, this.mainBetType)
      .subscribe(
        (resp: any) => {
          this.isLoading = false;
          this.toastService.remove(toast);
          this.toastService.show('Tipo de apuesta ' + this.nameBetType + ' eliminado correctamente', 'success');
          this.returnData(resp.match_structure);
        },
        error => {
          this.toastService.remove(toast);
          const errorToast = this.toastService.show('Error eliminando tipo de apuesta a la estructura de deportes: ' + error.error.message, 'bug');
        });
  }

  returnData(matchStructure: any) {
    this.passEntry.emit(matchStructure);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
