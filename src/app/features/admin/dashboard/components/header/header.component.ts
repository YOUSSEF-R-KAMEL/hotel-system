import { Component, inject, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { authRoutes } from '../../../../auth/routes/enum';
import { Router } from '@angular/router';

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

  constructor() {
    if (localStorage.getItem('userName')) {
      this.userName = localStorage.getItem('userName');
    }
  }
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
  }
  onLogout(): void {
    this._AuthService.onLogout();
    this.router.navigate([authRoutes.login]);
  }
}
