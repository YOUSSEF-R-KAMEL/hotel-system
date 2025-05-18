import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollToTopService {
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Listen to router navigation end events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // After navigation ends, scroll to top only in browser
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          this.viewportScroller.scrollToPosition([0, 0]);
        });
      }
    });
  }
}
