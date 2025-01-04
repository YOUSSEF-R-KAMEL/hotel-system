import { authRoutes } from './../../../features/auth/routes/enum';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { User } from '../../interfaces/IUserResponse';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {
  isLoggedIn = false;
  authRoutes = authRoutes;
  user: User | null = null;
  navLinks = [
    { text: 'Home', path: '', isActive: true },
    { text: 'Explore', path: 'explore', isActive: true },
    { text: 'Reviews', path: 'reviews', isActive: false }, // Default state
    { text: 'Favorites', path: 'favs', isActive: false },  // Default state
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getUser(userId).subscribe({
        next: (user) => {
          this.user = user.data.user;
          this.isLoggedIn = true;
          this.updateNavLinks(); // Update navLinks based on login status
        }
      });
    }
  }

  isLogged(): boolean {
    return this.user !== null;
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
    this.isLoggedIn = false;
    this.updateNavLinks(); // Reset navLinks on logout
  }
}

