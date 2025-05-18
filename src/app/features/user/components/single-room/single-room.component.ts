import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslationService } from '../../../../core/services/translation/translation.service';
import { IRoom } from '../../../../shared/interface/room/room.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { LoginRegisterDialogComponent } from '../../home/components/login-register-dialog/login-register-dialog.component';
import { IAddFavoriteRoom } from '../../interfaces/api-responses/add-to-fav.interface';
import { FavoriteRoomsService } from '../../services/favRooms/favorite-rooms.service';

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
  private _authService = inject(AuthService);

  favRoom: IAddFavoriteRoom | null = null;

  switchLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  get currentLang(): string {
    return this.translationService.getCurrentLang();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginRegisterDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  openDetals(room: IRoom) {
    this._route.navigate(['/room', room._id]);
  }
}
