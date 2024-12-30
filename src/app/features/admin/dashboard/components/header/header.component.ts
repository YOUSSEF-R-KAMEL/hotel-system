import { Component, Input } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userName: string | null = null;
  @Input() profileImage: string = '';

  constructor(private _AuthService: AuthService) {
    if (localStorage.getItem('userName')) {
      this.userName = localStorage.getItem('userName');
    }
  }
  onLogout(): void {
    this._AuthService.onLogout();
  }
}
