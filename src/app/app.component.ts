import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Hotel-system';
  private translateService = inject(TranslateService);
  constructor() {
    this.initializeTranslation();
  }
  private initializeTranslation() {
    this.translateService.use('en');
  }
}
