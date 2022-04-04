import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, type) {

    let options: any = {};

    switch (type) {
      case 'bug':
        options = { classname: 'bg-warning text-light', icon: 'fas fa-bug', delay: 5000 }
        break;

      case 'loading':
        options = { classname: 'bg-success text-light', icon: 'fas fa-circle-notch fa-spin' }
        break;

      case 'success':
        options = { classname: 'bg-info text-white', icon: 'fas fa-check-circle', delay: 3000 }
        break;

      case 'empty':
        options = { classname: 'bg-danger text-white', icon: 'far fa-circle', delay: 3000 }
        break;
    
      default:
        break;
    }

    const newToast = {
      textOrTpl, ...options
    }

    this.toasts.push(newToast);

    return newToast;
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
