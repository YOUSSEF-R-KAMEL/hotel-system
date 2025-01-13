import { Injectable } from '@angular/core';
import { HelperService } from '../../../../shared/services/helpers/helper.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private _helperService: HelperService) { }

  get currentLang(): string | null {
    if(this._helperService.isPlatformBrowser()){
      return localStorage.getItem('lang');
    }
    return null
  }
}
