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
export class UserNavbarComponent {
  role: string | null = null;
  userId: string | null = null;
  user: IUser | null = null
  authRoutes = authRoutes;
  showEnBtn = false;
  navLinks: { text: string, path: string, icon:string, isUser: boolean }[] = [];
  private translationService = inject(TranslationService);
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
    this.authService.role.subscribe((role) => {
      this.role = role;
      this.navLinks = [
        { text: 'Home', path: 'home', icon: "home", isUser: true },
        { text: 'Explore', path: 'explore', icon: "explore", isUser: true },
        // { text: 'Reviews', path: 'reviews', icon: "rate_review", isUser: role === 'user' },
        { text: 'Favorites', path: 'favorites', icon: "favorite", isUser: role === 'user' },
      ];
    })
    if (this.helperService.isPlatformBrowser()) {
      const userId = localStorage.getItem('userId')
      if (userId) {
        this.userId = userId
      }
    }
    this.getUser();
    this.translate.setDefaultLang(this.translationService.currentLang as string);
    this.translate.use(this.translationService.currentLang as string);
    this.setHtmlAttributes(this.translationService.currentLang as string);
    this.role = this.authService.getRole();
  }
  ngOnInit() {
    this.onResize();
  }
  getUser() {
    if (this.userId) {
      this.authService.getUser(this.userId).subscribe({
        next: (res: IApiResponse) => {
          if (res && res.data && res.data.user) {
            this.user = res.data.user;
          }
        },
      });
    }
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.setHtmlAttributes(lang);
    this.showEnBtn = !this.showEnBtn
    if (this.showEnBtn) {
      localStorage.setItem('lang', "ar");
      console.log(this.translationService.currentLang)
    } else {
      localStorage.setItem('lang', "en");
      console.log(this.translationService.currentLang)

    }
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

