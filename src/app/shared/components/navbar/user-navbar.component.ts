import { Component, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { IApiResponse } from '../../interface/api-data-response/api-response.interface';
import { IUser } from '../../interface/user/IUserResponse';
import { authRoutes } from './../../../features/auth/routes/enum';
import { ThemeService } from '../../services/theme/theme.service';
import { HelperService } from '../../services/helpers/helper.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss'],
})
export class UserNavbarComponent implements OnInit {
  role: string | null = null;
  userId: string | null = null;
  user: IUser | null = null
  authRoutes = authRoutes;
  navLinks = computed(() => [
    { text: 'Home', path: 'home', isUser: true },
    { text: 'Explore', path: 'explore', isUser: true },
    { text: 'Reviews', path: 'reviews', isUser: this.role === 'user' },
    { text: 'Favorites', path: 'favorites', isUser: this.role === 'user' },
  ]);

  constructor(public themeService: ThemeService,public authService: AuthService, private router: Router, private helperService: HelperService) {
    this.role = authService.getRole();
    if (this.helperService.isPlatformBrowser()) {
      const userId = localStorage.getItem('userId')
      if (userId) {
        this.userId = userId
      }
    }
  }

  ngOnInit(): void {
    if (this.role && this.userId) {
      this.authService.getUser(this.userId).subscribe({
        next: (res: IApiResponse) => {
          if (res && res.data && res.data.user) {
            this.authService.updateUser(res.data.user as IUser);
            this.user = res.data.user;
          }
        },
      });
    }
  }

  toggleTheme () {
    this.themeService.updateTheme();
  }

  logout(): void {
    this.authService.onLogout();
  }
}
