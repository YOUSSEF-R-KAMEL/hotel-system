import { Component, computed, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { authRoutes } from './../../../features/auth/routes/enum';
import { IApiResponse } from '../../interface/api-data-response/api-response.interface';
import { IUser } from '../../interface/user/IUserResponse';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {
  user = this.authService.user;
  role = this.authService.role;
  authRoutes = authRoutes;
  navLinks = computed(() => [
    { text: 'Home', path: '', isActive: true },
    { text: 'Explore', path: 'explore', isActive: true },
    { text: 'Reviews', path: 'reviews', isActive: !!this.user() },
    { text: 'Favorites', path: 'favs', isActive: !!this.user() },
  ]);

  constructor(public authService: AuthService) {
    this.role = this.authService.role;
    this.user = this.authService.user;
  }
  
  ngOnInit(): void {
    if (this.user()) {
      this.authService.getUser(this.user()!._id).subscribe({
        next: (res: IApiResponse) => {
          if (res && res.data && res.data.user) {
            this.authService.updateUser(res.data.user as IUser);
          }
        }
      })
    }
  }

  logout(): void {
    this.authService.onLogout();
  }
}

