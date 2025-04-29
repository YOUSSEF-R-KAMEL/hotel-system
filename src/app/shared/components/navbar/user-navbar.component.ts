import { Component, computed, HostListener, inject, Inject, OnInit } from '@angular/core';

import { AuthService } from '../../../features/auth/services/auth.service';
import { IApiResponse } from '../../interface/api-data-response/api-response.interface';
import { IUser } from '../../interface/user/IUserResponse';
import { authRoutes } from './../../../features/auth/routes/enum';
import { ThemeService } from '../../services/theme/theme.service';
import { HelperService } from '../../services/helpers/helper.service';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService } from '../../../features/user/services/translation/translation.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss'],
})
export class UserNavbarComponent implements OnInit {
  role: string | null = null;
  userId: string | null = null;
  user: IUser | null = null;
  authRoutes = authRoutes;
  showEnBtn = false;
  navLinks: { text: string, path: string, icon: string, isUser: boolean }[] = [];
  private translate = inject(TranslateService);
  public themeService = inject(ThemeService);
  public authService = inject(AuthService);
  private helperService = inject(HelperService);
  private document = inject(DOCUMENT);
  isSmallScreen = false;

  @HostListener('window:resize', [])
  onResize() {
    if (this.helperService.isPlatformBrowser()) {
      this.isSmallScreen = window.innerWidth <= 768;
    }
  }

  constructor() {
    this.initializeNavigation();
    this.initializeLanguage();
    this.initializeUser();
  }

  ngOnInit() {
    this.onResize();
  }

  private initializeNavigation() {
    this.authService.role.subscribe((role) => {
      this.role = role;
      this.navLinks = [
        { text: 'Home', path: 'home', icon: "home", isUser: true },
        { text: 'Explore', path: 'explore', icon: "explore", isUser: true },
        { text: 'Favorites', path: 'favorites', icon: "favorite", isUser: role === 'user' },
      ];
    });
    this.role = this.authService.getRole();
  }

  private initializeLanguage() {
    if (this.helperService.isPlatformBrowser()) {
      const currentLang = localStorage.getItem('lang') || 'en';
      this.showEnBtn = currentLang === 'ar';
      this.translate.setDefaultLang(currentLang);
      this.translate.use(currentLang);
      this.setHtmlAttributes(currentLang);
    }
  }

  private initializeUser() {
    if (this.helperService.isPlatformBrowser()) {
      this.userId = localStorage.getItem('userId') || null;
      if (this.userId) {
        this.getUser();
      }
    }
  }

  getUser() {
    if (this.userId) {
      this.authService.getUser(this.userId).subscribe({
        next: (res: IApiResponse) => {
          if (res?.data?.user) {
            this.user = res.data.user;
          }
        },
      });
    }
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.setHtmlAttributes(lang);
    localStorage.setItem('lang', lang);
    this.showEnBtn = lang === 'ar';
  }

  setHtmlAttributes(lang: string) {
    const html = this.document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  toggleTheme() {
    this.themeService.updateTheme();
  }

  logout(): void {
    this.authService.onLogout();
  }
}
