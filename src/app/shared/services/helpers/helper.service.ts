import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private platformId = inject(PLATFORM_ID);
  isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
