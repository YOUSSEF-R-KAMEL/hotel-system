import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { User } from '../../interface/user.interface';
import { authRoutes } from './../../../features/auth/routes/enum';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {
  role: string | null = null;
  authRoutes = authRoutes;
  user: User | null | undefined = null;
  navLinks = [
    { text: 'Home', path: '', isActive: true },
    { text: 'Explore', path: 'explore', isActive: true },
    { text: 'Reviews', path: 'reviews', isActive: false },
    { text: 'Favorites', path: 'favs', isActive: false },
  ];

  constructor(public authService: AuthService) {
    this.role = this.authService.getRole();
    if (this.role) {
      this.authService.user$.pipe(take(1)).subscribe((user) => {
        this.user = user;
      })
    }
  }

  ngOnInit(): void {
  }

  isLogged(): boolean {
    return this.role === 'user';
  }

  updateNavLinks(): void {
    this.navLinks = [
      { text: 'Home', path: '', isActive: true },
      { text: 'Explore', path: 'explore', isActive: true },
      { text: 'Reviews', path: 'reviews', isActive: this.isLogged() },
      { text: 'Favorites', path: 'favs', isActive: this.isLogged() },
    ];
  }

  logout(): void {
    this.authService.onLogout();
    this.user = null;
    this.updateNavLinks(); // Reset navLinks on logout
  }
}

