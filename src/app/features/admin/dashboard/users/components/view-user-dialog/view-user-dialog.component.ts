import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '../../../../../../shared/interface/user/IUserResponse';

@Component({
  selector: 'app-view-user-dialog',
  templateUrl: './view-user-dialog.component.html',
  styleUrls: ['./view-user-dialog.component.scss'],
})
export class ViewUserDialogComponent {
  public data = inject(MAT_DIALOG_DATA);
}
