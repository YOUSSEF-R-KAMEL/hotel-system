import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from './core/services/translation/translation.service';
import { ScrollToTopService } from './core/services/scroll/scroll-to-top.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private translationService = inject(TranslationService);
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);
  private scrollToTopService = inject(ScrollToTopService);

  constructor() {
    // Translation service will handle initialization automatically

    // Configure the ViewportScroller
    this.viewportScroller.setOffset([0, 0]);

    // Set scroll position restoration to 'enabled'
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
}
