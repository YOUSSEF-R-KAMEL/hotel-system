import { Component, Inject, Input } from '@angular/core';
import { IRoom } from '../../interfaces/room.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.scss'
})
export class ViewRoomComponent {

  constructor(
    public dialogRef: MatDialogRef<ViewRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRoom
  ) {}

}
