import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '../../../../../../shared/interface/user/IUserResponse';

@Component({
  selector: 'app-view-user-dialog',
  templateUrl: './view-user-dialog.component.html',
  styleUrls: ['./view-user-dialog.component.scss'],
})
export class ViewUserDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IUser) {}
}
