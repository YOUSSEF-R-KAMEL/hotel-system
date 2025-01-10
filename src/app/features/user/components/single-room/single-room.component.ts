import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IRoom } from '../../../../shared/interface/room/room.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { LoginRegisterDialogComponent } from '../../home/components/login-register-dialog/login-register-dialog.component';
import { IAddFavoriteRoom } from '../../interfaces/add-to-fav.interface';
import { FavoriteRoomsService } from '../../services/favorite-rooms.service';

@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrl: './single-room.component.scss',
})
export class SingleRoomComponent {
  @Input() room: IRoom | null = null;
  favRoom: IAddFavoriteRoom | null = null;
  constructor(
    public dialog: MatDialog,
    private _AuthService: AuthService,
    private _FavRoomsService: FavoriteRoomsService
  ) {}
  openDialog(): void {
    if (
      this._AuthService.getRole() !== 'user' &&
      this._AuthService.getRole() !== 'admin'
    ) {
      const dialogRef = this.dialog.open(LoginRegisterDialogComponent);
    } else {
      const roomId = this.room?._id;
      this._FavRoomsService.addRoomToFavorite(roomId!).subscribe({
        next: (res: IAddFavoriteRoom) => {
          console.log(res);
          console.log(this.favRoom);
        },
      });
    }
  }
}
