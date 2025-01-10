import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IRoom } from '../../../../shared/interface/room/room.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { LoginRegisterDialogComponent } from '../../home/components/login-register-dialog/login-register-dialog.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IAddFavoriteRoom } from '../../interfaces/add-to-fav.interface';
import { FavoriteRoomsService } from '../../services/favorite-rooms.service';

@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrl: './single-room.component.scss',
})
export class SingleRoomComponent {
  @Input() room: IRoom | null = null;
  _route = inject(Router)
  constructor(private favoriteRoomsService: FavoriteRoomsService, public dialog: MatDialog, private _authService: AuthService, private translate: TranslateService) {
    this.translate.setDefaultLang(this.currentLang as string);
    this.translate.use(this.currentLang as string);  // Set default language to English
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);  // Change language dynamically
  }
  get currentLang() : string | null{
    return this._authService.currentLang
  }

  favRoom: IAddFavoriteRoom | null = null;
  openDialog(): void {
    if (
      this._authService.getRole() !== 'user' &&
      this._authService.getRole() !== 'admin'
    ) {
      const dialogRef = this.dialog.open(LoginRegisterDialogComponent);
    } else {
      const roomId = this.room?._id;
      this.favoriteRoomsService.addRoomToFavorite(roomId!).subscribe({
        next: (res: IAddFavoriteRoom) => {
          console.log(res);
          console.log(this.favRoom);
        },
      });
    }
  }
}
