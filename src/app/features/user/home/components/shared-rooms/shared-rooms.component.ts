import { Component, Input, computed, inject, signal } from '@angular/core';
import { TranslationService } from '../../../../../core/services/translation/translation.service';
import { IRoom } from '../../../../../shared/interface/room/room.interface';

@Component({
  selector: 'app-shared-rooms',
  templateUrl: './shared-rooms.component.html',
  styleUrls: ['./shared-rooms.component.scss'],
})
export class SharedRoomsComponent {
  private _rooms = signal<IRoom[]>([]);
  rooms = computed(() => this._rooms());
  private translationService = inject(TranslationService);

  @Input()
  set inputRooms(value: IRoom[]) {
    this._rooms.set(value || []);
  }

  switchLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  get currentLang(): string {
    return this.translationService.getCurrentLang();
  }
}

