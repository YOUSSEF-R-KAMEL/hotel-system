import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../features/user/services/translation/translation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private translate = inject(TranslateService);
  private translationService = inject(TranslationService);
  constructor() {
    this.translate.setDefaultLang(this.currentLang as string);
    this.translate.use(this.currentLang as string);
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
  get currentLang() : string | null{
    return this.translationService.currentLang
  }
}
