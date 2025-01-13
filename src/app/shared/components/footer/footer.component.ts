import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { TranslationService } from '../../../features/user/services/translation/translation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private translate: TranslateService, private translationService: TranslationService) {
    this.translate.setDefaultLang(this.currentLang as string);
    this.translate.use(this.currentLang as string);  // Set default language to English
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);  // Change language dynamically
  }
  get currentLang() : string | null{
    return this.translationService.currentLang
  }
}
