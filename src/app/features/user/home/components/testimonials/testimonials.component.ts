import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  stars: number[] = Array(5).fill(0);
  constructor(private translate: TranslateService, private _authService:AuthService) {
    this.translate.setDefaultLang(this.currentLang as string);
    this.translate.use(this.currentLang as string);  // Set default language to English
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);  // Change language dynamically
  }
  get currentLang() : string | null{
    return this._authService.currentLang
  }
}
