import { inject, Injectable, signal } from '@angular/core';
import { HelperService } from '../helpers/helper.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeSignal = signal<string>('light')
  private helperService = inject(HelperService);
  constructor() {
    if (this.helperService.isPlatformBrowser()) {
      const theme = localStorage.getItem('theme');
      if (theme) {
        this.setTheme(theme);
      } else {
        this.setTheme('light');
      }
    }
  }

  setTheme(theme: string) {
    this.themeSignal.set(theme);
    if (this.helperService.isPlatformBrowser()){
      localStorage.setItem('theme', theme);
    }
  }

  updateTheme() {
    this.themeSignal.update((oldTheme: string) => oldTheme = oldTheme === 'light' ? 'dark' : 'light');
    if (this.helperService.isPlatformBrowser()) {
      localStorage.setItem('theme', this.themeSignal());
    }
  }
}
