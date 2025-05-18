import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translate = inject(TranslateService);
  private languageSubject = new BehaviorSubject<string>('en');
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const savedLang = this.getSavedLanguage();
    this.setLanguage(savedLang);
    this.setHTMLDirection(savedLang);
  }

  private setHTMLDirection(lang: string): void {
    if (this.isBrowser) {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }

  private getSavedLanguage(): string {
    if (this.isBrowser) {
      return localStorage.getItem('lang') || 'en';
    }
    return 'en';
  }

  setLanguage(lang: string): void {
    this.translate.setDefaultLang('en');
    this.translate.use(lang);
    if (this.isBrowser) {
      localStorage.setItem('lang', lang);
    }
    this.languageSubject.next(lang);
    this.setHTMLDirection(lang);
  }

  getCurrentLang(): string {
    return this.languageSubject.getValue();
  }
}
