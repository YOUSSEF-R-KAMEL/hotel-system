import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../core/services/translation/translation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private translationService = inject(TranslationService);

  switchLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  get currentLang(): string {
    return this.translationService.getCurrentLang();
  }
}
