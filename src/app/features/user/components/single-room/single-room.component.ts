import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IRoom } from '../../../../shared/interface/room/room.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { LoginRegisterDialogComponent } from '../../home/components/login-register-dialog/login-register-dialog.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrl: './single-room.component.scss',
})
export class SingleRoomComponent {
  @Input() room: IRoom | null = null;
  _route = inject(Router)
  constructor(public dialog: MatDialog, private _authService: AuthService, private translate: TranslateService) {
    this.translate.setDefaultLang(this.currentLang as string);
    this.translate.use(this.currentLang as string);  // Set default language to English
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);  // Change language dynamically
  }
  get currentLang() : string | null{
    return this._authService.currentLang
  }
  openDialog(room:IRoom): void {
    if (
      this._authService.role() !== 'user' &&
      this._authService.role() !== 'admin'
    ) {
      const dialogRef = this.dialog.open(LoginRegisterDialogComponent);
    } else {
      console.log(room)
      this._route.navigate(['home/' + room._id])
    }
  }
}
