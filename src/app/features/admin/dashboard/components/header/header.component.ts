import { Component, inject, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { authRoutes } from '../../../../auth/routes/enum';
import { Router } from '@angular/router';
import { HelperService } from '../../../../../shared/services/helpers/helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;
  userId: string | null = null;
  @Input() profileImage: string = '';
  private _AuthService = inject(AuthService);
  private router = inject(Router);
  private helperService = inject(HelperService);

  constructor() {
    if (this.helperService.isPlatformBrowser()) {
      this.userName = localStorage.getItem('userName');
    }
  }

  ngOnInit(): void {
    if (this.helperService.isPlatformBrowser()) {
      this.userId = localStorage.getItem('userId');
    }
  }

  onLogout(): void {
    this._AuthService.onLogout();
    this.router.navigate([authRoutes.login]);
  }
}
