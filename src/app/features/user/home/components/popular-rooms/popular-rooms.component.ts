import { Component, inject, Input } from '@angular/core';
import { TranslationService } from '../../../../../core/services/translation/translation.service';
import { IRoom } from '../../../../../shared/interface/room/room.interface';

@Component({
  selector: 'app-popular-rooms',
  templateUrl: './popular-rooms.component.html',
  styleUrl: './popular-rooms.component.scss'
})
export class PopularRoomsComponent {
  @Input() rooms: IRoom[] = [];
  private translationService = inject(TranslationService);

  switchLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  get currentLang(): string {
    return this.translationService.getCurrentLang();
  }
}
