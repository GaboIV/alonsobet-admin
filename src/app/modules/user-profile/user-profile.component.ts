import { Component, OnInit } from '@angular/core';
import { SubheaderService } from '../../_metronic/partials/layout';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor(private subheader: SubheaderService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.subheader.setTitle('Perfil de usuario');
      this.subheader.setBreadcrumbs([{
        title: 'Perfil de usuario',
        linkText: 'Configuración de cuenta y más',
        linkPath: '/user-profile'
      }]);
    }, 1);
  }
}
