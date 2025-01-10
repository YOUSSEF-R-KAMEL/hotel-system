import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRoom } from '../../../../shared/interface/room/room.interface';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {
  rooms: IRoom[] = [];
  page: number = 1;
  size: number = 10;
  constructor(private route: ActivatedRoute,
              private translate: TranslateService,
              private _authServices:AuthService) {
    this.translate.setDefaultLang(this.currentLang as string);
    this.translate.use(this.currentLang as string);
    this.route.data.subscribe((data: any) => {
      const rooms = data.filters.data.rooms;
      this.rooms = rooms;
    })
  }
    switchLanguage(lang: string) {
      this.translate.use(lang);
    }
    get currentLang() : string | null{
      return this._authServices.currentLang
    }
}
