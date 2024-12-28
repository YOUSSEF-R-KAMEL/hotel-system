import { Component, Input } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() profileImage: string = '';

  userName: string | null = localStorage.getItem('userName');
  constructor(private _AuthService: AuthService) {}
  onLogout(): void {
    this._AuthService.onLogout();
  }
}
