import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IRoom } from '../../../../shared/interface/room/room.interface';
import { TranslationService } from '../../../../core/services/translation/translation.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {
  rooms: IRoom[] = [];
  page: number = 1;
  size: number = 10;
  private route = inject(ActivatedRoute);
  private translate = inject(TranslateService);
  private translationService = inject(TranslationService);

  constructor() {
    this.route.data.subscribe((data: any) => {
      const rooms = data.filters.data.rooms;
      this.rooms = rooms;
    })
  }

  switchLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  get currentLang(): string {
    return this.translationService.getCurrentLang();
  }
}
