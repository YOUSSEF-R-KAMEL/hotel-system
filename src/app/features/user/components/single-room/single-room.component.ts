import { Component, Input } from '@angular/core';
import { IRoom } from '../../../../shared/interface/room/room.interface';

@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrl: './single-room.component.scss',
})
export class SingleRoomComponent {
  @Input() room!: IRoom;
}
