import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IRoom } from '../../../../shared/interface/room/room.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { LoginRegisterDialogComponent } from '../../home/components/login-register-dialog/login-register-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrl: './single-room.component.scss',
})
export class SingleRoomComponent {
  @Input() room: IRoom | null = null;
  _route = inject(Router)
  constructor(public dialog: MatDialog, private _AuthService: AuthService) {}
  openDialog(room:IRoom): void {
    if (
      this._AuthService.role() !== 'user' &&
      this._AuthService.role() !== 'admin'
    ) {
      const dialogRef = this.dialog.open(LoginRegisterDialogComponent);
    } else {
      console.log(room)
      this._route.navigate(['home/' + room._id])
    }
  }
}
