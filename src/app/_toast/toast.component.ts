import { Component, TemplateRef } from '@angular/core';
import { AppToastService } from '../services/app-toast-service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastComponent {
  constructor(
    public toastService: AppToastService
  ) {}

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}
