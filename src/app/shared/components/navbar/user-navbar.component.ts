import { Component, computed, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { IApiResponse } from '../../interface/api-data-response/api-response.interface';
import { IUser } from '../../interface/user/IUserResponse';
import { authRoutes } from './../../../features/auth/routes/enum';
import { ThemeService } from '../../services/theme/theme.service';
import { HelperService } from '../../services/helpers/helper.service';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

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
  navLinks: { text: string, path: string, isUser: boolean }[] = [];
  constructor(public themeService: ThemeService, public authService: AuthService, private router: Router, private helperService: HelperService) {
    this.authService.role.subscribe((role) => {
      this.role = role;
      this.navLinks = [
        { text: 'Home', path: 'home', isUser: true },
        { text: 'Explore', path: 'explore', isUser: true },
        { text: 'Reviews', path: 'reviews', isUser: role === 'user' },
        { text: 'Favorites', path: 'favorites', isUser: role === 'user' },
      ];
    })
  showEnBtn:boolean = false;
  navLinks = computed(() => [
    { text: 'home', path: 'home', isUser: true },
    { text: 'explore', path: 'explore', isUser: true },
    { text: 'reviews', path: 'reviews', isUser: !!this.user() },
    { text: 'favorites', path: 'favs', isUser: !!this.user() },
    { text: 'Home', path: 'home', isUser: true },
    { text: 'Explore', path: 'explore', isUser: true },
    { text: 'Reviews', path: 'reviews', isUser: this.role === 'user' },
    { text: 'Favorites', path: 'favorites', isUser: this.role === 'user' },
  ]);
  constructor(
              public themeService: ThemeService,
               private router: Router,
                private helperService: HelperService,
              public authService: AuthService,
              private translate: TranslateService,
              @Inject(DOCUMENT) private document: Document,
  ) {
    this.translate.setDefaultLang(this.authService.currentLang as string);
    this.translate.use(this.authService.currentLang as string);
    this.setHtmlAttributes(this.authService.currentLang as string);
    this.role = authService.getRole();
    if (this.helperService.isPlatformBrowser()) {
      const userId = localStorage.getItem('userId')
      if (userId) {
        this.userId = userId
      }
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.setHtmlAttributes(lang);
    this.showEnBtn = !this.showEnBtn
    if(this.showEnBtn){
      localStorage.setItem('lang',"ar");
      console.log(this.authService.currentLang)

    }else {
      localStorage.setItem('lang',"en");
      console.log(this.authService.currentLang)

    }
  }
  setHtmlAttributes(lang: string) {
    const html = this.document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
  ngOnInit(): void {
    }
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

  ngOnInit(): void {
  }

  toggleTheme() {
  toggleTheme () {
    this.themeService.updateTheme();
  }

  logout(): void {
    this.authService.onLogout();
  }
}
