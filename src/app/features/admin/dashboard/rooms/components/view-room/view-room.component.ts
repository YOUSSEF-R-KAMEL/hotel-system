import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRoom } from '../../../../../../shared/interface/room.interface';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.scss',
})
export class ViewRoomComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRoom
  ) {}
}
