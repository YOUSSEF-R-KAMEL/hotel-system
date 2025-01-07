import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IRoom } from '../../../../shared/interface/room/room.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { LoginRegisterDialogComponent } from '../login-register-dialog/login-register-dialog.component';

@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrl: './single-room.component.scss',
})
export class SingleRoomComponent {
  @Input() room: IRoom | null = null;
  constructor(
    public dialog: MatDialog,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}
  openDialog(): void {
    if (
      this._AuthService.role() !== 'user' &&
      this._AuthService.role() !== 'admin'
    ) {
      const dialogRef = this.dialog.open(LoginRegisterDialogComponent);
    }
  }
}
