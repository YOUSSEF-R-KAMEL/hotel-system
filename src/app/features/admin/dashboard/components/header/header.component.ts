import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;
  userId: string | null = null;
  @Input() profileImage: string = '';

  constructor(private _AuthService: AuthService) {
    if (localStorage.getItem('userName')) {
      this.userName = localStorage.getItem('userName');
    }
  }
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
  }
  onLogout(): void {
    this._AuthService.onLogout();
  }
}
