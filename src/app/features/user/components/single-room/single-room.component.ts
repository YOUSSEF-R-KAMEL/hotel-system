import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IRoom } from '../../../../shared/interface/room/room.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { LoginRegisterDialogComponent } from '../../home/components/login-register-dialog/login-register-dialog.component';
import { IAddFavoriteRoom } from '../../interfaces/api-responses/add-to-fav.interface';
import { FavoriteRoomsService } from '../../services/favRooms/favorite-rooms.service';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrl: './single-room.component.scss',
})
export class SingleRoomComponent {
  @Input() room: IRoom | null = null;
  private _route = inject(Router);
  private favoriteRoomsService = inject(FavoriteRoomsService);
  public dialog = inject(MatDialog);
  private translationService = inject(TranslationService);
  private translate = inject(TranslateService);
  private _authService = inject(AuthService);
  constructor() {
    this.translate.setDefaultLang(this.currentLang as string);
    this.translate.use(this.currentLang as string); // Set default language to English
  }
  switchLanguage(lang: string) {
    this.translate.use(lang); // Change language dynamically
  }
  get currentLang(): string | null {
    return this.translationService.currentLang;
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
  openDetals(room: IRoom) {
    this._route.navigate(['home/' + room._id]);
  }
}
