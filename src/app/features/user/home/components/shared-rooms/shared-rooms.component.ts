import { Component, Input, effect, Signal, computed, signal } from '@angular/core';
import { IRoom } from '../../../../../shared/interface/room/room.interface';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-shared-rooms',
  templateUrl: './shared-rooms.component.html',
  styleUrls: ['./shared-rooms.component.scss'],
})
export class SharedRoomsComponent {
  private _rooms = signal<IRoom[]>([]);
  rooms = computed(() => this._rooms());
  @Input()
  set inputRooms(value: IRoom[]) {
    this._rooms.set(value || []);
  }
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

