import { Component, Input } from '@angular/core';
import { IRoom } from '../../../../../shared/interface/room/room.interface';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-popular-rooms',
  templateUrl: './popular-rooms.component.html',
  styleUrl: './popular-rooms.component.scss'
})
export class PopularRoomsComponent {
  @Input() rooms: IRoom[] = [];
  constructor(private translate: TranslateService, private _authService:AuthService) {
    this.translate.setDefaultLang(this.currentLang as string);
    this.translate.use(this.currentLang as string);  // Set default language to English
  }
  get currentLang() : string | null{
    return this._authService.currentLang
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);  // Change language dynamically
  }
}
