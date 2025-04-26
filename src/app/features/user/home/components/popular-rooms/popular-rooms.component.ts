import { Component, inject, Input } from '@angular/core';
import { IRoom } from '../../../../../shared/interface/room/room.interface';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { TranslationService } from '../../../services/translation/translation.service';

@Component({
  selector: 'app-popular-rooms',
  templateUrl: './popular-rooms.component.html',
  styleUrl: './popular-rooms.component.scss'
})
export class PopularRoomsComponent {
  @Input() rooms: IRoom[] = [];
  private translate = inject(TranslateService);
  private translationService = inject(TranslationService);
  constructor() {
    this.translate.setDefaultLang(this.currentLang as string);
    this.translate.use(this.currentLang as string);
  }
  get currentLang(): string | null {
    return this.translationService.currentLang
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
