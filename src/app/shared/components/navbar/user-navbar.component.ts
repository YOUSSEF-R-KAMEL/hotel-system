import { Component, computed, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { IApiResponse } from '../../interface/api-data-response/api-response.interface';
import { IUser } from '../../interface/user/IUserResponse';
import { authRoutes } from './../../../features/auth/routes/enum';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss'],
})
export class UserNavbarComponent implements OnInit {
  user = this.authService.user;
  role = this.authService.role;
  authRoutes = authRoutes;
  showEnBtn:boolean = false;
  navLinks = computed(() => [
    { text: 'home', path: 'home', isUser: true },
    { text: 'explore', path: 'explore', isUser: true },
    { text: 'reviews', path: 'reviews', isUser: !!this.user() },
    { text: 'favorites', path: 'favs', isUser: !!this.user() },
  ]);
  constructor(
              public authService: AuthService,
              private translate: TranslateService,
              @Inject(DOCUMENT) private document: Document,
  ) {
    this.translate.setDefaultLang(this.authService.currentLang as string);
    this.translate.use(this.authService.currentLang as string);
    this.setHtmlAttributes(this.authService.currentLang as string);
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
    if (this.user()) {
      this.authService.getUser(this.user()!._id).subscribe({
        next: (res: IApiResponse) => {
          if (res && res.data && res.data.user) {
            this.authService.updateUser(res.data.user as IUser);
          }
        },
      });
    }
  }
  logout(): void {
    this.authService.onLogout();
  }
}
